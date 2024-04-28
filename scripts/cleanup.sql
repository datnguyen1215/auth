DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_user_identities_updated_at ON user_identities;
DROP FUNCTION IF EXISTS update_updated_at;
DROP TABLE IF EXISTS user_identities;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS GENDER;
