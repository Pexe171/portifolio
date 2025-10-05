package com.portfoliocms.dto;

import java.time.OffsetDateTime;

public class HealthEchoResponse {

    private String status;
    private String receivedMessage;
    private OffsetDateTime timestamp;

    public HealthEchoResponse(String status, String receivedMessage, OffsetDateTime timestamp) {
        this.status = status;
        this.receivedMessage = receivedMessage;
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReceivedMessage() {
        return receivedMessage;
    }

    public void setReceivedMessage(String receivedMessage) {
        this.receivedMessage = receivedMessage;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }
}

