package TaskManagementSystem.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import TaskManagementSystem.entity.FileDocument;

public interface DocumentService {
	public List<FileDocument> findAll();
	public FileDocument findById(String theId);
	public FileDocument save(MultipartFile theFile, int theId)throws IOException;
	public void deleteById(String theId);
	public void deleteByTaskId(int theId);
	public List<FileDocument> findByTaskId(int theId);
}
