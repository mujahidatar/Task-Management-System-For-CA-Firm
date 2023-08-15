package TaskManagementSystem.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TaskManagementSystem.dao.ChatRepository;
import TaskManagementSystem.entity.Chat;

@Service
public class ChatServiceImpl implements ChatService{
	@Autowired
	ChatRepository chatRepo;

	@Override
	public List<Chat> findAll() {
		return chatRepo.findAll();
	}

	@Override
	public List<Chat> findByTaskId(int theId) {
		return chatRepo.findByTaskId(theId);
	}

	@Override
	public Chat save(Chat theChat) {
		theChat.setTimeStamp(LocalDateTime.now());
		return chatRepo.save(theChat);
	}

	@Override
	public void deleteByTaskId(int theId) {
		chatRepo.deleteByTaskId(theId);
	}

	@Override
	public long getCount() {
		return chatRepo.count();
	}
	
}
