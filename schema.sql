-- Tabla para almacenar los datos de las consultas de tarot
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
8
-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_email ON consultas(email);
CREATE INDEX IF NOT EXISTS idx_timestamp ON consultas(timestamp);
CREATE INDEX IF NOT EXISTS idx_atendido ON consultas(atendido);
CREATE INDEX IF NOT EXISTS idx_created_at ON consultas(created_at DESC);

-- Tabla para usuarios admin (opcional para futura expansión)
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);
