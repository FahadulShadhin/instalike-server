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
-- Name: interests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interests (
    id integer NOT NULL,
    user_id integer,
    interest character varying(255)
);


ALTER TABLE public.interests OWNER TO postgres;

--
-- Name: interests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.interests_id_seq OWNER TO postgres;

--
-- Name: interests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interests_id_seq OWNED BY public.interests.id;


--
-- Name: socials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.socials (
    id integer NOT NULL,
    user_id integer,
    social_link character varying(255)
);


ALTER TABLE public.socials OWNER TO postgres;

--
-- Name: socials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.socials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socials_id_seq OWNER TO postgres;

--
-- Name: socials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.socials_id_seq OWNED BY public.socials.id;


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
-- Name: interests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests ALTER COLUMN id SET DEFAULT nextval('public.interests_id_seq'::regclass);


--
-- Name: socials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socials ALTER COLUMN id SET DEFAULT nextval('public.socials_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, user_id, img_url, description, created_at) FROM stdin;
1	1	https://example.com/image1.jpg	Image 1 description	2023-07-02 17:31:10.358146
2	1	https://example.com/image2.jpg	Image 2 description	2023-07-02 17:31:10.358146
3	2	https://example.com/image3.jpg	Image 3 description	2023-07-02 17:31:10.358146
4	3	https://example.com/image4.jpg	Image 4 description	2023-07-02 17:31:10.358146
5	3	https://example.com/image5.jpg	Image 5 description	2023-07-02 17:31:10.358146
6	4	https://example.com/image6.jpg	Image 6 description	2023-07-02 17:31:10.358146
7	5	https://example.com/image7.jpg	Image 7 description	2023-07-02 17:31:10.358146
8	6	https://example.com/image8.jpg	Image 8 description	2023-07-02 17:31:10.358146
9	6	https://example.com/image9.jpg	Image 9 description	2023-07-02 17:31:10.358146
10	7	https://example.com/image10.jpg	Image 10 description	2023-07-02 17:31:10.358146
11	8	https://example.com/image11.jpg	Image 11 description	2023-07-02 17:31:10.358146
12	9	https://example.com/image12.jpg	Image 12 description	2023-07-02 17:31:10.358146
13	10	https://example.com/image13.jpg	Image 13 description	2023-07-02 17:31:10.358146
14	11	https://example.com/image14.jpg	Image 14 description	2023-07-02 17:31:10.358146
15	11	https://example.com/image15.jpg	Image 15 description	2023-07-02 17:31:10.358146
\.


--
-- Data for Name: interests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interests (id, user_id, interest) FROM stdin;
1	1	Sports
2	1	Music
3	2	Reading
4	2	Traveling
5	3	Photography
6	4	Cooking
7	4	Gaming
8	5	Art
9	6	Fitness
10	7	Fashion
11	1	Hiking
12	1	Photography
13	2	Dancing
14	2	Painting
15	3	Sports
16	3	Cooking
17	4	Reading
18	4	Gaming
19	5	Music
20	5	Traveling
21	6	Fitness
22	6	Yoga
23	7	Writing
24	7	Movies
25	8	Fashion
26	8	Art
27	9	Coding
28	9	Technology
29	10	Nature
30	10	Adventure
31	11	I have no interest
35	11	I have no interest 1
\.


--
-- Data for Name: socials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.socials (id, user_id, social_link) FROM stdin;
1	1	https://www.facebook.com/user1
2	1	https://www.twitter.com/user1
3	1	https://www.instagram.com/user1
4	2	https://www.facebook.com/user2
5	2	https://www.twitter.com/user2
6	2	https://www.instagram.com/user2
7	3	https://www.facebook.com/user3
8	3	https://www.twitter.com/user3
9	3	https://www.instagram.com/user3
10	4	https://www.facebook.com/user4
11	4	https://www.twitter.com/user4
12	4	https://www.instagram.com/user4
13	5	https://www.facebook.com/user5
14	5	https://www.twitter.com/user5
15	5	https://www.instagram.com/user5
16	6	https://www.facebook.com/user6
17	6	https://www.twitter.com/user6
18	6	https://www.instagram.com/user6
19	7	https://www.facebook.com/user7
20	7	https://www.twitter.com/user7
21	7	https://www.instagram.com/user7
22	8	https://www.facebook.com/user8
23	8	https://www.twitter.com/user8
24	8	https://www.instagram.com/user8
25	9	https://www.facebook.com/user9
26	9	https://www.twitter.com/user9
27	9	https://www.instagram.com/user9
28	10	https://www.facebook.com/user10
29	10	https://www.twitter.com/user10
30	10	https://www.instagram.com/user10
31	11	I have no social
35	11	I have no social 1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, password, username, email, fullname, phone_no, profession, bio, profile_image_url, status, timezone, created_at, is_admin) FROM stdin;
1	7c6a180b36896a0a8c02787eeafb0e4c	user1	user1@example.com	John Doe	1234567890	Developer	Lorem ipsum dolor sit amet.	https://example.com/profile_image1.jpg	active	UTC	2023-07-02 17:25:07.020186	f
2	6cb75f652a9b52798eb6cf2201057c73	user2	user2@example.com	Jane Smith	9876543210	Designer	Duis aute irure dolor in reprehenderit.	https://example.com/profile_image2.jpg	active	UTC	2023-07-02 17:25:07.020186	f
3	819b0643d6b89dc9b579fdfc9094f28e	user3	user3@example.com	Mike Johnson	5555555555	Engineer	Excepteur sint occaecat cupidatat non proident.	https://example.com/profile_image3.jpg	active	UTC	2023-07-02 17:25:07.020186	f
4	34cc93ece0ba9e3f6f235d4af979b16c	user4	user4@example.com	Sarah Wilson	1111111111	Writer	Lorem ipsum dolor sit amet.	https://example.com/profile_image4.jpg	active	UTC	2023-07-02 17:25:07.020186	f
5	db0edd04aaac4506f7edab03ac855d56	user5	user5@example.com	David Brown	2222222222	Photographer	Duis aute irure dolor in reprehenderit.	https://example.com/profile_image5.jpg	active	UTC	2023-07-02 17:25:07.020186	f
6	218dd27aebeccecae69ad8408d9a36bf	user6	user6@example.com	Emily Davis	3333333333	Artist	Excepteur sint occaecat cupidatat non proident.	https://example.com/profile_image6.jpg	active	UTC	2023-07-02 17:25:07.020186	f
7	00cdb7bb942cf6b290ceb97d6aca64a3	user7	user7@example.com	Alex Johnson	4444444444	Musician	Lorem ipsum dolor sit amet.	https://example.com/profile_image7.jpg	active	UTC	2023-07-02 17:25:07.020186	f
8	b25ef06be3b6948c0bc431da46c2c738	user8	user8@example.com	Olivia Wilson	6666666666	Teacher	Duis aute irure dolor in reprehenderit.	https://example.com/profile_image8.jpg	active	UTC	2023-07-02 17:25:07.020186	f
9	5d69dd95ac183c9643780ed7027d128a	user9	user9@example.com	Daniel Smith	7777777777	Doctor	Excepteur sint occaecat cupidatat non proident.	https://example.com/profile_image9.jpg	active	UTC	2023-07-02 17:25:07.020186	f
10	87e897e3b54a405da144968b2ca19b45	user10	user10@example.com	Sophia Johnson	8888888888	Lawyer	Lorem ipsum dolor sit amet.	https://example.com/profile_image10.jpg	active	UTC	2023-07-02 17:25:07.020186	f
12	5f4dcc3b5aa765d61d8327deb882cf99	shadhin	fahadulshadhin17@gmail.com	\N	\N	\N	\N	\N	active	UTC	2023-07-02 17:59:30.46847	f
11	21232f297a57a5a743894a0e4a801fc3	admin	admin@example.com	Admin Test Name hadhfahdfkjdhkh	1234567890	Professional admin	no bio	https://profileimahelink.com/profileimage.png	Active	UTC	2023-06-27 19:51:39.239254	t
13	b45cffe084dd3d20d928bee85e7b0f21	string	user@example.com	\N	\N	\N	\N	\N	active	UTC	2023-07-02 20:45:08.447325	t
14	b45cffe084dd3d20d928bee85e7b0f21	string111	user111@example.com	\N	\N	\N	\N	\N	active	UTC	2023-07-02 20:48:42.148377	f
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 16, true);


--
-- Name: interests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interests_id_seq', 35, true);


--
-- Name: socials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.socials_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: interests interests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_pkey PRIMARY KEY (id);


--
-- Name: socials socials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socials
    ADD CONSTRAINT socials_pkey PRIMARY KEY (id);


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
-- Name: interests interests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: socials socials_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socials
    ADD CONSTRAINT socials_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

