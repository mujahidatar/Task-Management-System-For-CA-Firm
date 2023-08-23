package TaskManagementSystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import TaskManagementSystem.entity.Employee;

public interface EmployeeRepository extends MongoRepository<Employee, Integer>{
	
	Employee findFirstByOrderByEmpIdDesc();
	
	List<Employee> findByManagerId(int id);
	
	Employee findByEmpEmail(String email);
	
	List<Employee> findByEmpRole(String role);
}
