-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS pairings;


CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(280) NOT NULL,
    released BIGINT NOT NULL
);

CREATE TABLE pairings (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    author_id BIGINT,
    book_id BIGINT,
    detail VARCHAR(500) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO authors (
    name
)
VALUES
    ('J.K Rowling'),
    ('J.R.R. Tolkien'),
    ('Christopher Paolini')
    ;

INSERT INTO books (
    title,
    released
)
VALUES
    ('Philosophers Stone', 1997),
    ('Chamber of Secrets', 1998),
    ('Prisoner of Azkaban', 1999),
    ('Goblet of Fire', 2000),
    ('Order of the Phoenix', 2003),
    ('Half-Blood Prince', 2005),
    ('Deathly Hallows', 2007),
    ('The Fellowship of the Ring', 1954),
    ('The Two Towers', 1954),
    ('The Return of the King', 1955),
    ('Eragon', 2002),
    ('Eldest', 2005),
    ('Brisingr', 2008),
    ('Inheritance', 2011)
    ;

INSERT INTO pairings (
    author_id,
    book_id,
    detail
)
VALUES
    (1,1, 'The Sorcerers Stone'),
    (1,2, 'Chamber of Secrets'),
    (1,3, 'Prisoner of Azkaban'),
    (1,4, 'Goblet of Fire'),
    (1,5, 'Order of the Phoenix'),
    (1,6, 'Half-Blood Prince'),
    (1,7, 'Deathly Hallows'),
    (2,8, 'The Fellowship of the Ring'),
    (2,9, 'The Two Towers'),
    (2,10, 'The Return of the King'),
    (3,11, 'Eragon'),
    (3,12, 'Eldest'),
    (3,13, 'Brisingr'),
    (3,14, 'Inheritance')
    ;
    
