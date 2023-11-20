-- Updated policies table
CREATE TABLE policies (
  policy_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  policy_name VARCHAR(255) NOT NULL,
  policy_type VARCHAR(255),
  policy_holder_name VARCHAR(255),
  coverage_details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
