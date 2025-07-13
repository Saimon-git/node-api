#!/bin/bash


# --- Configuración ---
# Reemplaza estos valores con la información de tu base de datos PostgreSQL.
DB_HOST="dpg-d1pk0rbipnbc738465s0-a.oregon-postgres.render.com"
DB_PORT="5432"
DB_USER="admin"
DB_PASSWORD="GtpxDEVsXCeFsw2C9MwrJHSSFrl3fwqN"
DB_NAME="ecommerce_db_02sw"

# Directorio donde se guardarán los backups
BACKUP_DIR="/Users/saimon/Projects/rappi_node/"

# Nombre del archivo de backup (incluye la fecha para evitar sobrescribir)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/pg_backup_${DB_NAME}_${TIMESTAMP}.sql.gz"


# --- Verificación de Directorio ---
if [ ! -d "$BACKUP_DIR" ]; then
  mkdir -p "$BACKUP_DIR"
  echo "Directorio de backup creado: ${BACKUP_DIR}"
fi


# --- Comando pg_dump ---
# Exporta la variable de entorno para la contraseña
export PGPASSWORD="$DB_PASSWORD"

# Realiza el backup de la base de datos PostgreSQL y lo comprime
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" | gzip > "$BACKUP_FILE"

# --- Verificación del Resultado ---
if [ $? -eq 0 ]; then
  echo "Backup de PostgreSQL completado exitosamente en: ${BACKUP_FILE}"
  # Opcional: Eliminar backups antiguos (ej. mantener solo los últimos 7 días)
  # find "${BACKUP_DIR}" -type f -name "*.gz" -mtime +7 -delete
  # echo "Backups antiguos eliminados."
else
  echo "Error al realizar el backup de PostgreSQL."
  exit 1
fi
