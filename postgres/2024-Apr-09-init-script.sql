CREATE DATABASE demo

CREATE TABLE ToDoItems (
    id          UUID    PRIMARY KEY,
    details     VARCHAR NOT NULL,
    createdAt   DATE    NOT NULL,
    updatedAt   DATE    NOT NULL,
)

INSERT INTO ToDoItems VALUES(gen_random_uuid(),'Buy some Food',NOW(),NOW())
INSERT INTO ToDoItems VALUES(gen_random_uuid(),'Tidy up my bed',NOW(),NOW())