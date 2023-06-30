package com.assemblyenjoyer1.insanecalculator.services;

import com.assemblyenjoyer1.insanecalculator.models.Ride;
import com.assemblyenjoyer1.insanecalculator.models.Role;
import com.assemblyenjoyer1.insanecalculator.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    final UserService userService;

    static double pricePerKilometre = 0.9;
    static double pricePerMinute = 0.5;

    public CalculatorService(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<Double> calculatePriceByDistance(int distance, User user){
        return calculatePrice(distance, user, pricePerKilometre);
    }

    private ResponseEntity<Double> calculatePrice(int distance, User user, double pricePerUnit) {
        Role role = user.getRole();
        if (role.equals(Role.ADMIN)) return ResponseEntity.ok().body(0.00);
        double finalPrice;
        double discount = (role.equals(Role.PREMIUM)) ? 10 : 0;
        finalPrice = (distance * pricePerUnit) * (1 - (discount / 100));
        addRide(user, distance, pricePerUnit);

        return ResponseEntity.ok().body(finalPrice);
    }

    public ResponseEntity<Double> calculatePriceByTime(int time, User user){
        return calculatePrice(time, user, pricePerMinute);
    }

    private void addRide(User user, double distance, double price){
        Ride ride = new Ride(distance,price);
        user.addRide(ride);
    }
}
