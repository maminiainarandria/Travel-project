# Arotiana Lemurs Travel Backend

Backend professionnel pour Arotiana Lemurs Travel, construit avec Node.js, Express, TypeScript, PostgreSQL, Prisma, JWT, bcrypt et Zod.

## Installation

```bash
cd backend
npm install
```

## Configuration

Copier `.env.example` vers `.env`, puis adapter les valeurs:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/arotiana?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="7d"
PORT=4000
CORS_ORIGIN="http://localhost:5173,http://127.0.0.1:5173,http://127.0.0.1:5174"
ADMIN_FIRST_NAME="Arotiana"
ADMIN_LAST_NAME="Admin"
ADMIN_EMAIL="admin@arotiana.local"
ADMIN_PASSWORD="ChangeMe123!"
```

Ne jamais commiter `.env`.

## PostgreSQL

Avec Docker:

```bash
docker run --name arotiana-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=arotiana -p 5432:5432 -d postgres:16
```

Ou utiliser une installation PostgreSQL locale et mettre `DATABASE_URL` à jour.

## Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

Le seed crée des destinations, expériences, voyages avec itinéraires, témoignages, article publié et un admin de développement via les variables `ADMIN_*`.

## Démarrage

```bash
npm run dev
```

API: `http://localhost:4000/api`

Healthcheck: `http://localhost:4000/health`

Swagger: `http://localhost:4000/api/docs`

## Production

```bash
npm run build
npm start
```

## Tests

```bash
npm test
```

Les tests inclus vérifient validation, 401, 403, 404 et utilitaires. Les tests qui appellent réellement la base peuvent être ajoutés après configuration d’une base PostgreSQL de test.

## Endpoints principaux

Toutes les routes API sont préfixées par `/api`.

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users` admin
- `GET /api/users/:id` admin
- `PUT /api/users/:id` admin
- `DELETE /api/users/:id` admin
- `GET /api/destinations`
- `GET /api/destinations/:id`
- `GET /api/destinations/slug/:slug`
- `POST /api/destinations` admin
- `PUT /api/destinations/:id` admin
- `DELETE /api/destinations/:id` admin
- `GET /api/experiences`
- `GET /api/experiences/:id`
- `GET /api/experiences/slug/:slug`
- `POST /api/experiences` admin
- `PUT /api/experiences/:id` admin
- `DELETE /api/experiences/:id` admin
- `GET /api/journeys`
- `GET /api/journeys/:id`
- `GET /api/journeys/slug/:slug`
- `POST /api/journeys` admin
- `PUT /api/journeys/:id` admin
- `DELETE /api/journeys/:id` admin
- `POST /api/bookings` authenticated
- `GET /api/bookings` authenticated
- `GET /api/bookings/:id` authenticated
- `PATCH /api/bookings/:id/status` admin
- `DELETE /api/bookings/:id` admin
- `POST /api/custom-trips`
- `GET /api/custom-trips` admin
- `GET /api/custom-trips/:id` admin
- `PATCH /api/custom-trips/:id/status` admin
- `DELETE /api/custom-trips/:id` admin
- `POST /api/contact`
- `GET /api/contact` admin
- `GET /api/contact/:id` admin
- `PATCH /api/contact/:id/status` admin
- `DELETE /api/contact/:id` admin
- `GET /api/articles`
- `GET /api/articles/:slug`
- `POST /api/articles` admin
- `PUT /api/articles/:id` admin
- `DELETE /api/articles/:id` admin
- `GET /api/testimonials`
- `POST /api/testimonials` admin
- `PUT /api/testimonials/:id` admin
- `DELETE /api/testimonials/:id` admin
- `GET /api/gallery`
- `POST /api/gallery` admin
- `PUT /api/gallery/:id` admin
- `DELETE /api/gallery/:id` admin
- `POST /api/reviews` authenticated
- `GET /api/reviews`
- `PATCH /api/reviews/:id/moderation` admin
- `GET /api/admin/dashboard` admin

## Authentification

Les routes protégées attendent:

```http
Authorization: Bearer <jwt>
```

Les rôles supportés sont `USER` et `ADMIN`. Les mots de passe sont hashés avec bcrypt et ne sont jamais retournés par l’API.

## Pagination et filtres

Listes importantes:

```http
GET /api/destinations?page=1&limit=10&search=baobab&featured=true
GET /api/experiences?category=Wildlife&difficulty=Easy&minPrice=100&maxPrice=1000
GET /api/journeys?featured=true&minPrice=1000&maxPrice=5000
```

Réponse:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 1
  }
}
```

## Intégration frontend

Le frontend peut utiliser `Arotiana/src/config/api.js`.

Créer un `.env` dans `Arotiana/` si nécessaire:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

Ensuite, remplacer progressivement les données mockées par:

```js
import { apiRequest } from './config/api';

const destinations = await apiRequest('/destinations');
```
