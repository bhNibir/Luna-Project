#!/usr/bin/env bash

rm -rf /frontend/build/* && cp -r /frontend_temp/build/* /frontend/build
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input
gunicorn -w 4 -b 0.0.0.0:8000 project.wsgi:application
