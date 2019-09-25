CONTEXT_BUCKET = context-bucket

build:
	docker-compose build serenata

up:
	docker-compose up

stop:
	docker-compose stop

shell:
	docker-compose run --rm serenata sh

delete:
	docker-compose down --rmi local -v
