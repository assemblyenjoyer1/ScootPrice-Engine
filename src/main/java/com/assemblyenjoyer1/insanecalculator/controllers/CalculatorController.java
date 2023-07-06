package com.assemblyenjoyer1.insanecalculator.controllers;

import com.assemblyenjoyer1.insanecalculator.config.JwtService;
import com.assemblyenjoyer1.insanecalculator.repository.UserRepository;
import com.assemblyenjoyer1.insanecalculator.services.CalculatorService;
import com.assemblyenjoyer1.insanecalculator.token.JwtTokenUtil;
import com.assemblyenjoyer1.insanecalculator.user.User;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/calculator")
@RequiredArgsConstructor
@CrossOrigin
@PreAuthorize("hasAnyRoleRole('ADMIN', 'MANAGER')")
public class CalculatorController {

    final private CalculatorService calculatorService;

    final private JwtTokenUtil jwtTokenUtil;

    final private JwtService jwtService;

    final private UserRepository userRepository;

    @PostMapping("/price/distance")
    @PreAuthorize("hasAnyAuthority('admin:create', 'management:create')")
    @Hidden
    public ResponseEntity<Double> calculatePriceByDistance(@RequestHeader("Authorization") String token, @RequestParam int value) {
        token = token.split(" ")[1].trim();
        String email = jwtTokenUtil.extractEmailFromToken(token);
        User user;
        try{
            user = userRepository.findByEmail(email).get();
        }catch(NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
        int distance = value;

        return calculatorService.calculatePriceByDistance(distance, user);
    }

    @PostMapping("/price/time")
    @PreAuthorize("hasAnyAuthority('admin:create', 'management:create')")
    @Hidden
    public ResponseEntity<Double> calculatePriceByTime(@RequestHeader("Authorization") String token, @RequestParam int value ) {
        token = token.split(" ")[1].trim();
        String email = jwtTokenUtil.extractEmailFromToken(token);
        User user;
        try{
            user = userRepository.findByEmail(email).get();
        }catch(NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
        int distance = value;

        return calculatorService.calculatePriceByDistance(distance, user);
    }
}