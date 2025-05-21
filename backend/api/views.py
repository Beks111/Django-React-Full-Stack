from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer, NoteSerializer
from .models import Note
from django.db.models import Q

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Note.objects.filter(author=user)

        # Фильтрация по статусу (is_completed)
        is_completed = self.request.query_params.get('is_completed', None)
        if is_completed is not None:
            is_completed = is_completed.lower() == 'true'
            queryset = queryset.filter(is_completed=is_completed)

        # Фильтрация по тексту (поиск по title или content)
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(content__icontains=search)
            )

        # Сортировка (по умолчанию -created_at, опционально updated_at)
        sort_by = self.request.query_params.get('sort_by', '-created_at')
        if sort_by in ['-created_at', 'created_at', '-updated_at', 'updated_at']:
            queryset = queryset.order_by(sort_by)

        return queryset

    def perform_create(self, serializer):
        try:
            serializer.save(author=self.request.user)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class NoteRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]