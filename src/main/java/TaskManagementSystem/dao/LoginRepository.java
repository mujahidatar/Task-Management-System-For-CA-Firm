package TaskManagementSystem.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import TaskManagementSystem.entity.Login;

public interface LoginRepository extends MongoRepository<Login, Integer>{
	@Query("{ username: ?0, password: ?1 }")
    Login findByKey(String username,String password);
	
	@Query(value="{username: ?0}",delete=true)
	void deleteByKey(String username);
}

