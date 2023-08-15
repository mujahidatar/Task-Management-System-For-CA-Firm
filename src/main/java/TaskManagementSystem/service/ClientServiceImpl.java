package TaskManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TaskManagementSystem.dao.ClientRepository;
import TaskManagementSystem.dao.LoginRepository;
import TaskManagementSystem.entity.Client;
import TaskManagementSystem.entity.Login;
import TaskManagementSystem.enums.Roles;

@Service
public class ClientServiceImpl implements ClientService{
	@Autowired
	ClientRepository cliRepo;
	@Autowired
	LoginRepository logRepo;
	
	@Override
	public List<Client> findAll() {
		return cliRepo.findAll();
	}

	@Override
	public Client findById(int theId) {
		Optional<Client> opt = cliRepo.findById(theId);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	@Override
	public Client save(Client theCli) {
		Client cli = cliRepo.findFirstByOrderByClientIdDesc();
		if(theCli.getClientId()==0) {
			if(cli!=null)
				theCli.setClientId(cli.getClientId()+1);
			else
				theCli.setClientId(10000);
		}
		Login logCheck = logRepo.findByUsername(theCli.getClientEmail());
		if(logCheck!=null)
			return null;
		Login log = new Login(theCli.getClientEmail(),theCli.getClientPassword(),Roles.CLIENT);
		logRepo.save(log);
		return cliRepo.save(theCli);
	}

	@Override
	public void deleteById(int theId) {
		Optional<Client> opt = cliRepo.findById(theId);
		if(opt.isPresent()) {
			Client cli = opt.get();
			logRepo.deleteByKey(cli.getClientEmail());
			cliRepo.deleteById(theId);
		}
	}

	@Override
	public long getCount() {
		return cliRepo.count();
	}
}
