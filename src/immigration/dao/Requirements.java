package immigration.dao;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;


/**
 * Created by UA C on 20.05.2016.
 */

@Entity
public class Requirements {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int RequirementsId;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL UNIQUE DEFAULT ''")
    String value;

    @ManyToOne
    private FieldNames fieldNames;

    @JsonIgnore
    @ManyToOne
    Programs programs;

    public Requirements() {
        super();
    }

    public int getRequirementsId() {
        return RequirementsId;
    }

    public void setRequirementsId(int requirementsId) {
        RequirementsId = requirementsId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public FieldNames getFieldNames() {
        return fieldNames;
    }

    public void setFieldNames(FieldNames fieldNames) {
        this.fieldNames = fieldNames;
    }

    public Programs getPrograms() {
        return programs;
    }

    public void setPrograms(Programs programs) {
        this.programs = programs;
    }

    @Override
    public String toString() {
        return "Requirements{" +
                "RequirementsId=" + RequirementsId +
                ", value='" + value + '\'' +
                ", fieldNames=" + fieldNames +
                ", programs=" + programs +
                '}';
    }
}
