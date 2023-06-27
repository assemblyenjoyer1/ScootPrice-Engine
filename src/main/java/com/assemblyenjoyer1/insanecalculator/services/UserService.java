package com.assemblyenjoyer1.insanecalculator.services;

import com.assemblyenjoyer1.insanecalculator.models.Ride;
import com.assemblyenjoyer1.insanecalculator.models.Role;
import com.assemblyenjoyer1.insanecalculator.models.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    public Role getRoleByUserID(int id){
        return Role.ADMIN;
    }

    public User getUserByUserID(int id){
        return null;
    }


}
