package TaskManagementSystem.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import TaskManagementSystem.entity.Employee;

public interface EmployeeRepository extends MongoRepository<Employee, Integer>{
	
	Employee findFirstByOrderByEmpIdDesc();
}
