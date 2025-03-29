CREATE TABLE IF NOT EXISTS tarot_spread (
	id STRING NOT NULL,
    name STRING NOT NULL,
	description STRING NOT NULL,
	drawn_card_count INT8 NOT NULL,
	PRIMARY KEY (id)
);
