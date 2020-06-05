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

/* ReimbursementView */
/* SELECT For Status and Type tables */
SELECT r.id AS "reimb_id"
	,r.reimb_amount AS "amount"
	,r.reimb_submitted AS "submitted"
	,r.reimb_resolved AS "resolved"
	,r.reimb_description AS "description"
	,r.reimb_receipt AS "receipt"
	,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_author) AS "author"
	,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_resolver) AS "resolver"
	,ers_reimbursement_type.reimb_type
	,ers_reimbursement_status.reimb_status 
FROM (SELECT * FROM ers_reimbursement) r
LEFT JOIN ers_reimbursement_type ON r.ers_reimbursement_type_id  = ers_reimbursement_type.id
LEFT JOIN ers_reimbursement_status ON r.ers_reimbursement_status_id  = ers_reimbursement_status.id 
WHERE ers_reimbursement_status.reimb_status = 'Pending' and ers_reimbursement_type.reimb_type = 'FOOD'

/* SELECT Only Type */
SELECT r.id AS "reimb_id"
	,r.reimb_amount AS "amount"
	,r.reimb_submitted AS "submitted"
	,r.reimb_resolved AS "resolved"
	,r.reimb_description AS "description"
	,r.reimb_receipt AS "receipt"
	--,r.reimb_author AS "author"
	,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_author) AS "author"
	--,r.reimb_resolver AS "resolver"
	,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_resolver) AS "resolver"
	--,r.ers_reimbursement_type_id 
	--,r.ers_reimbursement_status_id 
	,ers_reimbursement_type.reimb_type
	,ers_reimbursement_status.reimb_status 
	 
FROM (SELECT * FROM ers_reimbursement) r
LEFT JOIN ers_reimbursement_type ON r.ers_reimbursement_type_id  = ers_reimbursement_type.id
LEFT JOIN ers_reimbursement_status ON r.ers_reimbursement_status_id  = ers_reimbursement_status.id 
WHERE ers_reimbursement_type.reimb_type = 'LODGING'
--WHERE ers_reimbursement_type.id = 4

/* SELECT Only Status */
SELECT r.id AS "reimb_id"
	,r.reimb_amount AS "amount"
	,r.reimb_submitted AS "submitted"
	,r.reimb_resolved AS "resolved"
	,r.reimb_description AS "description"
	,r.reimb_receipt AS "receipt"
	--,r.reimb_author AS "author"
	,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_author) AS "author"
	--,r.reimb_resolver AS "resolver"
	,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_resolver) AS "resolver"
	--,r.ers_reimbursement_type_id 
	--,r.ers_reimbursement_status_id 
	,ers_reimbursement_type.reimb_type
	,ers_reimbursement_status.reimb_status 
	 
FROM (SELECT * FROM ers_reimbursement) r
LEFT JOIN ers_reimbursement_type ON r.ers_reimbursement_type_id  = ers_reimbursement_type.id
LEFT JOIN ers_reimbursement_status ON r.ers_reimbursement_status_id  = ers_reimbursement_status.id 
WHERE ers_reimbursement_status.reimb_status = 'Pending'
--WHERE ers_reimbursement_status.id = 1


SELECT Now()

SELECT ers_reimbursement_status.id FROM ers_reimbursement_status WHERE ers_reimbursement_status.reimb_status = 'Pending';
SELECT ers_reimbursement_status.reimb_status AS "status" FROM ers_reimbursement_status,ers_reimbursement WHERE ers_reimbursement_status.id = ers_reimbursement.ers_reimbursement_status_id;

SELECT ers_reimbursement.reimb_author FROM ers_reimbursement

SELECT * FROM ers_reimbursement_status ers ;
SELECT * FROM ers_reimbursement_type ert;
SELECT * FROM ers_reimbursement er;
SELECT * FROM ers_users eu ;

INSERT INTO ers_reimbursement (reimb_amount ,reimb_submitted ,reimb_resolved ,reimb_description 
								,reimb_receipt ,ers_reimbursement_status_id ,ers_reimbursement_type_id 
								,reimb_author ,reimb_resolver )
VALUES (1234.56,Now(),Now(),'Just a description',Now(),1,2,3,5) RETURNING *;
--VALUES (2345.56,'2020-06-04','2020-06-04','Just a description','the receipt string blob location',1,1,3,1) RETURNING *;
--INSERT INTO ers_users (ers_username,ers_password,user_first_name,user_last_name,user_email,ers_user_role_id) 
--VALUES ('','','','','','') RETURNING *;

--INSERT INTO ers_reimbursement_type (reimb_type ) 
--VALUES ('LODGING')RETURNING *;
--VALUES ('TRAVEL') RETURNING *;
--VALUES ('FOOD') RETURNING *;
--VALUES ('OTHER') RETURNING *;


--INSERT INTO ers_reimbursement_status (reimb_status )
--VALUES ('Pending') RETURNING *;
--VALUES ('Approved') RETURNING *;
--VALUES ('Denied') RETURNING *;








