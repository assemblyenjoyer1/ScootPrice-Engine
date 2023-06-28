package com.assemblyenjoyer1.insanecalculator.services;

import com.assemblyenjoyer1.insanecalculator.models.Ride;
import com.assemblyenjoyer1.insanecalculator.models.Role;
import com.assemblyenjoyer1.insanecalculator.models.User;
import com.assemblyenjoyer1.insanecalculator.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final IUserRepository userRepository;


    public Role getRoleByUserID(UUID id){
        return userRepository.findByUuid(id).get().getRole();
    }

    public User getUserByUserID(UUID id){
        return userRepository.findByUuid(id).get();
    }

    public User validateUserCredentials(String email, String password){
        Optional<User> user = userRepository.findByEmail(email);
    }


}
