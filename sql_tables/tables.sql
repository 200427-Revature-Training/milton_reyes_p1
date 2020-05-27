DROP TABLE IF EXISTS public.ers_user_roles cascade;
DROP TABLE IF EXISTS public.ers_reimbursement_type cascade;
DROP TABLE IF EXISTS public.ers_reimbursement_status cascade;
DROP TABLE IF EXISTS public.ers_users cascade;
DROP TABLE IF EXISTS public.ers_reimbursement cascade;

CREATE TABLE public.ers_user_roles (
	id serial NOT NULL PRIMARY KEY,
	user_role varchar NOT NULL UNIQUE
);

CREATE TABLE public.ers_reimbursement_type (
	id serial NOT NULL PRIMARY KEY,
	reimb_type varchar NOT NULL UNIQUE
);

CREATE TABLE public.ers_reimbursement_status (
	id serial NOT NULL PRIMARY KEY,
	reimb_status varchar NOT NULL UNIQUE
);

CREATE TABLE public.ers_users (
	id serial NOT NULL PRIMARY KEY,
	ers_username varchar NOT NULL UNIQUE,
	ers_password varchar NOT NULL,
	user_first_nnme varchar NOT NULL,
	user_last_name varchar NOT NULL,
	user_email varchar NOT NULL UNIQUE,
	ers_user_role_id int4 NOT NULL,
	FOREIGN KEY (ers_user_role_id) REFERENCES ers_user_roles (id)
);

CREATE TABLE public.ers_reimbursement (
	id serial NOT NULL PRIMARY KEY,
	reimb_amount numeric(9,2) NOT NULL,
	reimb_submitted varchar NOT NULL,
	reimb_resolved varchar NOT NULL,
	reimb_description varchar NOT NULL,
	reimb_receipt varchar NOT NULL UNIQUE,
	ers_reimbursement_status_id int4 NOT NULL,
	ers_reimbursement_type_id int4 NOT NULL,
	ers_user_id int4 NOT NULL,
	ers_user_username varchar NOT NULL,
	FOREIGN KEY (ers_reimbursement_status_id) REFERENCES ers_reimbursement_status (id),
	FOREIGN KEY (ers_reimbursement_type_id) REFERENCES ers_reimbursement_type (id),
	FOREIGN KEY (ers_user_id) REFERENCES ers_users (id),
	FOREIGN KEY (ers_user_username) REFERENCES ers_users (ers_username)
);





