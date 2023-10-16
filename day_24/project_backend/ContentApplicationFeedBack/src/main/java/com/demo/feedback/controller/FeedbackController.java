package com.demo.feedback.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.feedback.dto.request.FeedbackRequest;
import com.demo.feedback.dto.response.FeedbackResponse;
import com.demo.feedback.model.Feedback;
import com.demo.feedback.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FeedbackController {
    private final FeedbackService feedbackService;

    @PostMapping("/feedback/addfeedback")
    public Feedback saveFeedback(@RequestBody FeedbackRequest request) {
        return feedbackService.savefeedback(request);
       
    }

    @GetMapping("/getallfeedbacks")
    public ResponseEntity<List<FeedbackResponse>> getFeedbacks() {
        List<FeedbackResponse> feedbackList = feedbackService.getAllfeedbacksList();
        return !feedbackList.isEmpty() ? ResponseEntity.ok(feedbackList) : ResponseEntity.noContent().build();
    }
}
