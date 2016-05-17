package immigration.controller;

import immigration.dao.UserDetails;
import immigration.interfaces.Constants;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/")
public class AuthorizationController {

    @RequestMapping(value = Constants.SIGN_IN, method = RequestMethod.POST)
    public Boolean authorization(@RequestBody UserDetails userDetails){
        return userDetails.getUsername().equals("a@a") && userDetails.getPassword().equals("1");
    }

}
