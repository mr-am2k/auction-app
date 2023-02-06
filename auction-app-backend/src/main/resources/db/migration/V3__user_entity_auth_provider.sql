alter table users add column auth_provider int;

update users set auth_provider = 0 where username = 'alickovicmuamer@gmail.com';





