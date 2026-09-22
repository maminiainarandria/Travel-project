import bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';
import dotenv from 'dotenv';
import { slugify } from '../src/utils/slug.js';

dotenv.config();

const prisma = new PrismaClient();

const image = (name: string) => `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80&sig=${encodeURIComponent(name)}`;

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@arotiana.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: Role.ADMIN },
    create: {
      firstName: process.env.ADMIN_FIRST_NAME || 'Arotiana',
      lastName: process.env.ADMIN_LAST_NAME || 'Admin',
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: Role.ADMIN,
    },
  });

  const destinations = [
    ['Andasibe', 'Eastern Madagascar', 'Rainforest, indri calls and intimate lemur encounters.'],
    ['Ranomafana', 'Highlands', 'Cloud forest, rare wildlife and thermal village atmosphere.'],
    ['Isalo', 'Southern Madagascar', 'Sandstone canyons, natural pools and big walking horizons.'],
    ['Morondava', 'Western Coast', 'Avenue of the Baobabs and golden western light.'],
    ['Tsingy de Bemaraha', 'Western Madagascar', 'Limestone cathedrals, suspension bridges and dramatic geology.'],
    ['Nosy Be', 'Indian Ocean', 'Scented islands, coral gardens and slow coastal days.'],
    ['Masoala', 'Northeast Madagascar', 'Remote rainforest meeting the sea.'],
    ['Sainte-Marie', 'East Coast', 'Whale watching, beaches and gentle island culture.'],
    ['Anakao', 'Southwest Coast', 'Lagoon life, Vezo culture and clear Indian Ocean water.'],
    ['Ifaty', 'Southwest Coast', 'Spiny forest, reef excursions and relaxed beach lodges.'],
  ];

  for (const [name, region, shortDescription] of destinations) {
    await prisma.destination.upsert({
      where: { slug: slugify(String(name)) },
      update: {},
      create: {
        name,
        slug: slugify(name),
        region,
        shortDescription,
        description: `${shortDescription} Arotiana designs routes here with local guides, responsible timing and room for meaningful encounters.`,
        featured: ['Andasibe', 'Morondava', 'Nosy Be', 'Isalo'].includes(name),
        image: image(name),
      },
    });
  }

  const experiences = [
    ['Lemur Watching', 'Wildlife', 'Half day to 3 days', 'Easy', 120],
    ['Wildlife Photography', 'Photography', '3 to 10 days', 'Moderate', 900],
    ['Birdwatching', 'Wildlife', '2 to 7 days', 'Moderate', 450],
    ['Trekking', 'Adventure', '1 to 8 days', 'Moderate to challenging', 300],
    ['Cultural Discovery', 'Culture', '1 to 5 days', 'Easy', 180],
    ['Community Tourism', 'Community', '2 to 6 days', 'Easy', 220],
    ['Luxury Escape', 'Luxury', '4 to 12 days', 'Easy', 1800],
    ['Family Adventure', 'Family', '5 to 12 days', 'Easy to moderate', 950],
  ];

  for (const [name, category, duration, difficulty, priceFrom] of experiences) {
    await prisma.experience.upsert({
      where: { slug: slugify(String(name)) },
      update: {},
      create: {
        name: String(name),
        slug: slugify(String(name)),
        category: String(category),
        duration: String(duration),
        difficulty: String(difficulty),
        priceFrom: Number(priceFrom),
        featured: ['Lemur Watching', 'Wildlife Photography', 'Family Adventure'].includes(String(name)),
        image: image(String(name)),
        description: `${name} with Arotiana is planned around seasonality, local expertise and a respectful rhythm of travel.`,
      },
    });
  }

  const journeys = [
    {
      title: 'The Ultimate Madagascar Journey',
      duration: 10,
      priceFrom: 2850,
      featured: true,
      stops: ['Antananarivo', 'Andasibe', 'Morondava', 'Nosy Be'],
    },
    {
      title: 'Rainforest and Baobabs',
      duration: 8,
      priceFrom: 1950,
      featured: true,
      stops: ['Antananarivo', 'Andasibe', 'Ranomafana', 'Morondava'],
    },
    {
      title: 'Wild South Expedition',
      duration: 9,
      priceFrom: 2150,
      featured: false,
      stops: ['Antananarivo', 'Antsirabe', 'Isalo', 'Ifaty'],
    },
  ];

  for (const journey of journeys) {
    await prisma.journey.upsert({
      where: { slug: slugify(journey.title) },
      update: {},
      create: {
        title: journey.title,
        slug: slugify(journey.title),
        duration: journey.duration,
        priceFrom: journey.priceFrom,
        featured: journey.featured,
        image: image(journey.title),
        shortDescription: `${journey.duration} days through Madagascar with Arotiana guides.`,
        description: `A carefully paced journey connecting wildlife, landscapes and community encounters across ${journey.stops.join(', ')}.`,
        itineraries: {
          create: journey.stops.map((location, index) => ({
            day: index + 1,
            title: `Day ${index + 1}: ${location}`,
            location,
            description: `Explore ${location} with time for guided visits, local context and relaxed travel logistics.`,
          })),
        },
      },
    });
  }

  await prisma.testimonial.createMany({
    data: [
      { name: 'Elise Martin', country: 'France', content: 'A thoughtful Madagascar journey with guides who cared deeply about every place.', rating: 5, published: true },
      { name: 'James Walker', country: 'United Kingdom', content: 'The lemur watching and baobab sunset were unforgettable.', rating: 5, published: true },
    ],
    skipDuplicates: true,
  });

  await prisma.article.upsert({
    where: { slug: 'where-to-see-lemurs-in-madagascar' },
    update: {},
    create: {
      title: 'Where to See Lemurs in Madagascar',
      slug: 'where-to-see-lemurs-in-madagascar',
      excerpt: 'A practical guide to the best parks and seasons for observing lemurs responsibly.',
      content: 'Madagascar is the only natural home of lemurs. Andasibe, Ranomafana, Masoala and Berenty each offer different habitats, species and travel rhythms. A responsible visit means keeping distance, following park rules and travelling with trained local guides.',
      image: image('lemurs'),
      author: 'Arotiana Team',
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log(`Seed completed. Admin email: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
