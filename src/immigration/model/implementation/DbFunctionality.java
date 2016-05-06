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
        StringBuffer stringBufferQuery = new StringBuffer(250);
        stringBufferQuery.append("UPDATE PersonData p SET ");

        stringBufferQuery.append("p.identify = :identify, ");
        stringBufferQuery.append("p.firstName = :firstName, ");
        stringBufferQuery.append("p.lastName = :lastName, ");
        stringBufferQuery.append("p.gender = :gender, ");
        stringBufferQuery.append("p.familyStatus = :familyStatus, ");
        stringBufferQuery.append("p.workphone = :workphone, ");
        stringBufferQuery.append("p.mobilephone = :mobilephone, ");
        stringBufferQuery.append("p.homephone = :homephone, ");
        stringBufferQuery.append("p.ocupation = :ocupation, ");
        stringBufferQuery.append("p.education = :education ");
        stringBufferQuery.append("WHERE p.PersonDataId = :PersonDataId");

        Query query = em.createQuery(stringBufferQuery.toString());

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
                .setParameter("PersonDataId", personData.getPersonDataId());

        int i = query.executeUpdate();
        System.out.println(i);
    }

}
