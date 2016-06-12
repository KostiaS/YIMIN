package immigration.model.Dto;

/**
 * Created by UA C on 12.06.2016.
 */
public class DtoPersonCustomData {
    String name;
    String possibleValues;
    String value;

    public DtoPersonCustomData() {
        super();
    }

    public DtoPersonCustomData(String name, String possibleValues, String value) {
        this.name = name;
        this.possibleValues = possibleValues;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPossibleValues() {
        return possibleValues;
    }

    public void setPossibleValues(String possibleValues) {
        this.possibleValues = possibleValues;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "DtoPersonCustomData{" +
                "name='" + name + '\'' +
                ", possibleValues='" + possibleValues + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
