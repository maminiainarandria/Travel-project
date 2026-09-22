import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { env } from '../config/env.js';
import { UnauthorizedError, ValidationError } from '../utils/errors.js';
import { sanitizeUser } from '../utils/sanitize.js';

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new ValidationError('Email is already registered');
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      passwordHash,
    },
  });

  return { user: sanitizeUser(user), token: createToken(user.id, user.email, user.role) };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(input.password, user.passwordHash);
  if (!validPassword) {
    throw new UnauthorizedError('Invalid credentials');
  }

  return { user: sanitizeUser(user), token: createToken(user.id, user.email, user.role) };
}

export async function me(userId: string) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  return sanitizeUser(user);
}

function createToken(userId: string, email: string, role: string) {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign({ email, role }, env.JWT_SECRET, { ...options, subject: userId });
}
