package immigration.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "programcustomdata")
public class ProgramCustomData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "value", columnDefinition = "VARCHAR(255) NOT NULL DEFAULT ''")
	// @Column(name = "value", nullable = false)
	private String value;

	@ManyToOne
	@JoinColumn(name = "id_fieldnames", referencedColumnName = "id", nullable = false)
	private FieldNames fieldNames;

	@ManyToOne
	@JoinColumn(name = "id_program", referencedColumnName = "ProgramId", nullable = false)
	private Programs program;
	// private transient Program program;

	public ProgramCustomData() {
	}

	public ProgramCustomData(Programs program, FieldNames fieldNames, String value) {
		this.program = program;
		this.fieldNames = fieldNames;
		this.value = value;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Programs getProgram() {
		return program;
	}

	public void setProgram(Programs program) {
		this.program = program;
	}

	@Override
	public String toString() {
		return "ProgramCustomData [id=" + id + ", value=" + value + ", fieldNames=" + fieldNames + ", program=" + program + "]";
	}
	
}
