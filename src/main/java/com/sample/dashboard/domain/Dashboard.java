package com.sample.dashboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Dashboard.
 */
@Document(collection = "dashboard")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Dashboard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("username")
    private String username;

    @DBRef
    @Field("dashboardItem")
    @JsonIgnoreProperties(value = { "item", "items" }, allowSetters = true)
    private Set<DashboardItem> dashboardItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Dashboard id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Dashboard name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return this.username;
    }

    public Dashboard username(String username) {
        this.setUsername(username);
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<DashboardItem> getDashboardItems() {
        return this.dashboardItems;
    }

    public void setDashboardItems(Set<DashboardItem> dashboardItems) {
        if (this.dashboardItems != null) {
            this.dashboardItems.forEach(i -> i.setItems(null));
        }
        if (dashboardItems != null) {
            dashboardItems.forEach(i -> i.setItems(this));
        }
        this.dashboardItems = dashboardItems;
    }

    public Dashboard dashboardItems(Set<DashboardItem> dashboardItems) {
        this.setDashboardItems(dashboardItems);
        return this;
    }

    public Dashboard addDashboardItem(DashboardItem dashboardItem) {
        this.dashboardItems.add(dashboardItem);
        dashboardItem.setItems(this);
        return this;
    }

    public Dashboard removeDashboardItem(DashboardItem dashboardItem) {
        this.dashboardItems.remove(dashboardItem);
        dashboardItem.setItems(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dashboard)) {
            return false;
        }
        return id != null && id.equals(((Dashboard) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Dashboard{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", username='" + getUsername() + "'" +
            "}";
    }
}
