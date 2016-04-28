package immigration.controller;

import immigration.dao.*;
import org.springframework.beans.factory.annotation.Autowired;
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
    @RequestMapping(value = "hello" , method = RequestMethod.GET)//vozvrashaet infu o mi vozvrashaem v internet objects of JAVA ih avtomatom perevodit v JSON i perredaet
    public Person getCarDataPerOwner(Person owner) {//anotatsiya iz json ili xml delayet object
        owner.setEmail("person@gmail.com");
        return owner;
    }
}
