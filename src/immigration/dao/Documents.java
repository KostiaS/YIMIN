package immigration.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.SerializableString;
import com.fasterxml.jackson.databind.ser.std.SerializableSerializer;

import java.io.Serializable;
import java.sql.Blob;
import java.util.List;

import javax.persistence.*;

@Entity
public class Documents  {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int DocId;

	String type;
	String image;
    String nameOfFile;

    @JsonIgnore
	@Lob
	Blob file;

	@JsonIgnore
	@Lob
	Blob mask;

	@JsonIgnore
	@ManyToOne
	Programs prog;

	@JsonIgnore
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

    public int getDocId() {
        return DocId;
    }

	public Blob getMask() {
		return mask;
	}

	public void setMask(Blob mask) {
		this.mask = mask;
	}

	public String getNameOfFile() {
        return nameOfFile;
    }

    public void setNameOfFile(String nameOfFile) {
        this.nameOfFile = nameOfFile;
    }

    public Blob getFile() {
        return file;
    }

    public void setFile(Blob file) {
        this.file = file;
    }

    public void setDocId(int docId) {
        DocId = docId;
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
