package TaskManagementSystem.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clients")
public class Client {
	@Id
	private int clientId;
	private String clientName;
	private String clientEmail;
	private long clientContact;
	private String clientAddress;
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
