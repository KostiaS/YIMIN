package immigration.model.implementation;

import javax.persistence.*;

import immigration.dao.*;
import immigration.model.interfaces.IModel;
import org.springframework.transaction.annotation.Transactional;

public class DbFunctionality implements IModel {

	@PersistenceContext(unitName = "springHibernate", type = PersistenceContextType.EXTENDED)
	EntityManager em;

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
	public void updatePersonData(PersonData personData) {

        Query query = em.createQuery("UPDATE PersonData p SET "+
                "p.identify = :identify, "+
                "p.firstName = :firstName, "+
                "p.lastName = :lastName, "+
                "p.gender = :gender, "+
                "p.familyStatus = :familyStatus, "+
                "p.workphone = :workphone, "+
                "p.mobilephone = :mobilephone, "+
                "p.homephone = :homephone, "+
                "p.ocupation = :ocupation, "+
                "p.education = :education, "+
                "p.birthdate = :birthdate "+
                "WHERE p.PersonDataId = :PersonDataId");

        query.setParameter("identify",personData.getIdentify())
                .setParameter("firstName", personData.getFirstName())
                .setParameter("lastName", personData.getLastName())
                .setParameter("gender",personData.getGender())
                .setParameter("familyStatus", personData.getFamilyStatus())
                .setParameter("workphone", personData.getFamilyStatus())
                .setParameter("mobilephone",personData.getMobilephone())
                .setParameter("homephone",personData.getHomephone())
                .setParameter("ocupation", personData.getOcupation())
                .setParameter("education",personData.getEducation())
                .setParameter("PersonDataId", personData.getPersonDataId())
                .setParameter("birthdate", personData.getBirthdate());

        int i = query.executeUpdate();
        System.out.println(i);
        em.clear();
    }

}
