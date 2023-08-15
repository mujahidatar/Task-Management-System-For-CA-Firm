package TaskManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TaskManagementSystem.dao.EmployeeRepository;
import TaskManagementSystem.entity.Employee;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	@Autowired
	EmployeeRepository empRepo;

	@Override
	public List<Employee> findAll() {
		return empRepo.findAll();
	}

	@Override
	public Employee findById(int theId) {
		Employee theEmp = null;
		Optional<Employee> opt = empRepo.findById(theId);
		if(opt.isPresent()) {
			theEmp = opt.get();
		}
		return theEmp;
	}

	@Override
	public Employee save(Employee theEmp) {
		return empRepo.save(theEmp);
	}

	@Override
	public void deleteById(int theId) {
		empRepo.deleteById(theId);
	}

	@Override
	public long getCount() {
		return empRepo.count();
	}
	
}
