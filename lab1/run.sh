docker volume create servervol
docker network create servernet

docker build -t client:1 ./client
docker build -t server:1 ./server

docker run -d -v servervol:/usr/app/serverdata --net servernet -p 5000:5000 --name server server:1
docker run -it -v servervol:/serverdata --net servernet -P --name client client:1
