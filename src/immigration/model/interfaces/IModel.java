package immigration.model.interfaces;

import com.fasterxml.jackson.databind.node.ObjectNode;
import immigration.dao.*;

import java.sql.Blob;
import java.util.List;
/**
 * Created by Shanin Dima 3620849@gmail.com on 18.03.2016.
 */
public interface IModel {
	
    PersonData getPersonDataById(int idOfPerson);

    boolean updatePersonData(PersonData personData);

    boolean isPersonNew (int id);

    void createNewPerson(Person person, int countryId);

    List<Country> getListOfCountry();

    List<Country> getListOfCountryWithEmbassy(Country countryWichEmbassySearched);

    List<Embassy> getEmbassyListOfCountry(Country countryOfEmbassy, Country locationCountry);

    List<String> getCategoryOfProgram(Country country);

    List<Programs> getProgram(ObjectNode jsonObject);

    List<ProgramStep> getProgramStepByCountry(Programs program);

    List<Documents> getDocumentsByProgramId(Programs programs);

    Blob getDocById(Documents document);

    byte[] fromBlobToBase64ByteArray(Blob blob);

    Blob getMaskByDocId(Documents document);

    List<PersonCustomData> getPersonCustomDataByPersonId(Person person);

    boolean updatePersonCustomData(PersonCustomData pcd);

    public boolean addProgramInWay(ObjectNode jsonObject);

    List<Way> getProgramsListFromWay(Person person);

    boolean deleteProgramFromWay(ObjectNode jsonObject);

    int getValutationOfWayProg(ObjectNode jsonObject);

    List<DocumentField> getListOfDocumentFields(Documents documents);

    void addPersonDocInWay(Way way, Documents requiredDocument, String downloadedDoc);

    List<WayDocuments> getListOfRequiredDoc(Way way);

    void setCheckboxOfWayDoc(WayDocuments wayDocuments);

    List<PersonCustomData> getListPCDFieldsByDoc(ObjectNode jsonObject);
}
