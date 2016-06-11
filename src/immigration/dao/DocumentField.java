package immigration.dao;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
public class DocumentField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String attribute;
    Boolean flagPersonData;

    public DocumentField() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public Boolean getFlagPersonData() {
        return flagPersonData;
    }

    public void setFlagPersonData(Boolean flagPersonData) {
        this.flagPersonData = flagPersonData;
    }

}