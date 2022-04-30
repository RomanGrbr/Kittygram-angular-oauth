from rest_framework.permissions import IsAuthenticatedOrReadOnly


class AdminUserOrReadOnly(IsAuthenticatedOrReadOnly):
    def has_permission(self, request, view):
        return request.user.is_authenticated or request.user.is_staff
