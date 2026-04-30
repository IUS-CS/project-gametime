import sqlite3
#import progressbar
import os
import sys
import json
import random
import string
import time
from wonderwords import RandomSentence

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
_path = os.path.join(BASE_DIR, "..", "db.sqlite3")
_path = os.path.abspath(_path)


_database = sqlite3.connect(_path)
_console = _database.cursor()

jsonPath = os.path.join(BASE_DIR, "Data", "database1.json")

def main():
    #CreateDatabaseFile(_path, False)
    ConnectToDatabase(_path)
    try:
        _console.execute("ALTER TABLE gametime_backlog ADD COLUMN isCompleted INTEGER")
    except:
        pass
    ResetDatabase()
    #Initialize()
    #CreateUser("foo", "bar", "foobar")
    PopulateDatabase(jsonPath)
    
    #Initialize()
    return 0
    
def Initialize():
    global _database, _console
    #if (IsEmpty() == False):
     #   (print("Database is NOT empty! Please delete all data to re-initialize database."))
      #  return 0
    
    CreateTable("backlog", "userID_id", "gameID", "isCompleted")
    CreateTable("favorites", "userID", "gameID")
    CreateTable("reviews", "userID", "gameID", "review", "rating", "date")
    CreateTable("followUser", "followed", "follower")
    CreateTable("followGame", "followerID", "gameID")
    CreateTable("user", "username", "email", "password")
    print("Database sucessfully Initialized!")
    return 1

def IsEmpty():
    global _console
    _console.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = _console.fetchall()

    if not tables:
        return True
    else:
        return False
    
def setPath(newPath):
    global _path
    _path = newPath
    return 0

def getPath():
    global _path
    return _path
    
def ResetDatabase():
    global _console, _database, _path
    _console.execute("DELETE FROM gametime_backlog")
    _console.execute("DELETE FROM gametime_favorites")
    _console.execute("DELETE FROM gametime_reviews")
    _console.execute("DELETE FROM gametime_user")
    _database.commit()
    return 0


def CreateTable(tableName, *args):
    global _console, _database
    dbCall = f"CREATE TABLE IF NOT EXISTS {tableName}("
    for i, tableData in enumerate(args):
        dbCall += str(tableData) + ", "
    dbCall = dbCall.removesuffix(", ")
    dbCall += ")"
    _console.execute(dbCall)
    _database.commit()

def PopulateDatabase(path):
    random.seed(941301)
    f = open(path)
    r = RandomSentence()
    data = json.load(f)
    username = data["usernames"]
    email = data["emails"]
    password = data["passwords"]
    for i in range(len(username)):
        CreateUser(i, password[i],username[i],email[i])
        randomNum = random.randint(0,100)
        k = random.sample(range(1,306000), randomNum)
        for j in range(randomNum):
            CreateBacklog(i, random.randint(1,306000), random.randint(0,1))
            CreateFavorite(i, k[j])
        randomNum2 = random.randint(1,1000)
        for l in range(randomNum2):
            CreateReview((i*10)+l, random.randint(1,306000), r.sentence(),random.randint(1,5), time.time(), i)
        print("Populating Database: ", int(i/10), "%")
        print("\033[A\033[K", end="")
        _database.commit()
    print("Done!")
    return 0

def CreateUser(id, password, username, email):
    global _console, _database
    f = False
    t = time.time()
    _console.execute(f"INSERT OR IGNORE INTO gametime_user (password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (\"{password}\",{time.time()},{f},\"{username}\",\"{username}\",\"Smith\",\"{email}\",{f},{f},{time.time()})")

    return 0

def CreateBacklog(userID, gameID, isCompleted):
    global _console, _database
    _console.execute(f"INSERT OR IGNORE INTO gametime_backlog (userID_id,gameID,isCompleted) VALUES(\"{userID}\", \"{gameID}\", \"{isCompleted}\")")

    return 0

def CreateFavorite(userID, gameID):
    global _console, _database
    _console.execute(f"INSERT INTO gametime_favorites (gameID,userID_id) VALUES(\"{gameID}\", \"{userID}\")")

    return 0

def CreateReview(id, gameID, review, rating, date, userID):
    global _console, _database
    _console.execute(f"INSERT OR IGNORE INTO gametime_reviews (gameID, review, rating, date, userID_id) VALUES(\"{gameID}\",\"{review}\",\"{rating}\",\"{date}\",{userID})")

    return 0

def CreateDatabaseFile(name, overwriteFlag):
    if (os.path.exists(f"{name}") and overwriteFlag == False):
        return 0
    else:
        open(f"{name}", 'w') #overwrites existing database if it exists
        return 0

def ConnectToDatabase(_path):
    global _console, _database
    DisconnectDatabase()
    _database = sqlite3.connect(_path)
    _console = _database.cursor()
    return 0

def DisconnectDatabase():
    global _console, _database
    _console.close()
    _database.close()


if __name__ == "__main__":
    sys.exit(main())
