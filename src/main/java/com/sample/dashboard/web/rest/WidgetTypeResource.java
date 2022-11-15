package com.sample.dashboard.web.rest;

import com.sample.dashboard.repository.WidgetTypeRepository;
import com.sample.dashboard.service.WidgetTypeService;
import com.sample.dashboard.service.dto.WidgetTypeDTO;
import com.sample.dashboard.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.sample.dashboard.domain.WidgetType}.
 */
@RestController
@RequestMapping("/api")
public class WidgetTypeResource {

    private final Logger log = LoggerFactory.getLogger(WidgetTypeResource.class);

    private static final String ENTITY_NAME = "widgetType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WidgetTypeService widgetTypeService;

    private final WidgetTypeRepository widgetTypeRepository;

    public WidgetTypeResource(WidgetTypeService widgetTypeService, WidgetTypeRepository widgetTypeRepository) {
        this.widgetTypeService = widgetTypeService;
        this.widgetTypeRepository = widgetTypeRepository;
    }

    /**
     * {@code POST  /widget-types} : Create a new widgetType.
     *
     * @param widgetTypeDTO the widgetTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new widgetTypeDTO, or with status {@code 400 (Bad Request)} if the widgetType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/widget-types")
    public ResponseEntity<WidgetTypeDTO> createWidgetType(@RequestBody WidgetTypeDTO widgetTypeDTO) throws URISyntaxException {
        log.debug("REST request to save WidgetType : {}", widgetTypeDTO);
        if (widgetTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new widgetType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WidgetTypeDTO result = widgetTypeService.save(widgetTypeDTO);
        return ResponseEntity
            .created(new URI("/api/widget-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /widget-types/:id} : Updates an existing widgetType.
     *
     * @param id the id of the widgetTypeDTO to save.
     * @param widgetTypeDTO the widgetTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated widgetTypeDTO,
     * or with status {@code 400 (Bad Request)} if the widgetTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the widgetTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/widget-types/{id}")
    public ResponseEntity<WidgetTypeDTO> updateWidgetType(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody WidgetTypeDTO widgetTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to update WidgetType : {}, {}", id, widgetTypeDTO);
        if (widgetTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, widgetTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!widgetTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        WidgetTypeDTO result = widgetTypeService.update(widgetTypeDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, widgetTypeDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /widget-types/:id} : Partial updates given fields of an existing widgetType, field will ignore if it is null
     *
     * @param id the id of the widgetTypeDTO to save.
     * @param widgetTypeDTO the widgetTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated widgetTypeDTO,
     * or with status {@code 400 (Bad Request)} if the widgetTypeDTO is not valid,
     * or with status {@code 404 (Not Found)} if the widgetTypeDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the widgetTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/widget-types/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WidgetTypeDTO> partialUpdateWidgetType(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody WidgetTypeDTO widgetTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update WidgetType partially : {}, {}", id, widgetTypeDTO);
        if (widgetTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, widgetTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!widgetTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WidgetTypeDTO> result = widgetTypeService.partialUpdate(widgetTypeDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, widgetTypeDTO.getId())
        );
    }

    /**
     * {@code GET  /widget-types} : get all the widgetTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of widgetTypes in body.
     */
    @GetMapping("/widget-types")
    public List<WidgetTypeDTO> getAllWidgetTypes() {
        log.debug("REST request to get all WidgetTypes");
        return widgetTypeService.findAll();
    }

    /**
     * {@code GET  /widget-types/:id} : get the "id" widgetType.
     *
     * @param id the id of the widgetTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the widgetTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/widget-types/{id}")
    public ResponseEntity<WidgetTypeDTO> getWidgetType(@PathVariable String id) {
        log.debug("REST request to get WidgetType : {}", id);
        Optional<WidgetTypeDTO> widgetTypeDTO = widgetTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(widgetTypeDTO);
    }

    /**
     * {@code DELETE  /widget-types/:id} : delete the "id" widgetType.
     *
     * @param id the id of the widgetTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/widget-types/{id}")
    public ResponseEntity<Void> deleteWidgetType(@PathVariable String id) {
        log.debug("REST request to delete WidgetType : {}", id);
        widgetTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
