package TaskManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TaskManagementSystem.dao.TaskRepository;
import TaskManagementSystem.entity.Task;

@Service
public class TaskServiceImpl implements TaskService{
	@Autowired
	TaskRepository taskRepo;

	@Override
	public List<Task> findAll() {
		return taskRepo.findAll();
	}

	@Override
	public Task findById(int theId) {
		Optional<Task> opt = taskRepo.findById(theId);
		if(opt.isPresent())
			return opt.get();
		return null;
	}

	@Override
	public Task save(Task theTask) {
		Task task = taskRepo.findFirstByOrderByTaskIdDesc();
		if(theTask.getTaskId()==0) {
			if(task!=null)
				theTask.setTaskId(task.getTaskId()+1);
			else
				theTask.setTaskId(100);
		}
		return taskRepo.save(theTask);
	}

	@Override
	public void deleteById(int theId) {
		taskRepo.deleteById(theId);
	}

	@Override
	public long getCount() {
		return taskRepo.count();
	}
	
}
