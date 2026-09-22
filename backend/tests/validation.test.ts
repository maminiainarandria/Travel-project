import './setup.js';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';
import { slugify } from '../src/utils/slug.js';

describe('validation and common API behavior', () => {
  it('returns validation errors for invalid register payloads', async () => {
    const response = await request(app).post('/api/auth/register').send({ email: 'not-an-email' });
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('returns a consistent 404 response for unknown routes', async () => {
    const response = await request(app).get('/api/does-not-exist');
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('creates clean slugs from accented destination names', () => {
    expect(slugify('Tsingy de Bemaraha')).toBe('tsingy-de-bemaraha');
    expect(slugify('Île Sainte-Marie')).toBe('ile-sainte-marie');
  });
});
