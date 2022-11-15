package com.sample.dashboard.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WidgetTypeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WidgetTypeDTO.class);
        WidgetTypeDTO widgetTypeDTO1 = new WidgetTypeDTO();
        widgetTypeDTO1.setId("id1");
        WidgetTypeDTO widgetTypeDTO2 = new WidgetTypeDTO();
        assertThat(widgetTypeDTO1).isNotEqualTo(widgetTypeDTO2);
        widgetTypeDTO2.setId(widgetTypeDTO1.getId());
        assertThat(widgetTypeDTO1).isEqualTo(widgetTypeDTO2);
        widgetTypeDTO2.setId("id2");
        assertThat(widgetTypeDTO1).isNotEqualTo(widgetTypeDTO2);
        widgetTypeDTO1.setId(null);
        assertThat(widgetTypeDTO1).isNotEqualTo(widgetTypeDTO2);
    }
}
