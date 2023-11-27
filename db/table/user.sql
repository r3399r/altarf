CREATE TABLE IF NOT EXISTS "user" (
	id UUID NOT NULL,
	email STRING NOT NULL,
    role STRING NULL,
    balance INT NULL,
	quota INT NOT NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
	PRIMARY KEY (id),
    UNIQUE (email)
);