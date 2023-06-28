package com.assemblyenjoyer1.insanecalculator.repository;

import com.assemblyenjoyer1.insanecalculator.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IUserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUuid(UUID uuid);
    Optional<User> findByEmail(String email);
}
