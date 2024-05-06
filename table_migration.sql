-- public.about definition

-- Drop table

-- DROP TABLE public.about;

CREATE TABLE public.about (
	id_about serial4 NOT NULL,
	judul_about varchar NULL,
	isi_about varchar NULL,
	img_about varchar NULL
);


-- public.contact definition

-- Drop table

-- DROP TABLE public.contact;

CREATE TABLE public.contact (
	id_contact serial4 NOT NULL,
	telephone numeric NULL,
	alamat_contact varchar NULL,
	email_contact varchar NULL
);


-- public.our_project definition

-- Drop table

-- DROP TABLE public.our_project;

CREATE TABLE public.our_project (
	id_our_project serial4 NOT NULL,
	nama_tempat_project varchar NULL,
	alamat_project varchar NULL,
	img_our_project varchar NULL
);


-- public.project definition

-- Drop table

-- DROP TABLE public.project;

CREATE TABLE public.project (
	id_project serial4 NOT NULL,
	judul_project varchar NULL,
	content_project varchar NULL,
	img_project varchar NULL
);


-- public.work_hours definition

-- Drop table

-- DROP TABLE public.work_hours;

CREATE TABLE public.work_hours (
	id_work serial4 NOT NULL,
	work_hours varchar NULL,
	days varchar NULL
);


-- public.visi_misi definition

-- Drop table

-- DROP TABLE public.visi_misi;

CREATE TABLE public.visi_misi (
	id_visi_misi serial4 NOT NULL,
	misi varchar NULL,
	visi varchar NULL
);