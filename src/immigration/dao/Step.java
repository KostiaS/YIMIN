// Create by Sergey Nov 20, 2015 7:11:21 PM
package immigration.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "step")
public class Step {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "name", columnDefinition = "VARCHAR(255) NOT NULL UNIQUE DEFAULT ''")
	// @Column(name = "name", unique = true, nullable = false)
	private String name;

	private String description;

	public Step() {
	}

	public Step(String name, String description) {
		this.name = name;
		this.description = description;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Step [id=" + id + ", name=" + name + ", description=" + description + "]";
	}

}
