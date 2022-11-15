package com.sample.dashboard.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DataSourceDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataSourceDTO.class);
        DataSourceDTO dataSourceDTO1 = new DataSourceDTO();
        dataSourceDTO1.setId("id1");
        DataSourceDTO dataSourceDTO2 = new DataSourceDTO();
        assertThat(dataSourceDTO1).isNotEqualTo(dataSourceDTO2);
        dataSourceDTO2.setId(dataSourceDTO1.getId());
        assertThat(dataSourceDTO1).isEqualTo(dataSourceDTO2);
        dataSourceDTO2.setId("id2");
        assertThat(dataSourceDTO1).isNotEqualTo(dataSourceDTO2);
        dataSourceDTO1.setId(null);
        assertThat(dataSourceDTO1).isNotEqualTo(dataSourceDTO2);
    }
}
