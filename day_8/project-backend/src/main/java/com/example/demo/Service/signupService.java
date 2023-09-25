package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.signupEntity;
import com.example.demo.repo.signupRepoInt;

@Service
public class signupService implements signupServiceInt {
	@Autowired
	private signupRepoInt sri;
	@Autowired
	private EmailService es;
//	@Autowired
//	private signupEntity se;
	@Override
	public List<signupEntity> getData() {
		// TODO Auto-generated method stub
		return sri.findAll();
	}

	@Override
	public void postData(signupEntity se) {
		// TODO Auto-generated method stub
		sri.save(se);

	}


	@Override
	public void deleteData(int id) {
		// TODO Auto-generated method stub
		sri.deleteById(id);
	}

	@Override
	public boolean signupuser(String user) {
		// TODO Auto-generated method stub
		return sri.existsByUsername(user);
	}

	@Override
	public boolean signupemail(String email) {
		// TODO Auto-generated method stub
		return sri.existsByEmail(email);
	}

	@Override
	public List<signupEntity> getUserbyname(String username) {
		// TODO Auto-generated method stub
		return sri.findByusernameContainingIgnoreCase(username);
	}

	@Override
	public signupEntity findByEmail(String email) {
		// TODO Auto-generated method stub
		return sri.findByEmail(email);
	}

	@Override
	public List<signupEntity> findByEmailAndCode(String email, String code) {
		// TODO Auto-generated method stub
		return sri.findByEmailAndCode(email, code);
	}

	public boolean signuppassword(String password) {
		// TODO Auto-generated method stub
		return sri.existsByPassword(password);
	}

	@Override
	public List<signupEntity> findByCode(String code) {
		// TODO Auto-generated method stub
		return sri.findByCode(code);
	}
	@Override
	public void updateData(signupEntity se) {
		// TODO Auto-generated method stub
		sri.save(se);
	}

	
}

