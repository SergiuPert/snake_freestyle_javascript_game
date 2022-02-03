create table users
(
    id        serial,
    username  text,
    password  text,
    highscore integer default 0
);


