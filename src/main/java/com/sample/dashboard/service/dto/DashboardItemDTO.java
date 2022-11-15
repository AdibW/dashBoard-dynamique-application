package com.sample.dashboard.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sample.dashboard.domain.DashboardItem} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DashboardItemDTO implements Serializable {

    private String id;

    private Integer x;

    private Integer y;

    private Integer rows;

    private Integer col;

    private WidgetDTO item;

    private DashboardDTO items;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public Integer getCol() {
        return col;
    }

    public void setCol(Integer col) {
        this.col = col;
    }

    public WidgetDTO getItem() {
        return item;
    }

    public void setItem(WidgetDTO item) {
        this.item = item;
    }

    public DashboardDTO getItems() {
        return items;
    }

    public void setItems(DashboardDTO items) {
        this.items = items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DashboardItemDTO)) {
            return false;
        }

        DashboardItemDTO dashboardItemDTO = (DashboardItemDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dashboardItemDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DashboardItemDTO{" +
            "id='" + getId() + "'" +
            ", x=" + getX() +
            ", y=" + getY() +
            ", rows=" + getRows() +
            ", col=" + getCol() +
            ", item=" + getItem() +
            ", items=" + getItems() +
            "}";
    }
}
