package immigration.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Blob;
import java.util.Date;

import javax.persistence.*;


@Entity
public class PersonDocuments {
    String documentType;
    @JsonIgnore
    @Lob
    Blob document;
    String language;
    String translation;
    boolean isTemporary;
    Date expirationDate;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "PersonDocumentId")
    int PersonDocId;

    @ManyToOne
    @JoinColumn(name = "PersonDataId")
    PersonData personData;

    public PersonDocuments() {
        super();
    }

    public PersonDocuments(String documentType, String linkToImage,
                           String language, String translation, boolean isTemporary,
                           Date expirationDate, int personDocId) {
        super();
        this.documentType = documentType;
        this.document = document;
        this.language = language;
        this.translation = translation;
        this.isTemporary = isTemporary;
        this.expirationDate = expirationDate;
    }


    @Override
    public String toString() {
        return "PersonDocuments [documentType=" + documentType + ", linkToImage="
                + document + ", language=" + language + ", translation="
                + translation + ", isTemporary=" + isTemporary
                + ", expirationDate=" + expirationDate + ", PersonDocId="
                + PersonDocId + "]";
    }

    public void setPersonDocId(int personDocId) {
        PersonDocId = personDocId;
    }

    public PersonData getPersonData() {
        return personData;
    }

    public void setPersonData(PersonData personData) {
        this.personData = personData;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public Blob getDocument() {
        return document;
    }

    public void setDocument(Blob document) {
        this.document = document;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public boolean isTemporary() {
        return isTemporary;
    }

    public void setTemporary(boolean isTemporary) {
        this.isTemporary = isTemporary;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public int getPersonDocId() {
        return PersonDocId;
    }


}
