package immigration.controller;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;

/**
 * Created by Shanin Dima 3620849@gmail.com on 29.05.2016.
 */

public class HibernateAwareObjectMapper extends ObjectMapper {

    public HibernateAwareObjectMapper() {

        registerModule(new Hibernate4Module());
    }

}
