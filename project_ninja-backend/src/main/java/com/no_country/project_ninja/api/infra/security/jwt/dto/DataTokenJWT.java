package com.no_country.project_ninja.api.infra.security.jwt.dto;

public class DataTokenJWT {
    private String tokenJWT;

    public DataTokenJWT(String tokenJWT) {
        this.tokenJWT= tokenJWT;
    }

    public String getTokenJWT() {
        return tokenJWT;
    }

    public void setTokenJWT(String tokenJWT) {
        this.tokenJWT = tokenJWT;
    }
}
