package TaskManagementSystem.entity;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chats")
public class Chat {
	@NotNull(message = "Task Id is required")
	private int taskId;
	@NotNull(message = "Sender Id is required")
	private int senderId;
	@NotNull(message = "message is required")
	private String msg;
	private LocalDateTime timeStamp;
	
	public Chat() {}

	public Chat(int taskId, int senderId, String msg) {
		super();
		this.taskId = taskId;
		this.senderId = senderId;
		this.msg = msg;
		this.timeStamp = LocalDateTime.now();
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public int getSenderId() {
		return senderId;
	}

	public void setSenderId(int senderId) {
		this.senderId = senderId;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}
	
}
