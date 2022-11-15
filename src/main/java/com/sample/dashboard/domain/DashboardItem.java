package com.sample.dashboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A DashboardItem.
 */
@Document(collection = "dashboard_item")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DashboardItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("x")
    private Integer x;

    @Field("y")
    private Integer y;

    @Field("rows")
    private Integer rows;

    @Field("col")
    private Integer col;

    @DBRef
    @Field("item")
    private Widget item;

    @DBRef
    @Field("items")
    private Dashboard items;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public DashboardItem id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getX() {
        return this.x;
    }

    public DashboardItem x(Integer x) {
        this.setX(x);
        return this;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return this.y;
    }

    public DashboardItem y(Integer y) {
        this.setY(y);
        return this;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public Integer getRows() {
        return this.rows;
    }

    public DashboardItem rows(Integer rows) {
        this.setRows(rows);
        return this;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public Integer getCol() {
        return this.col;
    }

    public DashboardItem col(Integer col) {
        this.setCol(col);
        return this;
    }

    public void setCol(Integer col) {
        this.col = col;
    }

    public Widget getItem() {
        return this.item;
    }

    public void setItem(Widget widget) {
        this.item = widget;
    }

    public DashboardItem item(Widget widget) {
        this.setItem(widget);
        return this;
    }

    public Dashboard getItems() {
        return this.items;
    }

    public void setItems(Dashboard dashboard) {
        this.items = dashboard;
    }

    public DashboardItem items(Dashboard dashboard) {
        this.setItems(dashboard);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DashboardItem)) {
            return false;
        }
        return id != null && id.equals(((DashboardItem) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DashboardItem{" +
            "id=" + getId() +
            ", x=" + getX() +
            ", y=" + getY() +
            ", rows=" + getRows() +
            ", col=" + getCol() +
            "}";
    }
}
