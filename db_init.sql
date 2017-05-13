CREATE TABLE users (
	id					serial PRIMARY KEY,
	username			varchar(80),
	password			varchar(80)
);

CREATE TABLE files (
	id					serial PRIMARY KEY,
	amazon_path			varchar(1024)
);

CREATE TABLE relations (
	file_owner			serial references users(id),
	granted_user		serial references users(id),
	encrypted_key		varchar(256),
	associated_file		serial references files(id)
)