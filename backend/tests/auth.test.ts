import './setup.js';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { Role } from '@prisma/client';
import { app } from '../src/app.js';

describe('authentication middleware', () => {
  it('returns 401 when a protected route has no token', async () => {
    const response = await request(app).get('/api/auth/me');
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('returns 403 when a normal user accesses admin routes', async () => {
    const token = jwt.sign({ email: 'user@example.com', role: Role.USER }, process.env.JWT_SECRET!, { subject: 'user-id' });
    const response = await request(app).get('/api/admin/dashboard').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });
});
