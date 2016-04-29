package immigration.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
public class Way {
Date startDate;
Date endDate;
boolean isFinished;

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
@Column(name = "WayId")
int WayId;

@ManyToOne
Programs program;

@ManyToOne
@JoinColumn(name = "PersonDataId")
PersonData personData;

@OneToMany (mappedBy = "way")
List <WayDocuments> requiredDocuments;

@OneToMany (mappedBy = "way")
List <WaySteps> stepsToDo;


public Way(Date startDate, Date endDate, boolean isFinished) {
	super();
	this.startDate = startDate;
	this.endDate = endDate;
	this.isFinished = isFinished;
}

public Way() {
	super();
	// TODO Auto-generated constructor stub
}




@Override
public String toString() {
	return "Way [startDate=" + startDate + ", endDate=" + endDate + ", isFinished=" + isFinished + ", WayId=" + WayId
			+ ", program=" + program + ", personData=" + personData + ", requiredDocuments=" + requiredDocuments
			+ ", stepsToDo=" + stepsToDo + "]";
}

public List<WayDocuments> getRequiredDocuments() {
	return requiredDocuments;
}

public void setRequiredDocuments(List<WayDocuments> requiredDocuments) {
	this.requiredDocuments = requiredDocuments;
}

public List<WaySteps> getStepsToDo() {
	return stepsToDo;
}

public void setStepsToDo(List<WaySteps> stepsToDo) {
	this.stepsToDo = stepsToDo;
}

public PersonData getPersonData() {
	return personData;
}

public void setPersonData(PersonData personData) {
	this.personData = personData;
}


public Programs getProgram() {
	return program;
}

public void setProgram(Programs program) {
	this.program = program;
}

public Date getStartDate() {
	return startDate;
}

public void setStartDate(Date startDate) {
	this.startDate = startDate;
}

public Date getEndDate() {
	return endDate;
}

public void setEndDate(Date endDate) {
	this.endDate = endDate;
}

public boolean isFinished() {
	return isFinished;
}

public void setFinished(boolean isFinished) {
	this.isFinished = isFinished;
}

public int getWayId() {
	return WayId;
}

}
