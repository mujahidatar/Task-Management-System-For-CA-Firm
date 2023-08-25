package TaskManagementSystem.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint{
	
	 @Override
	    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
	        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	        if(request.getAttribute("exception")!=null)
	        	response.getWriter().write(request.getAttribute("exception").toString());
	        else
	        	response.getWriter().write("Access Denied..!\nMessage: Unautherized Access");
	    }

}
