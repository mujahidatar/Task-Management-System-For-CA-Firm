package TaskManagementSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import TaskManagementSystem.entity.Login;
import TaskManagementSystem.repository.LoginRepository;

@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	LoginRepository logRepo;
	
	@Autowired
	PasswordEncoder bCryptPasswordEncoder;

	@Override
	public List<Login> findAll() {
		return logRepo.findAll();
	}

	@Override
	public Login save(Login theLog) {
		String encodedPassword = bCryptPasswordEncoder.encode(theLog.getPassword());
		theLog.setPassword(encodedPassword);
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

	@Override
	public Login findByUsername(String username) {
		return logRepo.findByUsername(username);
	}
	
}
