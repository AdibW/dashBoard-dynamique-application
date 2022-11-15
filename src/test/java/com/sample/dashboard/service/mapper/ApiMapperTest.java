package com.sample.dashboard.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ApiMapperTest {

    private ApiMapper apiMapper;

    @BeforeEach
    public void setUp() {
        apiMapper = new ApiMapperImpl();
    }
}
