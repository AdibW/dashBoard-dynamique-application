package com.sample.dashboard.service;

import com.sample.dashboard.service.dto.DashboardDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.sample.dashboard.domain.Dashboard}.
 */
public interface DashboardService {
    /**
     * Save a dashboard.
     *
     * @param dashboardDTO the entity to save.
     * @return the persisted entity.
     */
    DashboardDTO save(DashboardDTO dashboardDTO);

    /**
     * Updates a dashboard.
     *
     * @param dashboardDTO the entity to update.
     * @return the persisted entity.
     */
    DashboardDTO update(DashboardDTO dashboardDTO);

    /**
     * Partially updates a dashboard.
     *
     * @param dashboardDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DashboardDTO> partialUpdate(DashboardDTO dashboardDTO);

    /**
     * Get all the dashboards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DashboardDTO> findAll(Pageable pageable);

    /**
     * Get the "id" dashboard.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DashboardDTO> findOne(String id);

    /**
     * Delete the "id" dashboard.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
