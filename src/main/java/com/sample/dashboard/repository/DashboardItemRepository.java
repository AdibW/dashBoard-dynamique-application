package com.sample.dashboard.repository;

import com.sample.dashboard.domain.DashboardItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DashboardItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DashboardItemRepository extends MongoRepository<DashboardItem, String> {}
