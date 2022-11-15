package com.sample.dashboard.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sample.dashboard.IntegrationTest;
import com.sample.dashboard.domain.Api;
import com.sample.dashboard.repository.ApiRepository;
import com.sample.dashboard.service.dto.ApiDTO;
import com.sample.dashboard.service.mapper.ApiMapper;
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
 * Integration tests for the {@link ApiResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ApiResourceIT {

    private static final String ENTITY_API_URL = "/api/apis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ApiRepository apiRepository;

    @Autowired
    private ApiMapper apiMapper;

    @Autowired
    private MockMvc restApiMockMvc;

    private Api api;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Api createEntity() {
        Api api = new Api();
        return api;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Api createUpdatedEntity() {
        Api api = new Api();
        return api;
    }

    @BeforeEach
    public void initTest() {
        apiRepository.deleteAll();
        api = createEntity();
    }

    @Test
    void createApi() throws Exception {
        int databaseSizeBeforeCreate = apiRepository.findAll().size();
        // Create the Api
        ApiDTO apiDTO = apiMapper.toDto(api);
        restApiMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isCreated());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeCreate + 1);
        Api testApi = apiList.get(apiList.size() - 1);
    }

    @Test
    void createApiWithExistingId() throws Exception {
        // Create the Api with an existing ID
        api.setId("existing_id");
        ApiDTO apiDTO = apiMapper.toDto(api);

        int databaseSizeBeforeCreate = apiRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restApiMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllApis() throws Exception {
        // Initialize the database
        apiRepository.save(api);

        // Get all the apiList
        restApiMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(api.getId())));
    }

    @Test
    void getApi() throws Exception {
        // Initialize the database
        apiRepository.save(api);

        // Get the api
        restApiMockMvc
            .perform(get(ENTITY_API_URL_ID, api.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(api.getId()));
    }

    @Test
    void getNonExistingApi() throws Exception {
        // Get the api
        restApiMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingApi() throws Exception {
        // Initialize the database
        apiRepository.save(api);

        int databaseSizeBeforeUpdate = apiRepository.findAll().size();

        // Update the api
        Api updatedApi = apiRepository.findById(api.getId()).get();
        ApiDTO apiDTO = apiMapper.toDto(updatedApi);

        restApiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, apiDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isOk());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
        Api testApi = apiList.get(apiList.size() - 1);
    }

    @Test
    void putNonExistingApi() throws Exception {
        int databaseSizeBeforeUpdate = apiRepository.findAll().size();
        api.setId(UUID.randomUUID().toString());

        // Create the Api
        ApiDTO apiDTO = apiMapper.toDto(api);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, apiDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchApi() throws Exception {
        int databaseSizeBeforeUpdate = apiRepository.findAll().size();
        api.setId(UUID.randomUUID().toString());

        // Create the Api
        ApiDTO apiDTO = apiMapper.toDto(api);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamApi() throws Exception {
        int databaseSizeBeforeUpdate = apiRepository.findAll().size();
        api.setId(UUID.randomUUID().toString());

        // Create the Api
        ApiDTO apiDTO = apiMapper.toDto(api);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApiMockMvc
            .perform(
                put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateApiWithPatch() throws Exception {
        // Initialize the database
        apiRepository.save(api);

        int databaseSizeBeforeUpdate = apiRepository.findAll().size();

        // Update the api using partial update
        Api partialUpdatedApi = new Api();
        partialUpdatedApi.setId(api.getId());

        restApiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApi.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedApi))
            )
            .andExpect(status().isOk());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
        Api testApi = apiList.get(apiList.size() - 1);
    }

    @Test
    void fullUpdateApiWithPatch() throws Exception {
        // Initialize the database
        apiRepository.save(api);

        int databaseSizeBeforeUpdate = apiRepository.findAll().size();

        // Update the api using partial update
        Api partialUpdatedApi = new Api();
        partialUpdatedApi.setId(api.getId());

        restApiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApi.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedApi))
            )
            .andExpect(status().isOk());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
        Api testApi = apiList.get(apiList.size() - 1);
    }

    @Test
    void patchNonExistingApi() throws Exception {
        int databaseSizeBeforeUpdate = apiRepository.findAll().size();
        api.setId(UUID.randomUUID().toString());

        // Create the Api
        ApiDTO apiDTO = apiMapper.toDto(api);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, apiDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchApi() throws Exception {
        int databaseSizeBeforeUpdate = apiRepository.findAll().size();
        api.setId(UUID.randomUUID().toString());

        // Create the Api
        ApiDTO apiDTO = apiMapper.toDto(api);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamApi() throws Exception {
        int databaseSizeBeforeUpdate = apiRepository.findAll().size();
        api.setId(UUID.randomUUID().toString());

        // Create the Api
        ApiDTO apiDTO = apiMapper.toDto(api);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApiMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(apiDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Api in the database
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteApi() throws Exception {
        // Initialize the database
        apiRepository.save(api);

        int databaseSizeBeforeDelete = apiRepository.findAll().size();

        // Delete the api
        restApiMockMvc
            .perform(delete(ENTITY_API_URL_ID, api.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Api> apiList = apiRepository.findAll();
        assertThat(apiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
