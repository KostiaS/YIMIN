package immigration.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import immigration.dao.*;
import immigration.interfaces.*;
import immigration.model.interfaces.IModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Blob;
import java.util.*;


/**
 * Created by Shanin Dima 3620849@gmail.com on 08.04.2016.
 */
@RestController
@RequestMapping("/")
public class Controller {

    @Autowired
    IModel model;

    /**
     * <p>registration and creating new person</p>
     * for view 15 in flow
     *
     * @param person     new Person
     * @param countryId  id of country living
     */
    @RequestMapping(value = Constants.SIGN_UP, method = RequestMethod.POST)
    public void createPerson(@RequestBody Person person, @RequestParam("countryId") int countryId) {
        model.createNewPerson(person, countryId);
    }

    /**
     * <p>get information - person data of user by person id</p>
     * for view 18 and 28 in flow
     */
    @RequestMapping(value = Constants.PERSONAL_DATA + "/{personId}", method = RequestMethod.GET)
    public PersonData getPersonData(@PathVariable int personId) {
        return model.getPersonDataById(personId);
    }

    /**
     * <p>update person data by id</p>
     * for view 17 in flow
     * @param personData  json {"identify":"2140934024",
     *                   "birthdate":"1990-06-14",
     *                   "firstName":"firstname0",
     *                   "lastName":"lastname0",
     *                   "gender":"f",
     *                   "familyStatus":"familyStatus2",
     *                   "workphone":"+570848475",
     *                   "mobilephone":"+766456184",
     *                   "homephone":"+500747931",
     *                   "ocupation":"occupation0",
     *                   "education":"education0",
     *                   "birthplace":{"countryId":6},
     *                   "personDataId":1}
     */
    @RequestMapping(value = Constants.SAVE_PERSON_DATA, method = RequestMethod.POST)
    public boolean savePersonData(@RequestBody PersonData personData) {
        return model.updatePersonData(personData);
    }

    /**
     * <p>get country list</p>
     * for view 2 adn 6 flow
     */
    @RequestMapping(value = Constants.COUNTRIES, method = RequestMethod.GET)
    public List<Country> getListOfCountry() {
        return model.getListOfCountry();
    }

    /**
     * <p>get list of countries whe present embassy of country from parameter</p>
     *
     * @param countryWichEmbassySearched  json {"countryId":1} country which embassy we search
     * for view 4 in flow
     */
    @RequestMapping(value = Constants.LIST_OF_COUNTRIES_BY_EMBASSY, method = RequestMethod.POST)
    public List<Country> getListOfCountryWithEmbassy(@RequestBody Country countryWichEmbassySearched) {
        return model.getListOfCountryWithEmbassy(countryWichEmbassySearched);
    }

    /**
     * <p>get information about embassy in country</p>
     *
     * @return list of json embassies
     * @param parameters  json [{"countryId":1},{"countryId":21}]
     * @value countryOfEmbassy - embassies of this country we search
     * @value locationCountry - location where we search embassy
     * for view 5 in flow
     */
    @RequestMapping(value = Constants.EMBASSIES_IN_COUNTRY, method = RequestMethod.POST)
    public List<Embassy> getEmbassyListOfCountry(@RequestBody Country[] parameters) {
        Country countryOfEmbassy = parameters[0];
        Country locationCountry = parameters[1];
        return model.getEmbassyListOfCountry(countryOfEmbassy, locationCountry);
    }

    /**
     * <p>get categories of program using </p>
     * for view 6 in flow
     * @param country {"countryId":2}
     * @return list of values - categories
     */
    @RequestMapping(value = Constants.CATEGORIES_OF_PROGRAM_BY_COUNTRY, method = RequestMethod.POST)
    public List<String> getCategoryOfProgram(@RequestBody Country country) {
        return model.getCategoryOfProgram(country);
    }

    /**
     * <p>get programs of imigration</p>
     * for view 6 in flow
     *
     * @param jsonObject Example of json : {"param":[{"countryId":1},{"category":"category1"}]}
     * @return Json list of programs
     * @value country  country of imigratiom
     * @value programs category of program to imigration
     */
    @RequestMapping(value = Constants.IMMIGRATION_PROGRAMS, method = RequestMethod.POST)
    public List<Programs> getPrograms(@RequestBody ObjectNode jsonObject) {
        return model.getProgram(jsonObject);
    }

    /**
     * <p>get list of programs steps by program id </p>
     *
     * @param program  json Example {"programId":93}
     * for flow 7
     */
    @RequestMapping(value = Constants.STEPS, method = RequestMethod.POST)
    public List<ProgramStep> getProgramsStepList(@RequestBody Programs program) {
        return model.getProgramStepByCountry(program);
    }

    /**
     * <p> get list of program documents</p>
     *
     * @param programs  json Example {"programId":93}
     */
    @RequestMapping(value = Constants.LIST_OF_DOC, method = RequestMethod.POST)
    List<Documents> getDocumentsByProgramId(@RequestBody Programs programs) {
        return model.getDocumentsByProgramId(programs);
    }

    /**
     * <p>download document </p>
     *
     * @param document json {"docId":1}
     * @return byte array encoded in base 64
     */
    @RequestMapping(value = Constants.GET_DOC, method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public byte[] downloadDocument(@RequestBody Documents document) {
        Blob blob = model.getDocById(document);
        return model.fromBlobToBase64ByteArray(blob);
    }

    /**
     * <p>download HTML document </p>
     *
     * @param document json {"docId":1}
     * @return byte array encoded in base 64 in header TEXT/HTML
     */
    @RequestMapping(value = Constants.GET_MASK, method = RequestMethod.POST, produces = MediaType.TEXT_HTML_VALUE)
    public byte[] downloadMask(@RequestBody Documents document) {
        Blob blob = model.getMaskByDocId(document);
        return model.fromBlobToBase64ByteArray(blob);
    }

    /**
     * <p>return list of custom data</p>
     *
     * @param person  {"personId":1}
     * for flow 19
     */
    @RequestMapping(value = Constants.GET_CUSTOM_DATA, method = RequestMethod.POST)
    public List<PersonCustomData> getCustomDatabyId(@RequestBody Person person) {
        return model.getPersonCustomDataByPersonId(person);
    }

    /**
     * <p>create or update person custom data</p>
     *
     * @param pcd  json example {"value":"val1","fieldNames":{"id":14},"personCustomDataId":1,"personData":{"personDataId":1}}
     * for flow 19
     */
    @RequestMapping(value = Constants.UPDATE_CUSTOM_DATA_VALUE, method = RequestMethod.POST)
    public boolean updatePersonCustomData(@RequestBody PersonCustomData pcd) {
        return model.updatePersonCustomData(pcd);
    }

    /**
     * <p>add program to your way</p>
     * first parameter should be person data
     *
     * @param jsonObject  json example {"param":[{"personId":1},{"programId":1}]}
     * for button add this program in my way in flow 32-37
     */
    @RequestMapping(value = Constants.ADD_PROGRAM_IN_WAY, method = RequestMethod.POST)
    public boolean addProgramInWay(@RequestBody ObjectNode jsonObject) {
        return model.addProgramInWay(jsonObject);
    }

    /**
     *<p>get list of all programs wich person choose</p>
     *@param person  json example {personId:1}
     *for flow 23
     */

    @RequestMapping(value = Constants.GET_PROGRAMS_LIST_FROM_WAY, method = RequestMethod.POST)
    public List<Way> getProgramsListFromWay(@RequestBody Person person) {
        return model.getProgramsListFromWay(person);
    }
    /**
     * <p>delete program from person way</p>
     * @param jsonObject  {"param":[{"personId":1},{"programId":1}]}
     * for flow 23 in web
     */
    @RequestMapping(value = Constants.DELETE_PROGRAM_FROM_WAY, method = RequestMethod.POST)
    public boolean deleteProgramFromWay(@RequestBody ObjectNode jsonObject) {
        return model.deleteProgramFromWay(jsonObject);
    }
    /**
     * <p>get valuation about complete of program 0-100%</p>
     * @param jsonObject {"param":[{"personId":1},{"programId":1}]}
     * for flow 23 in web
     */
    @RequestMapping(value = Constants.GET_VALUATION_OF_WAY_PROG, method = RequestMethod.POST)
    public int getValutationOfWayProg(@RequestBody ObjectNode jsonObject) {
        return model.getValutationOfWayProg(jsonObject);
    }
    /**
     * <p>get fields list by document id</p>
     * @param documents  json{"docId":2}
     *for flow 28
     */
    @RequestMapping(value = Constants.GET_DOCUMENT_FIELDS, method = RequestMethod.POST)
    public List<DocumentField> deleteProgramFromWay(@RequestBody Documents documents) {
        return model.getListOfDocumentFields(documents);
    }

    /**
     * <p>add document in way and in Person Documents</p>
     * @param jsonObject  {"param":[{"wayId":172},{"docId":22},{"base64":"/9j/4AAQSkZJRgABAgAAZABkAAD..."}]}
     *for 20 flow
     */
    @RequestMapping(value = Constants.ADD_PRS_DOC_IN_WAY, method = RequestMethod.POST)
    public boolean addPersonDocInWay(@RequestBody ObjectNode jsonObject){
        ObjectMapper om = new ObjectMapper();
        Way way = null;
        Documents requiredDocument = null;
        String downloadedDoc = null;
        try {
            way = om.readValue(jsonObject.get("param").get(0).toString(), Way.class);
            requiredDocument = om.readValue(jsonObject.get("param").get(1).toString(), Documents.class);
            downloadedDoc = om.readValue(jsonObject.get("param").get(2).get("base64").toString(), String.class);

        } catch (IOException e) {
            e.printStackTrace();
        }
        model.addPersonDocInWay(way,requiredDocument,downloadedDoc);
        return true;
    }
    /**
     * <p>get list of required documents</p>
     * @param way {"wayId":1}
     * for flow 20
     */
    @RequestMapping(value = Constants.GET_LIST_OF_REQUIRED_DOC, method = RequestMethod.POST)
    public List<WayDocuments> addPersonDocInWay(@RequestBody Way way){
        return model.getListOfRequiredDoc(way);
    }

    /**
     * <p>set checkbox of document</p>
     * @param wayDoc json {"wayDocumentsId":2,"ready":false}
     * for flow 20
     */
    @RequestMapping(value = Constants.SET_IS_READY_IN_WAYDOC, method = RequestMethod.POST)
    public void setCheckboxOfWayDoc(@RequestBody WayDocuments wayDoc){
        model.setCheckboxOfWayDoc(wayDoc);
    }

    /**
     *<p>get list of fields person custom data according required document </p>
     * @param jsonObject {"param":[{"personId":1},{"docId":1}]}
     * for flow 28
     */
    @RequestMapping(value = Constants.LIST_PCD_FIELDS_BY_DOC, method = RequestMethod.POST)
    public List<PersonCustomData> getListPCDFieldsByDoc(@RequestBody ObjectNode jsonObject){
        return model.getListPCDFieldsByDoc(jsonObject);
    }

}