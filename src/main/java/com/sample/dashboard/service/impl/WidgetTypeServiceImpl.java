package com.sample.dashboard.service.impl;

import com.sample.dashboard.domain.WidgetType;
import com.sample.dashboard.repository.WidgetTypeRepository;
import com.sample.dashboard.service.WidgetTypeService;
import com.sample.dashboard.service.dto.WidgetTypeDTO;
import com.sample.dashboard.service.mapper.WidgetTypeMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link WidgetType}.
 */
@Service
public class WidgetTypeServiceImpl implements WidgetTypeService {

    private final Logger log = LoggerFactory.getLogger(WidgetTypeServiceImpl.class);

    private final WidgetTypeRepository widgetTypeRepository;

    private final WidgetTypeMapper widgetTypeMapper;

    public WidgetTypeServiceImpl(WidgetTypeRepository widgetTypeRepository, WidgetTypeMapper widgetTypeMapper) {
        this.widgetTypeRepository = widgetTypeRepository;
        this.widgetTypeMapper = widgetTypeMapper;
    }

    @Override
    public WidgetTypeDTO save(WidgetTypeDTO widgetTypeDTO) {
        log.debug("Request to save WidgetType : {}", widgetTypeDTO);
        WidgetType widgetType = widgetTypeMapper.toEntity(widgetTypeDTO);
        widgetType = widgetTypeRepository.save(widgetType);
        return widgetTypeMapper.toDto(widgetType);
    }

    @Override
    public WidgetTypeDTO update(WidgetTypeDTO widgetTypeDTO) {
        log.debug("Request to update WidgetType : {}", widgetTypeDTO);
        WidgetType widgetType = widgetTypeMapper.toEntity(widgetTypeDTO);
        widgetType = widgetTypeRepository.save(widgetType);
        return widgetTypeMapper.toDto(widgetType);
    }

    @Override
    public Optional<WidgetTypeDTO> partialUpdate(WidgetTypeDTO widgetTypeDTO) {
        log.debug("Request to partially update WidgetType : {}", widgetTypeDTO);

        return widgetTypeRepository
            .findById(widgetTypeDTO.getId())
            .map(existingWidgetType -> {
                widgetTypeMapper.partialUpdate(existingWidgetType, widgetTypeDTO);

                return existingWidgetType;
            })
            .map(widgetTypeRepository::save)
            .map(widgetTypeMapper::toDto);
    }

    @Override
    public List<WidgetTypeDTO> findAll() {
        log.debug("Request to get all WidgetTypes");
        return widgetTypeRepository.findAll().stream().map(widgetTypeMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Optional<WidgetTypeDTO> findOne(String id) {
        log.debug("Request to get WidgetType : {}", id);
        return widgetTypeRepository.findById(id).map(widgetTypeMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete WidgetType : {}", id);
        widgetTypeRepository.deleteById(id);
    }
}
