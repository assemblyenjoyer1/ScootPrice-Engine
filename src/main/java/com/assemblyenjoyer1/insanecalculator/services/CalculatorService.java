package com.assemblyenjoyer1.insanecalculator.services;

import com.assemblyenjoyer1.insanecalculator.models.Role;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    static double pricePerKilometre = 0.10;

    public double calculatePrice(int distance, Role role){
        if (role.level == 100) return 0.00;
        var finalPrice = 0.00;
        var discount = (role.level == 10) ? 10 : 0;

        finalPrice = (distance * pricePerKilometre) * (100-(discount/100));

        return finalPrice;
    }
}
