package TaskManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import TaskManagementSystem.entity.Employee;
import TaskManagementSystem.service.EmployeeService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
	@Autowired
	EmployeeService empServ;
	
	@GetMapping
	public ResponseEntity<?> getEmps(){
		return ResponseEntity.ok(this.empServ.findAll());
	}
	
	@PostMapping
	public ResponseEntity<?> addEmp(@RequestBody Employee theEmp){
		Employee emp = this.empServ.save(theEmp);
		return ResponseEntity.ok(emp);
	}
	@PostMapping("/{id}")
	public ResponseEntity<?> getEmp(@PathVariable int id){
		Employee emp = this.empServ.findById(id);
		return ResponseEntity.ok(emp);
	}
	@DeleteMapping("/{id}")
	public String deleteEmp(@PathVariable int id) {
		this.empServ.deleteById(id);
		return "Document Deleted";
	}
}
