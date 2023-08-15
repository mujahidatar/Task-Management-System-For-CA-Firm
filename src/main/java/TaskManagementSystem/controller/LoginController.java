package TaskManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import TaskManagementSystem.entity.Login;
import TaskManagementSystem.service.LoginService;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	@Autowired
	LoginService logServ;
	
	@PostMapping("/check")
	public boolean checkCredentials(@RequestBody Login theLog) {
		Login log = this.logServ.findByKey(theLog.getUsername(), theLog.getPassword());
		if(log!=null)
			return true;
		return false;
	}
	
	@PostMapping
	public ResponseEntity<?> newCredential(@RequestBody Login theLog){
		Login log = this.logServ.save(theLog);
		return ResponseEntity.ok(log);
	}
	
	@GetMapping
	public ResponseEntity<?> getAllCredentials(){
		return ResponseEntity.ok(this.logServ.findAll());
	}
	
	@DeleteMapping
	public String deleteCredential(@RequestBody Login theLog) {
		this.logServ.deleteByKey(theLog.getUsername());
		return "Credentials Deleted";
	}
}
