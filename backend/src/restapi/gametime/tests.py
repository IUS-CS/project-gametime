
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import USER, REVIEWS
from django.test import TestCase
import sqlite3
from . import views
import requests
import json

# Create your tests here.





class GameTimeTest(TestCase):
        

    def setUp(self):
        user = USER.objects.create_user(username='mike', email='<EMAIL>', password='password')
        reviews = REVIEWS.objects.create(gameID = 2239, userID = user, review = "lorem ipsum dolor sit", rating = 5)
        


    def testGame(self):
        url = reverse('game', kwargs={'id': 2239})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        #self.assertTrue(True)

    def testSearchGames(self):
        url = reverse('game-search', kwargs={'query': 2239})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        #self.assertTrue(True)
        
    def testGetAGame(self):
        url = reverse('game', kwargs={'id': 2239})
        response = self.client.get(url, format='json')
        
        #x = views.getAGame(response, 2239)
        z = json.loads(response.content)
        pikminData = "{'id': 2239, 'age_ratings': [{'id': 8767, 'organization': 2, 'rating_category': 8}, {'id': 48883, 'organization': 6, 'rating_category': 28}, {'id': 8766, 'organization': 1, 'rating_category': 3}], 'cover': {'id': 310696, 'image_id': 'co6nqg'}, 'first_release_date': 1004054400, 'involved_companies': [{'id': 224561, 'company': {'id': 812, 'name': 'Gradiente'}}, {'id': 247117, 'company': {'id': 421, 'name': 'Nintendo Entertainment Analysis & Development'}}, {'id': 247116, 'company': {'id': 70, 'name': 'Nintendo'}}], 'name': 'Pikmin', 'summary': \"Pikmin is a whole new breed of gameplay from Nintendo. The quirky, life-under-the-microscope title delivers a unique experience like few before it with a blend of real-time strategy, adventure, and puzzle elements. Taking advantage of the GameCube's graphics power, Pikmin sports lush texture work that brings to life a microscopic fantasy world. Players control Captain Olimar, a lovable little astronaut, who crash landed on a planet inhabited by even more lovable little plant creatures known as Pikmin. Olimar can command these creatures RTS-style, assign them tasks, make them attack foes, and gather resources. The ultimate task is to rebuild Olimar's space ship before a 30-day time window elapses.\", 'total_rating': 80.42422926891973}"
        self.assertEqual(str(z[0]), pikminData)        