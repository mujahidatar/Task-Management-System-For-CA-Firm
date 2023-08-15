package TaskManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TaskManagementSystem.entity.Client;
import TaskManagementSystem.service.ClientService;

@RestController
@RequestMapping("/client")
public class ClientController {
	@Autowired
	ClientService cliServ;
	
	@GetMapping
	public ResponseEntity<?> getclients(){
		return ResponseEntity.ok(this.cliServ.findAll());
	}
	
	@PostMapping
	public ResponseEntity<?> addClient(@RequestBody Client theCli){
		Client cli = this.cliServ.save(theCli);
		//System.out.println("client id "+cli.getClientId());
		return ResponseEntity.ok(cli);
	}
	@PostMapping("/{id}")
	public ResponseEntity<?> getClient(@PathVariable int id){
		Client cli = this.cliServ.findById(id);
		return ResponseEntity.ok(cli);
	}
	@DeleteMapping("/{id}")
	public String deleteClient(@PathVariable int id) {
		this.cliServ.deleteById(id);
		return "Document Deleted";
	}
}
