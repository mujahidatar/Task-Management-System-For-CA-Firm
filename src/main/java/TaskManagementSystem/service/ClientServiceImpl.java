package TaskManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import TaskManagementSystem.entity.Client;
import TaskManagementSystem.entity.Login;
import TaskManagementSystem.enums.Roles;
import TaskManagementSystem.repository.ClientRepository;
import TaskManagementSystem.repository.LoginRepository;

@Service
public class ClientServiceImpl implements ClientService {
	@Autowired
	ClientRepository cliRepo;
	@Autowired
	LoginService logServ;
	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public List<Client> findAll() {
		return cliRepo.findAll();
	}

	@Override
	public Client findById(int theId) {
		Optional<Client> opt = cliRepo.findById(theId);
		if (opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	@Override
	public Client save(Client theCli) {
		Client cli = cliRepo.findFirstByOrderByClientIdDesc();
		if (theCli.getClientId() == 0) {
			if (cli != null)
				theCli.setClientId(cli.getClientId() + 1);
			else
				theCli.setClientId(10000);
			Login logCheck = logServ.findByUsername(theCli.getClientEmail());
			if (logCheck != null)
				return null;
			Login log = new Login(theCli.getClientEmail(), theCli.getClientPassword(), Roles.CLIENT);
			logServ.save(log);
		} else {
			Query query = new Query(Criteria.where("username").is(theCli.getClientEmail()));
			Update update = new Update().set("password", theCli.getClientPassword());
			mongoTemplate.updateFirst(query, update, Login.class);
		}

		return cliRepo.save(theCli);
	}

	@Override
	public void deleteById(int theId) {
		Optional<Client> opt = cliRepo.findById(theId);
		if (opt.isPresent()) {
			Client cli = opt.get();
			logServ.deleteByKey(cli.getClientEmail());
			cliRepo.deleteById(theId);
		}
	}

	@Override
	public long getCount() {
		return cliRepo.count();
	}

	@Override
	public Client findByEmail(String email) {
		return cliRepo.findByClientEmail(email);
	}
}
