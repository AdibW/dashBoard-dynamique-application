package com.sample.dashboard.web.rest;

import com.sample.dashboard.repository.DashboardItemRepository;
import com.sample.dashboard.service.DashboardItemService;
import com.sample.dashboard.service.dto.DashboardItemDTO;
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
 * REST controller for managing {@link com.sample.dashboard.domain.DashboardItem}.
 */
@RestController
@RequestMapping("/api")
public class DashboardItemResource {

    private final Logger log = LoggerFactory.getLogger(DashboardItemResource.class);

    private static final String ENTITY_NAME = "dashboardItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DashboardItemService dashboardItemService;

    private final DashboardItemRepository dashboardItemRepository;

    public DashboardItemResource(DashboardItemService dashboardItemService, DashboardItemRepository dashboardItemRepository) {
        this.dashboardItemService = dashboardItemService;
        this.dashboardItemRepository = dashboardItemRepository;
    }

    /**
     * {@code POST  /dashboard-items} : Create a new dashboardItem.
     *
     * @param dashboardItemDTO the dashboardItemDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dashboardItemDTO, or with status {@code 400 (Bad Request)} if the dashboardItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dashboard-items")
    public ResponseEntity<DashboardItemDTO> createDashboardItem(@RequestBody DashboardItemDTO dashboardItemDTO) throws URISyntaxException {
        log.debug("REST request to save DashboardItem : {}", dashboardItemDTO);
        if (dashboardItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new dashboardItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DashboardItemDTO result = dashboardItemService.save(dashboardItemDTO);
        return ResponseEntity
            .created(new URI("/api/dashboard-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /dashboard-items/:id} : Updates an existing dashboardItem.
     *
     * @param id the id of the dashboardItemDTO to save.
     * @param dashboardItemDTO the dashboardItemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dashboardItemDTO,
     * or with status {@code 400 (Bad Request)} if the dashboardItemDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dashboardItemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dashboard-items/{id}")
    public ResponseEntity<DashboardItemDTO> updateDashboardItem(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody DashboardItemDTO dashboardItemDTO
    ) throws URISyntaxException {
        log.debug("REST request to update DashboardItem : {}, {}", id, dashboardItemDTO);
        if (dashboardItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dashboardItemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dashboardItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DashboardItemDTO result = dashboardItemService.update(dashboardItemDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dashboardItemDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /dashboard-items/:id} : Partial updates given fields of an existing dashboardItem, field will ignore if it is null
     *
     * @param id the id of the dashboardItemDTO to save.
     * @param dashboardItemDTO the dashboardItemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dashboardItemDTO,
     * or with status {@code 400 (Bad Request)} if the dashboardItemDTO is not valid,
     * or with status {@code 404 (Not Found)} if the dashboardItemDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the dashboardItemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/dashboard-items/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DashboardItemDTO> partialUpdateDashboardItem(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody DashboardItemDTO dashboardItemDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update DashboardItem partially : {}, {}", id, dashboardItemDTO);
        if (dashboardItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dashboardItemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dashboardItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DashboardItemDTO> result = dashboardItemService.partialUpdate(dashboardItemDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dashboardItemDTO.getId())
        );
    }

    /**
     * {@code GET  /dashboard-items} : get all the dashboardItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dashboardItems in body.
     */
    @GetMapping("/dashboard-items")
    public List<DashboardItemDTO> getAllDashboardItems() {
        log.debug("REST request to get all DashboardItems");
        return dashboardItemService.findAll();
    }

    /**
     * {@code GET  /dashboard-items/:id} : get the "id" dashboardItem.
     *
     * @param id the id of the dashboardItemDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dashboardItemDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dashboard-items/{id}")
    public ResponseEntity<DashboardItemDTO> getDashboardItem(@PathVariable String id) {
        log.debug("REST request to get DashboardItem : {}", id);
        Optional<DashboardItemDTO> dashboardItemDTO = dashboardItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dashboardItemDTO);
    }

    /**
     * {@code DELETE  /dashboard-items/:id} : delete the "id" dashboardItem.
     *
     * @param id the id of the dashboardItemDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dashboard-items/{id}")
    public ResponseEntity<Void> deleteDashboardItem(@PathVariable String id) {
        log.debug("REST request to delete DashboardItem : {}", id);
        dashboardItemService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
