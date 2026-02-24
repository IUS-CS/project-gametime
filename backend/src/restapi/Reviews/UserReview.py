import time

class UserReview:
    def __init__(self, gameID, userID, rating, comment):
        self.gameID = gameID
        self.userID = userID
        self.rating = rating
        self.comment = comment
        self.date = time.time()

class __main__:

    user1 = UserReview(1,2,3,"foobar")
    print(user1.date)