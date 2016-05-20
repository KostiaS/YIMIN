package immigration.model.interfaces;

import immigration.dao.*;

import java.util.List;

public interface IModel {
	
    PersonData getPersonDataById(int idOfPerson);

    boolean updatePersonData(PersonData personData);

    boolean isPersonNew (int id);

    void createNewPerson(Person person, int countryId);

    List<Country> getListOfCountry();

    List<Country> getListOfCountryWithEmbassy(Country countryWichEmbassySearched);

    List<Embassy> getEmbassyListOfCountry(Country countryOfEmbassy, Country locationCountry);

    List<String> getCategoryOfProgram(Country country);

    List<Programs> getProgram(Country country, Programs category);

    List<ProgramStep> getProgramStepByCountry(Programs program);

    List<Documents> getDocumentsByProgramId(Programs programs);
}
