from django.contrib.admin import ModelAdmin, register
from .models import Cat


@register(Cat)
class CatAdmin(ModelAdmin):
    pass
