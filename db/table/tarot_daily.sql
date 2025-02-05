CREATE TABLE IF NOT EXISTS tarot_daily (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
    card_id STRING NOT NULL,
    interpretation STRING NOT NULL,
    reversal BOOLEAN NOT NULL,
    created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
    last_read_at TIMESTAMP NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (card_id) REFERENCES tarot_card(id)
);