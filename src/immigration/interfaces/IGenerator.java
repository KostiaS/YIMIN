package immigration.interfaces;

import java.util.Date;

/**
 * Created by UA C on 18.03.2016.
 */
public interface IGenerator {
    int randBetween(int start, int end);

    String randomString(String value, int i);

    String randomEmail(String name, int i, String domain);

    String randomEmail(int i);

    char randomGender();

    String phoneGenerator();

    String statusGenerator(int value, String statusName);

    Date getRandomData();

    boolean booleanGenerator();

    double doubleGenerator();

}
