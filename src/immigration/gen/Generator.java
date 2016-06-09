package immigration.gen;

import immigration.interfaces.*;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * Created by Shanin Dima 3620849@gmail.com on 18.03.2016.
 */
public class Generator implements IGenerator {

    /**
     * @return random number between start & end value
     */
    public int randBetween(int start, int end) {
        return start + (int) Math.round(Math.random() * (end - start));
    }

    /**
     * @return Your String [your string]+ i
     */

    public String randomString(String value, int i) {
        return value + i;
    }

    /**
     * @return email in format [your name]+i @ [your domain .com]
     */

    public String randomEmail(String name, int i, String domain) {
        return name + i + "@" + domain;
    }

    /**
     * @return email in format name[i]@gmail.com
     */
    public String randomEmail(int i) {
        return "name" + i + "@" + "gmail.com";
    }

    /**
     * @return random char f or m
     */
    public char randomGender() {
        int i = randBetween(0, 1);
        return (i == 0) ? 'f' : 'm';
    }

    /**
     * @return String phone number in format +123456789
     */
    public String phoneGenerator() {
        return "+" + randBetween(1000, 9999) + randBetween(10000, 99999);
    }

    /**
     * @return String in format "statusName"+value
     */
    public String statusGenerator(int value, String statusName) {
        return statusName + randBetween(0, value);
    }

    /**
     * @return date in format year,month,day
     */
    public Date getRandomData() {
        int year = randBetween(1900, 2016);// generate a year between 1900 and 2010;
        int dayOfYear = randBetween(1, 365);// generate a number between 1 and 365 (or 366 if you need to handle leap year);
        int month = randBetween(0, 11);
        Calendar calendar = new GregorianCalendar(year, month, dayOfYear);
        Date randomDate = calendar.getTime();
        return randomDate;
    }

    public boolean booleanGenerator() {
        int result = randBetween(0, 1);
        return (result == 0) ? false : true;
    }

    public double doubleGenerator() {
        return 0 + (Math.random() * (1200 - 0));
    }
}
