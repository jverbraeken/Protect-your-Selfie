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

CREATE TABLE relations (
	file_owner			serial references users(id),
	granted_user		serial references users(id),
	encrypted_key		varchar(1024),
	associated_file		serial references files(id)
)
