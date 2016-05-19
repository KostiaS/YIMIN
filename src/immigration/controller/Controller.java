package immigration.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.MappingJsonFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import immigration.dao.*;
import immigration.interfaces.*;
import immigration.model.interfaces.IModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.*;


/**
 * Created by UA C on 08.04.2016.
 */
@RestController
@RequestMapping("/")
public class Controller {
    
	@Autowired
    IModel model;
    /**
    *   <p>registration and creating new person</p>
    *   for view 15 in flow
    *   @param person - new Person
    *   @param countryId - id of country living
    * */
    @RequestMapping(value = Constants.SIGN_UP, method = RequestMethod.POST)
    public void createPerson(@RequestBody Person person,@RequestParam("countryId")int countryId){
        model.createNewPerson(person, countryId);
    }
    /**
    *<p>get information - person data of user by person id</p>
    *for view 18 in flow
    */
    @RequestMapping(value = Constants.PERSONAL_DATA+"/{personId}", method = RequestMethod.GET)
    public PersonData getPersonData(@PathVariable int personId) {
        return model.getPersonDataById(personId);
    }
    /**
    * <p>update person data by id</p>
    *  for view 17 in flow
    */
    @RequestMapping(value = Constants.SAVE_PERSON_DATA, method = RequestMethod.POST) 
    public boolean savePersonData(@RequestBody PersonData personData) {
    	return model.updatePersonData(personData);
    }
    /**
    * <p>get country list</p>
    *for view 2 adn 6 flow
    */
    @RequestMapping(value = Constants.COUNTRIES, method = RequestMethod.GET)
    public List<Country> getListOfCountry(){
        return model.getListOfCountry();
    }
    /**
     * <p>get list of countries whe present embassy of country from parameter</p>
     * @param countryWichEmbassySearched - country which embassy we search
     * for view 4 in flow
     */
    @RequestMapping(value = Constants.LIST_OF_COUNTRIES_BY_EMBASSY, method = RequestMethod.POST)
    public List<Country> getListOfCountryWithEmbassy(@RequestBody Country countryWichEmbassySearched){
        return model.getListOfCountryWithEmbassy(countryWichEmbassySearched);
    }
    /**
     * <p>get information about embassy in country</p>
     * @value countryOfEmbassy - embassies of this country we search
     * @value locationCountry - location where we search embassy
     * for view 5 in flow
     * @return list of json embassies
     */
    @RequestMapping(value = Constants.EMBASSIES_IN_COUNTRY, method = RequestMethod.POST)
    public List<Embassy> getEmbassyListOfCountry(@RequestBody Country[] parameters){
        Country countryOfEmbassy = parameters[0];
        Country locationCountry = parameters[1];
        return model.getEmbassyListOfCountry(countryOfEmbassy,locationCountry);
    }
    /**
     * <p>get categories of program using </p>
     * for view 6 in flow
     * @return list of values - categories
     */
    @RequestMapping(value = Constants.CATEGORIES_OF_PROGRAM_BY_COUNTRY, method = RequestMethod.POST)
    public List<String> getCategoryOfProgram(@RequestBody Country country){
        return model.getCategoryOfProgram(country);
    }
    /**
     * <p>get programs of imigration</p>
     * for view 6 in flow
     * @value country - country of imigratiom
     * @value category - category of program to imigration
     * @param strJson - Example of json : [{"countryId":1},{"category":"category106"}]
     * @return Json list of programs
     */
    @RequestMapping(value = Constants.IMIGRATION_PROGRAMS, method = RequestMethod.POST)
    public List<Programs> getPrograms(@RequestBody String strJson){
        MappingJsonFactory factory = new MappingJsonFactory();
        ObjectMapper om = new ObjectMapper();
        JsonParser parser = null;
        Country country=null;
        Programs programs = null;
        try {
            parser = factory.createParser(strJson);
            parser.nextToken();

            TreeNode node = parser.readValueAsTree();
            country = om.readValue(node.get(0).toString(), Country.class);
            programs = om.readValue(node.get(1).toString(), Programs.class);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return model.getProgram(country, programs);
    }
}