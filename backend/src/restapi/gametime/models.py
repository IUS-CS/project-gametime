from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


# Users table
class USER(AbstractUser):
    pass


# Backlog table
class BACKLOG(models.Model):
    userID = models.ForeignKey(USER, on_delete=models.CASCADE)
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
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("userID", "gameID")
        print('you can delete this')

class FOLLOWUSER(models.Model):
    followed = models.ForeignKey(USER, on_delete=models.CASCADE, related_name="followers")
    follower = models.ForeignKey(USER, on_delete=models.CASCADE, related_name="following")

    class Meta:
        unique_together = ("followed", "follower")



class FOLLOWGAME(models.Model):
    followerID = models.ForeignKey(USER, on_delete=models.CASCADE)
    gameID = models.IntegerField()

    class Meta:
        unique_together = ("followerID", "gameID")


