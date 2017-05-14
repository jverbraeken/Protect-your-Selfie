CREATE TABLE users (
	id					serial PRIMARY KEY,
	username			varchar(80),
	password			varchar(80)
);

CREATE TABLE files (
	id					serial PRIMARY KEY,
	file_name			varchar(255),
	amazon_file			varchar(255)
);

CREATE TABLE user_to_file (
	file_owner			serial references users(id),
	granted_user		serial references users(id),
	associated_file		serial references files(id),
	nonsense			varchar(1024)
)
