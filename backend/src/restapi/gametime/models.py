from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator



# Users table
class USER(AbstractUser):
    followers = models.IntegerField(default=0)


# Backend table
class BACKLOG(models.Model):
    userID = models.IntegerField()
    gameID = models.IntegerField()


class COMPLETED(models.Model):
    userID = models.ForeignKey(USER, on_delete=models.CASCADE)
    gameID = models.IntegerField()
# Favorites table


class FAVORITES(models.Model):
    userID = models.ForeignKey(USER, on_delete=models.CASCADE)
    gameID = models.IntegerField()
# User Reviews


class REVIEWS(models.Model):
    gameID = models.IntegerField()
    userID = models.ForeignKey(USER, on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.FloatField(
         validators=[MinValueValidator(0.5), MaxValueValidator(5)]
     )

    date = models.DateTimeField()


class FOLLOWUSER(models.Model):
    followed = models.ForeignKey(USER, on_delete=models.CASCADE, related_name="followed")
    follower = models.ForeignKey(USER, on_delete=models.CASCADE, related_name="follower")

    class Meta:
        unique_together = ("followed", "follower")


class FOLLOWGAME(models.Model):
    followerID = models.ForeignKey(USER, on_delete=models.CASCADE)
    gameID = models.IntegerField()

    class Meta:
        unique_together = ("followerID", "gameID")


