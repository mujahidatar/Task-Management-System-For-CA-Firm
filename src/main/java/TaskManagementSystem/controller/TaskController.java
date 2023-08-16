package TaskManagementSystem.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import TaskManagementSystem.entity.Task;
import TaskManagementSystem.service.TaskService;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
	@Autowired
	TaskService taskServ;

	@GetMapping
	public ResponseEntity<?> getTasks() {
		return ResponseEntity.ok(taskServ.findAll());
	}

	@PostMapping("/{id}")
	public ResponseEntity<?> getTask(@PathVariable int id) {
		return ResponseEntity.ok(taskServ.findById(id));
	}

	@PostMapping
	public ResponseEntity<?> newTask(@Valid @RequestBody Task theTask, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			StringBuilder errors = new StringBuilder();
			bindingResult.getFieldErrors().forEach(error -> errors.append(error.getDefaultMessage()).append("; "));
			return ResponseEntity.badRequest().body(errors.toString());
		}
		return ResponseEntity.ok(taskServ.save(theTask));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable int id) {
		taskServ.deleteById(id);
		return ResponseEntity.ok("Task Deleted");
	}
}
