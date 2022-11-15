package com.sample.dashboard.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sample.dashboard.domain.DataSource} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DataSourceDTO implements Serializable {

    private String id;

    private String type;

    private ApiDTO dataSource;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ApiDTO getDataSource() {
        return dataSource;
    }

    public void setDataSource(ApiDTO dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DataSourceDTO)) {
            return false;
        }

        DataSourceDTO dataSourceDTO = (DataSourceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dataSourceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DataSourceDTO{" +
            "id='" + getId() + "'" +
            ", type='" + getType() + "'" +
            ", dataSource=" + getDataSource() +
            "}";
    }
}
