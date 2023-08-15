package TaskManagementSystem.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import TaskManagementSystem.entity.Task;

public interface TaskRepository extends MongoRepository<Task, Integer>{

}
