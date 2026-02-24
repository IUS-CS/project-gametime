import unittest
import UserReview

class TestUserReview(unittest.TestCase):

    def test_InitReview(self):
        user1 = UserReview(10, 12, 5, "lorem ipsum")
        self.assertEqual(user1.gameID, 10)
