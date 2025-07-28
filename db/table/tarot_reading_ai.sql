CREATE TABLE IF NOT EXISTS tarot_reading_ai (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    question_id CHAR(36) NOT NULL,
    reading TEXT NULL,
    prompt_tokens DOUBLE NULL,
    completion_tokens DOUBLE NULL,
    elapsed_time DOUBLE NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES tarot_question(id)
);
