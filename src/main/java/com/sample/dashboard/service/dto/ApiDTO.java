package com.sample.dashboard.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sample.dashboard.domain.Api} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ApiDTO implements Serializable {

    private String id;

    private ApiBannetteDTO api;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ApiBannetteDTO getApi() {
        return api;
    }

    public void setApi(ApiBannetteDTO api) {
        this.api = api;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApiDTO)) {
            return false;
        }

        ApiDTO apiDTO = (ApiDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, apiDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApiDTO{" +
            "id='" + getId() + "'" +
            ", api=" + getApi() +
            "}";
    }
}
