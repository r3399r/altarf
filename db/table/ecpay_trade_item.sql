CREATE TABLE IF NOT EXISTS ecpay_trade_item (
    id CHAR(36) NOT NULL DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    price INT NOT NULL,
    created_at DATETIME(3) NULL,
    updated_at DATETIME(3) NULL,
    deleted_at DATETIME(3) NULL,
    PRIMARY KEY (id)
);