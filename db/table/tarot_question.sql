CREATE TABLE IF NOT EXISTS tarot_question (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    question TEXT NOT NULL,
    spread_id VARCHAR(255) NOT NULL,
    user_id CHAR(36) NOT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);