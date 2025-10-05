package com.portfoliocms.dto;

public class HealthEchoRequest {

    private String message;

    public HealthEchoRequest() {
    }

    public HealthEchoRequest(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

