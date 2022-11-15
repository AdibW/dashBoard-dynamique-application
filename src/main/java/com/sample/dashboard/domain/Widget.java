package com.sample.dashboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Widget.
 */
@Document(collection = "widget")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Widget implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("title")
    private String title;

    @Field("component_name")
    private String componentName;

    @Field("component_type")
    private String componentType;

    @DBRef
    @Field("widget")
    private WidgetType widget;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Widget id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Widget name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return this.title;
    }

    public Widget title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComponentName() {
        return this.componentName;
    }

    public Widget componentName(String componentName) {
        this.setComponentName(componentName);
        return this;
    }

    public void setComponentName(String componentName) {
        this.componentName = componentName;
    }

    public String getComponentType() {
        return this.componentType;
    }

    public Widget componentType(String componentType) {
        this.setComponentType(componentType);
        return this;
    }

    public void setComponentType(String componentType) {
        this.componentType = componentType;
    }

    public WidgetType getWidget() {
        return this.widget;
    }

    public void setWidget(WidgetType widgetType) {
        this.widget = widgetType;
    }

    public Widget widget(WidgetType widgetType) {
        this.setWidget(widgetType);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Widget)) {
            return false;
        }
        return id != null && id.equals(((Widget) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Widget{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", title='" + getTitle() + "'" +
            ", componentName='" + getComponentName() + "'" +
            ", componentType='" + getComponentType() + "'" +
            "}";
    }
}
