from django.db import models

# Users table
class Users(models.Model):
    username = models.CharField(max_length=100)
    userID = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    followers = models.IntegerField()
    start_date = models.IntegerField()

# Backend table
class Backend(models.Model):
    userID = models.IntegerField()
    gameID = models.IntegerField()
    backendID = models.AutoField(primary_key=True)

# Favorites table
class Favorites(models.Model):
    userID = models.IntegerField()
    gameID = models.IntegerField()
    favoritesID = models.AutoField(primary_key=True)