CREATE TABLE IF NOT EXISTS altarf.reader (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    bio TEXT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    cost DOUBLE NOT NULL DEFAULT 0,
    fee DOUBLE NOT NULL DEFAULT 0,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    UNIQUE (user_id)
);