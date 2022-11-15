package com.sample.dashboard.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sample.dashboard.IntegrationTest;
import com.sample.dashboard.domain.ApiBannette;
import com.sample.dashboard.repository.ApiBannetteRepository;
import com.sample.dashboard.service.dto.ApiBannetteDTO;
import com.sample.dashboard.service.mapper.ApiBannetteMapper;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link ApiBannetteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ApiBannetteResourceIT {

    private static final String DEFAULT_API_INITIAL_LOAD = "AAAAAAAAAA";
    private static final String UPDATED_API_INITIAL_LOAD = "BBBBBBBBBB";

    private static final String DEFAULT_API_SEARCH = "AAAAAAAAAA";
    private static final String UPDATED_API_SEARCH = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/api-bannettes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ApiBannetteRepository apiBannetteRepository;

    @Autowired
    private ApiBannetteMapper apiBannetteMapper;

    @Autowired
    private MockMvc restApiBannetteMockMvc;

    private ApiBannette apiBannette;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApiBannette createEntity() {
        ApiBannette apiBannette = new ApiBannette().apiInitialLoad(DEFAULT_API_INITIAL_LOAD).apiSearch(DEFAULT_API_SEARCH);
        return apiBannette;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApiBannette createUpdatedEntity() {
        ApiBannette apiBannette = new ApiBannette().apiInitialLoad(UPDATED_API_INITIAL_LOAD).apiSearch(UPDATED_API_SEARCH);
        return apiBannette;
    }

    @BeforeEach
    public void initTest() {
        apiBannetteRepository.deleteAll();
        apiBannette = createEntity();
    }

    @Test
    void createApiBannette() throws Exception {
        int databaseSizeBeforeCreate = apiBannetteRepository.findAll().size();
        // Create the ApiBannette
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(apiBannette);
        restApiBannetteMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isCreated());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeCreate + 1);
        ApiBannette testApiBannette = apiBannetteList.get(apiBannetteList.size() - 1);
        assertThat(testApiBannette.getApiInitialLoad()).isEqualTo(DEFAULT_API_INITIAL_LOAD);
        assertThat(testApiBannette.getApiSearch()).isEqualTo(DEFAULT_API_SEARCH);
    }

    @Test
    void createApiBannetteWithExistingId() throws Exception {
        // Create the ApiBannette with an existing ID
        apiBannette.setId("existing_id");
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(apiBannette);

        int databaseSizeBeforeCreate = apiBannetteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restApiBannetteMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllApiBannettes() throws Exception {
        // Initialize the database
        apiBannetteRepository.save(apiBannette);

        // Get all the apiBannetteList
        restApiBannetteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(apiBannette.getId())))
            .andExpect(jsonPath("$.[*].apiInitialLoad").value(hasItem(DEFAULT_API_INITIAL_LOAD)))
            .andExpect(jsonPath("$.[*].apiSearch").value(hasItem(DEFAULT_API_SEARCH)));
    }

    @Test
    void getApiBannette() throws Exception {
        // Initialize the database
        apiBannetteRepository.save(apiBannette);

        // Get the apiBannette
        restApiBannetteMockMvc
            .perform(get(ENTITY_API_URL_ID, apiBannette.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(apiBannette.getId()))
            .andExpect(jsonPath("$.apiInitialLoad").value(DEFAULT_API_INITIAL_LOAD))
            .andExpect(jsonPath("$.apiSearch").value(DEFAULT_API_SEARCH));
    }

    @Test
    void getNonExistingApiBannette() throws Exception {
        // Get the apiBannette
        restApiBannetteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingApiBannette() throws Exception {
        // Initialize the database
        apiBannetteRepository.save(apiBannette);

        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();

        // Update the apiBannette
        ApiBannette updatedApiBannette = apiBannetteRepository.findById(apiBannette.getId()).get();
        updatedApiBannette.apiInitialLoad(UPDATED_API_INITIAL_LOAD).apiSearch(UPDATED_API_SEARCH);
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(updatedApiBannette);

        restApiBannetteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, apiBannetteDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isOk());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
        ApiBannette testApiBannette = apiBannetteList.get(apiBannetteList.size() - 1);
        assertThat(testApiBannette.getApiInitialLoad()).isEqualTo(UPDATED_API_INITIAL_LOAD);
        assertThat(testApiBannette.getApiSearch()).isEqualTo(UPDATED_API_SEARCH);
    }

    @Test
    void putNonExistingApiBannette() throws Exception {
        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();
        apiBannette.setId(UUID.randomUUID().toString());

        // Create the ApiBannette
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(apiBannette);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApiBannetteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, apiBannetteDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchApiBannette() throws Exception {
        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();
        apiBannette.setId(UUID.randomUUID().toString());

        // Create the ApiBannette
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(apiBannette);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApiBannetteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamApiBannette() throws Exception {
        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();
        apiBannette.setId(UUID.randomUUID().toString());

        // Create the ApiBannette
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(apiBannette);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApiBannetteMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateApiBannetteWithPatch() throws Exception {
        // Initialize the database
        apiBannetteRepository.save(apiBannette);

        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();

        // Update the apiBannette using partial update
        ApiBannette partialUpdatedApiBannette = new ApiBannette();
        partialUpdatedApiBannette.setId(apiBannette.getId());

        partialUpdatedApiBannette.apiInitialLoad(UPDATED_API_INITIAL_LOAD);

        restApiBannetteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApiBannette.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedApiBannette))
            )
            .andExpect(status().isOk());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
        ApiBannette testApiBannette = apiBannetteList.get(apiBannetteList.size() - 1);
        assertThat(testApiBannette.getApiInitialLoad()).isEqualTo(UPDATED_API_INITIAL_LOAD);
        assertThat(testApiBannette.getApiSearch()).isEqualTo(DEFAULT_API_SEARCH);
    }

    @Test
    void fullUpdateApiBannetteWithPatch() throws Exception {
        // Initialize the database
        apiBannetteRepository.save(apiBannette);

        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();

        // Update the apiBannette using partial update
        ApiBannette partialUpdatedApiBannette = new ApiBannette();
        partialUpdatedApiBannette.setId(apiBannette.getId());

        partialUpdatedApiBannette.apiInitialLoad(UPDATED_API_INITIAL_LOAD).apiSearch(UPDATED_API_SEARCH);

        restApiBannetteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApiBannette.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedApiBannette))
            )
            .andExpect(status().isOk());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
        ApiBannette testApiBannette = apiBannetteList.get(apiBannetteList.size() - 1);
        assertThat(testApiBannette.getApiInitialLoad()).isEqualTo(UPDATED_API_INITIAL_LOAD);
        assertThat(testApiBannette.getApiSearch()).isEqualTo(UPDATED_API_SEARCH);
    }

    @Test
    void patchNonExistingApiBannette() throws Exception {
        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();
        apiBannette.setId(UUID.randomUUID().toString());

        // Create the ApiBannette
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(apiBannette);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApiBannetteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, apiBannetteDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchApiBannette() throws Exception {
        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();
        apiBannette.setId(UUID.randomUUID().toString());

        // Create the ApiBannette
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(apiBannette);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApiBannetteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamApiBannette() throws Exception {
        int databaseSizeBeforeUpdate = apiBannetteRepository.findAll().size();
        apiBannette.setId(UUID.randomUUID().toString());

        // Create the ApiBannette
        ApiBannetteDTO apiBannetteDTO = apiBannetteMapper.toDto(apiBannette);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApiBannetteMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(apiBannetteDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ApiBannette in the database
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteApiBannette() throws Exception {
        // Initialize the database
        apiBannetteRepository.save(apiBannette);

        int databaseSizeBeforeDelete = apiBannetteRepository.findAll().size();

        // Delete the apiBannette
        restApiBannetteMockMvc
            .perform(delete(ENTITY_API_URL_ID, apiBannette.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ApiBannette> apiBannetteList = apiBannetteRepository.findAll();
        assertThat(apiBannetteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
