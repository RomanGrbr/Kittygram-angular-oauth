from django.urls import include, path
from rest_framework import routers
from .views import CatViewSet

app_name = 'api'

router = routers.DefaultRouter()
router.register('cats', CatViewSet)

urlpatterns = [
    path('v1/', include(router.urls)),
]
