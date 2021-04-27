USE Vh2rq8PjFR;

INSERT INTO `role` (
    id,
    name,
    permissions,
    created_by,
    modified_by
) VALUES (
    1,
    'admin',
    '{"all":true}',
    1,
    1
);
INSERT INTO `user` (
    role_id,
    name,
    email,
    password,
    is_verified,
    created_by,
    modified_by
) VALUES (
    1,
    'user de prueba',
    'user@mail.com',
    '$2b$10$RBBXP3xrV0BYf0VgBcAfTOZl7UhHk476oM642jCjFhWhuoF6vWmNq',
    1,
    1,
    1
);