package com.sample.dashboard.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sample.dashboard.domain.Dashboard} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DashboardDTO implements Serializable {

    private String id;

    private String name;

    private String username;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DashboardDTO)) {
            return false;
        }

        DashboardDTO dashboardDTO = (DashboardDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dashboardDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DashboardDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", username='" + getUsername() + "'" +
            "}";
    }
}
