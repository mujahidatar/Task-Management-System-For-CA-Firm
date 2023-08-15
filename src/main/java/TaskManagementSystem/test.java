package TaskManagementSystem;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

public class test {
	public static void main(String[] args) throws InterruptedException {
		Instant currentTimestamp = Instant.now();
        System.out.println("Current Timestamp: " + currentTimestamp);
        Date d = new Date();
        LocalDateTime currentDateTime = LocalDateTime.now();
        String str1 = currentDateTime.toLocalDate()+" "+currentDateTime.toLocalTime();
        Thread.sleep(5000);
        LocalDateTime currentDateTime1 = LocalDateTime.now();
        String str2 = currentDateTime1.toLocalDate()+" "+currentDateTime1.toLocalTime();
        System.out.println(str1.compareTo(str2));
        System.out.println("Current Date and Time: " + currentDateTime);
	}
}
