from django.db import models

import time
import sqlite3
databasePath = "filepath/database.db"

class UserReview:
    def __init__(self, gameID, userID, rating, comment):
        self.gameID = gameID
        self.userID = userID
        self.rating = rating
        self.comment = comment
        self.date = time.time()

    def getGameID(self):
        return self.gameID
    
    def getUserID(self):
        return self.userID
    
    def getRating(self):
        return self.rating
    
    def getComment(self):
        return self.comment
    
    def getDate(self):
        return self.date
    
    def pushToDatabase(self):
        return
    
    def pullFromDatabase(self):
        return
    
    
# Create your models here.
