package com.assemblyenjoyer1.insanecalculator.services;

import com.assemblyenjoyer1.insanecalculator.models.Role;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    public Role getRoleByUserID(int id){
        return Role.ADMIN;
    }

}
