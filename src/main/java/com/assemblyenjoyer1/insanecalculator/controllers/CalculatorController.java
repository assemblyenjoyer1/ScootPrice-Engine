package com.assemblyenjoyer1.insanecalculator.controllers;

import com.assemblyenjoyer1.insanecalculator.user.User;
import com.assemblyenjoyer1.insanecalculator.repository.UserRepository;
import com.assemblyenjoyer1.insanecalculator.services.CalculatorService;
import com.assemblyenjoyer1.insanecalculator.services.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/calculator")
@RequiredArgsConstructor
@CrossOrigin
@PreAuthorize("hasRole('ADMIN')")
public class CalculatorController {

    final private CalculatorService calculatorService;
    final private UserRepository userRepository;

    @PostMapping("/price/distance")
    @PreAuthorize("hasAuthority('admin:create')")
    @Hidden
    public ResponseEntity<Double> calculatePriceByDistance(@RequestBody CalculatePriceDTO calculatePriceDTO) {
        String userID = calculatePriceDTO.getUserID();
        int distance = calculatePriceDTO.getValue();
        User user = userRepository.findByUserID(UUID.fromString(userID)).get();
        if (user == null){
            return ResponseEntity.notFound().build();
        }
        return calculatorService.calculatePriceByDistance(distance, user);
    }

    @PostMapping("/price/time")
    @PreAuthorize("hasAuthority('admin:create')")
    @Hidden
    public ResponseEntity<Double> calculatePriceByTime(@RequestBody CalculatePriceDTO calculatePriceDTO) {
        String userID = calculatePriceDTO.getUserID();
        int time = calculatePriceDTO.getValue();
        User user;
        try{
            user = userRepository.findByUserID(UUID.fromString(userID)).get();
        }catch(NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }

        return calculatorService.calculatePriceByTime(time, user);
    }
}