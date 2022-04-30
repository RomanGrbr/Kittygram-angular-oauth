from django.contrib.auth import get_user_model
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAdminUser

from .models import Cat
from .permissions import AdminUserOrReadOnly
from .serializers import CatSerializer

User = get_user_model()


class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer
    permission_classes = (IsAdminUser,)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filterset_fields = ('color', 'birth_year')
    search_fields = ('^name',)
    ordering_fields = ('name', 'birth_year')
    ordering = ('birth_year',)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        queryset = Cat.objects.filter(owner=user)
        return queryset
