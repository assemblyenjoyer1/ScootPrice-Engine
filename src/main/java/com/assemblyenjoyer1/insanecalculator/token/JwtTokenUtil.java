package com.assemblyenjoyer1.insanecalculator.token;

import com.assemblyenjoyer1.insanecalculator.config.JwtService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtTokenUtil {

    private final JwtService jwtService;

    public String extractEmailFromToken(String token) {
        return jwtService.extractClaim(token, Claims::getSubject);
    }
}
