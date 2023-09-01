package TaskManagementSystem.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import TaskManagementSystem.entity.Client;
import TaskManagementSystem.service.ClientService;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {
	@Autowired
	ClientService cliServ;

	@GetMapping
	public ResponseEntity<?> getclients() {
		return ResponseEntity.ok(this.cliServ.findAll());
	}

	@PostMapping
	public ResponseEntity<?> addClient(@Valid @RequestBody Client theCli, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			StringBuilder errors = new StringBuilder();
			bindingResult.getFieldErrors().forEach(error -> errors.append(error.getDefaultMessage()).append("; "));
			return ResponseEntity.badRequest().body(errors.toString());
		}
		Client cli = this.cliServ.save(theCli);
		// System.out.println("client id "+cli.getClientId());
		if (cli != null)
			return ResponseEntity.ok(cli);
		return ResponseEntity.badRequest().body("Email Already Exists");
	}

	@PostMapping("/{id}")
	public ResponseEntity<?> getClient(@PathVariable int id) {
		return ResponseEntity.ok(cliServ.findById(id));
	}

	@DeleteMapping("/{id}")
	public String deleteClient(@PathVariable int id) {
		this.cliServ.deleteById(id);
		return "Document Deleted";
	}
	
	@PostMapping("mail/{email}")
	public ResponseEntity<?> getClientByEmail(@PathVariable String email) {
		return ResponseEntity.ok(cliServ.findByEmail(email));
	}
}
