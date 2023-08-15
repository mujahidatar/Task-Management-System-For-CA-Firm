package TaskManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TaskManagementSystem.dao.EmployeeRepository;
import TaskManagementSystem.dao.LoginRepository;
import TaskManagementSystem.entity.Employee;
import TaskManagementSystem.entity.Login;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	@Autowired
	EmployeeRepository empRepo;
	@Autowired
	LoginRepository logRepo;

	@Override
	public List<Employee> findAll() {
		return empRepo.findAll();
	}

	@Override
	public Employee findById(int theId) {
		Optional<Employee> opt = empRepo.findById(theId);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	@Override
	public Employee save(Employee theEmp) {
		Employee emp = empRepo.findFirstByOrderByEmpIdDesc();
		if(theEmp.getEmpId()==0) {
			if(emp!=null)
				theEmp.setEmpId(emp.getEmpId()+1);
			else
				theEmp.setEmpId(100);
		}
		Login logCheck = logRepo.findByUsername(theEmp.getEmpEmail());
		if(logCheck!=null)
			return null;
		Login log = new Login(theEmp.getEmpEmail(),theEmp.getEmpPassword(),theEmp.getEmpRole());
		logRepo.save(log);
		return empRepo.save(theEmp);
	}

	@Override
	public void deleteById(int theId) {
		Optional<Employee> opt = empRepo.findById(theId);
		if(opt.isPresent()) {
			Employee emp = opt.get();
			logRepo.deleteByKey(emp.getEmpEmail());
			empRepo.deleteById(theId);
		}
	}

	@Override
	public long getCount() {
		return empRepo.count();
	}
	
}
