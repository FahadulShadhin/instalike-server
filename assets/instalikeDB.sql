--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    user_id integer,
    img_url character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    fullname character varying(255),
    phone_no character varying(255),
    profession character varying(255),
    bio text,
    profile_image_url character varying(255),
    social_links jsonb,
    interests jsonb,
    status character varying(255) DEFAULT 'active'::character varying,
    timezone character varying(255) DEFAULT 'UTC'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    is_admin boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, user_id, img_url, description, created_at) FROM stdin;
14	1	https://example.com/image1.jpg	Image 1 description	2023-07-01 10:02:43.969703
15	1	https://example.com/image2.jpg	Image 2 description	2023-07-01 10:02:43.969703
16	2	https://example.com/image3.jpg	Image 3 description	2023-07-01 10:02:43.969703
17	2	https://example.com/image4.jpg	Image 4 description	2023-07-01 10:02:43.969703
18	3	https://example.com/image5.jpg	Image 5 description	2023-07-01 10:02:43.969703
19	3	https://example.com/image6.jpg	Image 6 description	2023-07-01 10:02:43.969703
20	4	https://example.com/image7.jpg	Image 7 description	2023-07-01 10:02:43.969703
21	4	https://example.com/image8.jpg	Image 8 description	2023-07-01 10:02:43.969703
22	5	https://example.com/image9.jpg	Image 9 description	2023-07-01 10:02:43.969703
23	5	https://example.com/image10.jpg	Image 10 description	2023-07-01 10:02:43.969703
24	12	https://testpath.com/testimage100.png	A very cool image.	2023-07-01 10:13:13.124684
25	12	https://testpath.com/testimage200.png	Another very cool image.	2023-07-01 10:13:23.941268
27	12	https://testpath.com/testimage1.png	test image description	2023-07-01 21:59:39.684062
28	12	https://testpath.com/testimage2.png	test image description	2023-07-01 21:59:46.522631
30	12	https://testpath.com/testimage3.png	test image description	2023-07-02 12:47:42.224055
31	12	https://testpath.com/testimage3.png	test image description	2023-07-02 12:47:43.424101
32	12	https://testpath.com/testimage3.png	test image description	2023-07-02 12:47:44.479431
34	43	https://testpath.com/testimage3.png	test image description	2023-07-02 12:48:49.062024
35	43	https://testpath.com/testimage3.png	test image description	2023-07-02 12:48:50.177531
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, password, username, email, fullname, phone_no, profession, bio, profile_image_url, social_links, interests, status, timezone, created_at, is_admin) FROM stdin;
1	7c6a180b36896a0a8c02787eeafb0e4c	user1	user1@example.com	User One	1234567890	Developer	Bio for User One	https://example.com/profile1.jpg	{"github": "https://github.com/user1", "twitter": "https://twitter.com/user1"}	["programming", "design"]	active	UTC	2023-07-01 08:48:52.727778	f
2	6cb75f652a9b52798eb6cf2201057c73	user2	user2@example.com	User Two	9876543210	Designer	Bio for User Two	https://example.com/profile2.jpg	{"twitter": "https://twitter.com/user2", "linkedin": "https://linkedin.com/user2"}	["design", "photography"]	active	UTC	2023-07-01 08:48:52.727778	f
4	34cc93ece0ba9e3f6f235d4af979b16c	user4	user4@example.com	User Four	1111111111	Engineer	Bio for User Four	https://example.com/profile4.jpg	{"linkedin": "https://linkedin.com/user4"}	["engineering", "technology"]	active	UTC	2023-07-01 08:48:52.727778	f
5	db0edd04aaac4506f7edab03ac855d56	user5	user5@example.com	User Five	9999999999	Artist	Bio for User Five	https://example.com/profile5.jpg	{"website": "https://user5.com"}	["art", "painting"]	active	UTC	2023-07-01 08:48:52.727778	f
6	218dd27aebeccecae69ad8408d9a36bf	user6	user6@example.com	User Six	7777777777	Photographer	Bio for User Six	https://example.com/profile6.jpg	{"instagram": "https://instagram.com/user6"}	["photography", "travel"]	active	UTC	2023-07-01 08:48:52.727778	f
7	00cdb7bb942cf6b290ceb97d6aca64a3	user7	user7@example.com	User Seven	2222222222	Musician	Bio for User Seven	https://example.com/profile7.jpg	{"facebook": "https://facebook.com/user7"}	["music", "guitar"]	active	UTC	2023-07-01 08:48:52.727778	f
8	b25ef06be3b6948c0bc431da46c2c738	user8	user8@example.com	User Eight	8888888888	Chef	Bio for User Eight	https://example.com/profile8.jpg	{"website": "https://user8.com", "instagram": "https://instagram.com/user8"}	["cooking", "food"]	active	UTC	2023-07-01 08:48:52.727778	f
9	5d69dd95ac183c9643780ed7027d128a	user9	user9@example.com	User Nine	4444444444	Teacher	Bio for User Nine	https://example.com/profile9.jpg	{"twitter": "https://twitter.com/user9"}	["education", "teaching"]	active	UTC	2023-07-01 08:48:52.727778	f
10	87e897e3b54a405da144968b2ca19b45	user10	user10@example.com	User Ten	6666666666	Entrepreneur	Bio for User Ten	https://example.com/profile10.jpg	{"website": "https://user10.com", "linkedin": "https://linkedin.com/user10"}	["business", "startups"]	active	UTC	2023-07-01 08:48:52.727778	f
11	21232f297a57a5a743894a0e4a801fc3	admin	admin@example.comm	\N	\N	\N	\N	\N	\N	\N	active	UTC	2023-07-01 08:59:08.246972	t
13	098f6bcd4621d373cade4e832627b4f6	test	test@example.com	\N	\N	\N	\N	\N	\N	\N	deactivated	UTC	2023-07-01 09:28:11.539171	f
3	819b0643d6b89dc9b579fdfc9094f28e	user3	user3@example.com	User Three	5555555555	Writer	Bio for User Three	https://example.com/profile3.jpg	{"instagram": "https://instagram.com/user3"}	["writing", "reading"]	Blocked	UTC	2023-07-01 08:48:52.727778	f
14	9733b92d7d60ecac9ad32ff7a5c87a3c	Rahim	rahim@example.com	\N	\N	\N	\N	\N	\N	\N	active	UTC	2023-07-01 10:55:20.025252	f
15	2167a6ac80340b69f3b05b800417d6c7	Karim	karim@example.com	\N	\N	\N	\N	\N	\N	\N	active	UTC	2023-07-01 10:56:10.631614	t
12	33127f04c19c93cd5f90610780b4e532	notadmin	motadmin@example.com	Not Admin	1234567890	Professional eater	no bio	https://profileimahelink.com/profileimage.png	{"link": "asociallink_updated.com", "github": "mygithub.github", "another": "anothersociallink.com", "onemore": "onemoresociallink.com", "linkedin": "linkedin@example.com", "instagram": "instagram@example.com"}	["photography", "drawing", "art", "sleeping", "watching grass", "not speaking", "sitting"]	Active	UTC	2023-06-27 19:51:39.239254	f
16	a8c0d2a9d332574951a8e4a0af7d516f	Jane Doe	jane@example.com	\N	\N	\N	\N	\N	\N	\N	active	UTC	2023-07-01 21:54:54.112586	f
43	5f4dcc3b5aa765d61d8327deb882cf99	shadhin	shadhin@example.com	Fahadul Shadhin	1234567890	Professional eater	no bio	https://profileimahelink.com/profileimage.png	{"github": "mygithub.github", "linkedin": "linkedin@example.com", "instagram": "instagram@example.com"}	["drawing"]	Active	UTC	2023-06-27 19:51:39.239254	f
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 44, true);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: images images_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

