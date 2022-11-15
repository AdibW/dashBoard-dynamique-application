package com.sample.dashboard.service.impl;

import com.sample.dashboard.domain.ApiBannette;
import com.sample.dashboard.repository.ApiBannetteRepository;
import com.sample.dashboard.service.ApiBannetteService;
import com.sample.dashboard.service.dto.ApiBannetteDTO;
import com.sample.dashboard.service.mapper.ApiBannetteMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link ApiBannette}.
 */
@Service
public class ApiBannetteServiceImpl implements ApiBannetteService {

    private final Logger log = LoggerFactory.getLogger(ApiBannetteServiceImpl.class);

    private final ApiBannetteRepository apiBannetteRepository;

    private final ApiBannetteMapper apiBannetteMapper;

    public ApiBannetteServiceImpl(ApiBannetteRepository apiBannetteRepository, ApiBannetteMapper apiBannetteMapper) {
        this.apiBannetteRepository = apiBannetteRepository;
        this.apiBannetteMapper = apiBannetteMapper;
    }

    @Override
    public ApiBannetteDTO save(ApiBannetteDTO apiBannetteDTO) {
        log.debug("Request to save ApiBannette : {}", apiBannetteDTO);
        ApiBannette apiBannette = apiBannetteMapper.toEntity(apiBannetteDTO);
        apiBannette = apiBannetteRepository.save(apiBannette);
        return apiBannetteMapper.toDto(apiBannette);
    }

    @Override
    public ApiBannetteDTO update(ApiBannetteDTO apiBannetteDTO) {
        log.debug("Request to update ApiBannette : {}", apiBannetteDTO);
        ApiBannette apiBannette = apiBannetteMapper.toEntity(apiBannetteDTO);
        apiBannette = apiBannetteRepository.save(apiBannette);
        return apiBannetteMapper.toDto(apiBannette);
    }

    @Override
    public Optional<ApiBannetteDTO> partialUpdate(ApiBannetteDTO apiBannetteDTO) {
        log.debug("Request to partially update ApiBannette : {}", apiBannetteDTO);

        return apiBannetteRepository
            .findById(apiBannetteDTO.getId())
            .map(existingApiBannette -> {
                apiBannetteMapper.partialUpdate(existingApiBannette, apiBannetteDTO);

                return existingApiBannette;
            })
            .map(apiBannetteRepository::save)
            .map(apiBannetteMapper::toDto);
    }

    @Override
    public List<ApiBannetteDTO> findAll() {
        log.debug("Request to get all ApiBannettes");
        return apiBannetteRepository.findAll().stream().map(apiBannetteMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Optional<ApiBannetteDTO> findOne(String id) {
        log.debug("Request to get ApiBannette : {}", id);
        return apiBannetteRepository.findById(id).map(apiBannetteMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete ApiBannette : {}", id);
        apiBannetteRepository.deleteById(id);
    }
}
