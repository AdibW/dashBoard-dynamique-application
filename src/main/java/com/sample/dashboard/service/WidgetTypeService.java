package com.sample.dashboard.service;

import com.sample.dashboard.service.dto.WidgetTypeDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sample.dashboard.domain.WidgetType}.
 */
public interface WidgetTypeService {
    /**
     * Save a widgetType.
     *
     * @param widgetTypeDTO the entity to save.
     * @return the persisted entity.
     */
    WidgetTypeDTO save(WidgetTypeDTO widgetTypeDTO);

    /**
     * Updates a widgetType.
     *
     * @param widgetTypeDTO the entity to update.
     * @return the persisted entity.
     */
    WidgetTypeDTO update(WidgetTypeDTO widgetTypeDTO);

    /**
     * Partially updates a widgetType.
     *
     * @param widgetTypeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WidgetTypeDTO> partialUpdate(WidgetTypeDTO widgetTypeDTO);

    /**
     * Get all the widgetTypes.
     *
     * @return the list of entities.
     */
    List<WidgetTypeDTO> findAll();

    /**
     * Get the "id" widgetType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WidgetTypeDTO> findOne(String id);

    /**
     * Delete the "id" widgetType.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
