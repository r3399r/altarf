ALTER TABLE altarf.tarot_reading_human DROP FOREIGN KEY tarot_reading_human_ibfk_2;

ALTER TABLE altarf.tarot_reading_human ADD FOREIGN KEY (reader_id) REFERENCES reader(id);

ALTER TABLE altarf.tarot_reading_human ADD COLUMN rating INT NULL;