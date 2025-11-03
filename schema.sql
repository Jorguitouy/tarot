CREATE TABLE IF NOT EXISTS consultas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    fecha_nacimiento TEXT NOT NULL,
    area_consulta TEXT NOT NULL,
    pregunta TEXT,
    timestamp TEXT NOT NULL,
    atendido INTEGER DEFAULT 0,
    notas_admin TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_email ON consultas(email);
CREATE INDEX IF NOT EXISTS idx_timestamp ON consultas(timestamp);
CREATE INDEX IF NOT EXISTS idx_atendido ON consultas(atendido);
CREATE INDEX IF NOT EXISTS idx_created_at ON consultas(created_at DESC);

CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);
