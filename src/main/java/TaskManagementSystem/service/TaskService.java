package TaskManagementSystem.service;

import java.util.List;

import TaskManagementSystem.entity.Task;

public interface TaskService {
	public List<Task> findAll();
	public Task findById(int theId);
	public Task save(Task theTask);
	public void deleteById(int theId);
	public long getCount();
}
