package immigration.gen;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
/**
 * Created by Shanin Dima 3620849@gmail.com on 18.03.2016.
 */
public class TestApp {
	static GeneratorNormal rpo;

    public static void main(String[] args) {

        AbstractApplicationContext ctx = new FileSystemXmlApplicationContext("WebContent/WEB-INF/beansGen.xml");
        rpo = (GeneratorNormal) ctx.getBean("rpo");
        fillDB(1);
        ctx.close();
    }
    public static void fillDB(int qty){
    	
    	rpo.generateCoutryList();
    	rpo.generateEmbassyList();
    	rpo.generateProgramsList();
    	rpo.generateDocumentsList();
    	 for(int i = 0;i<qty;i++){
            rpo.fillDb(i);
            
        }
    	rpo.generateFieldNamesList();

    }
}
