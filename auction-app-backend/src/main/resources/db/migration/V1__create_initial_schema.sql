create table auth_tokens (
    id uuid not null,
    blacklisted boolean not null,
    token varchar(255) not null,
    token_expiration_time timestamp not null,
    primary key (id)
);

create table bids (
    id uuid not null,
    creation_date_time timestamp with time zone not null,
    price float8 not null,
    product_id uuid,
    user_id uuid,
    primary key (id)
);

create table categories (
    id uuid not null,
    name varchar(255) not null,
    parent_category_id uuid,
    primary key (id)
);

create table credit_cards (
    id uuid not null,
    expiration_date timestamp,
    holder_full_name varchar(255),
    number varchar(255),
    stripe_credit_card_id varchar(255),
    verification_value varchar(255),
    primary key (id)
);

create table notifications (
    id uuid not null,
    creation_date_time timestamp with time zone not null,
    message int4 not null,
    product_id uuid,
    user_id uuid,
    primary key (id)
);

create table payments (
    id uuid not null,
    amount int4 not null,
    payment_related_entity varchar(255) not null,
    related_entity_id uuid not null,
    time timestamp,
    credit_card_id uuid not null,
    user_id uuid not null,
    primary key (id)
);

create table product_entity_imageurls (
    product_entity_id uuid not null,
    image_urls varchar(255) not null
);

create table products (
    id uuid not null,
    city varchar(255),
    country varchar(255),
    state varchar(255),
    street varchar(255),
    zip_code varchar(255),
    creation_date_time timestamp with time zone not null,
    description varchar(1000) not null,
    expiration_date_time timestamp with time zone not null,
    name varchar(255) not null,
    start_price float8 not null,
    category_id uuid not null,
    credit_card_id uuid not null,
    subcategory_id uuid not null,
    user_id uuid,
    primary key (id)
);

create table users (
    id uuid not null,
    active boolean not null,
    city varchar(255),
    country varchar(255),
    state varchar(255),
    street varchar(255),
    zip_code varchar(255),
    date_of_birth timestamp,
    email varchar(255) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    password_hash varchar(255) not null,
    phone_number varchar(255),
    profile_image_url varchar(255),
    role int4 not null,
    stripe_customer_id varchar(255),
    username varchar(255) not null,
    credit_card_id uuid,
    primary key (id)
);

alter table users
    add constraint UK_6dotkott2kjsp8vw4d0m25fb7 unique (email);

alter table bids
    add constraint FKhtewr5n8ee2tlu0rj67d6y14p
        foreign key (product_id)
            references products;

alter table bids
    add constraint FKmb21nl8gr3srgnlch3s18oqv9
        foreign key (user_id)
            references users;

alter table notifications
    add constraint FKix2l63ilcu384ke5kprwx1xy
        foreign key (product_id)
            references products;

alter table notifications
    add constraint FK9y21adhxn0ayjhfocscqox7bh
        foreign key (user_id)
            references users;

alter table payments
    add constraint FKiaw2wnqv3bmuu9vkskt4rgv60
        foreign key (credit_card_id)
            references credit_cards;

alter table payments
    add constraint FKj94hgy9v5fw1munb90tar2eje
        foreign key (user_id)
            references users;

alter table product_entity_imageurls
    add constraint FKfndoffr0mr8ilshhvc0axvrtf
        foreign key (product_entity_id)
            references products;

alter table products
    add constraint FKog2rp4qthbtt2lfyhfo32lsw9
        foreign key (category_id)
            references categories;

alter table products
    add constraint FK44q8yqco6qu6r4hsp8emphc0x
        foreign key (credit_card_id)
            references credit_cards;

alter table products
    add constraint FKthircok9tneu7d7kmrpg24do9
        foreign key (subcategory_id)
            references categories;

alter table products
    add constraint FKdb050tk37qryv15hd932626th
        foreign key (user_id)
            references users;

alter table users
    add constraint FK79uy6vvmr5rq8bmavnmjnsau5
        foreign key (credit_card_id)
            references credit_cards;