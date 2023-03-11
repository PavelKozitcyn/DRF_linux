import graphene
from graphene_django import DjangoObjectType

from todoapp.models import Project, ToDo
from usersapp.models import CustomUser


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = "__all__"


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    all_todos = graphene.List(TodoType)

    def resolve_all_todos(root, info):
        return CustomUser.objects.all()


schema = graphene.Schema(query=Query)
