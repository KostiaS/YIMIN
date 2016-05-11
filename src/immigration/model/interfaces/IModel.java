package immigration.model.interfaces;

import immigration.dao.Person;
import immigration.dao.PersonData;

public interface IModel {
	
    PersonData getPersonDataById(int idOfPerson);
    boolean updatePersonData(PersonData personData);
    boolean isPersonNew (int id);


    void createNewPerson(Person person, int countryId);
}
