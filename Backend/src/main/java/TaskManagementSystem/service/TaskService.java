package TaskManagementSystem.service;

import java.util.List;

import TaskManagementSystem.entity.Task;
import TaskManagementSystem.enums.Status;

public interface TaskService {
	public List<Task> findAll();
	public Task findById(int theId);
	public Task save(Task theTask);
	public void deleteById(int theId);
	public long getCount();
	public List<Task> findByManagerIdAndStatus(int id,Status status);
	public List<Task> findByEmployeeIdAndStatus(int id,Status status);
	public List<Task> findByClientIdAndStatus(int id,Status status);
	public List<Task> findByManagerId(int id);
	public List<Task> findByEmployeeId(int id);
	public List<Task> findByClientId(int id);
}
