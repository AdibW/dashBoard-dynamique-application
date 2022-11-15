package com.sample.dashboard.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DashboardItemDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DashboardItemDTO.class);
        DashboardItemDTO dashboardItemDTO1 = new DashboardItemDTO();
        dashboardItemDTO1.setId("id1");
        DashboardItemDTO dashboardItemDTO2 = new DashboardItemDTO();
        assertThat(dashboardItemDTO1).isNotEqualTo(dashboardItemDTO2);
        dashboardItemDTO2.setId(dashboardItemDTO1.getId());
        assertThat(dashboardItemDTO1).isEqualTo(dashboardItemDTO2);
        dashboardItemDTO2.setId("id2");
        assertThat(dashboardItemDTO1).isNotEqualTo(dashboardItemDTO2);
        dashboardItemDTO1.setId(null);
        assertThat(dashboardItemDTO1).isNotEqualTo(dashboardItemDTO2);
    }
}
