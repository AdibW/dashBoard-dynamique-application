package com.sample.dashboard.service.impl;

import com.sample.dashboard.domain.DashboardItem;
import com.sample.dashboard.repository.DashboardItemRepository;
import com.sample.dashboard.service.DashboardItemService;
import com.sample.dashboard.service.dto.DashboardItemDTO;
import com.sample.dashboard.service.mapper.DashboardItemMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link DashboardItem}.
 */
@Service
public class DashboardItemServiceImpl implements DashboardItemService {

    private final Logger log = LoggerFactory.getLogger(DashboardItemServiceImpl.class);

    private final DashboardItemRepository dashboardItemRepository;

    private final DashboardItemMapper dashboardItemMapper;

    public DashboardItemServiceImpl(DashboardItemRepository dashboardItemRepository, DashboardItemMapper dashboardItemMapper) {
        this.dashboardItemRepository = dashboardItemRepository;
        this.dashboardItemMapper = dashboardItemMapper;
    }

    @Override
    public DashboardItemDTO save(DashboardItemDTO dashboardItemDTO) {
        log.debug("Request to save DashboardItem : {}", dashboardItemDTO);
        DashboardItem dashboardItem = dashboardItemMapper.toEntity(dashboardItemDTO);
        dashboardItem = dashboardItemRepository.save(dashboardItem);
        return dashboardItemMapper.toDto(dashboardItem);
    }

    @Override
    public DashboardItemDTO update(DashboardItemDTO dashboardItemDTO) {
        log.debug("Request to update DashboardItem : {}", dashboardItemDTO);
        DashboardItem dashboardItem = dashboardItemMapper.toEntity(dashboardItemDTO);
        dashboardItem = dashboardItemRepository.save(dashboardItem);
        return dashboardItemMapper.toDto(dashboardItem);
    }

    @Override
    public Optional<DashboardItemDTO> partialUpdate(DashboardItemDTO dashboardItemDTO) {
        log.debug("Request to partially update DashboardItem : {}", dashboardItemDTO);

        return dashboardItemRepository
            .findById(dashboardItemDTO.getId())
            .map(existingDashboardItem -> {
                dashboardItemMapper.partialUpdate(existingDashboardItem, dashboardItemDTO);

                return existingDashboardItem;
            })
            .map(dashboardItemRepository::save)
            .map(dashboardItemMapper::toDto);
    }

    @Override
    public List<DashboardItemDTO> findAll() {
        log.debug("Request to get all DashboardItems");
        return dashboardItemRepository.findAll().stream().map(dashboardItemMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Optional<DashboardItemDTO> findOne(String id) {
        log.debug("Request to get DashboardItem : {}", id);
        return dashboardItemRepository.findById(id).map(dashboardItemMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete DashboardItem : {}", id);
        dashboardItemRepository.deleteById(id);
    }
}
