INSERT INTO altarf.reader
(id, user_id, nickname, bio, created_at, updated_at)
VALUES(uuid(), 'xxx', 'nickname', 'bio', now(3), NULL);

INSERT INTO altarf.reader_social
(id, reader_id, platform, url, created_at, updated_at)
VALUES(uuid(), 'yyy', 'FACEBOOK', 'c', now(3), NULL);

INSERT INTO altarf.reader_social
(id, reader_id, platform, url, created_at, updated_at)
VALUES(uuid(), 'yyy', 'INSTAGRAM', 'd', now(3), NULL);

INSERT INTO altarf.reader_social
(id, reader_id, platform, url, created_at, updated_at)
VALUES(uuid(), 'yyy', 'YOUTUBE', 'e', now(3), NULL);

INSERT INTO altarf.reader_social
(id, reader_id, platform, url, created_at, updated_at)
VALUES(uuid(), 'yyy', 'THREAD', 'f', now(3), NULL);