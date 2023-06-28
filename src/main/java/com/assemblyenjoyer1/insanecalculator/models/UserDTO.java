package com.assemblyenjoyer1.insanecalculator.models;

public class UserDTO {

    String email;
    String password;

    public UserDTO(String name, String password) {
        this.email = name;
        this.password = password;
    }

    public UserDTO() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
