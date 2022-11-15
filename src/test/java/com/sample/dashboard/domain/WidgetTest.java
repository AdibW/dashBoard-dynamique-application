package com.sample.dashboard.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WidgetTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Widget.class);
        Widget widget1 = new Widget();
        widget1.setId("id1");
        Widget widget2 = new Widget();
        widget2.setId(widget1.getId());
        assertThat(widget1).isEqualTo(widget2);
        widget2.setId("id2");
        assertThat(widget1).isNotEqualTo(widget2);
        widget1.setId(null);
        assertThat(widget1).isNotEqualTo(widget2);
    }
}
