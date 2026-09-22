import type { PrismaClient } from '@prisma/client';

type Delegate = {
  findMany(args?: Record<string, unknown>): Promise<unknown[]>;
  findUnique(args: Record<string, unknown>): Promise<unknown | null>;
  findFirst(args: Record<string, unknown>): Promise<unknown | null>;
  create(args: Record<string, unknown>): Promise<unknown>;
  update(args: Record<string, unknown>): Promise<unknown>;
  delete(args: Record<string, unknown>): Promise<unknown>;
  count(args?: Record<string, unknown>): Promise<number>;
};

export type PrismaDelegateName = {
  [K in keyof PrismaClient]: PrismaClient[K] extends Delegate ? K : never;
}[keyof PrismaClient];

export class BaseRepository {
  constructor(private readonly delegate: Delegate) {}

  findMany(args?: Record<string, unknown>) {
    return this.delegate.findMany(args);
  }

  findUnique(args: Record<string, unknown>) {
    return this.delegate.findUnique(args);
  }

  findFirst(args: Record<string, unknown>) {
    return this.delegate.findFirst(args);
  }

  create(args: Record<string, unknown>) {
    return this.delegate.create(args);
  }

  update(args: Record<string, unknown>) {
    return this.delegate.update(args);
  }

  delete(args: Record<string, unknown>) {
    return this.delegate.delete(args);
  }

  count(args?: Record<string, unknown>) {
    return this.delegate.count(args);
  }
}
