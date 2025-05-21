from django.urls import path 
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/<int:pk>/", views.NoteRetrieveUpdateDestroy.as_view(), name="note-detail"),
    path("register/", views.CreateUserView.as_view(), name="register"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]