package immigration.dao;

import javax.persistence.*;

@Entity
public class FamilyMember {
	String relation;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "MemberId")
	int MemberId;
	
	@OneToOne
	PersonData personData;
	
	
	@ManyToOne
	@JoinColumn(name = "PersonId")
	Person person;
	
	public FamilyMember(String relation, PersonData personData) {
		super();
		this.relation = relation;
		this.personData = personData;
	}

	public FamilyMember() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getRelation() {
		return relation;
	}
	
	

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}

	public PersonData getPersonData() {
		return personData;
	}

	public void setPersonData(PersonData personData) {
		this.personData = personData;
	}

	@Override
	public String toString() {
		return "FamilyMember [relation=" + relation + ", MemberId=" + MemberId
				+ ", personData=" + personData + "]";
	}
	
	
	
}
