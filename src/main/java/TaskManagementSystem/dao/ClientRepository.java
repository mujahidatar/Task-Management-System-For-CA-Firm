package TaskManagementSystem.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import TaskManagementSystem.entity.Client;

public interface ClientRepository extends MongoRepository<Client, Integer>{
	
	Client findFirstByOrderByClientIdDesc();
}
