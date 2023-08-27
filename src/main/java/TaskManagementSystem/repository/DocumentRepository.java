package TaskManagementSystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import TaskManagementSystem.entity.FileDocument;

public interface DocumentRepository extends MongoRepository<FileDocument, String>{
	
	FileDocument findByTaskId(int theId);
	
	@Query(value="{ taskId : ?0 }",delete=true)
	void deleteByTaskId(int theId);
}
