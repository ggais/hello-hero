package Script_1;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;

public class Flash_login_IE {

	public static void main(String[] args) {
		
System.setProperty("webdriver.ie.driver","E:\\FLASH_Selenium_Script\\Selenium_Basic\\IE_Driver\\IEDriverServer.exe");
WebDriver driver=new InternetExplorerDriver();
String baseUrl = "http://staging.helloheroapp.7f283de5.svc.dockerapp.io/";
driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
 
driver.get(baseUrl + "/#/");
driver.findElement(By.xpath("//input[@type='text']")).clear();
driver.findElement(By.xpath("//input[@type='text']")).sendKeys("lvarkey");
driver.findElement(By.name("password")).clear();
driver.findElement(By.name("password")).sendKeys("Daniel05");
driver.findElement(By.cssSelector("button")).click();

	}

}
