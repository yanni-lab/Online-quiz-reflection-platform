package com.berryst.demo.controller;

import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import org.apache.ibatis.javassist.compiler.ast.Pair;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

@RestController
@RequestMapping(value="/service")
@CrossOrigin
public class QuizController {
    @Resource
    private QuizService quizService;

    @RequestMapping(value="/available_quiz",method= RequestMethod.POST)
    public ArrayList<Pair> getPublicQuiz(@RequestBody String data, HttpServletResponse response) throws JSONException {
        return quizService.getPublicQuizList();
    }

    @RequestMapping(value="/quiz_content",method= RequestMethod.POST)
    public Quiz getQuizContent(@RequestBody String data, HttpServletResponse response) throws JSONException {
        JSONObject receivedData = new JSONObject(data);

        int quizId = receivedData.getInt("quizId");

        return quizService.getQuizContent(quizId);
    }
}
