CREATE TABLE IF NOT EXISTS reader_social (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    reader_id CHAR(36) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (reader_id) REFERENCES reader(id)
);