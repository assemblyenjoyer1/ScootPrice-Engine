package com.assemblyenjoyer1.insanecalculator.models;

import java.util.ArrayList;
import java.util.UUID;

public class User {
    UUID uuid;
    String name;
    Role role;
    ArrayList<Ride> rides;

    public User(String name){
        this.uuid = UUID.randomUUID();
        this.name = name;
        this.role = Role.USER;
        this.rides = new ArrayList<>();
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

    public ArrayList<Ride> getRides() {
        return rides;
    }
}
