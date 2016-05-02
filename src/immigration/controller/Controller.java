package immigration.controller;

import immigration.dao.*;
import immigration.interfaces.*;
import immigration.model.interfaces.IModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by UA C on 08.04.2016.
 */
@RestController
@RequestMapping("/")
public class Controller {
    
	@Autowired
    IModel model;
    
    @RequestMapping(value = Constants.PERSONAL_DATA+"/{personId}"  , method = RequestMethod.GET) 
    public PersonData getPersonData(@PathVariable int personId) { 
    	PersonData personData = model.getPersonDataById(personId);
        return personData;
    }
}
