package com.sample.dashboard.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ApiBannetteDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApiBannetteDTO.class);
        ApiBannetteDTO apiBannetteDTO1 = new ApiBannetteDTO();
        apiBannetteDTO1.setId("id1");
        ApiBannetteDTO apiBannetteDTO2 = new ApiBannetteDTO();
        assertThat(apiBannetteDTO1).isNotEqualTo(apiBannetteDTO2);
        apiBannetteDTO2.setId(apiBannetteDTO1.getId());
        assertThat(apiBannetteDTO1).isEqualTo(apiBannetteDTO2);
        apiBannetteDTO2.setId("id2");
        assertThat(apiBannetteDTO1).isNotEqualTo(apiBannetteDTO2);
        apiBannetteDTO1.setId(null);
        assertThat(apiBannetteDTO1).isNotEqualTo(apiBannetteDTO2);
    }
}
