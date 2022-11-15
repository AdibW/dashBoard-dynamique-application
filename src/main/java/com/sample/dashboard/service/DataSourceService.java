package com.sample.dashboard.service;

import com.sample.dashboard.service.dto.DataSourceDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sample.dashboard.domain.DataSource}.
 */
public interface DataSourceService {
    /**
     * Save a dataSource.
     *
     * @param dataSourceDTO the entity to save.
     * @return the persisted entity.
     */
    DataSourceDTO save(DataSourceDTO dataSourceDTO);

    /**
     * Updates a dataSource.
     *
     * @param dataSourceDTO the entity to update.
     * @return the persisted entity.
     */
    DataSourceDTO update(DataSourceDTO dataSourceDTO);

    /**
     * Partially updates a dataSource.
     *
     * @param dataSourceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DataSourceDTO> partialUpdate(DataSourceDTO dataSourceDTO);

    /**
     * Get all the dataSources.
     *
     * @return the list of entities.
     */
    List<DataSourceDTO> findAll();

    /**
     * Get the "id" dataSource.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DataSourceDTO> findOne(String id);

    /**
     * Delete the "id" dataSource.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
