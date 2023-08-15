package TaskManagementSystem.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import TaskManagementSystem.enums.Roles;

@Document(collection = "logins")
public class Login {
	private String username;
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
