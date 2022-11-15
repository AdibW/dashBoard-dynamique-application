package com.sample.dashboard.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Api.
 */
@Document(collection = "api")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Api implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("api")
    private ApiBannette api;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Api id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ApiBannette getApi() {
        return this.api;
    }

    public void setApi(ApiBannette apiBannette) {
        this.api = apiBannette;
    }

    public Api api(ApiBannette apiBannette) {
        this.setApi(apiBannette);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Api)) {
            return false;
        }
        return id != null && id.equals(((Api) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Api{" +
            "id=" + getId() +
            "}";
    }
}
