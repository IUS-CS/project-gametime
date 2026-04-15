from django.urls import path

from . import views
urlpatterns = [
    path('health', views.healthCheck),
    path('search/<str:query>/', views.searchGames, name='game-search'),
    path('game/<str:id>/', views.getAGame, name='game'),
    path('user/account/', views.getAccountTest, name='account-test'),
    path('sign-in/', views.signIn, name='sign-in'),
    path('create-account/', views.createAccount, name='create-account'),
    path('reviews/<int:id>/', views.getReviews, name='reviews'),
    path('user/create-review/', views.createReview, name='create-review'),
    path('followers/<str:user>/', views.getFollowers),
    path('favorites/<str:user>/', views.getFavorites),
    path('user/account/favorites/', views.handleFavorites),
    path('user/account/followed-games/', views.handleFollowGames),
    path('user/account/followed-users/', views.followUser),
    path('user/account/backlog/', views.handleBacklog)

]
