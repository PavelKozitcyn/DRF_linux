from django.core.management.base import BaseCommand

from usersapp.models import CustomUser



class Command(BaseCommand):
    help = 'Create Superuser and some test users'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):
        # Удаляем пользоватлелей
        CustomUser.objects.all().delete()
        user_count = options['count']
        # Создаем суперпользователя
        CustomUser.objects.create_superuser('paul', 'Paul', 'Kozic',  'paul11@fuck.com')
        # Создаем тестовых пользователей
        for i in range(user_count):
            CustomUser.objects.create_user(f'user{i}', f'user{i}', f'user{i}', f'user{i}@test.com')

        print('done')
