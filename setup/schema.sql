CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
  users (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(255) NOT NULL,
    service VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
  );

CREATE TABLE
  settings (
    user_uuid UUID,
    name VARCHAR(255),
    value TEXT,
    PRIMARY KEY (user_uuid, name),
    FOREIGN KEY (user_uuid) REFERENCES users (uuid)
  );

CREATE TABLE
  notes (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_uuid UUID NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    modified_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  note_deltas (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    note_uuid UUID,
    delta JSONB NOT NULL,
    version INT,
    FOREIGN KEY (note_uuid) REFERENCES notes (uuid) ON DELETE CASCADE,
    modified_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
