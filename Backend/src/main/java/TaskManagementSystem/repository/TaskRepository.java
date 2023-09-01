package TaskManagementSystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import TaskManagementSystem.entity.Task;
import TaskManagementSystem.enums.Status;

public interface TaskRepository extends MongoRepository<Task, Integer>{
	Task findFirstByOrderByTaskIdDesc();
	
	List<Task> findByManagerIdAndStatus(int id, Status status);
	List<Task> findByEmployeeIdAndStatus(int id, Status status);
	List<Task> findByClientIdAndStatus(int id, Status status);
	List<Task> findByManagerId(int id);
	List<Task> findByEmployeeId(int id);
	List<Task> findByClientId(int id);
}
