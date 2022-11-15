package com.sample.dashboard.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sample.dashboard.IntegrationTest;
import com.sample.dashboard.domain.WidgetType;
import com.sample.dashboard.repository.WidgetTypeRepository;
import com.sample.dashboard.service.dto.WidgetTypeDTO;
import com.sample.dashboard.service.mapper.WidgetTypeMapper;
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
 * Integration tests for the {@link WidgetTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WidgetTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/widget-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private WidgetTypeRepository widgetTypeRepository;

    @Autowired
    private WidgetTypeMapper widgetTypeMapper;

    @Autowired
    private MockMvc restWidgetTypeMockMvc;

    private WidgetType widgetType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WidgetType createEntity() {
        WidgetType widgetType = new WidgetType().name(DEFAULT_NAME);
        return widgetType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WidgetType createUpdatedEntity() {
        WidgetType widgetType = new WidgetType().name(UPDATED_NAME);
        return widgetType;
    }

    @BeforeEach
    public void initTest() {
        widgetTypeRepository.deleteAll();
        widgetType = createEntity();
    }

    @Test
    void createWidgetType() throws Exception {
        int databaseSizeBeforeCreate = widgetTypeRepository.findAll().size();
        // Create the WidgetType
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(widgetType);
        restWidgetTypeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isCreated());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeCreate + 1);
        WidgetType testWidgetType = widgetTypeList.get(widgetTypeList.size() - 1);
        assertThat(testWidgetType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    void createWidgetTypeWithExistingId() throws Exception {
        // Create the WidgetType with an existing ID
        widgetType.setId("existing_id");
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(widgetType);

        int databaseSizeBeforeCreate = widgetTypeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWidgetTypeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllWidgetTypes() throws Exception {
        // Initialize the database
        widgetTypeRepository.save(widgetType);

        // Get all the widgetTypeList
        restWidgetTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(widgetType.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    void getWidgetType() throws Exception {
        // Initialize the database
        widgetTypeRepository.save(widgetType);

        // Get the widgetType
        restWidgetTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, widgetType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(widgetType.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    void getNonExistingWidgetType() throws Exception {
        // Get the widgetType
        restWidgetTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingWidgetType() throws Exception {
        // Initialize the database
        widgetTypeRepository.save(widgetType);

        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();

        // Update the widgetType
        WidgetType updatedWidgetType = widgetTypeRepository.findById(widgetType.getId()).get();
        updatedWidgetType.name(UPDATED_NAME);
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(updatedWidgetType);

        restWidgetTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, widgetTypeDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isOk());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
        WidgetType testWidgetType = widgetTypeList.get(widgetTypeList.size() - 1);
        assertThat(testWidgetType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    void putNonExistingWidgetType() throws Exception {
        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();
        widgetType.setId(UUID.randomUUID().toString());

        // Create the WidgetType
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(widgetType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWidgetTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, widgetTypeDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchWidgetType() throws Exception {
        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();
        widgetType.setId(UUID.randomUUID().toString());

        // Create the WidgetType
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(widgetType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWidgetTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamWidgetType() throws Exception {
        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();
        widgetType.setId(UUID.randomUUID().toString());

        // Create the WidgetType
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(widgetType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWidgetTypeMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateWidgetTypeWithPatch() throws Exception {
        // Initialize the database
        widgetTypeRepository.save(widgetType);

        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();

        // Update the widgetType using partial update
        WidgetType partialUpdatedWidgetType = new WidgetType();
        partialUpdatedWidgetType.setId(widgetType.getId());

        restWidgetTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWidgetType.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWidgetType))
            )
            .andExpect(status().isOk());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
        WidgetType testWidgetType = widgetTypeList.get(widgetTypeList.size() - 1);
        assertThat(testWidgetType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    void fullUpdateWidgetTypeWithPatch() throws Exception {
        // Initialize the database
        widgetTypeRepository.save(widgetType);

        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();

        // Update the widgetType using partial update
        WidgetType partialUpdatedWidgetType = new WidgetType();
        partialUpdatedWidgetType.setId(widgetType.getId());

        partialUpdatedWidgetType.name(UPDATED_NAME);

        restWidgetTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWidgetType.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWidgetType))
            )
            .andExpect(status().isOk());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
        WidgetType testWidgetType = widgetTypeList.get(widgetTypeList.size() - 1);
        assertThat(testWidgetType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    void patchNonExistingWidgetType() throws Exception {
        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();
        widgetType.setId(UUID.randomUUID().toString());

        // Create the WidgetType
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(widgetType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWidgetTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, widgetTypeDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchWidgetType() throws Exception {
        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();
        widgetType.setId(UUID.randomUUID().toString());

        // Create the WidgetType
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(widgetType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWidgetTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamWidgetType() throws Exception {
        int databaseSizeBeforeUpdate = widgetTypeRepository.findAll().size();
        widgetType.setId(UUID.randomUUID().toString());

        // Create the WidgetType
        WidgetTypeDTO widgetTypeDTO = widgetTypeMapper.toDto(widgetType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWidgetTypeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(widgetTypeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WidgetType in the database
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteWidgetType() throws Exception {
        // Initialize the database
        widgetTypeRepository.save(widgetType);

        int databaseSizeBeforeDelete = widgetTypeRepository.findAll().size();

        // Delete the widgetType
        restWidgetTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, widgetType.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WidgetType> widgetTypeList = widgetTypeRepository.findAll();
        assertThat(widgetTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
