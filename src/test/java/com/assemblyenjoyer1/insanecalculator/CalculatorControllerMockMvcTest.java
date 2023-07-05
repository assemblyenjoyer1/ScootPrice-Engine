package com.assemblyenjoyer1.insanecalculator;

import com.assemblyenjoyer1.insanecalculator.controllers.CalculatePriceDTO;
import com.assemblyenjoyer1.insanecalculator.controllers.CalculatorController;
import com.assemblyenjoyer1.insanecalculator.repository.UserRepository;
import com.assemblyenjoyer1.insanecalculator.user.User;
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

import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(MockitoExtension.class)
public class CalculatorControllerMockMvcTest {
/*
    private MockMvc mockMvc;

    @Mock
    private CalculatorService calculatorService;

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(new CalculatorController(calculatorService, userRepository)).build();
    }

    @Test
    void calculatePriceByDistance_ShouldReturnPrice() throws Exception {
        double expectedPrice = 10.0;
        CalculatePriceDTO calculatePriceDTO = new CalculatePriceDTO();
        calculatePriceDTO.setUserID("67b68b3c-efaf-4c3d-998e-6f0710b6823a");
        calculatePriceDTO.setValue(10);

        User user = new User();
        user.setUUID(UUID.fromString(calculatePriceDTO.getUserID()));

        when(userRepository.findByUserID(UUID.fromString(calculatePriceDTO.getUserID()))).thenReturn(Optional.of(user));
        when(calculatorService.calculatePriceByDistance(anyInt(), eq(user)))
                .thenReturn(ResponseEntity.ok(expectedPrice));

        mockMvc.perform(post("/api/calculator/price/distance")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(calculatePriceDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").value(expectedPrice));
    }

    @Test
    void calculatePriceByTime_ShouldReturnPrice() throws Exception {
        double expectedPrice = 10.0;
        CalculatePriceDTO calculatePriceDTO = new CalculatePriceDTO();
        calculatePriceDTO.setUserID("67b68b3c-efaf-4c3d-998e-6f0710b6823a");
        calculatePriceDTO.setValue(10);

        User user = new User();
        user.setUUID(UUID.fromString(calculatePriceDTO.getUserID()));

        when(userRepository.findByUserID(UUID.fromString(calculatePriceDTO.getUserID()))).thenReturn(Optional.of(user));
        when(calculatorService.calculatePriceByTime(anyInt(), eq(user)))
                .thenReturn(ResponseEntity.ok(expectedPrice));

        mockMvc.perform(post("/api/calculator/price/time")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(calculatePriceDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").value(expectedPrice));
    }

    @Test
    void calculatePriceByDistance_WithInvalidUser_ShouldReturnNotFound() throws Exception {
        CalculatePriceDTO calculatePriceDTO = new CalculatePriceDTO();
        calculatePriceDTO.setUserID("67b68b3c-efaf-4c3d-998e-6f0710b68231");
        calculatePriceDTO.setValue(10);

        when(userService.getUserByUserID(UUID.fromString("67b68b3c-efaf-4c3d-998e-6f0710b68231"))).thenReturn(null);

        // Perform the test
        mockMvc.perform(post("/api/calculator/price/distance")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(calculatePriceDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    void calculatePriceByTime_WithInvalidUser_ShouldReturnNotFound() throws Exception {
        CalculatePriceDTO calculatePriceDTO = new CalculatePriceDTO(10, "67b68b3c-efaf-4c3d-998e-6f0710b68231");

        when(userService.getUserByUserID(UUID.fromString("67b68b3c-efaf-4c3d-998e-6f0710b68231"))).thenReturn(null);

        // Perform the test
        mockMvc.perform(post("/api/calculator/price/time")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(calculatePriceDTO)))
                .andExpect(status().isNotFound());
    }

    private static String asJsonString(Object object) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


 */
}
