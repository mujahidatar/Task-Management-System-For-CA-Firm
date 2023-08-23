package TaskManagementSystem.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import TaskManagementSystem.entity.JwtTokenRes;
import TaskManagementSystem.entity.Login;
import TaskManagementSystem.security.JwtUtil;
import TaskManagementSystem.service.LoginService;
import TaskManagementSystem.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	@Autowired
	LoginService logServ;
	
	@Autowired
	AuthenticationManager manager;
	
	@Autowired
	UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	JwtUtil jwtUtil;

	@PostMapping("/authenticate")
	public ResponseEntity<?> checkCredentials(@RequestBody Login theLog) {
		System.out.println("in authenticate");
		
		this.doAuthenticate(theLog.getUsername(), theLog.getPassword());
		if(theLog.getRole()!=null)
			return ResponseEntity.ok(true);
		UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(theLog.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println("JWT "+token);
		//Login log = this.logServ.findByKey(theLog.getUsername(), theLog.getPassword());
		return ResponseEntity.ok(new JwtTokenRes(token));
	}
	
	private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            
        	manager.authenticate(authentication);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password.!!");
        }

    }

	@PostMapping
	public ResponseEntity<?> newCredential(@Valid @RequestBody Login theLog, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			StringBuilder errors = new StringBuilder();
			bindingResult.getFieldErrors().forEach(error -> errors.append(error.getDefaultMessage()).append("; "));
			return ResponseEntity.badRequest().body(errors.toString());
		}
		Login log = this.logServ.save(theLog);
		return ResponseEntity.ok(log);
	}

	@GetMapping
	public ResponseEntity<?> getAllCredentials() {
		return ResponseEntity.ok(this.logServ.findAll());
	}

	@DeleteMapping
	public String deleteCredential(@RequestBody Login theLog) {
		this.logServ.deleteByKey(theLog.getUsername());
		return "Credentials Deleted";
	}
	
	@ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> exceptionHandler(BadCredentialsException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
