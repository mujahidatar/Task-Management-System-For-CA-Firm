package TaskManagementSystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import TaskManagementSystem.entity.Client;

public interface ClientRepository extends MongoRepository<Client, Integer>{
	
	Client findFirstByOrderByClientIdDesc();
	
	Client findByClientEmail(String email);
}
