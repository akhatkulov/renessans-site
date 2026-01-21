FROM alpine:3.18

# Kerakli asboblarni o'rnatish
RUN apk add --no-cache postgresql15-client tar

# Skriptni ko'chirish
COPY scripts/backup.sh /backup.sh
RUN chmod +x /backup.sh

# Har 12 soatda ishga tushirish (12 * 3600 = 43200 soniya)
ENTRYPOINT ["/bin/sh", "-c", "while true; do /backup.sh; sleep 43200; done"]
