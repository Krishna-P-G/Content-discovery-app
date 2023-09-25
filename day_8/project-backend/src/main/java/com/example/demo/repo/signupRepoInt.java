package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.signupEntity;

public interface signupRepoInt extends JpaRepository<signupEntity, Integer> {
	public boolean existsByUsername(String user);
	public boolean existsByEmail(String email);
	public boolean existsByPassword(String password);
	public signupEntity findByUsername(String username);
	public List<signupEntity> findByusernameContainingIgnoreCase(String username);
	public signupEntity findByEmail(String email);
	public List<signupEntity> findByCode(String code);
	
	public List<signupEntity> findByEmailAndCode(String email,String code);

}
