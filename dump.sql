--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "ultimate-ltt";




--
-- Drop roles
--

DROP ROLE "ultimate-ltt";


--
-- Roles
--

CREATE ROLE "ultimate-ltt";
ALTER ROLE "ultimate-ltt" WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:otopVoIk+cl+5Nz66UtxAw==$t9il+DqAcjp9hXHtaxWKOZ6fDoGIrp6FPra9YAIR4iE=:gBi1vtllYM2OJrHXwThMPb9QXNtWuVm1Ic7zZuOvebA=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: ultimate-ltt
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO "ultimate-ltt";

\connect template1

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
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: ultimate-ltt
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: ultimate-ltt
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: ultimate-ltt
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: ultimate-ltt
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO "ultimate-ltt";

\connect postgres

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
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: ultimate-ltt
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "ultimate-ltt" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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
-- Name: ultimate-ltt; Type: DATABASE; Schema: -; Owner: ultimate-ltt
--

CREATE DATABASE "ultimate-ltt" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "ultimate-ltt" OWNER TO "ultimate-ltt";

\connect -reuse-previous=on "dbname='ultimate-ltt'"

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: ultimate-ltt
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "ultimate-ltt";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: ultimate-ltt
--

COMMENT ON SCHEMA public IS '';


--
-- Name: AdType; Type: TYPE; Schema: public; Owner: ultimate-ltt
--

CREATE TYPE public."AdType" AS ENUM (
    'IMAGE',
    'VIDEO'
);


ALTER TYPE public."AdType" OWNER TO "ultimate-ltt";

--
-- Name: Sex; Type: TYPE; Schema: public; Owner: ultimate-ltt
--

CREATE TYPE public."Sex" AS ENUM (
    'Male',
    'Female'
);


ALTER TYPE public."Sex" OWNER TO "ultimate-ltt";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Ad; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Ad" (
    id integer NOT NULL,
    content text NOT NULL,
    length integer NOT NULL,
    "viewRemaining" integer NOT NULL,
    views integer NOT NULL,
    "createdById" integer NOT NULL,
    type public."AdType" NOT NULL,
    name text NOT NULL,
    link text
);


ALTER TABLE public."Ad" OWNER TO "ultimate-ltt";

--
-- Name: Ad_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Ad_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ad_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Ad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Ad_id_seq" OWNED BY public."Ad".id;


--
-- Name: Bed; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Bed" (
    id integer NOT NULL,
    "roomId" integer NOT NULL,
    location text NOT NULL,
    cost integer NOT NULL
);


ALTER TABLE public."Bed" OWNER TO "ultimate-ltt";

--
-- Name: Bed_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Bed_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Bed_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Bed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Bed_id_seq" OWNED BY public."Bed".id;


--
-- Name: Item; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Item" (
    id integer NOT NULL,
    name text NOT NULL,
    cost integer NOT NULL,
    description text NOT NULL,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amount integer DEFAULT 1 NOT NULL
);


ALTER TABLE public."Item" OWNER TO "ultimate-ltt";

--
-- Name: Item_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Item_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Item_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Item_id_seq" OWNED BY public."Item".id;


--
-- Name: Leaderboard; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Leaderboard" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    score double precision NOT NULL,
    "gameData" text NOT NULL,
    "gameId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Leaderboard" OWNER TO "ultimate-ltt";

--
-- Name: Leaderboard_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Leaderboard_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Leaderboard_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Leaderboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Leaderboard_id_seq" OWNED BY public."Leaderboard".id;


--
-- Name: Reservation; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Reservation" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "bedId" integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cost integer NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO "ultimate-ltt";

--
-- Name: Reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Reservation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reservation_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Reservation_id_seq" OWNED BY public."Reservation".id;


--
-- Name: Room; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Room" (
    id integer NOT NULL,
    name text NOT NULL,
    bed_count integer NOT NULL,
    features text[]
);


ALTER TABLE public."Room" OWNER TO "ultimate-ltt";

--
-- Name: Room_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Room_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Room_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Room_id_seq" OWNED BY public."Room".id;


--
-- Name: Tag; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Tag" (
    id integer NOT NULL,
    name text NOT NULL,
    hidden boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Tag" OWNER TO "ultimate-ltt";

--
-- Name: Tag_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Tag_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tag_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Tag_id_seq" OWNED BY public."Tag".id;


--
-- Name: Team; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Team" (
    id integer NOT NULL,
    name text NOT NULL,
    money integer NOT NULL
);


ALTER TABLE public."Team" OWNER TO "ultimate-ltt";

--
-- Name: Team_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Team_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Team_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Team_id_seq" OWNED BY public."Team".id;


--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."Transaction" (
    id integer NOT NULL,
    amount integer NOT NULL,
    "teamId" integer NOT NULL,
    "userId" integer NOT NULL,
    "itemId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text
);


ALTER TABLE public."Transaction" OWNER TO "ultimate-ltt";

--
-- Name: Transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."Transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Transaction_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: Transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."Transaction_id_seq" OWNED BY public."Transaction".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    "teamId" integer NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    sex public."Sex" NOT NULL
);


ALTER TABLE public."User" OWNER TO "ultimate-ltt";

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: ultimate-ltt
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO "ultimate-ltt";

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultimate-ltt
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _AdToTag; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."_AdToTag" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_AdToTag" OWNER TO "ultimate-ltt";

--
-- Name: _ItemToTag; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."_ItemToTag" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ItemToTag" OWNER TO "ultimate-ltt";

--
-- Name: _TagToUser; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public."_TagToUser" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_TagToUser" OWNER TO "ultimate-ltt";

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: ultimate-ltt
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "ultimate-ltt";

--
-- Name: Ad id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Ad" ALTER COLUMN id SET DEFAULT nextval('public."Ad_id_seq"'::regclass);


--
-- Name: Bed id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Bed" ALTER COLUMN id SET DEFAULT nextval('public."Bed_id_seq"'::regclass);


--
-- Name: Item id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Item" ALTER COLUMN id SET DEFAULT nextval('public."Item_id_seq"'::regclass);


--
-- Name: Leaderboard id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Leaderboard" ALTER COLUMN id SET DEFAULT nextval('public."Leaderboard_id_seq"'::regclass);


--
-- Name: Reservation id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Reservation" ALTER COLUMN id SET DEFAULT nextval('public."Reservation_id_seq"'::regclass);


--
-- Name: Room id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Room" ALTER COLUMN id SET DEFAULT nextval('public."Room_id_seq"'::regclass);


--
-- Name: Tag id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Tag" ALTER COLUMN id SET DEFAULT nextval('public."Tag_id_seq"'::regclass);


--
-- Name: Team id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Team" ALTER COLUMN id SET DEFAULT nextval('public."Team_id_seq"'::regclass);


--
-- Name: Transaction id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Transaction" ALTER COLUMN id SET DEFAULT nextval('public."Transaction_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Ad; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Ad" (id, content, length, "viewRemaining", views, "createdById", type, name, link) FROM stdin;
2	/uploads/d9119f87-df15-4c79-b26f-5310eac7d3b8	10000	17	43	1	IMAGE	bububu	\N
3	/uploads/f23ce19f-e89a-4a4b-bcb7-8d6f1f788fc7	30033	26	34	1	VIDEO	Test Video	\N
\.


--
-- Data for Name: Bed; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Bed" (id, "roomId", location, cost) FROM stdin;
1	1	Pri okne	100
2	1	Pri dverách	100
\.


--
-- Data for Name: Item; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Item" (id, name, cost, description, image, "createdAt", amount) FROM stdin;
1	Brawl stars	10	Brawl stars logo	/uploads/baaf9dd3-17fd-4e19-b717-f4028e3fbb17	2024-06-04 09:26:51.385	1
2	bubu	42	gasrhetshrts ths rthsrt hsr	\N	2024-06-04 09:33:17.711	39
\.


--
-- Data for Name: Leaderboard; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Leaderboard" (id, "userId", score, "gameData", "gameId", "createdAt") FROM stdin;
4	1	24.267	{}	galaxie	2024-06-11 14:03:33.849
1	1	219.1000000000095	{}	drift-boss	2024-06-11 14:51:14.185
5	1	7913	{}	cookie-clicker	2024-06-13 12:29:37.544
3	1	2115	{}	spect	2024-06-13 12:49:28.135
\.


--
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Reservation" (id, "userId", "bedId", date, "createdAt", cost) FROM stdin;
3	1	1	2024-08-09 00:00:00	2024-06-13 12:44:09.842	100
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Room" (id, name, bed_count, features) FROM stdin;
1	Izba 1	3	{Perina,Luxusná}
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Tag" (id, name, hidden) FROM stdin;
1	transactions	f
2	drift-boss	f
4	galaxie	f
5	spins	f
6	spect	f
3	cookie-clicker	f
\.


--
-- Data for Name: Team; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Team" (id, name, money) FROM stdin;
1	Test Team	664
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."Transaction" (id, amount, "teamId", "userId", "itemId", "createdAt", description) FROM stdin;
1	100	1	1	\N	2024-05-29 11:13:20.89	Umožnenie prístupu ku vykonaným transakciám
3	200	1	1	\N	2024-05-29 11:48:40.469	Prístup ku hre Capybara
4	100	1	1	\N	2024-05-29 12:27:47.84	Prístup ku hre Galaxie
5	100	1	1	\N	2024-05-29 12:28:31.753	Prístup ku hre Galaxie
6	100	1	1	\N	2024-05-30 18:26:22.516	Vytvorenie reklamy bububu
7	200	1	1	\N	2024-05-30 18:27:40.496	Umožnenie prístupu ku vykonaným transakciám
8	100	1	1	\N	2024-05-30 18:37:50.589	Vytvorenie reklamy Test Video
9	50	1	1	\N	2024-05-30 19:50:25.111	Boost reklamy #bububu
10	200	1	1	\N	2024-05-30 20:07:23.847	Prístup ku hre Drift Boss
11	100	1	1	\N	2024-06-03 10:09:41.822	Prístup ku hre Puzzle
12	100	1	1	\N	2024-06-03 10:11:19.947	Prístup ku hre Spins
13	42	1	2	2	2024-06-04 09:46:30.264	\N
14	42	1	2	2	2024-06-04 09:46:35.083	\N
15	100	1	1	\N	2024-06-04 19:46:12.846	\N
16	100	1	1	\N	2024-06-04 20:24:14.712	Prístup ku hre Galaxie
17	-70	1	1	\N	2024-06-11 09:27:06.4	\N
18	100	1	1	\N	2024-06-11 09:27:22.86	\N
19	50	1	1	\N	2024-06-11 09:32:56.684	Boost reklamy #Test Video
20	50	1	1	\N	2024-06-11 09:34:57.503	Boost reklamy #Test Video
21	50	1	1	\N	2024-06-11 09:35:13.881	Boost reklamy #bububu
22	50	1	1	\N	2024-06-11 09:35:56.208	Boost reklamy #bububu
23	50	1	1	\N	2024-06-11 09:35:57.849	Boost reklamy #Test Video
24	100	1	2	\N	2024-06-11 09:51:22.517	Prístup ku hre Galaxie
25	200	1	1	\N	2024-06-11 12:21:37.581	Prístup ku hre Gun Master
26	200	1	1	\N	2024-06-11 12:22:10.13	Prístup ku hre Gun Master
27	-70	1	1	\N	2024-06-13 12:43:52.192	Zrušenie rezervácie
28	100	1	1	\N	2024-06-13 12:44:09.839	Rezervácia postele #1
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."User" (id, email, name, password, "teamId", admin, sex) FROM stdin;
1	test@gmail.com	test	test	1	f	Male
2		admin	admin	1	t	Female
\.


--
-- Data for Name: _AdToTag; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."_AdToTag" ("A", "B") FROM stdin;
2	1
3	1
\.


--
-- Data for Name: _ItemToTag; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."_ItemToTag" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _TagToUser; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public."_TagToUser" ("A", "B") FROM stdin;
3	1
1	1
2	1
5	1
4	1
4	2
6	1
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: ultimate-ltt
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3345af9d-0ad5-4e8b-bccd-a572196fee15	b37635ef2afb34cf2df981f05601ea600d06721850e690dfb01060e887a98f31	2024-05-24 11:01:24.040795+00	20240524110123_init	\N	\N	2024-05-24 11:01:23.930282+00	1
406687ec-5df3-4630-a1b9-6babd7f59040	4616648f15c65054708c1cd6924cc1b5b3720065b2526c801f30d990a1e6830f	2024-05-24 11:02:45.619931+00	20240524110245_init	\N	\N	2024-05-24 11:02:45.609624+00	1
7e246e86-2d11-40c7-9c0f-15377c52d8fe	60407027b8e4870ddce7beb0e5c477852e542ad219c9600e8fe66e3e9c44165d	2024-05-29 09:59:39.420945+00	20240529095939_init	\N	\N	2024-05-29 09:59:39.390754+00	1
940745f0-98ca-4e5b-9b3c-8cd5904e7759	234873ef86a00d710fd1243e9d578b84c7fb6cec531f69870b70f3c7a30a2771	2024-05-30 15:53:14.757874+00	20240530155314_init	\N	\N	2024-05-30 15:53:14.755474+00	1
d7533575-2151-4eaf-97e5-f242a8597bca	1f2218e7adeaf2767ba3bd3f43dd5e02f062d33442309da608dd53b809b481dc	2024-06-04 09:32:50.502428+00	20240604093250_init	\N	\N	2024-06-04 09:32:50.499712+00	1
fb512be6-126d-4007-8d7a-7458918cd6a6	a71f7bddef81753374589f88c5b220b9ecf90aee5814a07e9884b045953b96e9	2024-06-04 12:12:54.552984+00	20240604121254_init	\N	\N	2024-06-04 12:12:54.543967+00	1
a45fe4b0-84b2-4e4c-88ae-c8ffdf840ed6	1bcaa8987858b75360d2cf45537540551fad4a61f07334175c2390754c84fc91	2024-06-04 12:21:31.33451+00	20240604122131_init	\N	\N	2024-06-04 12:21:31.332249+00	1
e503cbda-218b-44e8-bd1c-209844c39e38	15300a14a2f0e9d632f66544a7cb6f9f34c2435a22a172a1b0adc16ff2c067c0	2024-06-04 12:37:06.113482+00	20240604123706_init	\N	\N	2024-06-04 12:37:06.108388+00	1
5a9f22e1-82e9-4a26-a449-ce85152a9f2f	714b1de148df390791f3bd72a665ee1d15fe564519ab445c52ca189af590dee2	2024-06-11 10:18:39.914919+00	20240611101839_init	\N	\N	2024-06-11 10:18:39.907141+00	1
338f7b93-130d-4c0a-a57a-d3c6269cc307	089c000f60b224203ba70d2f6afcce0b9e1733b97fe9c2ee1aacae04a060143e	2024-06-11 13:51:53.086901+00	20240611135153_init	\N	\N	2024-06-11 13:51:53.080871+00	1
\.


--
-- Name: Ad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Ad_id_seq"', 3, true);


--
-- Name: Bed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Bed_id_seq"', 2, true);


--
-- Name: Item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Item_id_seq"', 2, true);


--
-- Name: Leaderboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Leaderboard_id_seq"', 5, true);


--
-- Name: Reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Reservation_id_seq"', 3, true);


--
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Room_id_seq"', 1, true);


--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Tag_id_seq"', 6, true);


--
-- Name: Team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Team_id_seq"', 1, true);


--
-- Name: Transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."Transaction_id_seq"', 28, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ultimate-ltt
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- Name: Ad Ad_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Ad"
    ADD CONSTRAINT "Ad_pkey" PRIMARY KEY (id);


--
-- Name: Bed Bed_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Bed"
    ADD CONSTRAINT "Bed_pkey" PRIMARY KEY (id);


--
-- Name: Item Item_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Item"
    ADD CONSTRAINT "Item_pkey" PRIMARY KEY (id);


--
-- Name: Leaderboard Leaderboard_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Leaderboard"
    ADD CONSTRAINT "Leaderboard_pkey" PRIMARY KEY (id);


--
-- Name: Reservation Reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY (id);


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: Team Team_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: ultimate-ltt
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_name_key; Type: INDEX; Schema: public; Owner: ultimate-ltt
--

CREATE UNIQUE INDEX "User_name_key" ON public."User" USING btree (name);


--
-- Name: _AdToTag_AB_unique; Type: INDEX; Schema: public; Owner: ultimate-ltt
--

CREATE UNIQUE INDEX "_AdToTag_AB_unique" ON public."_AdToTag" USING btree ("A", "B");


--
-- Name: _AdToTag_B_index; Type: INDEX; Schema: public; Owner: ultimate-ltt
--

CREATE INDEX "_AdToTag_B_index" ON public."_AdToTag" USING btree ("B");


--
-- Name: _ItemToTag_AB_unique; Type: INDEX; Schema: public; Owner: ultimate-ltt
--

CREATE UNIQUE INDEX "_ItemToTag_AB_unique" ON public."_ItemToTag" USING btree ("A", "B");


--
-- Name: _ItemToTag_B_index; Type: INDEX; Schema: public; Owner: ultimate-ltt
--

CREATE INDEX "_ItemToTag_B_index" ON public."_ItemToTag" USING btree ("B");


--
-- Name: _TagToUser_AB_unique; Type: INDEX; Schema: public; Owner: ultimate-ltt
--

CREATE UNIQUE INDEX "_TagToUser_AB_unique" ON public."_TagToUser" USING btree ("A", "B");


--
-- Name: _TagToUser_B_index; Type: INDEX; Schema: public; Owner: ultimate-ltt
--

CREATE INDEX "_TagToUser_B_index" ON public."_TagToUser" USING btree ("B");


--
-- Name: Ad Ad_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Ad"
    ADD CONSTRAINT "Ad_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Bed Bed_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Bed"
    ADD CONSTRAINT "Bed_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Leaderboard Leaderboard_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Leaderboard"
    ADD CONSTRAINT "Leaderboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reservation Reservation_bedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES public."Bed"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reservation Reservation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public."Item"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _AdToTag _AdToTag_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."_AdToTag"
    ADD CONSTRAINT "_AdToTag_A_fkey" FOREIGN KEY ("A") REFERENCES public."Ad"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _AdToTag _AdToTag_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."_AdToTag"
    ADD CONSTRAINT "_AdToTag_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ItemToTag _ItemToTag_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."_ItemToTag"
    ADD CONSTRAINT "_ItemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES public."Item"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ItemToTag _ItemToTag_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."_ItemToTag"
    ADD CONSTRAINT "_ItemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TagToUser _TagToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."_TagToUser"
    ADD CONSTRAINT "_TagToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TagToUser _TagToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultimate-ltt
--

ALTER TABLE ONLY public."_TagToUser"
    ADD CONSTRAINT "_TagToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ultimate-ltt
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

