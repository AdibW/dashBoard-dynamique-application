package com.sample.dashboard.service;

import com.sample.dashboard.service.dto.DashboardItemDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sample.dashboard.domain.DashboardItem}.
 */
public interface DashboardItemService {
    /**
     * Save a dashboardItem.
     *
     * @param dashboardItemDTO the entity to save.
     * @return the persisted entity.
     */
    DashboardItemDTO save(DashboardItemDTO dashboardItemDTO);

    /**
     * Updates a dashboardItem.
     *
     * @param dashboardItemDTO the entity to update.
     * @return the persisted entity.
     */
    DashboardItemDTO update(DashboardItemDTO dashboardItemDTO);

    /**
     * Partially updates a dashboardItem.
     *
     * @param dashboardItemDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DashboardItemDTO> partialUpdate(DashboardItemDTO dashboardItemDTO);

    /**
     * Get all the dashboardItems.
     *
     * @return the list of entities.
     */
    List<DashboardItemDTO> findAll();

    /**
     * Get the "id" dashboardItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DashboardItemDTO> findOne(String id);

    /**
     * Delete the "id" dashboardItem.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
