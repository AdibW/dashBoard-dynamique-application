package com.sample.dashboard.service.mapper;

import com.sample.dashboard.domain.Widget;
import com.sample.dashboard.domain.WidgetType;
import com.sample.dashboard.service.dto.WidgetDTO;
import com.sample.dashboard.service.dto.WidgetTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Widget} and its DTO {@link WidgetDTO}.
 */
@Mapper(componentModel = "spring")
public interface WidgetMapper extends EntityMapper<WidgetDTO, Widget> {
    @Mapping(target = "widget", source = "widget", qualifiedByName = "widgetTypeId")
    WidgetDTO toDto(Widget s);

    @Named("widgetTypeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WidgetTypeDTO toDtoWidgetTypeId(WidgetType widgetType);
}
