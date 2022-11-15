package com.sample.dashboard.service;

import com.sample.dashboard.service.dto.ApiDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sample.dashboard.domain.Api}.
 */
public interface ApiService {
    /**
     * Save a api.
     *
     * @param apiDTO the entity to save.
     * @return the persisted entity.
     */
    ApiDTO save(ApiDTO apiDTO);

    /**
     * Updates a api.
     *
     * @param apiDTO the entity to update.
     * @return the persisted entity.
     */
    ApiDTO update(ApiDTO apiDTO);

    /**
     * Partially updates a api.
     *
     * @param apiDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ApiDTO> partialUpdate(ApiDTO apiDTO);

    /**
     * Get all the apis.
     *
     * @return the list of entities.
     */
    List<ApiDTO> findAll();

    /**
     * Get the "id" api.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ApiDTO> findOne(String id);

    /**
     * Delete the "id" api.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
