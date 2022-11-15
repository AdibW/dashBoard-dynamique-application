package com.sample.dashboard.web.rest;

import com.sample.dashboard.repository.ApiRepository;
import com.sample.dashboard.service.ApiService;
import com.sample.dashboard.service.dto.ApiDTO;
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
 * REST controller for managing {@link com.sample.dashboard.domain.Api}.
 */
@RestController
@RequestMapping("/api")
public class ApiResource {

    private final Logger log = LoggerFactory.getLogger(ApiResource.class);

    private static final String ENTITY_NAME = "api";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ApiService apiService;

    private final ApiRepository apiRepository;

    public ApiResource(ApiService apiService, ApiRepository apiRepository) {
        this.apiService = apiService;
        this.apiRepository = apiRepository;
    }

    /**
     * {@code POST  /apis} : Create a new api.
     *
     * @param apiDTO the apiDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new apiDTO, or with status {@code 400 (Bad Request)} if the api has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/apis")
    public ResponseEntity<ApiDTO> createApi(@RequestBody ApiDTO apiDTO) throws URISyntaxException {
        log.debug("REST request to save Api : {}", apiDTO);
        if (apiDTO.getId() != null) {
            throw new BadRequestAlertException("A new api cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApiDTO result = apiService.save(apiDTO);
        return ResponseEntity
            .created(new URI("/api/apis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /apis/:id} : Updates an existing api.
     *
     * @param id the id of the apiDTO to save.
     * @param apiDTO the apiDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated apiDTO,
     * or with status {@code 400 (Bad Request)} if the apiDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the apiDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/apis/{id}")
    public ResponseEntity<ApiDTO> updateApi(@PathVariable(value = "id", required = false) final String id, @RequestBody ApiDTO apiDTO)
        throws URISyntaxException {
        log.debug("REST request to update Api : {}, {}", id, apiDTO);
        if (apiDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, apiDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!apiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ApiDTO result = apiService.update(apiDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, apiDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /apis/:id} : Partial updates given fields of an existing api, field will ignore if it is null
     *
     * @param id the id of the apiDTO to save.
     * @param apiDTO the apiDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated apiDTO,
     * or with status {@code 400 (Bad Request)} if the apiDTO is not valid,
     * or with status {@code 404 (Not Found)} if the apiDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the apiDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/apis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ApiDTO> partialUpdateApi(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody ApiDTO apiDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Api partially : {}, {}", id, apiDTO);
        if (apiDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, apiDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!apiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ApiDTO> result = apiService.partialUpdate(apiDTO);

        return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, apiDTO.getId()));
    }

    /**
     * {@code GET  /apis} : get all the apis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of apis in body.
     */
    @GetMapping("/apis")
    public List<ApiDTO> getAllApis() {
        log.debug("REST request to get all Apis");
        return apiService.findAll();
    }

    /**
     * {@code GET  /apis/:id} : get the "id" api.
     *
     * @param id the id of the apiDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the apiDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/apis/{id}")
    public ResponseEntity<ApiDTO> getApi(@PathVariable String id) {
        log.debug("REST request to get Api : {}", id);
        Optional<ApiDTO> apiDTO = apiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(apiDTO);
    }

    /**
     * {@code DELETE  /apis/:id} : delete the "id" api.
     *
     * @param id the id of the apiDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/apis/{id}")
    public ResponseEntity<Void> deleteApi(@PathVariable String id) {
        log.debug("REST request to delete Api : {}", id);
        apiService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
