package com.assemblyenjoyer1.insanecalculator.controllers;


public class CalculatePriceDTO {

    int value;
    public CalculatePriceDTO(int value) {
        this.value = value;

    }

    public CalculatePriceDTO() {
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

}
