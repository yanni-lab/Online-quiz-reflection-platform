package com.berryst.demo.controller;

import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import org.apache.ibatis.javassist.compiler.ast.Pair;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;

@RestController
@RequestMapping(value="/service")
public class QuizController {
    @Resource
    private QuizService quizService;

    @RequestMapping(value="/available_quiz",method= RequestMethod.GET)
    public ArrayList<Pair> getPublicQuiz(){
        return quizService.getPublicQuizList();
    }

    @RequestMapping(value="/quiz_content",method= RequestMethod.GET)
    public Quiz getQuizContent(int quizId){
        return quizService.getQuizContent(quizId);
    }
}
