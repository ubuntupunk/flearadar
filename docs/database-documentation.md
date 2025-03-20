Flearadar Relational Database Documentation
==========================================

Last Updated: March 14, 2025

Overview
--------
This document describes the relational database schema for the flearadar project, built on Supabase (PostgreSQL). It includes tables, relationships, and methods for inputting and retrieving data.

Tables
------
1. users
   - Columns:
     - id: uuid PRIMARY KEY
     - username: text UNIQUE
     - user_type: varchar CHECK (user_type IN ('user', 'vendor', 'market'))
     - reputation_score: integer DEFAULT 0
     - gps_tracking_consent: boolean DEFAULT false
     - latitude: float
     - longitude: float
     - geofence_radius: float
     - updated_at: timestamp
   - Purpose: Stores all users (regular, vendors, markets) and their reputation.
   - Input:
     - INSERT INTO users (id, username, user_type, updated_at) VALUES ('uuid', 'name', 'vendor', NOW());
   - Retrieve:
     - SELECT username, reputation_score FROM users WHERE id = 'uuid';

2. listings
   - Columns:
     - id: integer PRIMARY KEY
     - slug: varchar
     - data: jsonb
     - created_by: uuid REFERENCES users(id)
     - owner_id: uuid REFERENCES users(id)
     - is_verified: boolean
     - contact_email: text
     - contact_details: text
     - created_at: timestamp
     - updated_at: timestamp
   - Purpose: Stores listings created by users, owned by vendors or markets.
   - Input:
     - INSERT INTO listings (slug, owner_id, created_by, created_at) VALUES ('slug', 'owner-uuid', 'creator-uuid', NOW());
   - Retrieve:
     - SELECT slug, owner_id FROM listings WHERE id = 1;

3. content
   - Columns:
     - id: integer PRIMARY KEY
     - type: varchar
     - title: varchar
     - slug: varchar
     - body: text
     - metadata: jsonb
     - listing_id: integer REFERENCES listings(id)
     - created_by: uuid REFERENCES users(id)
     - created_at: timestamp
     - updated_at: timestamp
   - Purpose: Stores user-generated content (e.g., reviews).
   - Input:
     - INSERT INTO content (type, title, listing_id, created_by, metadata) VALUES ('review', 'Great', 1, 'uuid', '{"rating": "4"}');
   - Retrieve:
     - SELECT title, body FROM content WHERE listing_id = 1;

4. ratings
   - Columns:
     - id: integer PRIMARY KEY
     - listing_id: integer REFERENCES listings(id)
     - user_id: uuid REFERENCES users(id)
     - factor: varchar REFERENCES factors(name)
     - value: varchar
     - created_at: timestamp
   - Purpose: Stores detailed ratings for listings (e.g., 'user_rating', 'wifi').
   - Input:
     - INSERT INTO ratings (listing_id, user_id, factor, value) VALUES (1, 'uuid', 'user_rating', '4');
   - Retrieve:
     - SELECT AVG(value::integer) FROM ratings WHERE listing_id = 1 AND factor = 'user_rating';

5. factors
   - Columns:
     - id: integer PRIMARY KEY
     - name: varchar UNIQUE
     - type: varchar CHECK (type IN ('boolean', 'string', 'integer'))
     - scoring: jsonb
   - Purpose: Defines rating factors and their scoring rules.
   - Input:
     - INSERT INTO factors (name, type, scoring) VALUES ('crowd', 'string', '{"busy": 2}');
   - Retrieve:
     - SELECT name, scoring FROM factors WHERE type = 'boolean';

6. attendance
   - Columns:
     - id: integer PRIMARY KEY
     - vendor_id: uuid REFERENCES users(id)
     - market_id: uuid REFERENCES users(id)
     - attendance_date: date
     - status: varchar CHECK (status IN ('attended', 'skipped'))
   - Purpose: Tracks vendor attendance at markets.
   - Input:
     - INSERT INTO attendance (vendor_id, market_id, attendance_date, status) VALUES ('vendor-uuid', 'market-uuid', '2023-10-01', 'attended');
   - Retrieve:
     - SELECT status FROM attendance WHERE vendor_id = 'uuid' AND attendance_date = '2023-10-01';

7. gps_logs
   - Columns:
     - id: integer PRIMARY KEY
     - user_id: uuid REFERENCES users(id)
     - latitude: float
     - longitude: float
     - timestamp: timestamp
   - Purpose: Logs GPS data for attendance tracking.
   - Input:
     - INSERT INTO gps_logs (user_id, latitude, longitude) VALUES ('uuid', 37.7749, -122.4194);
   - Retrieve:
     - SELECT latitude, longitude FROM gps_logs WHERE user_id = 'uuid';

Key Views
---------
1. flea_scores
   - Purpose: Calculates overall flea score for listings.
   - Retrieve: SELECT flea_score FROM flea_scores WHERE listing_id = 1;

2. user_social_credits
   - Purpose: Calculates social credits for users based on type.
   - Retrieve: SELECT social_credit FROM user_social_credits WHERE user_id = 'uuid';

Relationships
-------------
- users -> listings (created_by, owner_id)
- users -> content (created_by)
- users -> attendance (vendor_id, market_id)
- listings -> content (listing_id)
- listings -> ratings (listing_id)
- factors -> ratings (factor)

Notes
-----
- Replace 'f1ea7a8d-5b2c-4f9e-a3b7-8d2c5e9f0a1d' with your staff UUID.
- Triggers update reputation dynamically on changes to attendance, content, and ratings.