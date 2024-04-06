### Build and run the docker container:

- Build the database container and server container using the following command:
  `docker-compose up --build`

- To add the schema to the database, run the following command:
  `docker exec -it <database container id> psql -U postgres -d noteapp -a -f /docker-entrypoint-initdb.d/schema.sql`
