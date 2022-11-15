package com.sample.dashboard.service.impl;

import com.sample.dashboard.domain.Widget;
import com.sample.dashboard.repository.WidgetRepository;
import com.sample.dashboard.service.WidgetService;
import com.sample.dashboard.service.dto.WidgetDTO;
import com.sample.dashboard.service.mapper.WidgetMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Widget}.
 */
@Service
public class WidgetServiceImpl implements WidgetService {

    private final Logger log = LoggerFactory.getLogger(WidgetServiceImpl.class);

    private final WidgetRepository widgetRepository;

    private final WidgetMapper widgetMapper;

    public WidgetServiceImpl(WidgetRepository widgetRepository, WidgetMapper widgetMapper) {
        this.widgetRepository = widgetRepository;
        this.widgetMapper = widgetMapper;
    }

    @Override
    public WidgetDTO save(WidgetDTO widgetDTO) {
        log.debug("Request to save Widget : {}", widgetDTO);
        Widget widget = widgetMapper.toEntity(widgetDTO);
        widget = widgetRepository.save(widget);
        return widgetMapper.toDto(widget);
    }

    @Override
    public WidgetDTO update(WidgetDTO widgetDTO) {
        log.debug("Request to update Widget : {}", widgetDTO);
        Widget widget = widgetMapper.toEntity(widgetDTO);
        widget = widgetRepository.save(widget);
        return widgetMapper.toDto(widget);
    }

    @Override
    public Optional<WidgetDTO> partialUpdate(WidgetDTO widgetDTO) {
        log.debug("Request to partially update Widget : {}", widgetDTO);

        return widgetRepository
            .findById(widgetDTO.getId())
            .map(existingWidget -> {
                widgetMapper.partialUpdate(existingWidget, widgetDTO);

                return existingWidget;
            })
            .map(widgetRepository::save)
            .map(widgetMapper::toDto);
    }

    @Override
    public Page<WidgetDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Widgets");
        return widgetRepository.findAll(pageable).map(widgetMapper::toDto);
    }

    @Override
    public Optional<WidgetDTO> findOne(String id) {
        log.debug("Request to get Widget : {}", id);
        return widgetRepository.findById(id).map(widgetMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Widget : {}", id);
        widgetRepository.deleteById(id);
    }
}
