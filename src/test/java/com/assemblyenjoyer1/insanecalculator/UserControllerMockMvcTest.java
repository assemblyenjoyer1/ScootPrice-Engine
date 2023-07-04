package com.assemblyenjoyer1.insanecalculator;

import com.assemblyenjoyer1.insanecalculator.controllers.UserController;
import com.assemblyenjoyer1.insanecalculator.models.*;
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

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerMockMvcTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(new UserController(userService)).build();
    }

    @Test
    void validateCredentials_ShouldReturnUser() throws Exception {
        UserDTO userDTO = new UserDTO("test@example.com", "password");
        userDTO.setEmail("test1@example.com");
        userDTO.setPassword("password1");

        User user = new User("Johannes", "test@example.com", "password");
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());

        when(userService.validateUserCredentials(anyString(), anyString()))
                .thenReturn(ResponseEntity.ok(user));

        mockMvc.perform(post("/api/login/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

    }

    @Test
    void registerUser_ShouldReturnUser() throws Exception {
        RegisterUserDTO userDTO = new RegisterUserDTO("Manuel", "test@example.com", "password");

        User user = new User("Johannes", "test@example.com", "password");

        when(userService.registerUser(anyString(), anyString(), anyString()))
                .thenReturn(ResponseEntity.ok(user));

        mockMvc.perform(post("/api/login/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

    }

    @Test
    void testAllUserFunctions(){
        User user = new User();
        user.setUuid(UUID.fromString("67b68b3c-efaf-4c3d-998e-6f0710b6823a"));
        user.setName("Daniel");
        user.setRole(Role.USER);
        user.setRides(null);
        user.setPassword("test");
        user.validatePassword("test");
        Ride ride = new Ride();
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
