DROP DATABASE IF EXISTS meeting_booker;

CREATE DATABASE meeting_booker;

\c meeting_booker;

DROP TABLE IF EXISTS meeting_rooms, bookings; 

CREATE TABLE meeting_rooms (
    meeting_room_id SERIAL PRIMARY KEY,
    name VARCHAR,
    capacity INTEGER,
    floor INTEGER
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    meeting_room_id INTEGER REFERENCES meeting_rooms (meeting_room_id),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    meeting_name VARCHAR,
    attendees VARCHAR
);

INSERT INTO
    meeting_rooms (
        meeting_room_id,
        name,
        capacity,
        floor
    )

VALUES
    (1, 'Large Conference Room', 1, 22),
    (2, 'Board Room', 2, 22),
    (3, 'Small Conference Room', 3, 23),
    (4, 'Medium Conference Room', 4, 2),
    (5, 'Office', 5, 5);

INSERT INTO
    bookings (
        booking_id,
        meeting_room_id,
        start_time,
        end_time,
        meeting_name,
        attendees
    )

VALUES
    (1,4,'2022-05-04 8:00:00','2022-05-05 8:30:00','standup','simon, sandy'),
    (2,3,'2022-04-05 11:00:00','2022-04-06 12:00:00','one on one','Simon'),
    (3,5,'2022-05-06 10:30:00','2022-05-07 13:30:00','promotion talks','Steven, Stephon, Sophie'),
    (4,2,'2022-05-07 11:00:00','2022-05-08 11:30:00','brainstorming session','Stephanie, Devan, Melody'),
    (5,1,'2022-05-08 5:00:00','2022-05-09 6:30:00','Beer Friday','The whole team');