package TaskManagementSystem.entity;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.springframework.data.mongodb.core.mapping.Document;

import TaskManagementSystem.enums.Roles;

@Document(collection = "logins")
public class Login {
	@Email(message = "Kindly enter valid email address" )
	private String username;
	@Size(min = 8,max = 16,message = "Password must be between 8-16 character")
	private String password;
	private Roles role;
	
	public Login() {}
	
	public Login(String username, String password, Roles role) {
		super();
		this.username = username;
		this.password = password;
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Roles getRole() {
		return role;
	}

	public void setRole(Roles role) {
		this.role = role;
	}
	
}
