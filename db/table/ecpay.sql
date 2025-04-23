CREATE TABLE IF NOT EXISTS ECPAY_TRADE (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	merchant_trade_no VARCHAR(255) NOT NULL,
	merchant_trade_date TIMESTAMP NOT NULL,
	total_amount VARCHAR(255) NOT NULL,
	trade_desc VARCHAR(255) NOT NULL,
	item_name VARCHAR(255) NOT NULL,
	status VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
	PRIMARY KEY (id),
	UNIQUE (merchant_trade_no)
);