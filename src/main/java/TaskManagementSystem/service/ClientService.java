package TaskManagementSystem.service;

import java.util.List;

import TaskManagementSystem.entity.Client;

public interface ClientService {
	public List<Client> findAll();
	public Client findById(int theId);
	public Client save(Client thecli);
	public void deleteById(int theId);
	public long getCount();
}
