package com.sample.dashboard.service;

import com.sample.dashboard.service.dto.ApiBannetteDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sample.dashboard.domain.ApiBannette}.
 */
public interface ApiBannetteService {
    /**
     * Save a apiBannette.
     *
     * @param apiBannetteDTO the entity to save.
     * @return the persisted entity.
     */
    ApiBannetteDTO save(ApiBannetteDTO apiBannetteDTO);

    /**
     * Updates a apiBannette.
     *
     * @param apiBannetteDTO the entity to update.
     * @return the persisted entity.
     */
    ApiBannetteDTO update(ApiBannetteDTO apiBannetteDTO);

    /**
     * Partially updates a apiBannette.
     *
     * @param apiBannetteDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ApiBannetteDTO> partialUpdate(ApiBannetteDTO apiBannetteDTO);

    /**
     * Get all the apiBannettes.
     *
     * @return the list of entities.
     */
    List<ApiBannetteDTO> findAll();

    /**
     * Get the "id" apiBannette.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ApiBannetteDTO> findOne(String id);

    /**
     * Delete the "id" apiBannette.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
