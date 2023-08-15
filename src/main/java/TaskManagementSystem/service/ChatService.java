package TaskManagementSystem.service;

import java.util.List;

import TaskManagementSystem.entity.Chat;

public interface ChatService {
	public List<Chat> findAll();
	public List<Chat> findByTaskId(int theId);
	public Chat save(Chat theChat);
	public void deleteByTaskId(int theId);
	public long getCount();
}
