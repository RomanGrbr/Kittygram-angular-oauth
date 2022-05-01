import datetime as dt

import webcolors
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import Cat


class Hex2NameColor(serializers.Field):
    def to_representation(self, value):
        return value

    def to_internal_value(self, data):
        try:
            data = webcolors.hex_to_name(data)
        except ValueError:
            raise serializers.ValidationError('Для этого цвета нет имени')
        return data


class CatSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())
    color = Hex2NameColor()

    class Meta:
        model = Cat
        fields = ('id', 'owner', 'name', 'color', 'birth_year', 'age', 'breed')
        read_only_fields = ('owner',)

        validators = [
            UniqueTogetherValidator(
                queryset=Cat.objects.all(),
                fields=('name', 'owner')
            )
        ]

    def get_age(self, obj):
        return dt.datetime.now().year - obj.birth_year

    def validate_birth_year(self, value):
        year = dt.date.today().year
        if not (year - 40 < value <= year):
            raise serializers.ValidationError('Проверьте год рождения!')
        return value

    def validate(self, data):
        if data['color'] == data['name']:
            raise serializers.ValidationError(
                'Имя не может совпадать с цветом!')
        return data
