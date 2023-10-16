package com.demo.feedback.service;

import java.util.List;

import com.demo.feedback.dto.request.FeedbackRequest;
import com.demo.feedback.dto.response.FeedbackResponse;
import com.demo.feedback.model.Feedback;

public interface FeedbackService {

    Feedback savefeedback(FeedbackRequest request);

    List<FeedbackResponse> getAllfeedbacksList();

}
