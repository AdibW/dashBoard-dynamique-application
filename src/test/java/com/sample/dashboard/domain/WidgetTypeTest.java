package com.sample.dashboard.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WidgetTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WidgetType.class);
        WidgetType widgetType1 = new WidgetType();
        widgetType1.setId("id1");
        WidgetType widgetType2 = new WidgetType();
        widgetType2.setId(widgetType1.getId());
        assertThat(widgetType1).isEqualTo(widgetType2);
        widgetType2.setId("id2");
        assertThat(widgetType1).isNotEqualTo(widgetType2);
        widgetType1.setId(null);
        assertThat(widgetType1).isNotEqualTo(widgetType2);
    }
}
