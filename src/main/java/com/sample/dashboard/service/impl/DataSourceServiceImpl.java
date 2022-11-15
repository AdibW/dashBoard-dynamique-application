package com.sample.dashboard.service.impl;

import com.sample.dashboard.domain.DataSource;
import com.sample.dashboard.repository.DataSourceRepository;
import com.sample.dashboard.service.DataSourceService;
import com.sample.dashboard.service.dto.DataSourceDTO;
import com.sample.dashboard.service.mapper.DataSourceMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link DataSource}.
 */
@Service
public class DataSourceServiceImpl implements DataSourceService {

    private final Logger log = LoggerFactory.getLogger(DataSourceServiceImpl.class);

    private final DataSourceRepository dataSourceRepository;

    private final DataSourceMapper dataSourceMapper;

    public DataSourceServiceImpl(DataSourceRepository dataSourceRepository, DataSourceMapper dataSourceMapper) {
        this.dataSourceRepository = dataSourceRepository;
        this.dataSourceMapper = dataSourceMapper;
    }

    @Override
    public DataSourceDTO save(DataSourceDTO dataSourceDTO) {
        log.debug("Request to save DataSource : {}", dataSourceDTO);
        DataSource dataSource = dataSourceMapper.toEntity(dataSourceDTO);
        dataSource = dataSourceRepository.save(dataSource);
        return dataSourceMapper.toDto(dataSource);
    }

    @Override
    public DataSourceDTO update(DataSourceDTO dataSourceDTO) {
        log.debug("Request to update DataSource : {}", dataSourceDTO);
        DataSource dataSource = dataSourceMapper.toEntity(dataSourceDTO);
        dataSource = dataSourceRepository.save(dataSource);
        return dataSourceMapper.toDto(dataSource);
    }

    @Override
    public Optional<DataSourceDTO> partialUpdate(DataSourceDTO dataSourceDTO) {
        log.debug("Request to partially update DataSource : {}", dataSourceDTO);

        return dataSourceRepository
            .findById(dataSourceDTO.getId())
            .map(existingDataSource -> {
                dataSourceMapper.partialUpdate(existingDataSource, dataSourceDTO);

                return existingDataSource;
            })
            .map(dataSourceRepository::save)
            .map(dataSourceMapper::toDto);
    }

    @Override
    public List<DataSourceDTO> findAll() {
        log.debug("Request to get all DataSources");
        return dataSourceRepository.findAll().stream().map(dataSourceMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Optional<DataSourceDTO> findOne(String id) {
        log.debug("Request to get DataSource : {}", id);
        return dataSourceRepository.findById(id).map(dataSourceMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete DataSource : {}", id);
        dataSourceRepository.deleteById(id);
    }
}
