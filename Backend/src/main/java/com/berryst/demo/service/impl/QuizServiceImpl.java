package com.berryst.demo.service.impl;

import com.berryst.demo.mapper.QuizMapper;
import com.berryst.demo.model.Question;
import com.berryst.demo.model.QuestionChoice;
import com.berryst.demo.model.Quiz;
import com.berryst.demo.service.QuizService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Map;
@Slf4j
@Service
public class QuizServiceImpl implements QuizService {
    @Resource
    private QuizMapper quizMapper;

    @Override
    public ArrayList<Map> getPublicQuizList() {
        ArrayList<Map> quizList = quizMapper.getPublicQuiz();
        return quizList;
    }

    @Override
    public Quiz getQuizContent(int quizId) {
        Quiz quiz = quizMapper.getQuizContent(quizId);
        if (quiz != null) {
            quiz.setQuestions(getQuestionList(quizId));
        }
        return quiz;
    }

    @Override
    public ArrayList<Question> getQuestionList(int quizId) {
        ArrayList<Question> questionList = quizMapper.getQuestionList(quizId);
        for (Question q : questionList) {
            q.setChoices(getChoiceList(q.getQuestionId()));
        }
        return questionList;
    }

    @Override
    public ArrayList<QuestionChoice> getChoiceList(int questionId) {
        return quizMapper.getChoiceList(questionId);
    }

    @Override
    public ArrayList<Map> getSupervisorQuiz(int supervisorId) {
        return quizMapper.getSupervisorQuiz(supervisorId);
    }

    @Override
    public int setQuiz(Quiz quiz) {
        //Return quizId
        int quizId = quiz.getQuizId();
        quizMapper.deleteQuiz(quizId);
        quizMapper.setQuiz(quiz);
        log.debug("Quiz ID is "+quiz.getQuizId());
        for(Question question:quiz.getQuestions()){
            question.setQuizId(quiz.getQuizId());
            setQuestion(question);
        }
        return quiz.getQuizId();
    }

    @Override
    public int setQuestion(Question question) {
        int result = quizMapper.setQuestion(question);
        for(QuestionChoice choice: question.getChoices()){
            choice.setQuestionId(question.getQuestionId());
            setChoice(choice);
        }
        return result;
    }

    @Override
    public int setChoice(QuestionChoice choice) {
        return quizMapper.setChoice(choice);
    }

    @Override
    public int deleteQuiz(int quizId) {
        return quizMapper.deleteQuiz(quizId);
    }

    @Override
    public int setQuizPublic(int quizId) {
        return quizMapper.setQuizPublic(quizId);
    }

    @Override
    public int setQuizPrivate(int quizId) {
        return quizMapper.setQuizPrivate(quizId);
    }


}
