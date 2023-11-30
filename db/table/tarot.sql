CREATE TABLE IF NOT EXISTS tarot (
	id UUID NOT NULL,
	description STRING NOT NULL,
    spread STRING NOT NULL,
    card STRING NOT NULL,
    response STRING NULL,
    has_file BOOLEAN NOT NULL,
    user_id UUID NOT NULL,
    started_at TIMESTAMP NOT NULL,
    prompt_tokens INT NULL,
    completion_tokens INT NULL,
    elapsed_time INT NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES "user"(id)
);
