package immigration.dao; 

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Programs {
	public static final String NAME = "name";
	public static final String LINK = "link";
	public static final String DESCRIPTION = "description";
	public static final String CATEGORY = "category";
	public static final String ENABLED = "enabled";
	public static final String MODIFIED = "modified";
	public static final String STARTDATE = "startDate";
	public static final String PROGRAMID = "ProgramId";
	
	String name;
	String link;
	String description;
	String category;
	boolean enabled;
	Date modified;
	Date startDate;
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int ProgramId;
	
	@JsonIgnore
	@ManyToOne
	Country country;
	
	public void setProperties(Map<String, String> properties) throws NumberFormatException{
		{
			String property=null;
			property=properties.get(NAME);
			if(property != null&&property!="")
				name=property;
			property=properties.get(LINK);
			if(property != null&&property!="")
				link=property;
			property=properties.get(DESCRIPTION);
			if(property != null&&property!="")
				description=property;
			property=properties.get(CATEGORY);
			if(property != null&&property!="")
				category=property;
			property=properties.get(ENABLED);
			if(property == "false"||property!="true")
				enabled=Boolean.parseBoolean(property);
			property=properties.get(PROGRAMID);
			if(property != null&&property!="")
				ProgramId=Integer.parseInt(property);
		}
	}
	@JsonIgnore
	public Map<String, Object> getProperties(){
		Map<String, Object> res=new HashMap<String, Object>();
		res.put(NAME, name);
		res.put(LINK, link);
		res.put(DESCRIPTION, description);
		res.put(CATEGORY, category);
		res.put(ENABLED, enabled);
		res.put(PROGRAMID, ProgramId);
		return res;
	}
	
	
	
	@JsonIgnore
	public Country getCountry() {
		return country;
	}
	
	public void setCountry(Country country) {
		this.country = country;
	}
	
	

	
	public Programs(String name, String link, String description,String category){
		super();
		this.name=name;
		this.link=link;
		this.description=description;
		this.category = category;
	}
	
	
	public Programs() {
		super();
	}
	
	public Date getStartProgram() {
		return startDate;
	}
	@JsonIgnore
	@Override
	public String toString() {
		return "Programs [name=" + name + ", link=" + link + ", description=" + description + ", category=" + category
				+ ", enabled=" + enabled + ", modified=" + modified + ", startDate=" + startDate + ", ProgramId="
				+ ProgramId + ", country=" + country + "]";
	}
	public void setStartProgram(Date startProgram) {
		this.startDate = startProgram;
	}
	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	

	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	public void setProgramId(int programId) {
		ProgramId = programId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getProgramId() {
		return ProgramId;
	}


}
