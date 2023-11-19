CREATE TABLE policies (
  policy_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  policy_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);