package com.sample.dashboard.web.rest;

import com.sample.dashboard.repository.WidgetRepository;
import com.sample.dashboard.service.WidgetService;
import com.sample.dashboard.service.dto.WidgetDTO;
import com.sample.dashboard.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.sample.dashboard.domain.Widget}.
 */
@RestController
@RequestMapping("/api")
public class WidgetResource {

    private final Logger log = LoggerFactory.getLogger(WidgetResource.class);

    private static final String ENTITY_NAME = "widget";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WidgetService widgetService;

    private final WidgetRepository widgetRepository;

    public WidgetResource(WidgetService widgetService, WidgetRepository widgetRepository) {
        this.widgetService = widgetService;
        this.widgetRepository = widgetRepository;
    }

    /**
     * {@code POST  /widgets} : Create a new widget.
     *
     * @param widgetDTO the widgetDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new widgetDTO, or with status {@code 400 (Bad Request)} if the widget has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/widgets")
    public ResponseEntity<WidgetDTO> createWidget(@RequestBody WidgetDTO widgetDTO) throws URISyntaxException {
        log.debug("REST request to save Widget : {}", widgetDTO);
        if (widgetDTO.getId() != null) {
            throw new BadRequestAlertException("A new widget cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WidgetDTO result = widgetService.save(widgetDTO);
        return ResponseEntity
            .created(new URI("/api/widgets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /widgets/:id} : Updates an existing widget.
     *
     * @param id the id of the widgetDTO to save.
     * @param widgetDTO the widgetDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated widgetDTO,
     * or with status {@code 400 (Bad Request)} if the widgetDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the widgetDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/widgets/{id}")
    public ResponseEntity<WidgetDTO> updateWidget(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody WidgetDTO widgetDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Widget : {}, {}", id, widgetDTO);
        if (widgetDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, widgetDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!widgetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        WidgetDTO result = widgetService.update(widgetDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, widgetDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /widgets/:id} : Partial updates given fields of an existing widget, field will ignore if it is null
     *
     * @param id the id of the widgetDTO to save.
     * @param widgetDTO the widgetDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated widgetDTO,
     * or with status {@code 400 (Bad Request)} if the widgetDTO is not valid,
     * or with status {@code 404 (Not Found)} if the widgetDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the widgetDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/widgets/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WidgetDTO> partialUpdateWidget(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody WidgetDTO widgetDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Widget partially : {}, {}", id, widgetDTO);
        if (widgetDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, widgetDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!widgetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WidgetDTO> result = widgetService.partialUpdate(widgetDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, widgetDTO.getId())
        );
    }

    /**
     * {@code GET  /widgets} : get all the widgets.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of widgets in body.
     */
    @GetMapping("/widgets")
    public ResponseEntity<List<WidgetDTO>> getAllWidgets(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Widgets");
        Page<WidgetDTO> page = widgetService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /widgets/:id} : get the "id" widget.
     *
     * @param id the id of the widgetDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the widgetDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/widgets/{id}")
    public ResponseEntity<WidgetDTO> getWidget(@PathVariable String id) {
        log.debug("REST request to get Widget : {}", id);
        Optional<WidgetDTO> widgetDTO = widgetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(widgetDTO);
    }

    /**
     * {@code DELETE  /widgets/:id} : delete the "id" widget.
     *
     * @param id the id of the widgetDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/widgets/{id}")
    public ResponseEntity<Void> deleteWidget(@PathVariable String id) {
        log.debug("REST request to delete Widget : {}", id);
        widgetService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
