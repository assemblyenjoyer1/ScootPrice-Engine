package com.assemblyenjoyer1.insanecalculator.controllers;

public class CalculatePriceDTO {

    int value;
    String userID;

    public CalculatePriceDTO(int value, String userID) {
        this.value = value;
        this.userID = userID;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
}
