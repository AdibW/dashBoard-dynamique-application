package com.sample.dashboard.service.mapper;

import com.sample.dashboard.domain.Dashboard;
import com.sample.dashboard.domain.DashboardItem;
import com.sample.dashboard.domain.Widget;
import com.sample.dashboard.service.dto.DashboardDTO;
import com.sample.dashboard.service.dto.DashboardItemDTO;
import com.sample.dashboard.service.dto.WidgetDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DashboardItem} and its DTO {@link DashboardItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface DashboardItemMapper extends EntityMapper<DashboardItemDTO, DashboardItem> {
    @Mapping(target = "item", source = "item", qualifiedByName = "widgetId")
    @Mapping(target = "items", source = "items", qualifiedByName = "dashboardId")
    DashboardItemDTO toDto(DashboardItem s);

    @Named("widgetId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WidgetDTO toDtoWidgetId(Widget widget);

    @Named("dashboardId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DashboardDTO toDtoDashboardId(Dashboard dashboard);
}
