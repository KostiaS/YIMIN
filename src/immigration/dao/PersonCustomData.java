package immigration.dao;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


@Entity
public class PersonCustomData {
	
	String value;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int PersonCustomDataId;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "PersonDataId")
	PersonData personData;
	
	@ManyToOne
	private FieldNames fieldNames;
	
	public PersonCustomData(String value, PersonData personData) {
		super();
		this.value = value;
		this.personData = personData;
	}


	public PersonCustomData() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "PersonCustomData [value=" + value + ", PersonDataid="
				+ PersonCustomDataId + ", personData=" + personData + "]";
	}

	public void setPersonCustomDataId(int personCustomDataId) {
		PersonCustomDataId = personCustomDataId;
	}

	public FieldNames getFieldNames() {
		return fieldNames;
	}


	public void setFieldNames(FieldNames fieldNames) {
		this.fieldNames = fieldNames;
	}


	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getPersonCustomDataId() {
		return PersonCustomDataId;
	}

	public PersonData getPersonData() {
		return personData;
	}

	public void setPersonData(PersonData personData) {
		this.personData = personData;
	}
	
	
}
