# Gerando banco de dados

bunx prisma init --datasource-provider sqlite

# Gerando schema a partir de uma outra pasta

bunx prisma generate --schema=./src/external/prisma/schema.prisma

# Gerando migrations a partir de uma outra pasta

bunx prisma migrate dev --name init --schema=./src/external/prisma/schema.prisma
