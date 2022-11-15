package com.sample.dashboard.service.mapper;

import com.sample.dashboard.domain.Api;
import com.sample.dashboard.domain.DataSource;
import com.sample.dashboard.service.dto.ApiDTO;
import com.sample.dashboard.service.dto.DataSourceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DataSource} and its DTO {@link DataSourceDTO}.
 */
@Mapper(componentModel = "spring")
public interface DataSourceMapper extends EntityMapper<DataSourceDTO, DataSource> {
    @Mapping(target = "dataSource", source = "dataSource", qualifiedByName = "apiId")
    DataSourceDTO toDto(DataSource s);

    @Named("apiId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ApiDTO toDtoApiId(Api api);
}
