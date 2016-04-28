package immigration.dao;

 
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
public class PersonData   {
	String identify;
	
	@Temporal(TemporalType.DATE)
	Date birthdate;
	
	String firstName;
	String lastName;
	char gender;
	String familyStatus;
	String workphone;
	String mobilephone;
	String homephone;
	String ocupation;
	String education;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PersonDataId")
	int PersonDataId;
	
	@ManyToMany 
	@JoinTable(name="PersonData_Country",joinColumns=@JoinColumn(name="PersonDataId"),inverseJoinColumns=@JoinColumn(name="CountryId"))
	List <Country> citizenship;
	
	@ManyToOne
	Country birthplace;
	/*
	@OneToMany
	@JoinTable(name="Way",joinColumns={@JoinColumn(name="PersonDataId")},inverseJoinColumns={@JoinColumn(name="WayId")})
	List <Way> programmWays;
	
  @OneToMany
	@JoinTable(name="PersonDocuments",joinColumns={@JoinColumn(name="PersonDataId")},inverseJoinColumns={@JoinColumn(name="PersonDocId")})
	List<PersonDocuments> documents;
	
	@OneToMany
	@JoinTable(name="Address",joinColumns={@JoinColumn(name="PersonDataId")},inverseJoinColumns={@JoinColumn(name="addressId")})
	List<Address> addresses;
	
	@OneToMany
	@JoinTable(name="PersonCustomData",joinColumns={@JoinColumn(name="PersonDataId")},inverseJoinColumns={@JoinColumn(name="PersonDataid")})
	List <PersonCustomData> customData;*/

	public PersonData(String identify, Date birthdate, String firstName,
			String lastName, char gender, String familyStatus,
			String workphone, String mobilephone, String homephone,
			String ocupation, String education) {
		super();
		this.identify = identify;
		this.birthdate = birthdate;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.familyStatus = familyStatus;
		this.workphone = workphone;
		this.mobilephone = mobilephone;
		this.homephone = homephone;
		this.ocupation = ocupation;
		this.education = education;
	}

	public PersonData() {
		super();
	}
	
	
	@Override
	public String toString() {
		return "PersonData [identify=" + identify + ", birthdate=" + birthdate
				+ ", firstName=" + firstName + ", lastName=" + lastName
				+ ", gender=" + gender + ", familyStatus=" + familyStatus
				+ ", workphone=" + workphone + ", mobilephone=" + mobilephone
				+ ", homephone=" + homephone + ", ocupation=" + ocupation
				+ ", education=" + education + ", PersonDataId=" + PersonDataId
				+ ", citizenship=" + citizenship + ", birthplace=" + birthplace
				+ "]";
	}

	public String getIdentify() {
		return identify;
	}

	public void setIdentify(String identify) {
		this.identify = identify;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public char getGender() {
		return gender;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

	public String getFamilyStatus() {
		return familyStatus;
	}

	public void setFamilyStatus(String familyStatus) {
		this.familyStatus = familyStatus;
	}

	public String getWorkphone() {
		return workphone;
	}

	public void setWorkphone(String workphone) {
		this.workphone = workphone;
	}

	public String getMobilephone() {
		return mobilephone;
	}

	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}

	public String getHomephone() {
		return homephone;
	}

	public void setHomephone(String homephone) {
		this.homephone = homephone;
	}

	public String getOcupation() {
		return ocupation;
	}

	public void setOcupation(String ocupation) {
		this.ocupation = ocupation;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public int getPersonDataId() {
		return PersonDataId;
	}

	public List<Country> getCitizenship() {
		return citizenship;
	}

	public void setCitizenship(List<Country> citizenship) {
		this.citizenship = citizenship;
	}

	public Country getBirthplace() {
		return birthplace;
	}

	public void setBirthplace(Country birthplace) {
		this.birthplace = birthplace;
	}
 
}