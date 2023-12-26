from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=6)

    def __str__(self) -> str:
        return self.name
