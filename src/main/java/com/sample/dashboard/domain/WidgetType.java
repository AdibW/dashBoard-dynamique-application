package com.sample.dashboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A WidgetType.
 */
@Document(collection = "widget_type")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WidgetType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @DBRef
    @Field("widgetType")
    private DataSource widgetType;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public WidgetType id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public WidgetType name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DataSource getWidgetType() {
        return this.widgetType;
    }

    public void setWidgetType(DataSource dataSource) {
        this.widgetType = dataSource;
    }

    public WidgetType widgetType(DataSource dataSource) {
        this.setWidgetType(dataSource);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WidgetType)) {
            return false;
        }
        return id != null && id.equals(((WidgetType) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WidgetType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
