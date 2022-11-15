package com.sample.dashboard.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sample.dashboard.domain.Widget} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WidgetDTO implements Serializable {

    private String id;

    private String name;

    private String title;

    private String componentName;

    private String componentType;

    private WidgetTypeDTO widget;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComponentName() {
        return componentName;
    }

    public void setComponentName(String componentName) {
        this.componentName = componentName;
    }

    public String getComponentType() {
        return componentType;
    }

    public void setComponentType(String componentType) {
        this.componentType = componentType;
    }

    public WidgetTypeDTO getWidget() {
        return widget;
    }

    public void setWidget(WidgetTypeDTO widget) {
        this.widget = widget;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WidgetDTO)) {
            return false;
        }

        WidgetDTO widgetDTO = (WidgetDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, widgetDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WidgetDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", title='" + getTitle() + "'" +
            ", componentName='" + getComponentName() + "'" +
            ", componentType='" + getComponentType() + "'" +
            ", widget=" + getWidget() +
            "}";
    }
}
