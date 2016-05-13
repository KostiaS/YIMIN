package immigration.model.interfaces;

import immigration.dao.Country;
import immigration.dao.Embassy;
import immigration.dao.Person;
import immigration.dao.PersonData;

import java.util.List;

public interface IModel {
	
    PersonData getPersonDataById(int idOfPerson);

    boolean updatePersonData(PersonData personData);

    boolean isPersonNew (int id);

    void createNewPerson(Person person, int countryId);

    List<Country> getListOfCountry();

    List<Country> getListOfCountryWithEmbassy(Country countryWichEmbassySearched);

    List<Embassy> getEmbassyListOfCountry(Country countryOfEmbassy, Country locationCountry);
}
