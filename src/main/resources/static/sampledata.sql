/*CREATE TABLE customers (
   uuid UUID PRIMARY KEY,
   name VARCHAR(255),
   role VARCHAR(255)
);

CREATE TABLE rides (
   id UUID PRIMARY KEY,
   distance_traveled DOUBLE PRECISION,
   price_paid DOUBLE PRECISION,
   user_id UUID REFERENCES customers(uuid)
);

 */


INSERT INTO customers (role, uuid, name, email, password)
  VALUES
      (0, '11111111-1111-1111-1111-111111111111', 'Daniel Auer', 'auerda@yahoo.de', '111'),
      (1, '22222222-2222-2222-2222-222222222222', 'Julien Bedrich', 'julien@yahoo.de', '123'),
      (1, '33333333-3333-3333-3333-333333333333', 'Holger Schmidt', 'holger@yahoo.de', '111'),
      (1, '44444444-4444-4444-4444-444444444444', 'Niklas Ehrhardt', 'holger@yahoo.de', '111'),
      (2, '55555555-5555-5555-5555-555555555555', 'Timo Reiss', 'timo@yahoo.de', '222');


INSERT INTO ride (id, distance_traveled, price_paid, user_id)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 10.5, 25.0, '11111111-1111-1111-1111-111111111111'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 5.2, 12.5, '11111111-1111-1111-1111-111111111111'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 8.7, 20.0, '22222222-2222-2222-2222-222222222222'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 3.9, 9.5, '33333333-3333-3333-3333-333333333333');