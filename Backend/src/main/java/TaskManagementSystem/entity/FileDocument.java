package TaskManagementSystem.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "documents")
public class FileDocument {
	private String id;
    private int taskId;
    private String fileName;
    private String fileType;
    private byte[] data;
    
	public FileDocument() {}

	public FileDocument(String id, int taskId, String fileName, String fileType, byte[] data) {
		super();
		this.id = id;
		this.taskId = taskId;
		this.fileName = fileName;
		this.fileType = fileType;
		this.data = data;
	}
	
	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

}
