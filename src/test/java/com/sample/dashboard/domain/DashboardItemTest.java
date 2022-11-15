package com.sample.dashboard.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DashboardItemTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DashboardItem.class);
        DashboardItem dashboardItem1 = new DashboardItem();
        dashboardItem1.setId("id1");
        DashboardItem dashboardItem2 = new DashboardItem();
        dashboardItem2.setId(dashboardItem1.getId());
        assertThat(dashboardItem1).isEqualTo(dashboardItem2);
        dashboardItem2.setId("id2");
        assertThat(dashboardItem1).isNotEqualTo(dashboardItem2);
        dashboardItem1.setId(null);
        assertThat(dashboardItem1).isNotEqualTo(dashboardItem2);
    }
}
