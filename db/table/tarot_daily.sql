CREATE TABLE IF NOT EXISTS tarot_daily (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
    card STRING NOT NULL,
    reading STRING NOT NULL,
    reversal BOOLEAN NOT NULL,
    is_read BOOLEAN NOT NULL,
    created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
	PRIMARY KEY (id)
);
