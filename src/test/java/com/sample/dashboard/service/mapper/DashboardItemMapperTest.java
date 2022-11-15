package com.sample.dashboard.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DashboardItemMapperTest {

    private DashboardItemMapper dashboardItemMapper;

    @BeforeEach
    public void setUp() {
        dashboardItemMapper = new DashboardItemMapperImpl();
    }
}
