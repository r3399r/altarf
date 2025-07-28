CREATE TABLE IF NOT EXISTS tarot_daily (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    card_id VARCHAR(255) NOT NULL,
    reading TEXT NOT NULL,
    reversal BOOLEAN NOT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    last_read_at DATETIME(3) NULL,
    PRIMARY KEY (id)
);