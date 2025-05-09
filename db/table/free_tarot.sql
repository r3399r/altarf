CREATE TABLE IF NOT EXISTS free_tarot (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    tarot_id UUID NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (tarot_id) REFERENCES tarot(id)
);
