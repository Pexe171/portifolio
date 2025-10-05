package com.portfoliocms.dto;

import java.time.OffsetDateTime;
import java.util.List;

public class HealthStatusResponse {

    private String status;
    private String application;
    private OffsetDateTime timestamp;
    private long uptimeMillis;
    private List<String> availableEndpoints;

    public HealthStatusResponse(String status,
                                String application,
                                OffsetDateTime timestamp,
                                long uptimeMillis,
                                List<String> availableEndpoints) {
        this.status = status;
        this.application = application;
        this.timestamp = timestamp;
        this.uptimeMillis = uptimeMillis;
        this.availableEndpoints = availableEndpoints;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public long getUptimeMillis() {
        return uptimeMillis;
    }

    public void setUptimeMillis(long uptimeMillis) {
        this.uptimeMillis = uptimeMillis;
    }

    public List<String> getAvailableEndpoints() {
        return availableEndpoints;
    }

    public void setAvailableEndpoints(List<String> availableEndpoints) {
        this.availableEndpoints = availableEndpoints;
    }
}

