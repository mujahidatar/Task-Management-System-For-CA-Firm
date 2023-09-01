package TaskManagementSystem.entity;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clients")
public class Client {
	@Id
	private int clientId;
	@NotNull(message = "Client name is required")
	private String clientName;
	@Email(message = "Kindly enter valid email address")
	private String clientEmail;
	private long clientContact;
	private String clientAddress;
	@Size(min = 8,max = 16,message = "Password must be between 8-16 character")
	private String clientPassword;
	
	public Client() {}
	
	public Client(int clientId, String clientName, String clientEmail, long clientContact, String clientAddress,
			String clientPassword) {
		super();
		this.clientId = clientId;
		this.clientName = clientName;
		this.clientEmail = clientEmail;
		this.clientContact = clientContact;
		this.clientAddress = clientAddress;
		this.clientPassword = clientPassword;
	}

	public int getClientId() {
		return clientId;
	}

	public void setClientId(int clientId) {
		this.clientId = clientId;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getClientEmail() {
		return clientEmail;
	}

	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}

	public long getClientContact() {
		return clientContact;
	}

	public void setClientContact(long clientContact) {
		this.clientContact = clientContact;
	}

	public String getClientAddress() {
		return clientAddress;
	}

	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}

	public String getClientPassword() {
		return clientPassword;
	}

	public void setClientPassword(String clientPassword) {
		this.clientPassword = clientPassword;
	}
	
}
