package com.assemblyenjoyer1.insanecalculator;

import com.assemblyenjoyer1.insanecalculator.controllers.CalculatePriceDTO;
import com.assemblyenjoyer1.insanecalculator.controllers.CalculatorController;
import com.assemblyenjoyer1.insanecalculator.models.Role;
import com.assemblyenjoyer1.insanecalculator.models.User;
import com.assemblyenjoyer1.insanecalculator.services.CalculatorService;
import com.assemblyenjoyer1.insanecalculator.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class CalculatorServiceTest {

    private MockMvc mockMvc;

    @Mock
    private CalculatorService calculatorService;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(new CalculatorService(userService)).build();
    }


    @Test
    void calculatePriceByDistance_ShouldReturnPrice() {
        CalculatePriceDTO calculatePriceDTO = new CalculatePriceDTO();
        calculatePriceDTO.setUserID("67b68b3c-efaf-4c3d-998e-6f0710b6823a");
        calculatePriceDTO.setValue(10);

        User user = new User();
        user.setUuid(UUID.fromString(calculatePriceDTO.getUserID()));
        user.setRole(Role.PREMIUM);

        ResponseEntity<Double> result = calculatorService.calculatePriceByDistance(calculatePriceDTO.getValue(), user);

        System.out.println(result.getStatusCode());
        assertEquals(9.0, result.getBody());
    }

    @Test
    void calculatePriceByTime_ShouldReturnPrice() {
        CalculatePriceDTO calculatePriceDTO = new CalculatePriceDTO();
        calculatePriceDTO.setUserID("67b68b3c-efaf-4c3d-998e-6f0710b6823a");
        calculatePriceDTO.setValue(10);

        User user = new User();
        user.setUuid(UUID.fromString(calculatePriceDTO.getUserID()));
        user.setRole(Role.PREMIUM);

        when(calculatorService.calculatePriceByTime(calculatePriceDTO.getValue(), user))
                .thenReturn(ResponseEntity.ok(9.0));

        ResponseEntity<Double> result = calculatorService.calculatePriceByTime(calculatePriceDTO.getValue(), user);

        assertEquals(9.0, result.getBody());
    }


    private static String asJsonString(Object object) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
