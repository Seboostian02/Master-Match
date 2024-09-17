import stat
from urllib import response
from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.views import APIView
from rest_framework.response import Response

from skills.models import Skill
from .models import Student
from .serializers import StudentSerializer, SkillListSerializer

class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailView(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'id'

class StudentSkillUpdateView(APIView):

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        skill_ids = request.data.get('skills', [])

        if not user_id:
            return response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(skill_ids, list):
            return response({"error": "Skills must be a list"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # stergem user
            Student.objects.filter(user_id=user_id).delete()

            # dam fetch instante skill-uri
            skills = Skill.objects.filter(id__in=skill_ids)
            if skills.count() != len(skill_ids):
                return Response({"error": "One or more skills are invalid"}, status=status.HTTP_400_BAD_REQUEST)

            # cream inregistrare student
            new_students = [Student(user_id=user_id, skill_id=skill) for skill in skills]
            Student.objects.bulk_create(new_students)

            return Response({"message": "Skills updated successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



def student_list(request):
    """
    Display a list of all students.s
    """
    students = Student.objects.all()
    return render(request, 'students/student_list.html', {'students': students})

def student_detail(request, pk):
    """
    Display the details of a specific student.
    """
    student = get_object_or_404(Student, pk=pk)
    return render(request, 'students/student_detail.html', {'student': student})


def student_delete(request, pk):
    """
    Handle the deletion of a student record.
    """
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        student.delete()
        return redirect('student_list')
    return render(request, 'students/student_confirm_delete.html', {'student': student})
