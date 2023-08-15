package TaskManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TaskManagementSystem.dao.ClientRepository;
import TaskManagementSystem.entity.Client;

@Service
public class ClientServiceImpl implements ClientService{
	@Autowired
	ClientRepository cliRepo;
	
	@Override
	public List<Client> findAll() {
		return cliRepo.findAll();
	}

	@Override
	public Client findById(int theId) {
		Client theCli = null;
		Optional<Client> opt = cliRepo.findById(theId);
		if(opt.isPresent()) {
			theCli = opt.get();
		}
		return theCli;
	}

	@Override
	public Client save(Client theCli) {
		return cliRepo.save(theCli);
	}

	@Override
	public void deleteById(int theId) {
		cliRepo.deleteById(theId);
	}

	@Override
	public long getCount() {
		return cliRepo.count();
	}
}
