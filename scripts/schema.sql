CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create enum gender
CREATE TYPE GENDER AS ENUM ('male', 'female');

CREATE TABLE users (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  gender GENDER,
  email TEXT NOT NULL UNIQUE,
  -- null password means the user is authenticated via a third-party service
  password TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_identities (
  user_uuid UUID NOT NULL,
  provider TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_uuid, provider, provider_id),
  FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON DELETE CASCADE
);