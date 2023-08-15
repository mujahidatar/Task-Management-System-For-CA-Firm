package TaskManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import TaskManagementSystem.entity.Task;
import TaskManagementSystem.service.TaskService;

@RestController
@RequestMapping("/task")
public class TaskController {
	@Autowired
	TaskService taskServ;
	
	@GetMapping
	public ResponseEntity<?> getTasks(){
		return ResponseEntity.ok(taskServ.findAll());
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?> getTask(@PathVariable int id){
		return ResponseEntity.ok(taskServ.findById(id));
	}
	
	@PostMapping
	public ResponseEntity<?> newTask(@RequestBody Task theTask){
		return ResponseEntity.ok(taskServ.save(theTask));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable int id){
		taskServ.deleteById(id);
		return ResponseEntity.ok("Task Deleted");
	}
}
