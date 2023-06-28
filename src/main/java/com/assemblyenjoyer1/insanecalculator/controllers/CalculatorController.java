package com.assemblyenjoyer1.insanecalculator.controllers;

import com.assemblyenjoyer1.insanecalculator.models.User;
import com.assemblyenjoyer1.insanecalculator.services.CalculatorService;
import com.assemblyenjoyer1.insanecalculator.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/calculator")
@RequiredArgsConstructor
@CrossOrigin
public class CalculatorController {

    final private CalculatorService calculatorService;
    final private UserService userService;

    @PostMapping("/price/distance")
    public ResponseEntity<Double> calculatePriceByDistance(@RequestBody CalculatePriceDTO calculatePriceDTO) {
        String userID = calculatePriceDTO.getUserID();
        int distance = calculatePriceDTO.getValue();
        User user = userService.getUserByUserID(UUID.fromString(userID));
        if (user == null){
            return ResponseEntity.notFound().build();
        }
        return calculatorService.calculatePriceByDistance(distance, user);
    }

    @PostMapping("/price/time")
    public ResponseEntity<Double> calculatePriceByTime(@RequestBody CalculatePriceDTO calculatePriceDTO) {
        String userID = calculatePriceDTO.getUserID();
        int time = calculatePriceDTO.getValue();
        User user = userService.getUserByUserID(UUID.fromString(userID));
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return calculatorService.calculatePriceByTime(time, user);
    }
}