package com.example.demo.Service;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entity.signupEntity;

public interface signupServiceInt {
	public List<signupEntity> getData();
	public void postData(signupEntity se);
	public void updateData(signupEntity se);
	public void deleteData(int id);
	public boolean signupuser(String user);
	public boolean signuppassword(String password);
	public  List<signupEntity> getUserbyname(String username);
	public boolean signupemail(String email);
	@Query("SELECT s FROM signupEntity s WHERE s.email = :email")
	public signupEntity findByEmail(@Param("email") String email);
	public List<signupEntity> findByCode(String code);
	
	public List<signupEntity> findByEmailAndCode(String email,String code);
}
