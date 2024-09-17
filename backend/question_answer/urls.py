from django.urls import path
from .views import QuestionsList, QuestionCreate, QuestionDelete, AnswerListByQuestionView, AnswerDelete, AnswerCreate

urlpatterns = [
    path('add_question/', QuestionCreate.as_view(), name='Question-creation'),
    path('delete_question/<int:pk>/', QuestionDelete.as_view(), name='Question-creation'),
    path('questions/', QuestionsList.as_view(), name='question-list-create'),
    path('answers/<int:question_id>/', AnswerListByQuestionView.as_view(), name='answers'),
    path('delete_answer/<int:pk>/', AnswerDelete.as_view(), name='answer_delete'),
    path('add_answer/', AnswerCreate.as_view(), name='Answer-creation'),
]
