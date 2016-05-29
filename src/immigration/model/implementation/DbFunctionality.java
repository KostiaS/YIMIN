package immigration.model.implementation;

import javax.persistence.*;

import immigration.dao.*;
import immigration.model.interfaces.IModel;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

public class DbFunctionality implements IModel  {

    @PersistenceContext(unitName = "springHibernate", type = PersistenceContextType.EXTENDED)
    EntityManager em;

    @Transactional
    @Override
    public PersonData getPersonDataById(int idOfPerson) {

        Query query = em.createQuery("SELECT pd FROM PersonData pd Join pd.person p WHERE p.PersonId = ?1");
        query.setParameter(1, idOfPerson);
        PersonData personData = null;
        try {
            personData = (PersonData) query.getSingleResult();
        } catch (Exception e) {
            System.out.println("Error em not found PersonData with id idOfPerson");
        }
        return personData;
    }

    @Transactional
    @Override
    public boolean updatePersonData(PersonData personData) {
        em.merge(personData);
        return true;
    }

    @Override
    public boolean isPersonNew(int id) {
        return false;
    }

    @Transactional
    public PersonData createNewPersonData(PersonData personData) {
        em.persist(personData);
        return personData;
    }

    @Transactional
    public PersonData createNewPersonData(int countryId) {
        PersonData personData = new PersonData();
        personData.setBirthplace(getObjectFromDbById(Country.class,countryId));
        em.persist(personData);
        return personData;
    }

    @Transactional
    @Override
    public void createNewPerson(Person person, int countryId) {
        person.setPersonData(createNewPersonData(countryId));
        em.persist(person);
    }

    @Override
    public List<Country> getListOfCountry() {
       return getGetObjectListFromDbByClassName(Country.class);
    }

    @Override
    public List<Country> getListOfCountryWithEmbassy(Country countryWichEmbassySearched) {
        Query query = em.createQuery("select c FROM Country c WHERE id in  " +
                "(select e.location.CountryId from Embassy e WHERE e.country.CountryId = ?1)");
        query.setParameter(1, countryWichEmbassySearched.getCountryId());
        return query.getResultList();
    }

    @Override
    public List<Embassy> getEmbassyListOfCountry(Country countryOfEmbassy, Country locationCountry) {
        Query query = em.createQuery("select e from Embassy e where e.country.CountryId = ?1 and e.location.CountryId = ?2");
        query.setParameter(1, countryOfEmbassy.getCountryId()).setParameter(2, locationCountry.getCountryId());
        return query.getResultList();
    }

    @Override
    public List<String> getCategoryOfProgram(Country country) {
        Query query = em.createQuery("select category from Programs p where p.country.CountryId = "+country.getCountryId());
        return query.getResultList();
    }

    @Override
    public List<Programs> getProgram(Country country, Programs category) {
        String parsedCategory = category.getCategory();
        Query query = em.createQuery("select p from Programs p where p.country.CountryId = "+country.getCountryId()+" and category = '"+parsedCategory+"'");
        return query.getResultList();
    }

    @Override
    public List<ProgramStep> getProgramStepByCountry(Programs program) {
        Query query = em.createQuery(" select p from ProgramStep p where p.program.ProgramId ="+ program.getProgramId());
        return query.getResultList();
    }

    @Override
    public List<Documents> getDocumentsByProgramId(Programs programs) {
        Query query = em.createQuery("select p from Documents p where p.prog.ProgramId ="+programs.getProgramId());
        return query.getResultList();
    }

    @Override
    public Blob getDocById(Documents document) {
       return  em.find(Documents.class,document.getDocId()).getFile();
    }

    @Override
    public Blob getMaskByDocId(Documents document) {
        return  em.find(Documents.class,document.getDocId()).getMask();
    }

    @Override
    public List<PersonCustomData> getPersonCustomDataByPersonId(Person person) {
        Query query = em.createQuery("select pcd from PersonCustomData pcd where pcd.personData.person.PersonId ="+person.getPersonId());
        return query.getResultList();
    }
    @Transactional
    @Override
    public boolean updatePersonCustomData(PersonCustomData pcd) {
        em.merge(pcd);
        return true;
    }

    @Override
    public byte[] fromBlobToBase64ByteArray(Blob blob) {

        int blobLength = 0;
        byte[] blobAsBytes = null;
        try {
            blobLength = (int) blob.length();

            blobAsBytes = blob.getBytes(1, blobLength);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Base64.getEncoder().encode(blobAsBytes);

    }

    @SuppressWarnings("unchecked")
    public <T> T getObjectFromDbById (Class <T>  nameOfClass, int objectId){
        String className = nameOfClass.getSimpleName();
        Query q = em.createQuery ("SELECT p FROM "+className+" p WHERE p.id = ?1");
        q.setParameter(1, objectId);
        T choosenObject = null;
        try {
            choosenObject = (T)q.getSingleResult();
        } catch (Exception e) {
            System.err.println("em not found object "+className+" in DB with id"+"[ max value"+objectId+"]");
        }
        return choosenObject;
    }
    @SuppressWarnings("unchecked")
    public <T>List<T> getGetObjectListFromDbByClassName (Class <T>  nameOfClass) {
        String className = nameOfClass.getSimpleName();
        System.out.println(className);
        return em.createQuery("SELECT p FROM " + className + " p").getResultList();
    }
}
