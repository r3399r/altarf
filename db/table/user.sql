CREATE TABLE IF NOT EXISTS "user" (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    email STRING NOT NULL,
    role STRING NOT NULL,
    balance FLOAT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);