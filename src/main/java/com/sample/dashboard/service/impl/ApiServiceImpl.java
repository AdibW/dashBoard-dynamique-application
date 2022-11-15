package com.sample.dashboard.service.impl;

import com.sample.dashboard.domain.Api;
import com.sample.dashboard.repository.ApiRepository;
import com.sample.dashboard.service.ApiService;
import com.sample.dashboard.service.dto.ApiDTO;
import com.sample.dashboard.service.mapper.ApiMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Api}.
 */
@Service
public class ApiServiceImpl implements ApiService {

    private final Logger log = LoggerFactory.getLogger(ApiServiceImpl.class);

    private final ApiRepository apiRepository;

    private final ApiMapper apiMapper;

    public ApiServiceImpl(ApiRepository apiRepository, ApiMapper apiMapper) {
        this.apiRepository = apiRepository;
        this.apiMapper = apiMapper;
    }

    @Override
    public ApiDTO save(ApiDTO apiDTO) {
        log.debug("Request to save Api : {}", apiDTO);
        Api api = apiMapper.toEntity(apiDTO);
        api = apiRepository.save(api);
        return apiMapper.toDto(api);
    }

    @Override
    public ApiDTO update(ApiDTO apiDTO) {
        log.debug("Request to update Api : {}", apiDTO);
        Api api = apiMapper.toEntity(apiDTO);
        api = apiRepository.save(api);
        return apiMapper.toDto(api);
    }

    @Override
    public Optional<ApiDTO> partialUpdate(ApiDTO apiDTO) {
        log.debug("Request to partially update Api : {}", apiDTO);

        return apiRepository
            .findById(apiDTO.getId())
            .map(existingApi -> {
                apiMapper.partialUpdate(existingApi, apiDTO);

                return existingApi;
            })
            .map(apiRepository::save)
            .map(apiMapper::toDto);
    }

    @Override
    public List<ApiDTO> findAll() {
        log.debug("Request to get all Apis");
        return apiRepository.findAll().stream().map(apiMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Optional<ApiDTO> findOne(String id) {
        log.debug("Request to get Api : {}", id);
        return apiRepository.findById(id).map(apiMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Api : {}", id);
        apiRepository.deleteById(id);
    }
}
