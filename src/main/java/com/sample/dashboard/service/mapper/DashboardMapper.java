package com.sample.dashboard.service.mapper;

import com.sample.dashboard.domain.Dashboard;
import com.sample.dashboard.service.dto.DashboardDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Dashboard} and its DTO {@link DashboardDTO}.
 */
@Mapper(componentModel = "spring")
public interface DashboardMapper extends EntityMapper<DashboardDTO, Dashboard> {}
