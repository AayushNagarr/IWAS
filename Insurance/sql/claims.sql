-- Define the enum type only if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'claim_status_enum') THEN
    CREATE TYPE claim_status_enum AS ENUM ('Pending', 'Approved', 'Rejected');
  END IF;
END $$;

-- Create the claims table with the enum type for claim_status
CREATE TABLE claims (
  claim_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  policy_id INT REFERENCES policies(policy_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cause_of_loss TEXT,
  estimated_damage_amount DECIMAL(10, 2),
  claim_status claim_status_enum DEFAULT 'Pending'
);
