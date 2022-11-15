package com.sample.dashboard.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sample.dashboard.domain.ApiBannette} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ApiBannetteDTO implements Serializable {

    private String id;

    private String apiInitialLoad;

    private String apiSearch;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApiInitialLoad() {
        return apiInitialLoad;
    }

    public void setApiInitialLoad(String apiInitialLoad) {
        this.apiInitialLoad = apiInitialLoad;
    }

    public String getApiSearch() {
        return apiSearch;
    }

    public void setApiSearch(String apiSearch) {
        this.apiSearch = apiSearch;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApiBannetteDTO)) {
            return false;
        }

        ApiBannetteDTO apiBannetteDTO = (ApiBannetteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, apiBannetteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApiBannetteDTO{" +
            "id='" + getId() + "'" +
            ", apiInitialLoad='" + getApiInitialLoad() + "'" +
            ", apiSearch='" + getApiSearch() + "'" +
            "}";
    }
}
