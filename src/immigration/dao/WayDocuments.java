package immigration.dao;

import javax.persistence.*;

@Entity
public class WayDocuments {
boolean isReady;

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
@Column(name = "WayDocumentsId")
int WayDocumentsId;

@ManyToOne
PersonDocuments personDocument;

@ManyToOne
Documents requiredDocument;

@ManyToOne
@JoinColumn(name = "WayId")
Way way;

public WayDocuments(boolean isReady) {
	super();
	this.isReady = isReady;
}

public WayDocuments() {
	super();
	// TODO Auto-generated constructor stub
}

@Override
public String toString() {
	return "WayDocuments [isReady=" + isReady + ", WayDocumentsId="
			+ WayDocumentsId + ", personDocument=" + personDocument
			+ ", requiredDocument=" + requiredDocument + "]";
}

	public boolean isReady() {
		return isReady;
	}

	public Way getWay() {
	return way;
}

public void setWay(Way way) {
	this.way = way;
}

public void setReady(boolean isReady) {
	this.isReady = isReady;
}


public PersonDocuments getPersonDocument() {
	return personDocument;
}

public void setPersonDocument(PersonDocuments personDocument) {
	this.personDocument = personDocument;
}

public Documents getRequiredDocument() {
	return requiredDocument;
}

public void setRequiredDocument(Documents requiredDocument) {
	this.requiredDocument = requiredDocument;
}

public int getWayDocumentsId() {
	return WayDocumentsId;
}

	public void setWayDocumentsId(int wayDocumentsId) {
		WayDocumentsId = wayDocumentsId;
	}
}
