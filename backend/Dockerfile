FROM python:3.12-slim

WORKDIR /src/src/restapi

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . /src


EXPOSE 8000

CMD ["sh", "-c", "python manage.py flush && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]




