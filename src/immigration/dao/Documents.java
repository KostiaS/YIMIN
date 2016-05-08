package immigration.dao;

import java.util.List;

import javax.persistence.*;

@Entity
public class Documents {
	
	String type;
	String image;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int DocId;
	
	@ManyToOne
	Programs prog;
	
	@OneToMany
	List <DocumentField> documentField;
	
	public Documents(String type, String image) {
		super();
		this.type = type;
		this.image = image;
	}

	public Documents() {
		super();
	}

	public List<DocumentField> getDocumentField() {
		return documentField;
	}

	public void setDocumentField(List<DocumentField> documentField) {
		this.documentField = documentField;
	}

	public Programs getProg() {
		return prog;
	}

	public void setProg(Programs prog) {
		this.prog = prog;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Documents [type=" + type + ", image=" + image + ", DocId="
				+ DocId + "]";
	}
	
	
}
