
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import USER, REVIEWS

# Create your tests here.





class GameTimeTest(APITestCase):

    def setUp(self):
        user = USER.objects.create_user(username='mike', email='<EMAIL>', password='password')
        reviews = REVIEWS.objects.create(gameID = 2239, userID = user, review = "lorem ipsum dolor sit", rating = 5)


    def test_game(self):
        url = reverse('game', kwargs={'id': 2239})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)