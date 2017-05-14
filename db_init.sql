CREATE TABLE users (
	id					serial PRIMARY KEY,
	username			varchar(80),
	password			varchar(80)
);

CREATE TABLE files (
	id					serial PRIMARY KEY,
	file_name			varchar(255),
	amazon_file			varchar(255),
	description		varchar(255),
	date_uploaded	date
);

CREATE TABLE relations (
	file_owner			serial references users(id),
	granted_user		serial references users(id),
	encrypted_key		varchar(255),
	associated_file		serial references files(id)
);

CREATE TABLE views (
	id						serial PRIMARY KEY,
	file					serial references files(id),
	viewed_by			serial references users(id),
	date_viewed		timestamp
)
