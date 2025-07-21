CREATE TABLE IF NOT EXISTS user (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    balance DOUBLE NOT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);