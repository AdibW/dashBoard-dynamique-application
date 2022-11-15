package com.sample.dashboard.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sample.dashboard.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ApiTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Api.class);
        Api api1 = new Api();
        api1.setId("id1");
        Api api2 = new Api();
        api2.setId(api1.getId());
        assertThat(api1).isEqualTo(api2);
        api2.setId("id2");
        assertThat(api1).isNotEqualTo(api2);
        api1.setId(null);
        assertThat(api1).isNotEqualTo(api2);
    }
}
