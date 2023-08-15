package TaskManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import TaskManagementSystem.entity.Chat;
import TaskManagementSystem.service.ChatService;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {
	@Autowired
	ChatService chatServ;
	
	@GetMapping
	public ResponseEntity<?> getAllChats(){
		return ResponseEntity.ok(chatServ.findAll());
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?> getChats(@PathVariable int id){
		return ResponseEntity.ok(chatServ.findByTaskId(id));
	}
	
	@PostMapping
	public ResponseEntity<?> newChat(@RequestBody Chat theChat){
		return ResponseEntity.ok(chatServ.save(theChat));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteChat(@PathVariable int id){
		chatServ.deleteByTaskId(id);
		return ResponseEntity.ok("Chat Deleted");
	}
}
