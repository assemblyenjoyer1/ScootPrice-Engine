package com.assemblyenjoyer1.insanecalculator.repository;

import com.assemblyenjoyer1.insanecalculator.models.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RideRepository extends JpaRepository<Ride, Integer> {

    Optional<List<Ride>> findAllById(int userID);
}