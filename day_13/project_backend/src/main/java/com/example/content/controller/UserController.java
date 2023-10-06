package com.example.content.controller;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.content.constant.Api;
import com.example.content.model.User;
import com.example.content.repository.UserRepository;
import com.example.content.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Api.AUTH)
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {
	private final UserService service;
	private final UserRepository userRepo;
	private final PasswordEncoder passwordEncoder;
	
	@GetMapping("/getdata")
	public List<User> getdet()
	{
		return service.getData();
	}
	
	@PutMapping("/updatePassword/{email}/{password}/{code}")
	public String UpdatePaserviceword(@PathVariable String email,@PathVariable String password,@PathVariable String code)
	{
	User user = userRepo.findByEmail(email);
	if(user!=null)
	{
		String encrypted_password = passwordEncoder.encode(password);
		user.setPassword(encrypted_password);
		user.setCode(code);
		service.updateData(user);
		return " PASSWORD CHAHNGED ";
	}
	else
		return "Email not Found";
	}
	@DeleteMapping("/deletedata/{uid}")
	public String deletedata(@PathVariable int uid)
	{
		service.deleteData(uid);
		return "uid: "+uid+ " detail has been deleted";
	}
}
