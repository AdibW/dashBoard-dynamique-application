package com.sample.dashboard.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WidgetTypeMapperTest {

    private WidgetTypeMapper widgetTypeMapper;

    @BeforeEach
    public void setUp() {
        widgetTypeMapper = new WidgetTypeMapperImpl();
    }
}
