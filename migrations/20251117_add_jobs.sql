BEGIN;

-- 1. Create jobs
CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  customer_id INTEGER NOT NULL REFERENCES users(id),
  created_by INTEGER REFERENCES users(id),
  assigned_to INTEGER REFERENCES users(id),
  team_id INTEGER REFERENCES teams(id),
  status VARCHAR(50) NOT NULL DEFAULT 'NEW',
  address TEXT,
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 2. Create job_status_logs
CREATE TABLE IF NOT EXISTS job_status_logs (
  id SERIAL PRIMARY KEY,
  job_id INTEGER NOT NULL REFERENCES jobs(id),
  old_status VARCHAR(50),
  new_status VARCHAR(50) NOT NULL,
  changed_by INTEGER REFERENCES users(id),
  note TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 3. Create job_attachments
CREATE TABLE IF NOT EXISTS job_attachments (
  id SERIAL PRIMARY KEY,
  job_id INTEGER NOT NULL REFERENCES jobs(id),
  uploaded_by INTEGER REFERENCES users(id),
  url TEXT NOT NULL,
  filename VARCHAR(255),
  content_type VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

COMMIT;
