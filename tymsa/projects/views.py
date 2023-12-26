from rest_framework import viewsets

from tymsa.projects.models import Project
from tymsa.projects.serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    queryset = Project.objects.all().order_by("name")
    serializer_class = ProjectSerializer
