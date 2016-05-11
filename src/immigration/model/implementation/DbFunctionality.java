package immigration.model.implementation;

import javax.persistence.*;

import immigration.dao.*;
import immigration.model.interfaces.IModel;
import org.springframework.transaction.annotation.Transactional;

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
        /* Query query = em.createQuery("UPDATE PersonData p SET " +
                "p.identify = :identify, " +
                "p.firstName = :firstName, " +
                "p.lastName = :lastName, " +
                "p.gender = :gender, " +
                "p.familyStatus = :familyStatus, " +
                "p.workphone = :workphone, " +
                "p.mobilephone = :mobilephone, " +
                "p.homephone = :homephone, " +
                "p.ocupation = :ocupation, " +
                "p.education = :education, " +
                "p.birthdate = :birthdate " +
                "WHERE p.PersonDataId = :PersonDataId");

        query.setParameter("identify", personData.getIdentify())
                .setParameter("firstName", personData.getFirstName())
                .setParameter("lastName", personData.getLastName())
                .setParameter("gender", personData.getGender())
                .setParameter("familyStatus", personData.getFamilyStatus())
                .setParameter("workphone", personData.getFamilyStatus())
                .setParameter("mobilephone", personData.getMobilephone())
                .setParameter("homephone", personData.getHomephone())
                .setParameter("ocupation", personData.getOcupation())
                .setParameter("education", personData.getEducation())
                .setParameter("PersonDataId", personData.getPersonDataId())
                .setParameter("birthdate", personData.getBirthdate());

        int i = query.executeUpdate();
        System.out.println(i);
        em.clear();*/
        return true/* i == 1 ? true : false*/;
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
        personData.setBirthplace(getObjectFromDbById(new Country(),countryId));
        em.persist(personData);
        return personData;
    }

    @Transactional
    @Override
    public void createNewPerson(Person person, int countryId) {
        person.setPersonData(createNewPersonData(countryId));

        em.persist(person);
    }

    @SuppressWarnings("unchecked")
    public <T> T getObjectFromDbById (T choosenObject, int objectId){
        String className = choosenObject.getClass().getSimpleName();
        Query q = em.createQuery ("SELECT p FROM "+className+" p WHERE p.id = ?1");
        q.setParameter(1, objectId);
        choosenObject = null;
        try {
            choosenObject = (T)q.getSingleResult();
        } catch (Exception e) {
            System.err.println("em not found object "+className+" in DB with id"+"[ max value"+objectId+"]");
        }
        return choosenObject;
    }

}
