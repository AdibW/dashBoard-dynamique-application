package com.sample.dashboard.service;

import com.sample.dashboard.service.dto.WidgetDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.sample.dashboard.domain.Widget}.
 */
public interface WidgetService {
    /**
     * Save a widget.
     *
     * @param widgetDTO the entity to save.
     * @return the persisted entity.
     */
    WidgetDTO save(WidgetDTO widgetDTO);

    /**
     * Updates a widget.
     *
     * @param widgetDTO the entity to update.
     * @return the persisted entity.
     */
    WidgetDTO update(WidgetDTO widgetDTO);

    /**
     * Partially updates a widget.
     *
     * @param widgetDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WidgetDTO> partialUpdate(WidgetDTO widgetDTO);

    /**
     * Get all the widgets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WidgetDTO> findAll(Pageable pageable);

    /**
     * Get the "id" widget.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WidgetDTO> findOne(String id);

    /**
     * Delete the "id" widget.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
