CREATE
TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE);

ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);

