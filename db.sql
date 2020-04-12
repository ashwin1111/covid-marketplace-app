--Admin table:

create table admin_cred( admin_id serial PRIMARY KEY, admin_user_name text, admin_password text);

--Customer table:

create table customer_cred( customer_id serial PRIMARY KEY, customer_name text, customer_email text, customer_phone text, customer_aadhar_num text, customer_password text);

--Time slot table:

create table time_slot( time_slot_id serial PRIMARY KEY, time_slot_range text);

--Market-place All details:

create table market_place_all_details( market_place_id serial PRIMARY KEY, market_palce_name text, time_slot_ids text, customer_max_count integer, active_check bit);

--Bookings Table:

create table bookings( booking_id serial PRIMARY KEY, booking_customer_id INTEGER References customer_cred(customer_id), booking_market_place_id INTEGER References market_place_all_details(market_place_id),booking_time_slot_id INTEGER, qr_code text, active_check bit);

--Active market-place customer visit details table:

create table active_market_place_details(active_market_place_details_id serial PRIMARY KEY, active_customer_id INTEGER References customer_cred(customer_id), active_market_palce_id INTEGER References market_place_all_details(market_place_id), entry_time timestamp without time zone,exit_time timestamp without time zone,present_customer_count INTEGER);

--Count Updates table:

create table count_updates(count_update_id serial PRIMARY KEY, market_place_id INTEGER References market_place_all_details(market_place_id), count INTEGER);