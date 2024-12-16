# Passkey server

Run Postgres & redis
```sh
docker compose up -d
```

Create tables
```sh
cat src/migrations/init.sql | sudo docker exec -i postgres_db psql -U postgres -d myapp_db
```

Create JWT secret
```sh
openssl rand -hex 32 | tr -d "\n" > "jwt.hex"
```

Config .env
```sh
cp .env.example .env
```

Run passkey-server
```sh
bun run server.ts
```