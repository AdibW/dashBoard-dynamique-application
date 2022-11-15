package com.sample.dashboard.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DashboardTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dashboard.class);
        Dashboard dashboard1 = new Dashboard();
        dashboard1.setId("id1");
        Dashboard dashboard2 = new Dashboard();
        dashboard2.setId(dashboard1.getId());
        assertThat(dashboard1).isEqualTo(dashboard2);
        dashboard2.setId("id2");
        assertThat(dashboard1).isNotEqualTo(dashboard2);
        dashboard1.setId(null);
        assertThat(dashboard1).isNotEqualTo(dashboard2);
    }
}
