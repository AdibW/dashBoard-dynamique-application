package com.sample.dashboard.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ApiDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApiDTO.class);
        ApiDTO apiDTO1 = new ApiDTO();
        apiDTO1.setId("id1");
        ApiDTO apiDTO2 = new ApiDTO();
        assertThat(apiDTO1).isNotEqualTo(apiDTO2);
        apiDTO2.setId(apiDTO1.getId());
        assertThat(apiDTO1).isEqualTo(apiDTO2);
        apiDTO2.setId("id2");
        assertThat(apiDTO1).isNotEqualTo(apiDTO2);
        apiDTO1.setId(null);
        assertThat(apiDTO1).isNotEqualTo(apiDTO2);
    }
}
