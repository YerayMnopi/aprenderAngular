from django.shortcuts import render

from rest_framework import viewsets

from flights.models import Flight, Company, Airport
from flights.serializers import FlightSerializer, AirportSerializer, CompanySerializer


class FlightViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Flight.objects.all().order_by('departure')
    serializer_class = FlightSerializer



class CompanyViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class AirportViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer
