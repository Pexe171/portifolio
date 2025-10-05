package com.portfoliocms.logging;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

@Component
public class HttpLoggingFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(HttpLoggingFilter.class);
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final int MAX_PAYLOAD_LENGTH = 2048;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (isAsyncDispatch(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        ContentCachingRequestWrapper wrappedRequest = wrapRequest(request);
        ContentCachingResponseWrapper wrappedResponse = wrapResponse(response);
        long startTime = System.currentTimeMillis();

        try {
            filterChain.doFilter(wrappedRequest, wrappedResponse);
        } catch (Exception ex) {
            LOGGER.error("Exceção durante o processamento da requisição", ex);
            throw ex;
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            Map<String, Object> payload = buildPayload(wrappedRequest, wrappedResponse, duration);
            logPayload(payload);
            wrappedResponse.copyBodyToResponse();
        }
    }

    private void logPayload(Map<String, Object> payload) {
        try {
            LOGGER.info("HTTP {}", OBJECT_MAPPER.writeValueAsString(payload));
        } catch (JsonProcessingException e) {
            LOGGER.warn("Não foi possível serializar o relatório da requisição", e);
        }
    }

    private Map<String, Object> buildPayload(ContentCachingRequestWrapper request,
                                             ContentCachingResponseWrapper response,
                                             long duration) {
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("timestamp", Instant.now().toString());
        payload.put("method", request.getMethod());
        payload.put("path", request.getRequestURI());
        payload.put("query", emptyToNull(request.getQueryString()));
        payload.put("status", response.getStatus());
        payload.put("durationMs", duration);
        payload.put("ip", request.getRemoteAddr());
        payload.put("requestHeaders", extractRequestHeaders(request));
        payload.put("responseHeaders", extractResponseHeaders(response));
        payload.put("requestBody", readPayload(request.getContentAsByteArray(), request.getCharacterEncoding()));
        payload.put("responseBody", readPayload(response.getContentAsByteArray(), response.getCharacterEncoding()));
        return payload;
    }

    private Map<String, List<String>> extractRequestHeaders(ContentCachingRequestWrapper request) {
        Map<String, List<String>> headers = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        List<String> headerNames = Collections.list(request.getHeaderNames());
        for (String headerName : headerNames) {
            List<String> values = Collections.list(request.getHeaders(headerName));
            headers.put(headerName, sanitizeHeaderValues(headerName, values));
        }
        return headers;
    }

    private Map<String, List<String>> extractResponseHeaders(ContentCachingResponseWrapper response) {
        Map<String, List<String>> headers = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        for (String headerName : response.getHeaderNames()) {
            headers.put(headerName, new LinkedList<>(response.getHeaders(headerName)));
        }
        return headers;
    }

    private ContentCachingRequestWrapper wrapRequest(HttpServletRequest request) {
        if (request instanceof ContentCachingRequestWrapper cachingRequest) {
            return cachingRequest;
        }
        return new ContentCachingRequestWrapper(request);
    }

    private ContentCachingResponseWrapper wrapResponse(HttpServletResponse response) {
        if (response instanceof ContentCachingResponseWrapper cachingResponse) {
            return cachingResponse;
        }
        return new ContentCachingResponseWrapper(response);
    }

    private String readPayload(byte[] buffer, String characterEncoding) {
        if (buffer == null || buffer.length == 0) {
            return null;
        }
        if (isBinary(buffer)) {
            return String.format(Locale.ROOT, "<conteúdo binário (%d bytes)>", buffer.length);
        }

        Charset charset = getCharset(characterEncoding);
        int length = Math.min(buffer.length, MAX_PAYLOAD_LENGTH);
        String payload = new String(buffer, 0, length, charset);
        if (buffer.length > MAX_PAYLOAD_LENGTH) {
            return payload + "… (truncado)";
        }
        return payload;
    }

    private Charset getCharset(String characterEncoding) {
        if (characterEncoding == null || characterEncoding.isBlank()) {
            return StandardCharsets.UTF_8;
        }
        try {
            return Charset.forName(characterEncoding);
        } catch (Exception ex) {
            LOGGER.debug("Charset inválido '{}', usando UTF-8", characterEncoding, ex);
            return StandardCharsets.UTF_8;
        }
    }

    private boolean isBinary(byte[] buffer) {
        for (byte b : buffer) {
            int value = b & 0xFF;
            if (value == 0) {
                return true;
            }
            if (value < 0x09) {
                return true;
            }
            if (value > 0x7E && value < 0xA0) {
                return true;
            }
        }
        return false;
    }

    private List<String> sanitizeHeaderValues(String headerName, List<String> values) {
        if (values.isEmpty()) {
            return values;
        }
        String normalized = headerName.toLowerCase(Locale.ROOT);
        if (normalized.equals("authorization") || normalized.equals("proxy-authorization")) {
            return Collections.singletonList("<oculto>");
        }
        if (normalized.equals("cookie") || normalized.equals("set-cookie")) {
            return Collections.singletonList("<oculto>");
        }
        return values;
    }

    private String emptyToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value;
    }
}
