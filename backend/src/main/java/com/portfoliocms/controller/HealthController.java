package com.portfoliocms.controller;

import com.portfoliocms.dto.HealthEchoRequest;
import com.portfoliocms.dto.HealthEchoResponse;
import com.portfoliocms.dto.HealthStatusResponse;
import com.portfoliocms.service.HealthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping
    public HealthStatusResponse healthStatus() {
        return healthService.getHealthStatus();
    }

    @PostMapping("/ping")
    public HealthEchoResponse echo(@RequestBody(required = false) HealthEchoRequest request) {
        String message = request != null ? request.getMessage() : null;
        return healthService.echo(message);
    }
}

