package com.assemblyenjoyer1.insanecalculator.controllers;

import com.assemblyenjoyer1.insanecalculator.services.CalculatorService;
import com.assemblyenjoyer1.insanecalculator.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
@RequiredArgsConstructor
public class CalculatorController {

    final private CalculatorService calculatorService;
    final private UserService userService;

    @PostMapping("/price/distance")
    public double calculatePriceByDistance(@RequestParam int distance, @RequestParam int userID) {
        return calculatorService.calculatePriceByDistance(distance, userService.getUserByUserID(userID));
    }

    @PostMapping("/price/time")
    public double calculatePriceByTime(@RequestParam int time, @RequestParam int userID) {
        return calculatorService.calculatePriceByTime(time, userService.getUserByUserID(userID));
    }
}