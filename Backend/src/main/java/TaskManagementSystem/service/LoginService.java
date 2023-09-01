package TaskManagementSystem.service;

import java.util.List;

import TaskManagementSystem.entity.Login;

public interface LoginService {
	public List<Login> findAll();
	public Login save(Login theLog);
//	public void deleteByKey(String key);
	public Login findByKey(String username,String password);
	public long getCount();
	public void deleteByKey(String username);
	public Login findByUsername(String username);
}
