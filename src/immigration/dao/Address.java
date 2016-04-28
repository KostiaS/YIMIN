package immigration.dao;

import javax.persistence.*;


@Entity
public class Address {
	String street;
	String bld;
	int aprt;
	String region;
	String city;
	boolean mainAddress;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "addressId")
	int addressId;
	
	@ManyToOne
	@JoinColumn(name = "PersonDataId")
	PersonData personData;

	@ManyToOne
	Country country;
	
	@OneToOne
	@JoinColumn(name="EmbassyID")
	Embassy emb;

	public Address(String street, String bld, int aprt, String region,
			String city, boolean mainAddress) {
		super();
		this.street = street;
		this.bld = bld;
		this.aprt = aprt;
		this.region = region;
		this.city = city;
		this.mainAddress = mainAddress;
	}

	public Address() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public void setBld(String bld) {
		this.bld = bld;
	}

	@Override
	public String toString() {
		return "Address [street=" + street + ", bld=" + bld + ", aprt=" + aprt
				+ ", region=" + region + ", city=" + city + ", mainAddress="
				+ mainAddress + ", addressId=" + addressId + ", personData="
				+ personData + ", country=" + country + "]";
	}



	public Embassy getEmb() {
		return emb;
	}

	public void setEmb(Embassy emb) {
		this.emb = emb;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getBld() {
		return bld;
	}

	public int getAprt() {
		return aprt;
	}

	public void setAprt(int aprt) {
		this.aprt = aprt;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public boolean isMainAddress() {
		return mainAddress;
	}

	public void setMainAddress(boolean mainAddress) {
		this.mainAddress = mainAddress;
	}

	public int getAddressId() {
		return addressId;
	}

	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}

	public PersonData getPersonData() {
		return personData;
	}

	public void setPersonData(PersonData personData) {
		this.personData = personData;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}
	
	
	
}
