package immigration.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "fieldnames")
public class FieldNames {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "name", columnDefinition = "VARCHAR(255) NOT NULL UNIQUE DEFAULT ''")
	// @Column(name = "name", unique = true, nullable = false)
	private String name;

	@Column(name = "possibleValues", nullable = false)
	private String possibleValues;

	public FieldNames() {
	}

	public FieldNames(String name, String possibleValues) {
		this.name = name;
	}

	public int getId() {
		return id;
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

	@Override
	public String toString() {
		return "FieldNames [id=" + id + ", name=" + name + ", possibleValues=" + possibleValues + "]";
	}
	
}
