CREATE TABLE IF NOT EXISTS user_balance (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    transaction_type VARCHAR(255) NOT NULL,
    amount DOUBLE NOT NULL,
    balance DOUBLE NOT NULL,
    description TEXT NULL,
    transacted_at DATETIME(3) NOT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
