package immigration.dao;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
public class DocumentField {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	@AttributeOverrides({
		@AttributeOverride(name="x", column= @Column(name="XleftUp")),
		@AttributeOverride(name="y", column= @Column(name="YleftUp"))
	})
	Point leftUp;
	@AttributeOverrides({
		@AttributeOverride(name="x", column= @Column(name="XrightDown")),
		@AttributeOverride(name="y", column= @Column(name="YrightDown"))
	})
	Point rightDown;
	String attribute;
	Boolean flagPersonData;
	
	public DocumentField() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Point getLeftUp() {
		return leftUp;
	}

	public void setLeftUp(Point leftUp) {
		this.leftUp = leftUp;
	}

	public Point getRightDown() {
		return rightDown;
	}

	public void setRightDown(Point rightDown) {
		this.rightDown = rightDown;
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