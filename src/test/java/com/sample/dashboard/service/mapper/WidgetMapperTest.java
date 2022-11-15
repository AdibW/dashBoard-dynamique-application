package com.sample.dashboard.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WidgetMapperTest {

    private WidgetMapper widgetMapper;

    @BeforeEach
    public void setUp() {
        widgetMapper = new WidgetMapperImpl();
    }
}
