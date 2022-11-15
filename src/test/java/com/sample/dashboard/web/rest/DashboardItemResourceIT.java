package com.sample.dashboard.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sample.dashboard.IntegrationTest;
import com.sample.dashboard.domain.DashboardItem;
import com.sample.dashboard.repository.DashboardItemRepository;
import com.sample.dashboard.service.dto.DashboardItemDTO;
import com.sample.dashboard.service.mapper.DashboardItemMapper;
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
 * Integration tests for the {@link DashboardItemResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DashboardItemResourceIT {

    private static final Integer DEFAULT_X = 1;
    private static final Integer UPDATED_X = 2;

    private static final Integer DEFAULT_Y = 1;
    private static final Integer UPDATED_Y = 2;

    private static final Integer DEFAULT_ROWS = 1;
    private static final Integer UPDATED_ROWS = 2;

    private static final Integer DEFAULT_COL = 1;
    private static final Integer UPDATED_COL = 2;

    private static final String ENTITY_API_URL = "/api/dashboard-items";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private DashboardItemRepository dashboardItemRepository;

    @Autowired
    private DashboardItemMapper dashboardItemMapper;

    @Autowired
    private MockMvc restDashboardItemMockMvc;

    private DashboardItem dashboardItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DashboardItem createEntity() {
        DashboardItem dashboardItem = new DashboardItem().x(DEFAULT_X).y(DEFAULT_Y).rows(DEFAULT_ROWS).col(DEFAULT_COL);
        return dashboardItem;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DashboardItem createUpdatedEntity() {
        DashboardItem dashboardItem = new DashboardItem().x(UPDATED_X).y(UPDATED_Y).rows(UPDATED_ROWS).col(UPDATED_COL);
        return dashboardItem;
    }

    @BeforeEach
    public void initTest() {
        dashboardItemRepository.deleteAll();
        dashboardItem = createEntity();
    }

    @Test
    void createDashboardItem() throws Exception {
        int databaseSizeBeforeCreate = dashboardItemRepository.findAll().size();
        // Create the DashboardItem
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(dashboardItem);
        restDashboardItemMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isCreated());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeCreate + 1);
        DashboardItem testDashboardItem = dashboardItemList.get(dashboardItemList.size() - 1);
        assertThat(testDashboardItem.getX()).isEqualTo(DEFAULT_X);
        assertThat(testDashboardItem.getY()).isEqualTo(DEFAULT_Y);
        assertThat(testDashboardItem.getRows()).isEqualTo(DEFAULT_ROWS);
        assertThat(testDashboardItem.getCol()).isEqualTo(DEFAULT_COL);
    }

    @Test
    void createDashboardItemWithExistingId() throws Exception {
        // Create the DashboardItem with an existing ID
        dashboardItem.setId("existing_id");
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(dashboardItem);

        int databaseSizeBeforeCreate = dashboardItemRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDashboardItemMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllDashboardItems() throws Exception {
        // Initialize the database
        dashboardItemRepository.save(dashboardItem);

        // Get all the dashboardItemList
        restDashboardItemMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dashboardItem.getId())))
            .andExpect(jsonPath("$.[*].x").value(hasItem(DEFAULT_X)))
            .andExpect(jsonPath("$.[*].y").value(hasItem(DEFAULT_Y)))
            .andExpect(jsonPath("$.[*].rows").value(hasItem(DEFAULT_ROWS)))
            .andExpect(jsonPath("$.[*].col").value(hasItem(DEFAULT_COL)));
    }

    @Test
    void getDashboardItem() throws Exception {
        // Initialize the database
        dashboardItemRepository.save(dashboardItem);

        // Get the dashboardItem
        restDashboardItemMockMvc
            .perform(get(ENTITY_API_URL_ID, dashboardItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dashboardItem.getId()))
            .andExpect(jsonPath("$.x").value(DEFAULT_X))
            .andExpect(jsonPath("$.y").value(DEFAULT_Y))
            .andExpect(jsonPath("$.rows").value(DEFAULT_ROWS))
            .andExpect(jsonPath("$.col").value(DEFAULT_COL));
    }

    @Test
    void getNonExistingDashboardItem() throws Exception {
        // Get the dashboardItem
        restDashboardItemMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingDashboardItem() throws Exception {
        // Initialize the database
        dashboardItemRepository.save(dashboardItem);

        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();

        // Update the dashboardItem
        DashboardItem updatedDashboardItem = dashboardItemRepository.findById(dashboardItem.getId()).get();
        updatedDashboardItem.x(UPDATED_X).y(UPDATED_Y).rows(UPDATED_ROWS).col(UPDATED_COL);
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(updatedDashboardItem);

        restDashboardItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dashboardItemDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isOk());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
        DashboardItem testDashboardItem = dashboardItemList.get(dashboardItemList.size() - 1);
        assertThat(testDashboardItem.getX()).isEqualTo(UPDATED_X);
        assertThat(testDashboardItem.getY()).isEqualTo(UPDATED_Y);
        assertThat(testDashboardItem.getRows()).isEqualTo(UPDATED_ROWS);
        assertThat(testDashboardItem.getCol()).isEqualTo(UPDATED_COL);
    }

    @Test
    void putNonExistingDashboardItem() throws Exception {
        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();
        dashboardItem.setId(UUID.randomUUID().toString());

        // Create the DashboardItem
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(dashboardItem);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDashboardItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dashboardItemDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDashboardItem() throws Exception {
        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();
        dashboardItem.setId(UUID.randomUUID().toString());

        // Create the DashboardItem
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(dashboardItem);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDashboardItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDashboardItem() throws Exception {
        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();
        dashboardItem.setId(UUID.randomUUID().toString());

        // Create the DashboardItem
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(dashboardItem);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDashboardItemMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDashboardItemWithPatch() throws Exception {
        // Initialize the database
        dashboardItemRepository.save(dashboardItem);

        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();

        // Update the dashboardItem using partial update
        DashboardItem partialUpdatedDashboardItem = new DashboardItem();
        partialUpdatedDashboardItem.setId(dashboardItem.getId());

        partialUpdatedDashboardItem.col(UPDATED_COL);

        restDashboardItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDashboardItem.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDashboardItem))
            )
            .andExpect(status().isOk());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
        DashboardItem testDashboardItem = dashboardItemList.get(dashboardItemList.size() - 1);
        assertThat(testDashboardItem.getX()).isEqualTo(DEFAULT_X);
        assertThat(testDashboardItem.getY()).isEqualTo(DEFAULT_Y);
        assertThat(testDashboardItem.getRows()).isEqualTo(DEFAULT_ROWS);
        assertThat(testDashboardItem.getCol()).isEqualTo(UPDATED_COL);
    }

    @Test
    void fullUpdateDashboardItemWithPatch() throws Exception {
        // Initialize the database
        dashboardItemRepository.save(dashboardItem);

        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();

        // Update the dashboardItem using partial update
        DashboardItem partialUpdatedDashboardItem = new DashboardItem();
        partialUpdatedDashboardItem.setId(dashboardItem.getId());

        partialUpdatedDashboardItem.x(UPDATED_X).y(UPDATED_Y).rows(UPDATED_ROWS).col(UPDATED_COL);

        restDashboardItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDashboardItem.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDashboardItem))
            )
            .andExpect(status().isOk());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
        DashboardItem testDashboardItem = dashboardItemList.get(dashboardItemList.size() - 1);
        assertThat(testDashboardItem.getX()).isEqualTo(UPDATED_X);
        assertThat(testDashboardItem.getY()).isEqualTo(UPDATED_Y);
        assertThat(testDashboardItem.getRows()).isEqualTo(UPDATED_ROWS);
        assertThat(testDashboardItem.getCol()).isEqualTo(UPDATED_COL);
    }

    @Test
    void patchNonExistingDashboardItem() throws Exception {
        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();
        dashboardItem.setId(UUID.randomUUID().toString());

        // Create the DashboardItem
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(dashboardItem);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDashboardItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dashboardItemDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDashboardItem() throws Exception {
        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();
        dashboardItem.setId(UUID.randomUUID().toString());

        // Create the DashboardItem
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(dashboardItem);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDashboardItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDashboardItem() throws Exception {
        int databaseSizeBeforeUpdate = dashboardItemRepository.findAll().size();
        dashboardItem.setId(UUID.randomUUID().toString());

        // Create the DashboardItem
        DashboardItemDTO dashboardItemDTO = dashboardItemMapper.toDto(dashboardItem);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDashboardItemMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dashboardItemDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DashboardItem in the database
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDashboardItem() throws Exception {
        // Initialize the database
        dashboardItemRepository.save(dashboardItem);

        int databaseSizeBeforeDelete = dashboardItemRepository.findAll().size();

        // Delete the dashboardItem
        restDashboardItemMockMvc
            .perform(delete(ENTITY_API_URL_ID, dashboardItem.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DashboardItem> dashboardItemList = dashboardItemRepository.findAll();
        assertThat(dashboardItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
