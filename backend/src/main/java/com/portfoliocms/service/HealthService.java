package com.portfoliocms.service;

import com.portfoliocms.dto.HealthEchoResponse;
import com.portfoliocms.dto.HealthStatusResponse;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class HealthService {

    private final Instant startedAt;

    public HealthService() {
        this.startedAt = Instant.now();
    }

    public HealthStatusResponse getHealthStatus() {
        long uptimeMillis = Duration.between(startedAt, Instant.now()).toMillis();
        return new HealthStatusResponse(
                "UP",
                "Portfolio CMS API",
                OffsetDateTime.now(ZoneOffset.UTC),
                uptimeMillis,
                List.of("GET /api/health", "POST /api/health/ping")
        );
    }

    public HealthEchoResponse echo(String message) {
        String sanitizedMessage = message != null ? message : "";
        return new HealthEchoResponse(
                "ACK",
                sanitizedMessage,
                OffsetDateTime.now(ZoneOffset.UTC)
        );
    }
}

