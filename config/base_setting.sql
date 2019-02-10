CREATE TABLE GAME (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE GAMEUSER (
  id serial PRIMARY KEY,
  username VARCHAR (20) NOT NULL,
  password VARCHAR (50) NOT NULL,
  name VARCHAR (20) NOT NULL,
  email VARCHAR (320) NOT NULL
);

CREATE TABLE SELECTEDGAME (
  user_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  FOREIGN KEY (game_id) REFERENCES GAME(id),
  FOREIGN KEY (user_id) REFERENCES GAMEUSER(id)
);
