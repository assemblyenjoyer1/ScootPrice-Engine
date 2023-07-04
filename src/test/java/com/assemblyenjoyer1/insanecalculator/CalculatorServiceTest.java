package com.assemblyenjoyer1.insanecalculator;

import com.assemblyenjoyer1.insanecalculator.controllers.CalculatePriceDTO;
import com.assemblyenjoyer1.insanecalculator.models.Role;
import com.assemblyenjoyer1.insanecalculator.models.User;
import com.assemblyenjoyer1.insanecalculator.services.CalculatorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class CalculatorServiceTest {

    private CalculatorService calculatorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        calculatorService = new CalculatorService();
    }


    @Test
    void calculatePriceByDistance_ShouldReturnPrice() {
        CalculatePriceDTO calculatePriceDTO = new CalculatePriceDTO();
        calculatePriceDTO.setUserID("67b68b3c-efaf-4c3d-998e-6f0710b6823a");
        calculatePriceDTO.setValue(10);

        User user = new User("test", "test@yahoo.com", "111");
        user.setUuid(UUID.fromString(calculatePriceDTO.getUserID()));
        user.setRole(Role.PREMIUM);

        ResponseEntity<Double> result = calculatorService.calculatePriceByDistance(calculatePriceDTO.getValue(), user);

        assertEquals(8.1, result.getBody());
    }

    @Test
    void calculatePriceByTime_ShouldReturnPrice() {
        CalculatePriceDTO calculatePriceDTO = new CalculatePriceDTO();
        calculatePriceDTO.setUserID("67b68b3c-efaf-4c3d-998e-6f0710b6823a");
        calculatePriceDTO.setValue(10);

        User user = new User("test", "test@yahoo.com", "111");
        user.setUuid(UUID.fromString(calculatePriceDTO.getUserID()));
        user.setRole(Role.PREMIUM);

        ResponseEntity<Double> result = calculatorService.calculatePriceByTime(calculatePriceDTO.getValue(), user);

        assertEquals(4.5, result.getBody());
    }

}
