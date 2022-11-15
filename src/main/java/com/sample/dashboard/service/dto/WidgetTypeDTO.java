package com.sample.dashboard.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sample.dashboard.domain.WidgetType} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WidgetTypeDTO implements Serializable {

    private String id;

    private String name;

    private DataSourceDTO widgetType;

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

    public DataSourceDTO getWidgetType() {
        return widgetType;
    }

    public void setWidgetType(DataSourceDTO widgetType) {
        this.widgetType = widgetType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WidgetTypeDTO)) {
            return false;
        }

        WidgetTypeDTO widgetTypeDTO = (WidgetTypeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, widgetTypeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WidgetTypeDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", widgetType=" + getWidgetType() +
            "}";
    }
}
