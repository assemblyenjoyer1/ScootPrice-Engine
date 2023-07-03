package com.assemblyenjoyer1.insanecalculator.services;

import com.assemblyenjoyer1.insanecalculator.models.Ride;
import com.assemblyenjoyer1.insanecalculator.models.Role;
import com.assemblyenjoyer1.insanecalculator.models.User;
import com.assemblyenjoyer1.insanecalculator.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
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

    public ResponseEntity<User> validateUserCredentials(String email, String password){
        User user;
        try{
            user = userRepository.findByEmail(email).get();
        }catch(NoSuchElementException e){
            return ResponseEntity.status(401).body(null);
        }
        if (user.validatePassword(password)) {
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.status(401).body(null);
    }

    public ResponseEntity<User> registerUser(String email, String name, String password) {
        if(email == null | name == null | password == null) return ResponseEntity.badRequest().body(null);
        User user = new User(name,email,password);
        userRepository.save(user);
        return ResponseEntity.ok().body(user);
    }
}
