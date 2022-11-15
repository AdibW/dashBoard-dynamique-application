package com.sample.dashboard.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DataSourceMapperTest {

    private DataSourceMapper dataSourceMapper;

    @BeforeEach
    public void setUp() {
        dataSourceMapper = new DataSourceMapperImpl();
    }
}
