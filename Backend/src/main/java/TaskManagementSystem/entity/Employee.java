package TaskManagementSystem.entity;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import TaskManagementSystem.enums.Roles;


@Document(collection="employees")
public class Employee {
	@Id
	private int empId;
	@NotNull(message = "Employee name is required")
	private String empName;
	@Email(message = "Kindly enter valid email address" )
	private String empEmail;
	private long empContact;
	private String empAddress;
	@NotNull(message = "Employee role is required")
	private Roles empRole;
	private int managerId;
	@Size(min = 8,max = 16,message = "Password must be between 8-16 character")
	private String empPassword;
	
	public Employee() {}
	
	public Employee(int empId, String empName, String empEmail, long empContact, String empAddress, Roles empRole, int managerId,
					String empPassword) 
	{
		super();
		this.empId = empId;
		this.empName = empName;
		this.empEmail = empEmail;
		this.empContact = empContact;
		this.empAddress = empAddress;
		this.empRole = empRole;
		this.managerId = managerId;
		this.empPassword = empPassword;
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

	public Roles getEmpRole() {
		return empRole;
	}

	public void setEmpRole(Roles empRole) {
		this.empRole = empRole;
	}

	public int getManagerId() {
		return managerId;
	}

	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}
	
	public String getEmpPassword() {
		return empPassword;
	}

	public void setEmpPassword(String empPassword) {
		this.empPassword = empPassword;
	}

}
