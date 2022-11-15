package com.sample.dashboard.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A ApiBannette.
 */
@Document(collection = "api_bannette")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ApiBannette implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("api_initial_load")
    private String apiInitialLoad;

    @Field("api_search")
    private String apiSearch;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ApiBannette id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApiInitialLoad() {
        return this.apiInitialLoad;
    }

    public ApiBannette apiInitialLoad(String apiInitialLoad) {
        this.setApiInitialLoad(apiInitialLoad);
        return this;
    }

    public void setApiInitialLoad(String apiInitialLoad) {
        this.apiInitialLoad = apiInitialLoad;
    }

    public String getApiSearch() {
        return this.apiSearch;
    }

    public ApiBannette apiSearch(String apiSearch) {
        this.setApiSearch(apiSearch);
        return this;
    }

    public void setApiSearch(String apiSearch) {
        this.apiSearch = apiSearch;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApiBannette)) {
            return false;
        }
        return id != null && id.equals(((ApiBannette) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApiBannette{" +
            "id=" + getId() +
            ", apiInitialLoad='" + getApiInitialLoad() + "'" +
            ", apiSearch='" + getApiSearch() + "'" +
            "}";
    }
}
