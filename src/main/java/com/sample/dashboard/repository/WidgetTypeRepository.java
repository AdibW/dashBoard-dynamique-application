package com.sample.dashboard.repository;

import com.sample.dashboard.domain.WidgetType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the WidgetType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WidgetTypeRepository extends MongoRepository<WidgetType, String> {}
