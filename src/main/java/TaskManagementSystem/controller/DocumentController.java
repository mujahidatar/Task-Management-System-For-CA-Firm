package TaskManagementSystem.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import TaskManagementSystem.service.DocumentService;

@RestController
@RequestMapping("/document")
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentController {
	
	@Autowired
	DocumentService docServ;
	
	@GetMapping
	public ResponseEntity<?> getAllDoc(){
		return ResponseEntity.ok(docServ.findAll());
	}
	
	@PostMapping("task/{theId}")
	public ResponseEntity<?> getDocByTaskId(@PathVariable int theId){
		return ResponseEntity.ok(docServ.findByTaskId(theId));
	}
	
	@PostMapping("/{theId}")
	public ResponseEntity<?> getDocById(@PathVariable String theId){
		return ResponseEntity.ok(docServ.findById(theId));
	}
	
	@PostMapping("/upload/{theId}")
	public ResponseEntity<?> uploadDoc(@RequestParam("file") MultipartFile theFile,@PathVariable int theId){
		try {
			return ResponseEntity.ok(docServ.save(theFile, theId));
		} catch (IOException e) {
			return ResponseEntity.internalServerError().body("File Exception Occured");
		}
	}
	
	@DeleteMapping("/{theId}")
	public ResponseEntity<?> deleteDocById(@PathVariable String theId){
		docServ.deleteById(theId);
		return ResponseEntity.ok("Document Deleted");
	}
	
	@DeleteMapping("task/{theId}")
	public ResponseEntity<?> deleteDocByTaskId(@PathVariable int theId){
		docServ.deleteByTaskId(theId);
		return ResponseEntity.ok("All Task Documents Deleted");
	}
}
