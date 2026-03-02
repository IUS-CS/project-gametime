from django.urls import path

from . import views
urlpatterns = [
    path('health', views.healthCheck),
    path('search/<str:query>/', views.searchGames)
]
