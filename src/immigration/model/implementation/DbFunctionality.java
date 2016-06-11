package immigration.model.implementation;

import javax.persistence.*;
/**
 * Created by Shanin Dima 3620849@gmail.com on 18.03.2016.
 */
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import immigration.dao.*;
import immigration.model.interfaces.IModel;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.mapping.Collection;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

import java.util.Base64;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Shanin Dima 3620849@gmail.com on 18.03.2016.
 */
public class DbFunctionality implements IModel {

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
        personData.setBirthplace(getObjectFromDbById(Country.class, countryId));
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
        Query query = em.createQuery("select category from Programs p where p.country.CountryId = " + country.getCountryId());
        return query.getResultList();
    }

    @Override
    public List<Programs> getProgram(ObjectNode jsonObject) {
        Country country = getObjectFromJson(jsonObject,0,Country.class);
        Programs programs = getObjectFromJson(jsonObject,1,Programs.class);
        String parsedCategory = programs.getCategory();
        Query query = em.createQuery("select p from Programs p where p.country.CountryId = " + country.getCountryId() + " and category = '" + parsedCategory + "'");
        return query.getResultList();
    }

    @Override
    public List<ProgramStep> getProgramStepByCountry(Programs program) {
        Query query = em.createQuery(" select p from ProgramStep p where p.program.ProgramId =" + program.getProgramId());
        return query.getResultList();
    }

    @Override
    public List<Documents> getDocumentsByProgramId(Programs programs) {
        Query query = em.createQuery("select p from Documents p where p.prog.ProgramId =" + programs.getProgramId());
        return query.getResultList();
    }

    @Override
    public Blob getDocById(Documents document) {
        return em.find(Documents.class, document.getDocId()).getFile();
    }

    @Override
    public Blob getMaskByDocId(Documents document) {
        return em.find(Documents.class, document.getDocId()).getMask();
    }

    @Override
    public List<PersonCustomData> getPersonCustomDataByPersonId(Person person) {
        Query query = em.createQuery("select pcd from PersonCustomData pcd where pcd.personData.person.PersonId =" + person.getPersonId());
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
    public <T> T getObjectFromDbById(Class<T> nameOfClass, int objectId) {
        String className = nameOfClass.getSimpleName();
        Query q = em.createQuery("SELECT p FROM " + className + " p WHERE p.id = ?1");
        q.setParameter(1, objectId);
        T choosenObject = null;
        try {
            choosenObject = (T) q.getSingleResult();
        } catch (Exception e) {
            System.err.println("em not found object " + className + " in DB with id" + "[ max value" + objectId + "]");
        }
        return choosenObject;
    }

    @SuppressWarnings("unchecked")
    public <T> List<T> getGetObjectListFromDbByClassName(Class<T> nameOfClass) {
        String className = nameOfClass.getSimpleName();
        System.out.println(className);
        return em.createQuery("SELECT p FROM " + className + " p").getResultList();
    }

    @Transactional
    @Override
    public boolean addProgramInWay(ObjectNode jsonObject) {
        Person person = getObjectFromJson(jsonObject, 0, Person.class);
        Programs programs = getObjectFromJson(jsonObject, 1, Programs.class);
        addDocumentsFieldInPersonCustomData(person,programs);
        Way way = new Way();
        way.setPersonData(getPersonDataById(person.getPersonId()));
        way.setProgram(programs);
        em.persist(way);
        generateWaySteps(way.getWayId(), programs.getProgramId());
        generateWayDocuments(way.getWayId(), programs.getProgramId());
        return true;
    }
    @Transactional
    private void addDocumentsFieldInPersonCustomData(Person person, Programs programs) {
        int personId = person.getPersonId();
        int programId = programs.getProgramId();

        Query query = em.createQuery("select distinct p.name from Documents d, in (d.documentField) p" +
            " where d.DocId in (select d.DocId from Documents d where d.prog.ProgramId = ?1) and p.flagPersonData = false");
        query.setParameter(1,programId);
        List<String> fields = query.getResultList();
        Query filterQuery = em.createQuery("select pcd.fieldNames.name from PersonCustomData pcd where pcd.personData.person.id = ?1");
        filterQuery.setParameter(1,personId);
        List<String> filterList = filterQuery.getResultList();
        fields = filter(fields,filterList);
        for(int i = 0;i<fields.size();i++){

            PersonCustomData pcd = new PersonCustomData();
            pcd.setPersonData(getPersonDataById(personId));
            pcd.setValue("");
            pcd.setFieldNames(findOrAddFieldName(fields.get(i)));
            em.persist(pcd);
        }
    }

    private List<String> filter(List<String> fields, List<String> filterList) {
       Iterator<String> fldIter = fields.iterator();
        while (fldIter.hasNext()){
            String elem = fldIter.next();
            for(String x : filterList){
                if(elem.equals(x)){
                    fldIter.remove();
                    break;
                }
            }
        }
        return fields;
    }

    @Transactional
    private FieldNames findOrAddFieldName(String field) {
        if (field==null)return null;
        Query query = em.createQuery("select fn from FieldNames fn where fn.name = '"+field+"'");
        List list = query.getResultList();
            if (list.isEmpty()){
            System.out.println("no field in fieldNames table ");
            System.out.println("add new field in fieldNames");
                FieldNames fn = new FieldNames();
                        fn.setName(field);
                fn.setPossibleValues("xxx");
            em.persist(fn);
            return fn;
        }

        return (FieldNames)list.get(0);
    }

    @Transactional
    private boolean generateWayDocuments(int wayId, int programId) {
        Query query = em.createQuery("select doc from Documents doc where doc.prog.ProgramId =" + programId);
        List docList = query.getResultList();
        for (int i = 0; i < docList.size(); i++) {
            WayDocuments wayDocuments = new WayDocuments();
            wayDocuments.setReady(false);
            wayDocuments.setRequiredDocument((Documents) docList.get(i));
            wayDocuments.setWay(getObjectFromDbById(Way.class, wayId));
            em.persist(wayDocuments);
            em.clear();
        }
        return true;
    }

    private PersonData getPersonDataByPersonId(int personDataId) {
        return (PersonData) em.createQuery("select pd from PersonData pd where pd.PersonDataId =" + personDataId).getSingleResult();
    }

    @Transactional
    private boolean generateWaySteps(int wayId, int programId) {
        List programlist = em.createQuery("select ps from ProgramStep ps where ps.program.ProgramId =" + programId).getResultList();
        int coutnOfSteps = programlist.size();
        for (int i = 0; i < coutnOfSteps; i++) {
            WaySteps waysteps = new WaySteps();
            waysteps.setDone(false);
            //waysteps.setInformation("");
            waysteps.setProgSteps((ProgramStep) programlist.get(i));
            waysteps.setWay(getObjectFromDbById(Way.class, wayId));
            em.persist(waysteps);
            em.clear();

        }
        return true;
    }

    @Override
    public List<Way> getProgramsListFromWay(Person person) {
        return em.createQuery("select w from Way w where w.personData.person.id =" + person.getPersonId()).getResultList();
    }

    @Transactional
    @Override
    public boolean deleteProgramFromWay(ObjectNode jsonObject) {
        Person person = getObjectFromJson(jsonObject,0,Person.class);
        Programs programs = getObjectFromJson(jsonObject,1,Programs.class);
        Query getWayId = em.createQuery("select w.WayId from Way w where w.program.ProgramId = ?1 and w.personData.person.PersonId = ?2");
        getWayId.setParameter(2, person.getPersonId()).setParameter(1, programs.getProgramId());
        int wayId = (Integer) getWayId.getSingleResult();

        int wdDel = em.createQuery("delete from WayDocuments wd where wd.way.WayId = " + wayId).executeUpdate();
        int wsDel = em.createQuery("delete from WaySteps ws where ws.way.WayId =" + wayId).executeUpdate();

        Query query = em.createQuery("delete from Way w where w.WayId = " + wayId);

        int i = query.executeUpdate();
        return i > 0 ? true : false;
    }

    public <T> T getObjectFromJson(ObjectNode jsonObj, int index, Class<T> nameOfClass) {
        ObjectMapper om = new ObjectMapper();
        T choosenObject = null;
        try {
            choosenObject = om.readValue(jsonObj.get("param").get(index).toString(), nameOfClass);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return choosenObject;
    }

    @Override
    public int getValutationOfWayProg(ObjectNode jsonObject) {
        Person person = getObjectFromJson(jsonObject, 0, Person.class);
        Programs programs = getObjectFromJson(jsonObject, 1, Programs.class);
        Query query = em.createQuery("select ws.isDone from WaySteps ws where ws.way.WayId = " +
                "(select w.WayId from Way w where w.program.ProgramId = ?1 and w.personData.person.PersonId = ?2)");
        query.setParameter(1, programs.getProgramId()).setParameter(2, person.getPersonId());
        List result = query.getResultList();
        int totalSteps = result.size();
        if (totalSteps == 0) return 100;
        int eachStepPcnt = 100 / totalSteps;
        int totalPcnt = 0;
        for (Object x : result) {
            if ((Boolean) x) totalPcnt += eachStepPcnt;
        }
        return totalPcnt;
    }

    @Override
    public List<DocumentField> getListOfDocumentFields(Documents documents) {
        Query query = em.createQuery("select distinct p from Documents d, in (d.documentField)p where d.DocId =" + documents.getDocId());
        return query.getResultList();
    }

    @Transactional
    @Override
    public void addPersonDocInWay(Way way, Documents requiredDocument, String downloadedDoc) {
        byte[] downloadedDocDecoded = Base64.getDecoder().decode(downloadedDoc);
        Blob document = Hibernate.getLobCreator(em.unwrap(Session.class)).createBlob(downloadedDocDecoded);
        PersonDocuments personDocument = new PersonDocuments();
        personDocument.setDocument(document);
        PersonData personData = getPersonDataByWayId(way.getWayId());
        personDocument.setPersonData(personData);
        em.persist(personDocument);
        int wayDocumentId = (Integer) em.createQuery("select wd.WayDocumentsId from WayDocuments wd where wd.way.WayId =" + way.getWayId()
                + "and wd.requiredDocument.DocId=" + requiredDocument.getDocId()).getSingleResult();
        WayDocuments wayDocument = em.find(WayDocuments.class, wayDocumentId);
        wayDocument.setPersonDocument(personDocument);
        wayDocument.setReady(true);
        em.merge(wayDocument);
    }


    private PersonData getPersonDataByWayId(int wayId) {
        int PersonDataId = (Integer) em.createQuery("select w.personData.PersonDataId" +
                " from Way w where w.WayId =" + wayId).getSingleResult();
        return em.find(PersonData.class, PersonDataId);
    }

    @Override
    public List<WayDocuments> getListOfRequiredDoc(Way way) {
        return em.createQuery("select wd from WayDocuments wd where wd.way.WayId =" + way.getWayId()).getResultList();
    }

    @Transactional
    @Override
    public void setCheckboxOfWayDoc(WayDocuments wayDocuments) {
        WayDocuments wdFromDb = em.find(WayDocuments.class, wayDocuments.getWayDocumentsId());
        wdFromDb.setReady(wayDocuments.isReady());
        em.merge(wdFromDb);
    }
}
