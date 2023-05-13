FROM python:3.9.16-bullseye

WORKDIR /root/tweet-server

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000
ENTRYPOINT ["gunicorn", "-w", "4", "-b", "0.0.0.0", "app:app"]
