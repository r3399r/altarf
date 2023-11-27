CREATE TABLE IF NOT EXISTS balance_detail (
	id UUID NOT NULL,
    user_id UUID NOT NULL,
    recorded_at TIMESTAMP NOT NULL,
    income FLOAT NULL,
    expense FLOAT NULL,
    balance FLOAT NOT NULL,
    memo STRING NULL,
    tarot_id UUID NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES "user"(id),
	FOREIGN KEY (tarot_id) REFERENCES tarot(id)
);
