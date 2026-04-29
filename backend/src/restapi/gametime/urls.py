from django.urls import path

from . import views
urlpatterns = [
    path('health', views.healthCheck),
    path('search/<str:query>/', views.searchGames, name='game-search'),
    path('game/<str:id>/', views.getAGame, name='game'),
    path('create-account/', views.createAccount, name='create-account'),
    path('reviews/<int:id>/', views.getReviews, name='reviews'),
    path('sign-in/', views.signIn, name='sign-in'),
    path('account/<str:username>/', views.getUser),
    path('user/account/', views.getUserAccount, name='account-test'),
    path('user/auth/', views.checkAuthentication, name='auth'),
    path('user/create-review/', views.createReview, name='create-review'),
    path('user/account/favorites/', views.handleFavorites),
    path('user/account/followed-games/', views.handleFollowGames),
    path('user/account/followed-users/', views.followUser),
    path('user/account/backlog/', views.handleBacklog),
    path('user/account/check/buttons/<int:id>/', views.checkButtons)


]
