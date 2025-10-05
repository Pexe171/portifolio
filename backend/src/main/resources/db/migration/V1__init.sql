CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_users (username, password)
VALUES ('admin', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5E1xB9lnAaRB.j1HwywA6MzP/FC5p4a')
ON CONFLICT (username) DO NOTHING;

CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    role VARCHAR(200) NOT NULL,
    bio TEXT NOT NULL,
    email VARCHAR(200),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    whatsapp_url VARCHAR(255),
    photo_url VARCHAR(500),
    theme VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS profile_skills (
    profile_id INTEGER NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
    skill VARCHAR(200) NOT NULL
);

INSERT INTO profile (full_name, role, bio, email, github_url, linkedin_url, whatsapp_url, photo_url, theme)
VALUES ('David Henrique Miranda da Silva', 'Desenvolvedor Backend Java', 'Sou desenvolvedor com foco em soluções robustas usando Spring Boot, apaixonado por arquitetura limpa e APIs REST.', 'joao@gmail.com', 'https://github.com/joaosilva', 'https://linkedin.com/in/joaosilva', 'mailto:joao@gmail.com', 'https://via.placeholder.com/150', 'dark')
ON CONFLICT DO NOTHING;

INSERT INTO profile_skills (profile_id, skill)
SELECT p.id, s.skill
FROM profile p
CROSS JOIN (VALUES
    ('Java'),
    ('Spring Boot'),
    ('APIs REST'),
    ('Arquitetura Limpa'),
    ('PostgreSQL')
) AS s(skill)
WHERE NOT EXISTS (
    SELECT 1 FROM profile_skills ps WHERE ps.profile_id = p.id AND ps.skill = s.skill
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    project_url VARCHAR(500),
    repository_url VARCHAR(500),
    public_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
