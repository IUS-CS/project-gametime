from django.urls import path

from . import views
urlpatterns = [
    path('health', views.healthCheck),
    path('search/<str:query>/', views.searchGames),
    path('game/<str:id>/', views.getAGame),
    path('user/account/', views.getAccountTest),
    path('sign-in/', views.signIn),
    path('create-account/', views.createAccount)
]
