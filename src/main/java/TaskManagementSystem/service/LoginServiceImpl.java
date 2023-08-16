package TaskManagementSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TaskManagementSystem.entity.Login;
import TaskManagementSystem.repository.LoginRepository;

@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	LoginRepository logRepo;

	@Override
	public List<Login> findAll() {
		return logRepo.findAll();
	}

	@Override
	public Login save(Login theLog) {
		return logRepo.save(theLog);
	}

	@Override
	public Login findByKey(String username,String password) {
		return logRepo.findByKey(username,password);
	}

	@Override
	public long getCount() {
		return logRepo.count();
	}
	
	public void deleteByKey(String username) {
		logRepo.deleteByKey(username);
	}
	
}
