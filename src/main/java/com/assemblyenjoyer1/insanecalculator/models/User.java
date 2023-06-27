package com.assemblyenjoyer1.insanecalculator.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class User {
    @Id
    UUID uuid;
    String name;
    Role role;
    @OneToMany
    @JoinColumn(name = "user_id")
    List<Ride> rides;

    public User(String name){
        this.uuid = UUID.randomUUID();
        this.name = name;
        this.role = Role.USER;
        this.rides = new ArrayList<>();
    }

    public User() {

    }

    public UUID getUUID(){
        return uuid;
    }

    public String getName() {
        return name;
    }

    public Role getRole() {
        return role;
    }

    public List<Ride> getRides() {
        return rides;
    }

    public void setRides(List<Ride> rides) {
        this.rides = rides;
    }

    public void addRide(Ride ride) {
        this.rides.add(ride);
    }

}
