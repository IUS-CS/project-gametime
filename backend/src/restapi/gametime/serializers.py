from rest_framework import serializers
from .models import REVIEWS, FAVORITES, BACKLOG, USER



class reviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userID.username', read_only=True)
    formatedDate = serializers.DateTimeField(
        source='date',
        format='%m/%d/%Y',
        read_only=True
    )
    class Meta:
        model = REVIEWS
        fields = ['username', 'review', 'rating', 'formatedDate']


class recentReviewSerializer(serializers.ModelSerializer):
    formatedDate = serializers.DateTimeField(
        source='date',
        format='%m/%d/%Y',
        read_only=True

    )
    class Meta:
        model = REVIEWS
        fields = ['gameID', 'review', 'rating', 'formatedDate']


class gameSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAVORITES
        fields = ['gameID']



class backlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BACKLOG
        fields = ['gameID']


