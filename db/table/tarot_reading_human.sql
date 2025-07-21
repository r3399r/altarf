CREATE TABLE IF NOT EXISTS tarot_reading_human (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    question_id CHAR(36) NOT NULL,
    reader_id CHAR(36) NOT NULL,
    status VARCHAR(255) NOT NULL,
    reading TEXT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES tarot_question(id),
    FOREIGN KEY (reader_id) REFERENCES user(id)
);
