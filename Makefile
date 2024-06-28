install:
	npm ci && make -C frontend install

build:
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npm run start

lint-frontend:
	make -C frontend lint

start:
	make start-backend & make start-frontend