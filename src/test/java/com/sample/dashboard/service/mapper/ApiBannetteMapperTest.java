package com.sample.dashboard.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ApiBannetteMapperTest {

    private ApiBannetteMapper apiBannetteMapper;

    @BeforeEach
    public void setUp() {
        apiBannetteMapper = new ApiBannetteMapperImpl();
    }
}
