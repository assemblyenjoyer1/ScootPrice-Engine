package com.assemblyenjoyer1.insanecalculator.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class Ride {

    @Id
    UUID id;
    double distanceTraveled;
    double pricePaid;

    public Ride(double distanceTraveled, double pricePaid){
        this.id = UUID.randomUUID();
        this.distanceTraveled = distanceTraveled;
        this.pricePaid = pricePaid;
    }

    public Ride() {

    }
}
