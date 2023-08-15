package TaskManagementSystem.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import TaskManagementSystem.entity.Chat;

public interface ChatRepository extends MongoRepository<Chat, Integer>{
	
	@Query("{ taskId : ?0 }")
	List<Chat> findByTaskId(int theId);
	
	@Query(value="{ taskId : ?0 }",delete=true)
	void deleteByTaskId(int theId);
}
