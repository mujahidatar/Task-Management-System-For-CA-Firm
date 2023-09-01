package TaskManagementSystem.service;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import TaskManagementSystem.entity.Login;
import TaskManagementSystem.repository.LoginRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	LoginRepository logRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Login log = logRepo.findByUsername(username);
		if (log == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		
		String role = log.getRole().toString();

		return new User(
				log.getUsername(), 
				log.getPassword(),
				Collections.singletonList(new SimpleGrantedAuthority(role)));
	}

}
