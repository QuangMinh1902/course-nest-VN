nestjs = nestjs-api
database= postgres

docker run:
	docker compose up

docker rebuild: 
	docker compose up --build ${nestjs}

stop app:
	docker compose down --rmi local 

build-database:
	docker compose up --build ${database}

remove image volume:
	docker image prune -af && docker volume prune -af