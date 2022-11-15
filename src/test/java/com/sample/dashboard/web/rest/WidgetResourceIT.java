package com.sample.dashboard.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sample.dashboard.IntegrationTest;
import com.sample.dashboard.domain.Widget;
import com.sample.dashboard.repository.WidgetRepository;
import com.sample.dashboard.service.dto.WidgetDTO;
import com.sample.dashboard.service.mapper.WidgetMapper;
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
 * Integration tests for the {@link WidgetResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WidgetResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPONENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPONENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COMPONENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_COMPONENT_TYPE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/widgets";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private WidgetRepository widgetRepository;

    @Autowired
    private WidgetMapper widgetMapper;

    @Autowired
    private MockMvc restWidgetMockMvc;

    private Widget widget;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Widget createEntity() {
        Widget widget = new Widget()
            .name(DEFAULT_NAME)
            .title(DEFAULT_TITLE)
            .componentName(DEFAULT_COMPONENT_NAME)
            .componentType(DEFAULT_COMPONENT_TYPE);
        return widget;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Widget createUpdatedEntity() {
        Widget widget = new Widget()
            .name(UPDATED_NAME)
            .title(UPDATED_TITLE)
            .componentName(UPDATED_COMPONENT_NAME)
            .componentType(UPDATED_COMPONENT_TYPE);
        return widget;
    }

    @BeforeEach
    public void initTest() {
        widgetRepository.deleteAll();
        widget = createEntity();
    }

    @Test
    void createWidget() throws Exception {
        int databaseSizeBeforeCreate = widgetRepository.findAll().size();
        // Create the Widget
        WidgetDTO widgetDTO = widgetMapper.toDto(widget);
        restWidgetMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isCreated());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeCreate + 1);
        Widget testWidget = widgetList.get(widgetList.size() - 1);
        assertThat(testWidget.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWidget.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testWidget.getComponentName()).isEqualTo(DEFAULT_COMPONENT_NAME);
        assertThat(testWidget.getComponentType()).isEqualTo(DEFAULT_COMPONENT_TYPE);
    }

    @Test
    void createWidgetWithExistingId() throws Exception {
        // Create the Widget with an existing ID
        widget.setId("existing_id");
        WidgetDTO widgetDTO = widgetMapper.toDto(widget);

        int databaseSizeBeforeCreate = widgetRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWidgetMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllWidgets() throws Exception {
        // Initialize the database
        widgetRepository.save(widget);

        // Get all the widgetList
        restWidgetMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(widget.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].componentName").value(hasItem(DEFAULT_COMPONENT_NAME)))
            .andExpect(jsonPath("$.[*].componentType").value(hasItem(DEFAULT_COMPONENT_TYPE)));
    }

    @Test
    void getWidget() throws Exception {
        // Initialize the database
        widgetRepository.save(widget);

        // Get the widget
        restWidgetMockMvc
            .perform(get(ENTITY_API_URL_ID, widget.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(widget.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.componentName").value(DEFAULT_COMPONENT_NAME))
            .andExpect(jsonPath("$.componentType").value(DEFAULT_COMPONENT_TYPE));
    }

    @Test
    void getNonExistingWidget() throws Exception {
        // Get the widget
        restWidgetMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingWidget() throws Exception {
        // Initialize the database
        widgetRepository.save(widget);

        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();

        // Update the widget
        Widget updatedWidget = widgetRepository.findById(widget.getId()).get();
        updatedWidget.name(UPDATED_NAME).title(UPDATED_TITLE).componentName(UPDATED_COMPONENT_NAME).componentType(UPDATED_COMPONENT_TYPE);
        WidgetDTO widgetDTO = widgetMapper.toDto(updatedWidget);

        restWidgetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, widgetDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isOk());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
        Widget testWidget = widgetList.get(widgetList.size() - 1);
        assertThat(testWidget.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWidget.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testWidget.getComponentName()).isEqualTo(UPDATED_COMPONENT_NAME);
        assertThat(testWidget.getComponentType()).isEqualTo(UPDATED_COMPONENT_TYPE);
    }

    @Test
    void putNonExistingWidget() throws Exception {
        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();
        widget.setId(UUID.randomUUID().toString());

        // Create the Widget
        WidgetDTO widgetDTO = widgetMapper.toDto(widget);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWidgetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, widgetDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchWidget() throws Exception {
        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();
        widget.setId(UUID.randomUUID().toString());

        // Create the Widget
        WidgetDTO widgetDTO = widgetMapper.toDto(widget);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWidgetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamWidget() throws Exception {
        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();
        widget.setId(UUID.randomUUID().toString());

        // Create the Widget
        WidgetDTO widgetDTO = widgetMapper.toDto(widget);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWidgetMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateWidgetWithPatch() throws Exception {
        // Initialize the database
        widgetRepository.save(widget);

        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();

        // Update the widget using partial update
        Widget partialUpdatedWidget = new Widget();
        partialUpdatedWidget.setId(widget.getId());

        partialUpdatedWidget.title(UPDATED_TITLE).componentName(UPDATED_COMPONENT_NAME).componentType(UPDATED_COMPONENT_TYPE);

        restWidgetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWidget.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWidget))
            )
            .andExpect(status().isOk());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
        Widget testWidget = widgetList.get(widgetList.size() - 1);
        assertThat(testWidget.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWidget.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testWidget.getComponentName()).isEqualTo(UPDATED_COMPONENT_NAME);
        assertThat(testWidget.getComponentType()).isEqualTo(UPDATED_COMPONENT_TYPE);
    }

    @Test
    void fullUpdateWidgetWithPatch() throws Exception {
        // Initialize the database
        widgetRepository.save(widget);

        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();

        // Update the widget using partial update
        Widget partialUpdatedWidget = new Widget();
        partialUpdatedWidget.setId(widget.getId());

        partialUpdatedWidget
            .name(UPDATED_NAME)
            .title(UPDATED_TITLE)
            .componentName(UPDATED_COMPONENT_NAME)
            .componentType(UPDATED_COMPONENT_TYPE);

        restWidgetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWidget.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWidget))
            )
            .andExpect(status().isOk());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
        Widget testWidget = widgetList.get(widgetList.size() - 1);
        assertThat(testWidget.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWidget.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testWidget.getComponentName()).isEqualTo(UPDATED_COMPONENT_NAME);
        assertThat(testWidget.getComponentType()).isEqualTo(UPDATED_COMPONENT_TYPE);
    }

    @Test
    void patchNonExistingWidget() throws Exception {
        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();
        widget.setId(UUID.randomUUID().toString());

        // Create the Widget
        WidgetDTO widgetDTO = widgetMapper.toDto(widget);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWidgetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, widgetDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchWidget() throws Exception {
        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();
        widget.setId(UUID.randomUUID().toString());

        // Create the Widget
        WidgetDTO widgetDTO = widgetMapper.toDto(widget);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWidgetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamWidget() throws Exception {
        int databaseSizeBeforeUpdate = widgetRepository.findAll().size();
        widget.setId(UUID.randomUUID().toString());

        // Create the Widget
        WidgetDTO widgetDTO = widgetMapper.toDto(widget);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWidgetMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(widgetDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Widget in the database
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteWidget() throws Exception {
        // Initialize the database
        widgetRepository.save(widget);

        int databaseSizeBeforeDelete = widgetRepository.findAll().size();

        // Delete the widget
        restWidgetMockMvc
            .perform(delete(ENTITY_API_URL_ID, widget.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Widget> widgetList = widgetRepository.findAll();
        assertThat(widgetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
