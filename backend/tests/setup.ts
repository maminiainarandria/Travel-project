process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/arotiana_test?schema=public';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-with-more-than-twenty-four-characters';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
process.env.PORT = process.env.PORT || '4001';
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
