-- Función para obtener el usuario por defecto
CREATE OR REPLACE FUNCTION default_user() RETURNS VARCHAR AS $$
BEGIN
    RETURN 'nelson.rodriguez';
END;
$$ LANGUAGE plpgsql;

-- Creación de la tabla categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_create VARCHAR(50) NOT NULL DEFAULT default_user()
);

-- Trigger para actualizar el campo update_at automáticamente en la tabla categorias
CREATE OR REPLACE FUNCTION update_timestamp_categoria() RETURNS TRIGGER AS $$
BEGIN
    NEW.update_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp_categoria_trigger
BEFORE UPDATE ON categorias
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_categoria();

-- Creación de la tabla productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_create VARCHAR(50) NOT NULL DEFAULT default_user(),
    categoria_id INTEGER NOT NULL,
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);

-- Trigger para actualizar el campo update_at automáticamente en la tabla productos
CREATE OR REPLACE FUNCTION update_timestamp_producto() RETURNS TRIGGER AS $$
BEGIN
    NEW.update_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp_producto_trigger
BEFORE UPDATE ON productos
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_producto();
