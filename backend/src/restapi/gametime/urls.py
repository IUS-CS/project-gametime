from django.urls import path

from . import views
urlpatterns = [
    path('health', views.healthCheck),
    path('games', views.getGames)
]
