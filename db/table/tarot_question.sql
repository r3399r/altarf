CREATE TABLE IF NOT EXISTS tarot_question (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	question STRING NOT NULL,
    spread_id STRING NOT NULL,
    user_id UUID NOT NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES "user"(id),
	FOREIGN KEY (spread_id) REFERENCES tarot_spread(id)
);