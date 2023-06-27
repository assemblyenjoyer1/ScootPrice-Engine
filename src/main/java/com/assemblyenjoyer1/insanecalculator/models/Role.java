package com.assemblyenjoyer1.insanecalculator.models;

public enum Role {
    ADMIN (100),
    PREMIUM(10),
    USER(5),
    GUEST(0);

    public final int level;

    Role (int level){
        this.level = level;
    }
}
