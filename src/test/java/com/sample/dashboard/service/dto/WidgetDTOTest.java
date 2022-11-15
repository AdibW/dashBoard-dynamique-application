package com.sample.dashboard.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WidgetDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WidgetDTO.class);
        WidgetDTO widgetDTO1 = new WidgetDTO();
        widgetDTO1.setId("id1");
        WidgetDTO widgetDTO2 = new WidgetDTO();
        assertThat(widgetDTO1).isNotEqualTo(widgetDTO2);
        widgetDTO2.setId(widgetDTO1.getId());
        assertThat(widgetDTO1).isEqualTo(widgetDTO2);
        widgetDTO2.setId("id2");
        assertThat(widgetDTO1).isNotEqualTo(widgetDTO2);
        widgetDTO1.setId(null);
        assertThat(widgetDTO1).isNotEqualTo(widgetDTO2);
    }
}
