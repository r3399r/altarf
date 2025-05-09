CREATE TABLE IF NOT EXISTS tarot_interpretation_ai (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    interpretation STRING NOT NULL,
    prompt_tokens FLOAT NOT NULL,
    completion_tokens FLOAT NOT NULL,
    elapsed_time FLOAT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES tarot_question(id)
);
