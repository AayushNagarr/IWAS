CREATE TABLE claims (
  claim_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  policy_id INT REFERENCES policies(policy_id),
  claim_status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
