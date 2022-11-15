package com.sample.dashboard.service.mapper;

import com.sample.dashboard.domain.DataSource;
import com.sample.dashboard.domain.WidgetType;
import com.sample.dashboard.service.dto.DataSourceDTO;
import com.sample.dashboard.service.dto.WidgetTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WidgetType} and its DTO {@link WidgetTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface WidgetTypeMapper extends EntityMapper<WidgetTypeDTO, WidgetType> {
    @Mapping(target = "widgetType", source = "widgetType", qualifiedByName = "dataSourceId")
    WidgetTypeDTO toDto(WidgetType s);

    @Named("dataSourceId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DataSourceDTO toDtoDataSourceId(DataSource dataSource);
}
