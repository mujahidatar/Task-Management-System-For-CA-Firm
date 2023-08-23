package TaskManagementSystem.service;

import java.util.List;

import TaskManagementSystem.entity.Employee;

public interface EmployeeService {
	
	public List<Employee> findAll();
	public Employee findById(int theId);
	public Employee save(Employee theEmp);
	public void deleteById(int theId);
	public long getCount();
	List<Employee> findByManagerId(int theId);
	Employee findByEmail(String email);
	public List<Employee> findAllByRole(String role);
}
