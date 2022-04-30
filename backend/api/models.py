from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Cat(models.Model):
    owner = models.ForeignKey(
        User, related_name='cats', on_delete=models.CASCADE)
    name = models.CharField(max_length=16)
    color = models.CharField(max_length=30)
    birth_year = models.IntegerField()
    breed = models.CharField(max_length=30)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'owner'],
                name='unique_name_owner'
            )
        ]

    def __str__(self):
        return self.name
