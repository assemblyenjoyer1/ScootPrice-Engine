package com.assemblyenjoyer1.insanecalculator.repository;

import java.util.Optional;

import com.assemblyenjoyer1.insanecalculator.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}
