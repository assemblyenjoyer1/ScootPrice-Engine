package com.assemblyenjoyer1.insanecalculator.services;

import com.assemblyenjoyer1.insanecalculator.models.Role;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    static double pricePerKilometre = 0.10;
    static double pricePerMinute = 0.50;

    public double calculatePriceByDistance(int distance, Role role){
        if (role.equals(Role.ADMIN)) return 0.00;
        double finalPrice = 0.00;
        double discount = (role.equals(Role.PREMIUM)) ? 10 : 0;

        finalPrice = (distance * pricePerKilometre) * (1-(discount/100));

        return finalPrice;
    }

    public double calculatePriceByTime(int time, Role role){
        if (role.equals(Role.ADMIN)) return 0.00;
        double finalPrice = 0.00;
        double discount = (role.equals(Role.PREMIUM)) ? 10 : 0;

        finalPrice = (time * pricePerMinute) * (1-(discount/100));

        return finalPrice;
    }
}
