package com.sample.dashboard.service.mapper;

import com.sample.dashboard.domain.Api;
import com.sample.dashboard.domain.ApiBannette;
import com.sample.dashboard.service.dto.ApiBannetteDTO;
import com.sample.dashboard.service.dto.ApiDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Api} and its DTO {@link ApiDTO}.
 */
@Mapper(componentModel = "spring")
public interface ApiMapper extends EntityMapper<ApiDTO, Api> {
    @Mapping(target = "api", source = "api", qualifiedByName = "apiBannetteId")
    ApiDTO toDto(Api s);

    @Named("apiBannetteId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ApiBannetteDTO toDtoApiBannetteId(ApiBannette apiBannette);
}
