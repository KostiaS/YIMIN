package immigration.controller;

import immigration.dao.*;
import immigration.interfaces.*;
import immigration.model.interfaces.IModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * Created by UA C on 08.04.2016.
 */
@RestController
@RequestMapping("/")
public class Controller {
    
	@Autowired
    IModel model;
    @RequestMapping(value = Constants.SIGN_UP, method = RequestMethod.POST)
    public void createPerson(@RequestBody Person person,@RequestParam("countryId")int countryId){
        model.createNewPerson(person, countryId);
    }
    /*
    * get information - person data about user by person id
    *
    * */
    @RequestMapping(value = Constants.PERSONAL_DATA+"/{personId}"  , method = RequestMethod.GET) 
    public PersonData getPersonData(@PathVariable int personId) {
        return model.getPersonDataById(personId);
    }
    
    @RequestMapping(value = Constants.SAVE_PERSON_DATA, method = RequestMethod.POST) 
    public boolean savePersonData(@RequestBody PersonData personData) {
    	return model.updatePersonData(personData);
    }

}
