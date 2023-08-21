package TaskManagementSystem.entity;

public class JwtTokenRes {
	private String token;
	
	public JwtTokenRes() {}

	public JwtTokenRes(String token) {
		super();
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
