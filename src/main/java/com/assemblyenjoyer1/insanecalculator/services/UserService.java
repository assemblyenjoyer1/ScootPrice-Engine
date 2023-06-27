package com.assemblyenjoyer1.insanecalculator.services;

import com.assemblyenjoyer1.insanecalculator.models.Role;

public class UserService {


    public Role getRoleByUserID(int id){
        return Role.ADMIN;
    }

}
