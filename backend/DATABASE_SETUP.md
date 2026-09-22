# PostgreSQL local setup

The backend reads PostgreSQL credentials from `backend/.env`.

Current development format:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/arotiana?schema=public"
```

If PostgreSQL is installed locally on Windows, use the password chosen during PostgreSQL installation.

## Create the database

Open PowerShell in `backend/` and test the connection:

```powershell
psql -U postgres -h localhost -p 5432
```

Then inside `psql`:

```sql
CREATE DATABASE arotiana;
\q
```

Run migrations and seed:

```powershell
npx prisma migrate dev
npx prisma db seed
```

## If you forgot the local postgres password

Use pgAdmin or PostgreSQL tools to reset the `postgres` role password, then update `DATABASE_URL` in `.env`.

You can also create a dedicated user:

```sql
CREATE USER arotiana_user WITH PASSWORD 'change_me';
CREATE DATABASE arotiana OWNER arotiana_user;
GRANT ALL PRIVILEGES ON DATABASE arotiana TO arotiana_user;
```

Then use:

```env
DATABASE_URL="postgresql://arotiana_user:change_me@localhost:5432/arotiana?schema=public"
```
