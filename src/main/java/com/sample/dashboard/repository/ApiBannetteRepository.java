package com.sample.dashboard.repository;

import com.sample.dashboard.domain.ApiBannette;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ApiBannette entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApiBannetteRepository extends MongoRepository<ApiBannette, String> {}
