package TaskManagementSystem.service;

import java.util.List;

import TaskManagementSystem.entity.Client;

public interface ClientService {
	List<Client> findAll();
	Client findById(int theId);
	Client save(Client thecli);
	void deleteById(int theId);
	long getCount();
	Client findByEmail(String email);
}
