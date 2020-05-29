DROP TABLE IF EXISTS public.ers_user_roles cascade;
 DROP TABLE IF EXISTS public.ers_reimbursement_type cascade;
 DROP TABLE IF EXISTS public.ers_reimbursement_status cascade;
 DROP TABLE IF EXISTS public.ers_users cascade;
 DROP TABLE IF EXISTS public.ers_reimbursement cascade;
 
 CREATE TABLE public.ers_user_roles (
     id serial NOT NULL,
     user_role varchar(10) NOT NULL UNIQUE,
     CONSTRAINT ers_user_roles_pk PRIMARY KEY (id)
 );
 
 CREATE TABLE public.ers_reimbursement_type (
     id serial NOT NULL,
     reimb_type varchar(10) NOT NULL UNIQUE,
     CONSTRAINT ers_reimbursement_type_pk PRIMARY KEY (id)
 );
 
 CREATE TABLE public.ers_reimbursement_status (
     id serial NOT NULL,
     reimb_status varchar(10) NOT NULL UNIQUE,
     CONSTRAINT ers_reimbursement_status_pk PRIMARY KEY (id)
 );
 
 CREATE TABLE public.ers_users (
     id serial NOT NULL,
     ers_username varchar(50) NOT NULL UNIQUE,
     ers_password varchar(50) NOT NULL,
     user_first_name varchar(100) NOT NULL,
     user_last_name varchar(100) NOT NULL,
     user_email varchar(150) NOT NULL UNIQUE,
     ers_user_role_id int4 NOT NULL,
     FOREIGN KEY (ers_user_role_id) REFERENCES ers_user_roles (id),
     CONSTRAINT ers_users_pk PRIMARY KEY (id),
     CONSTRAINT ers_users_un UNIQUE (ers_username,user_email)
 );

CREATE TABLE public.ers_reimbursement (
     id serial NOT NULL,
     reimb_amount numeric(9,2) NOT NULL,
     reimb_submitted timestamp NOT NULL,
     reimb_resolved timestamp NOT NULL,
     reimb_description varchar(250) NOT NULL,
     reimb_receipt varchar(100) NOT NULL UNIQUE,
     ers_reimbursement_status_id int4 NOT NULL,
     ers_reimbursement_type_id int4 NOT NULL,
     reimb_author int4 NOT NULL,
     reimb_resolver int4 NOT NULL,
     FOREIGN KEY (ers_reimbursement_status_id) REFERENCES ers_reimbursement_status (id),
     FOREIGN KEY (ers_reimbursement_type_id) REFERENCES ers_reimbursement_type (id),
     FOREIGN KEY (reimb_author) REFERENCES ers_users (id),
     FOREIGN KEY (reimb_resolver) REFERENCES ers_users (id),
     CONSTRAINT ers_reimbursement_pk PRIMARY KEY (id)
 );







