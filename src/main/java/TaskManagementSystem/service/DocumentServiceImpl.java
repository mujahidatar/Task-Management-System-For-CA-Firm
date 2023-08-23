package TaskManagementSystem.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import TaskManagementSystem.entity.FileDocument;
import TaskManagementSystem.repository.DocumentRepository;

@Service
public class DocumentServiceImpl implements DocumentService{

	@Autowired
	DocumentRepository docRepo;
	
	@Override
	public List<FileDocument> findAll() {
		return docRepo.findAll();
	}

	@Override
	public FileDocument findById(String theId) {
		Optional<FileDocument> opt = docRepo.findById(theId);
		if(opt.isPresent())
			return opt.get();
		return null;
	}

	@Override
	public FileDocument save(MultipartFile theFile,int theId) throws IOException {
		FileDocument theDoc = new FileDocument();
		theDoc.setTaskId(theId);
		theDoc.setFileName(theFile.getOriginalFilename());
		theDoc.setFileType(theFile.getContentType());
		theDoc.setData(theFile.getBytes());
		return docRepo.save(theDoc);
	}
	
	@Override
	public void deleteById(String theId) {
		docRepo.deleteById(theId);
	}

	@Override
	public void deleteByTaskId(int theId) {
		docRepo.deleteByTaskId(theId);
	}

	@Override
	public List<FileDocument> findByTaskId(int theId) {
		return docRepo.findByTaskId(theId);
	}

}
