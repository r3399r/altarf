CREATE TABLE IF NOT EXISTS tarot_question_card (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    reversal BOOLEAN NOT NULL, 
    card_id STRING NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES tarot_question(id),
    FOREIGN KEY (card_id) REFERENCES tarot_card(id),
    UNIQUE (question_id, card_id)
);
