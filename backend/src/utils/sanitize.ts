import type { User } from '@prisma/client';

export function sanitizeUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  void passwordHash;
  return safeUser;
}
