CREATE TABLE IF NOT EXISTS tarot_interpretation_ai (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    interpretation STRING NULL
    prompt_tokens FLOAT NULL,
    completion_tokens FLOAT NULL,
    elapsed_time FLOAT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES tarot_question(id)
);
