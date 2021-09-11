package com.berryst.demo.service.impl;

import com.berryst.demo.mapper.QuizMapper;
import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuestionChoice;
import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import org.apache.ibatis.javassist.compiler.ast.Pair;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;

@Service
public class QuizServiceImpl implements QuizService {
    @Resource
    private QuizMapper quizMapper;

    @Override
    public ArrayList<Pair> getPublicQuizList() {
        ArrayList<Pair> quizList = quizMapper.getPublicQuiz();
        System.out.println("Result");
        System.out.println(quizList.toString());
        return quizList;
    }

    @Override
    public Quiz getQuizContent(int quizId) {
        System.out.println("getQuizContent");
        Quiz quiz = quizMapper.getQuizContent(quizId);
        if(quiz!=null){
            quiz.setQuestions(getQuestionList(quizId));
        }
        return quiz;
    }

    @Override
    public ArrayList<Question> getQuestionList(int quizId) {
        ArrayList<Question> questionList = quizMapper.getQuestionList(quizId);
        for(Question q:questionList){
            q.setChoices(getChoiceList(q.getQuestionId()));
        }
        return questionList;
    }

    @Override
    public ArrayList<QuestionChoice> getChoiceList(int questionId) {
        return quizMapper.getChoiceList(questionId);
    }

    @Override
    public ArrayList<Pair> getSuvervisorQuiz(int supervisorId) {
        return quizMapper.getSupervisorQuiz(supervisorId);
    }

    @Override
    public int setQuiz(Quiz quiz) {
        int quizId = quiz.getQuizId();
        quizMapper.deleteQuiz(quizId);
        return quizMapper.addQuiz(quiz);
    }

    @Override
    public int deleteQuiz(int quizId) {
        return quizMapper.deleteQuiz(quizId);
    }

    @Override
    public int makeQuizPublic(int quizId) {
        return quizMapper.makeQuizPublic(quizId);
    }

    @Override
    public int makeQuizPrivate(int quizId) {
        return quizMapper.makeQuizPrivate(quizId);
    }


}
