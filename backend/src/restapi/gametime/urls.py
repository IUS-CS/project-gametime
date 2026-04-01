from django.urls import path

from . import views
urlpatterns = [
    path('health', views.healthCheck),
    path('search/<str:query>/', views.searchGames),
    path('game/<str:id>/', views.getAGame),
    path('user/account/', views.getAccountTest),
    path('sign-in/', views.signIn),
    path('create-account/', views.createAccount),
    path('reviews/<int:id>/', views.getReviews),
    path('user/create-review/', views.createReview),
    path('user/account/favorites/', views.addFavorite),
    path('user/account/followed-games/', views.followGame),
    path('user/account/followed-users/', views.followUser),

]
