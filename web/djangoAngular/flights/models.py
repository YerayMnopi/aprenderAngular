from django.db import models
from django.contrib.postgres.fields import JSONField
from djangoAngular.mixins import UpdateableMixin


class Company(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Airport(models.Model):
    name = models.CharField(max_length=250)
    code = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Flight(UpdateableMixin):
    record = JSONField()
    company = models.ForeignKey(Company, related_name='flights')
    origin = models.ForeignKey(Airport, related_name='flight_origin')
    destination = models.ForeignKey(Airport, related_name='flight_destination')
    amount = models.DecimalField(decimal_places=2, max_digits=11)
    flight_number = models.CharField(max_length=250)
    departure = models.DateTimeField()
    arrival = models.DateTimeField()

    class Meta:
        ordering = ('-departure',)

    def __str__(self):
        return '%s -> %s'.format(self.origin, self.destination)
