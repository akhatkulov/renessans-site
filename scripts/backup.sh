#!/bin/sh

# Backup papkasini yaratish (vaqt bilan)
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_PATH="/backups/$TIMESTAMP"
mkdir -p "$BACKUP_PATH"

echo "[$TIMESTAMP] Backup boshlandi..."

# 1. Ma'lumotlar bazasini backup qilish
PGPASSWORD=$POSTGRES_PASSWORD pg_dump -h db -U $POSTGRES_USER -d $POSTGRES_DB > "$BACKUP_PATH/db_backup.sql"
if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] Baza backup qilindi."
else
    echo "[$TIMESTAMP] Baza backupda xatolik!"
fi

# 2. Yuklangan fayllarni (images) backup qilish
tar -czf "$BACKUP_PATH/images_backup.tar.gz" -C /data images
if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] Rasmlar backup qilindi."
else
    echo "[$TIMESTAMP] Rasmlar backupda xatolik!"
fi

# 3. Eski backup'larni o'chirish (7 kundan eskilari)
find /backups/* -type d -ctime +7 -exec rm -rf {} +

echo "[$TIMESTAMP] Backup muvaffaqiyatli yakunlandi."
