package com.sample.dashboard.web.rest;

import com.sample.dashboard.repository.ApiBannetteRepository;
import com.sample.dashboard.service.ApiBannetteService;
import com.sample.dashboard.service.dto.ApiBannetteDTO;
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
 * REST controller for managing {@link com.sample.dashboard.domain.ApiBannette}.
 */
@RestController
@RequestMapping("/api")
public class ApiBannetteResource {

    private final Logger log = LoggerFactory.getLogger(ApiBannetteResource.class);

    private static final String ENTITY_NAME = "apiBannette";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ApiBannetteService apiBannetteService;

    private final ApiBannetteRepository apiBannetteRepository;

    public ApiBannetteResource(ApiBannetteService apiBannetteService, ApiBannetteRepository apiBannetteRepository) {
        this.apiBannetteService = apiBannetteService;
        this.apiBannetteRepository = apiBannetteRepository;
    }

    /**
     * {@code POST  /api-bannettes} : Create a new apiBannette.
     *
     * @param apiBannetteDTO the apiBannetteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new apiBannetteDTO, or with status {@code 400 (Bad Request)} if the apiBannette has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/api-bannettes")
    public ResponseEntity<ApiBannetteDTO> createApiBannette(@RequestBody ApiBannetteDTO apiBannetteDTO) throws URISyntaxException {
        log.debug("REST request to save ApiBannette : {}", apiBannetteDTO);
        if (apiBannetteDTO.getId() != null) {
            throw new BadRequestAlertException("A new apiBannette cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApiBannetteDTO result = apiBannetteService.save(apiBannetteDTO);
        return ResponseEntity
            .created(new URI("/api/api-bannettes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /api-bannettes/:id} : Updates an existing apiBannette.
     *
     * @param id the id of the apiBannetteDTO to save.
     * @param apiBannetteDTO the apiBannetteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated apiBannetteDTO,
     * or with status {@code 400 (Bad Request)} if the apiBannetteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the apiBannetteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/api-bannettes/{id}")
    public ResponseEntity<ApiBannetteDTO> updateApiBannette(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody ApiBannetteDTO apiBannetteDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ApiBannette : {}, {}", id, apiBannetteDTO);
        if (apiBannetteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, apiBannetteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!apiBannetteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ApiBannetteDTO result = apiBannetteService.update(apiBannetteDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, apiBannetteDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /api-bannettes/:id} : Partial updates given fields of an existing apiBannette, field will ignore if it is null
     *
     * @param id the id of the apiBannetteDTO to save.
     * @param apiBannetteDTO the apiBannetteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated apiBannetteDTO,
     * or with status {@code 400 (Bad Request)} if the apiBannetteDTO is not valid,
     * or with status {@code 404 (Not Found)} if the apiBannetteDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the apiBannetteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/api-bannettes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ApiBannetteDTO> partialUpdateApiBannette(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody ApiBannetteDTO apiBannetteDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ApiBannette partially : {}, {}", id, apiBannetteDTO);
        if (apiBannetteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, apiBannetteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!apiBannetteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ApiBannetteDTO> result = apiBannetteService.partialUpdate(apiBannetteDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, apiBannetteDTO.getId())
        );
    }

    /**
     * {@code GET  /api-bannettes} : get all the apiBannettes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of apiBannettes in body.
     */
    @GetMapping("/api-bannettes")
    public List<ApiBannetteDTO> getAllApiBannettes() {
        log.debug("REST request to get all ApiBannettes");
        return apiBannetteService.findAll();
    }

    /**
     * {@code GET  /api-bannettes/:id} : get the "id" apiBannette.
     *
     * @param id the id of the apiBannetteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the apiBannetteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/api-bannettes/{id}")
    public ResponseEntity<ApiBannetteDTO> getApiBannette(@PathVariable String id) {
        log.debug("REST request to get ApiBannette : {}", id);
        Optional<ApiBannetteDTO> apiBannetteDTO = apiBannetteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(apiBannetteDTO);
    }

    /**
     * {@code DELETE  /api-bannettes/:id} : delete the "id" apiBannette.
     *
     * @param id the id of the apiBannetteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/api-bannettes/{id}")
    public ResponseEntity<Void> deleteApiBannette(@PathVariable String id) {
        log.debug("REST request to delete ApiBannette : {}", id);
        apiBannetteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
