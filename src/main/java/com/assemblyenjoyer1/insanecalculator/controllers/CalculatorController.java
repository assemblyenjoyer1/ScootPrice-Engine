package com.assemblyenjoyer1.insanecalculator.controllers;

import com.assemblyenjoyer1.insanecalculator.services.CalculatorService;
import com.assemblyenjoyer1.insanecalculator.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {

    private CalculatorService calculatorService;
    private UserService userService;

    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/price")
    public double calculatePriceByDistance(@RequestParam int distance, @RequestParam int userID) {
        return calculatorService.calculatePriceByDistance(distance, userService.getRoleByUserID(userID));
    }

    @PostMapping("/price/")
    public double calculatePriceByTime(@RequestParam int time, @RequestParam int userID) {
        return calculatorService.calculatePriceByTime(time, userService.getRoleByUserID(userID));
    }
}