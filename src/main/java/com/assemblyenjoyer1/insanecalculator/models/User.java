package com.assemblyenjoyer1.insanecalculator.models;

import java.util.ArrayList;

public class User {

    String name;
    Role role;
    ArrayList<Ride> rides;

    public User(String name){
        this.name = name;
        this.role = Role.USER;
        this.rides = new ArrayList<>();
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
