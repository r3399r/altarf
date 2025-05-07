CREATE TABLE IF NOT EXISTS user_balance (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    transaction_type STRING NOT NULL,
    amount FLOAT NOT NULL,
    balance FLOAT NOT NULL,
    description STRING NULL,
    transacted_at TIMESTAMP NOT NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES "user"(id)
);
