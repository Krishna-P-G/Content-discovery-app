package com.example.demo.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.ImageUserEntity;
import com.example.demo.Entity.User;
import com.example.demo.Entity.imageEntity;
import com.example.demo.Service.UserService;
import com.example.demo.Service.imageService;
import com.example.demo.repo.UserRepoInt;

@RestController
@CrossOrigin("*")
@RequestMapping("/permitall")
public class imageController {
	@Autowired
	private imageService is;
	@Autowired
	private UserService ss;
	@Autowired
	private UserRepoInt sri;
	
	@PostMapping("/image/savedata")
	public String savedata(@RequestBody imageEntity ie)
	{	
		is.postData(ie);
		return "image added";
	}
	@GetMapping("/image/data")
	public List<imageEntity>getImageData()
	{
		return is.getAllImage();
	}
	@GetMapping("/{username}/getAll")
	public ResponseEntity<List<imageEntity>> getAllImages(@PathVariable String username) {
		
		return ResponseEntity.ok(is.getAllImages(username));
	}
	
	@PutMapping("/updateimage/likes/{imageid}/{username}")
	public String updatelike(@PathVariable int imageid,@PathVariable String username)
	{
		imageEntity image = is.findByImageId(imageid);
		User user = ss.findByUsername(username);
		if(user.getLikes()==null) {
			Set<Integer> likes = new HashSet<>();
			user.setLikes(likes);
		}
		if(user.getLikes().add(imageid))
		{
			image.setLikes(image.getLikes()+1);
			is.updateLikeData(image);
			sri.save(user);
			return "likes added";
		}
		else 
		{
			image.setLikes(image.getLikes()-1);
			is.updateLikeData(image);
			user.getLikes().remove(imageid);
			sri.save(user);
			return "likes removed";
		}
	}
	
	
	

}
