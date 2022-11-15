package com.sample.dashboard.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ApiBannetteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApiBannette.class);
        ApiBannette apiBannette1 = new ApiBannette();
        apiBannette1.setId("id1");
        ApiBannette apiBannette2 = new ApiBannette();
        apiBannette2.setId(apiBannette1.getId());
        assertThat(apiBannette1).isEqualTo(apiBannette2);
        apiBannette2.setId("id2");
        assertThat(apiBannette1).isNotEqualTo(apiBannette2);
        apiBannette1.setId(null);
        assertThat(apiBannette1).isNotEqualTo(apiBannette2);
    }
}
