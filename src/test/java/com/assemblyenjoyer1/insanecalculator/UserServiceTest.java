package com.assemblyenjoyer1.insanecalculator;

import com.assemblyenjoyer1.insanecalculator.models.Role;
import com.assemblyenjoyer1.insanecalculator.models.User;
import com.assemblyenjoyer1.insanecalculator.repository.IUserRepository;
import com.assemblyenjoyer1.insanecalculator.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    private UserService userService;

    @Mock
    IUserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    void validateUserCredentials_ValidCredentials_ShouldReturnUser(){
        // Arrange
        String email = "test@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<User> response = userService.validateUserCredentials(email, password);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void validateUserCredentials_InvalidEmail_ShouldReturnUnauthorized() {
        // Arrange
        String email = "test@example.com";
        String password = "password";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<User> response = userService.validateUserCredentials(email, password);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void validateUserCredentials_InvalidPassword_ShouldReturnUnauthorized() {
        // Arrange
        String email = "test@example.com";
        String password = "incorrect_password";
        User user = new User();
        user.setEmail(email);
        user.setPassword("correct_password");
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<User> response = userService.validateUserCredentials(email, password);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void getRoleByUserID_ValidUserID_ShouldReturnRole() {
        // Arrange
        UUID userId = UUID.randomUUID();
        Role expectedRole = Role.USER;
        User user = new User();
        user.setRole(expectedRole);
        when(userRepository.findByUuid(userId)).thenReturn(Optional.of(user));

        // Act
        Role actualRole = userService.getRoleByUserID(userId);
        User resultingUser = userService.getUserByUserID(userId);

        // Assert
        assertEquals(expectedRole, actualRole);
        assertEquals(resultingUser, user);
    }

}
