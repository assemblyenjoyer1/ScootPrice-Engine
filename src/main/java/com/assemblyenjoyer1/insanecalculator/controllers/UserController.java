package com.assemblyenjoyer1.insanecalculator.controllers;

import com.assemblyenjoyer1.insanecalculator.models.User;
import com.assemblyenjoyer1.insanecalculator.models.UserDTO;
import com.assemblyenjoyer1.insanecalculator.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {


    final private UserService userService;

    @PostMapping("/validate")
    public ResponseEntity<User> validateCredentials(@RequestBody UserDTO userDTO){
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();
        ResponseEntity<User> user = userService.validateUserCredentials(email, password);
        return user;
    }
}
