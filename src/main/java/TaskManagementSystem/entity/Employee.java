package TaskManagementSystem.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="employees")
public class Employee {
	@Id
	private int empId;
	private String empName;
	private String empEmail;
	private long empContact;
	private String empAddress;
	private String empRole;
	private int managerId;
	
	public Employee() {}
	
	public Employee(int empId, String empName, String empEmail, long empContact, String empAddress, String empRole, int managerId) 
	{
		super();
		this.empId = empId;
		this.empName = empName;
		this.empEmail = empEmail;
		this.empContact = empContact;
		this.empAddress = empAddress;
		this.empRole = empRole;
		this.managerId = managerId;
	}

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public String getEmpEmail() {
		return empEmail;
	}

	public void setEmpEmail(String empEmail) {
		this.empEmail = empEmail;
	}

	public long getEmpContact() {
		return empContact;
	}

	public void setEmpContact(long empContact) {
		this.empContact = empContact;
	}

	public String getEmpAddress() {
		return empAddress;
	}

	public void setEmpAddress(String empAddress) {
		this.empAddress = empAddress;
	}

	public String getEmpRole() {
		return empRole;
	}

	public void setEmpRole(String empRole) {
		this.empRole = empRole;
	}

	public int getManagerId() {
		return managerId;
	}

	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}
	
	
}
