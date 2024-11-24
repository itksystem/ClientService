docker pull itksystem/client-service
docker run -d --name client-service --restart unless-stopped -p 3006:3006 -p 5672:5672 -p 443:443 --env-file .env.prod itksystem/client-service


