package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.signupEntity;
import com.example.demo.Service.loginService;


@RestController	
@CrossOrigin("*")
@RequestMapping("/login")
public class loginController {
	@Autowired
	private loginService ls;
	@GetMapping("/getdata")
	public List<signupEntity>getdata()
	{
		return ls.getData();
	}
	@GetMapping("/login/{username}/{password}")
	public String getbyusername(@PathVariable String username,@PathVariable String password)
	{
		List<signupEntity>obj = new ArrayList<>();
		obj=ls.findByUsernameAndPassword(username, password);
		if(obj.isEmpty())
		{
			return "login failed";
		}
		else
		{
			return "login sucessful";
		}
	}
	
	@GetMapping("/loginbyemail/{email}/{password}")
	public String getbyemail(@PathVariable String email,@PathVariable String password)
	{
		List<signupEntity>obj = new ArrayList<>();
		obj=ls.findByEmailAndPassword(email, password);
		if(obj.isEmpty())
		{
			return "login failed";
		}
		else
		{
			return "login sucessful";
		}
	}
	@PutMapping("/updatePassword")
	public String updatePassword(@RequestBody signupEntity request) {
	    // Check if the user exists based on the provided email
	    List<signupEntity> users = ls.findByEmail(request.getEmail());
	    
	    if (!users.isEmpty()) {
	        signupEntity user = users.get(0);
	        user.setPassword(request.getPassword());
	        ls.updatePass(user);

	        return "Password changed successfully";
	    } else {
	        return "Email not found";
	    }
	}
	
	@GetMapping("/verifybyemail/{email}")
	public String getbyemailverify(@PathVariable String email)
	{
		List<signupEntity>obj = new ArrayList<>();
		obj=ls.findByEmail(email);
		if(obj.isEmpty())
		{
			return "Email not verified";
		}
		else
		{
			return "Email verified";
		}
	}
	
}
