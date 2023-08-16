package TaskManagementSystem.entity;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import TaskManagementSystem.enums.Status;

@Document(collection = "tasks")
public class Task {
	@Id
	private int taskId;
	@NotNull(message = "Task title is required")
	private String title;
	@NotNull@Size(max = 100,message = "maximum description length is 100 character")
	private String desc;
	private int clientId;
	private int managerId;
	private int employeeId;
	private Status status;
	
	public Task() {}

	public Task(int taskId, String title, String desc, int clientId, int managerId, int employeeId, Status status) {
		super();
		this.taskId = taskId;
		this.title = title;
		this.desc = desc;
		this.clientId = clientId;
		this.managerId = managerId;
		this.employeeId = employeeId;
		this.status = status;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public int getClientId() {
		return clientId;
	}

	public void setClientId(int clientId) {
		this.clientId = clientId;
	}

	public int getManagerId() {
		return managerId;
	}

	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
}
