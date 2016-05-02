package immigration.model.implementation;

import javax.persistence.*;

import immigration.dao.*;
import immigration.model.interfaces.IModel;

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

}
