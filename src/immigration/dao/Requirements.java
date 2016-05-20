package immigration.dao;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;


/**
 * Created by UA C on 20.05.2016.
 */

@Entity
public class Requirements {
    @GeneratedValue(strategy = GenerationType.AUTO)
    int RequirementsId;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL UNIQUE DEFAULT ''")
    String name;

    String posibleValues;

    @Override
    public String toString() {
        return "Requirements{" +
                "RequirementsId=" + RequirementsId +
                ", name='" + name + '\'' +
                ", posibleValues='" + posibleValues + '\'' +
                ", programs=" + programs +
                '}';
    }

    @JsonIgnore
    @ManyToOne
    Programs programs;

    public Requirements() {
        super();
    }

    public Requirements(String name, String posibleValues) {
        this.name = name;
        this.posibleValues = posibleValues;
    }

    public int getRequirementsId() {
        return RequirementsId;
    }

    public void setRequirementsId(int requirementsId) {
        RequirementsId = requirementsId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosibleValues() {
        return posibleValues;
    }

    public void setPosibleValues(String posibleValues) {
        this.posibleValues = posibleValues;
    }
}
