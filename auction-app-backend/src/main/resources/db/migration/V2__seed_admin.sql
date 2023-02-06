create extension if not exists "pgcrypto";

insert into users (active, first_name, last_name, username, email, password_hash, phone_number, role)
    values (true, 'Muamer', 'Alickovic', 'alickovicmuamer@gmail.com', 'alickovicmuamer@gmail.com', crypt('Pa$$w0rd',gen_salt('bf', 10)), '061-061-061', 1)
