CREATE TABLE IF NOT EXISTS tarot_interpretation_human (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    reader_id UUID NOT NULL,
    status STRING NOT NULL,
    interpretation STRING NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES tarot_question(id),
    FOREIGN KEY (reader_id) REFERENCES "user"(id)
);
