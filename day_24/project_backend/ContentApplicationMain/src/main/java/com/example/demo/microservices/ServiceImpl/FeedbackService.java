package com.example.demo.microservices.ServiceImpl;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.microservices.Model.Feedback;
import com.example.demo.microservices.dto.request.FeedbackRequest;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FeedbackService {

  @Bean
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }

  public ResponseEntity<Feedback> savefeedback(FeedbackRequest feedback) {

    ResponseEntity<Feedback> responseEntity = restTemplate().postForEntity(
        "http://localhost:8081/feedback/addfeedback",
        feedback,
        Feedback.class);

    return responseEntity;
  }
public List<Feedback> getAllfeedbacksList() {
    ResponseEntity<List<Feedback>> responseEntity = restTemplate().exchange(
            "http://localhost:8081/getallfeedbacks",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<Feedback>>() {});

    return responseEntity.getBody();
}

}
