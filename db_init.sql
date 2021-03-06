CREATE TABLE users (
	id					serial PRIMARY KEY,
	name					varchar(80),
	username			varchar(80),
	password			varchar(80),
	is_organization boolean
);

CREATE TABLE files (
	id					serial PRIMARY KEY,
	file_name			varchar(255),
	amazon_file			varchar(255),
	description		varchar(255),
	date_uploaded	date
);

CREATE TABLE user_to_file (
	file_owner			serial references users(id),
	granted_user		serial references users(id),
	associated_file		serial references files(id),
	nonsense			varchar(1024)
);

CREATE TABLE views (
	id						serial PRIMARY KEY,
	file					serial references files(id),
	viewed_by			serial references users(id),
	date_viewed		timestamp
);

CREATE TABLE user_to_organization (
	user_id					serial references users(id),
	organization_id	serial references users(id)
);
