from rest_framework import serializers
from flights.models import Flight, Company, Airport


class FlightSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Flight
        fields = '__all__'
        depth = 1


class CompanySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'


class AirportSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Airport
        fields = '__all__'
