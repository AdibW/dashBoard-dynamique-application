package com.sample.dashboard.service.mapper;

import com.sample.dashboard.domain.ApiBannette;
import com.sample.dashboard.service.dto.ApiBannetteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ApiBannette} and its DTO {@link ApiBannetteDTO}.
 */
@Mapper(componentModel = "spring")
public interface ApiBannetteMapper extends EntityMapper<ApiBannetteDTO, ApiBannette> {}
