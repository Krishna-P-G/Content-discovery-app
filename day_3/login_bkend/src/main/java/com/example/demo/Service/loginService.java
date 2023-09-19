package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.demo.Entity.signupEntity;
import com.example.demo.repo.loginRepoInt;
@Service
public class loginService implements loginServiceInt {
	@Autowired
	private loginRepoInt lri;
	@Override
	public List<signupEntity> getData() {
		// TODO Auto-generated method stub
		return lri.findAll();
	}

	@Override
	public List<signupEntity> findByUsernameAndPassword(String user, String pass) {
		// TODO Auto-generated method stub
		return lri.findByUsernameAndPassword(user, pass);
	}

	@Override
	public List<signupEntity> findByEmailAndPassword(String email, String pass) {
		// TODO Auto-generated method stub
		return lri.findByEmailAndPassword(email, pass);
	}
	
	@Override
	public List<signupEntity> findByEmail(String email) {
		// TODO Auto-generated method stub
		return lri.findByEmail(email);
	}
	
	@Override
	public void updatePass(signupEntity se) {
		// TODO Auto-generated method stub
		 lri.save(se);
	}

}
