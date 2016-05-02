/*package immigration.gen;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class TestApp {
	static RandomPersistObject rpo;

    public static void main(String[] args) {

        AbstractApplicationContext ctx = new FileSystemXmlApplicationContext("WebContent/WEB-INF/beansGen.xml");
        rpo = (RandomPersistObject) ctx.getBean("rpo");
       
         
         
        fillDB(15);
       
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
    	rpo.generateWay();
    }
}
*/