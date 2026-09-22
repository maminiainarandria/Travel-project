import { useEffect, useState } from 'react';
import { apiRequest } from './config/api.js';

const commonsImage = (file, width = 1600) => `https://images.weserv.nl/?url=${encodeURIComponent(`https://commons.wikimedia.org/wiki/Special:FilePath/${file}`)}&w=${width}&output=jpg`;
const source = (file, description) => ({ imageSource: 'Wikimedia Commons', imageAuthor: 'See Commons file page', imageLicense: 'License listed on the Commons file page', imageSourceUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`, imageDescription: description });
const photo = (file, description, width = 1600) => ({ image: commonsImage(file, width), ...source(file, description) });
const siteImages = {
  homeHero: photo('Avenue of the Baobabs at Sunset.jpg', 'Morondava baobabs at sunset, used once as the homepage video poster', 2200),
  homeStory: photo('Andasibe 01.JPG', 'Andasibe rainforest for the authentic journey story'),
  destinationsHero: photo('Avenue of the baobabs at sunrise blue and gold madagascar.jpg', 'Madagascar destination overview at sunrise'),
  experiencesHero: photo('Mantadia 01.JPG', 'Madagascar rainforest for the experience overview'),
  journeysHero: photo('Sunset baobabs Madagascar.jpg', 'Madagascar journey overview at golden hour'),
  featuredJourney: { image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Avenue_of_Baobabs_%2845333912101%29.jpg', ...source('Avenue of Baobabs (45333912101).jpg', 'Featured baobab journey image') },
  homeDestinations: [photo('Andasibe-Mantadia National Park 2013 06.jpg', 'Home Andasibe destination teaser'), photo('Ranomafana National Park 2013 4.jpg', 'Home Ranomafana destination teaser'), photo('Adansonia grandidieri Morondava - 29.jpg', 'Home Morondava destination teaser'), photo('Nosy Be beach (3186852215).jpg', 'Home Nosy Be destination teaser')],
  homeExperiences: [photo('Lémur brun commun (Eulemur fulvus) (51213).jpg', 'Home lemur experience teaser'), photo('Isalo National Park 2013 01.jpg', 'Home trekking experience teaser'), photo('Allee des Baobabs 06.JPG', 'Home photography experience teaser')],
  journalHero: photo('Allee des Baobabs 03.JPG', 'Editorial Madagascar landscape for the journal'),
  aboutHero: photo('Parque nacional de Andasibe-Mantadia Madagascar 20171116 120612.jpg', 'Andasibe-Mantadia landscape for the Arotiana story'),
  contactHero: photo('Fishermen in Nosey Be.jpg', 'Local Malagasy life for the contact invitation'),
  customHero: photo('Masoala, Madagascar.jpg', 'Masoala landscape for a bespoke journey invitation'),
  conservation: photo('Inventaire de Mangrove par WCS.jpg', 'Conservation fieldwork in a Malagasy mangrove'),
  destinations: {
    andasibe: photo('Andasibe 02.JPG', 'Andasibe rainforest destination card'),
    ranomafana: photo('Ranomafana National Park 2013 1.jpg', 'Ranomafana cloud forest destination card'),
    morondava: photo('Allée des Baobabs near Morondava, Madagascar.jpg', 'Morondava baobab avenue destination card'),
    nosyBe: photo('Nosy Be beach (3186851033).jpg', 'Nosy Be coastal destination card'),
    isalo: photo('Canyon des Singes and Canyon des Rats (9585043286).jpg', 'Isalo canyon destination card'),
    masoala: photo('Forets (Parc national Masoala).jpg', 'Masoala rainforest destination card'),
  },
  experiences: {
    lemur: photo('Lémur brun commun (Eulemur fulvus) (23195).jpg', 'Lemur in its natural Malagasy habitat'),
    trekking: photo("Marche matinale dans le Parc National de l'Isalo.jpg", 'Morning trekking in Isalo'),
    photography: photo('Sunset on Baobabs (38598813956).jpg', 'Photography subject at the baobabs'),
    culture: photo('A community in Nosey Be.jpg', 'Community life in Nosy Be'),
    family: photo('Walking the Avenue of the Baobabs.jpg', 'Family-friendly walk at the baobabs'),
    ocean: photo('Pirogue a balancier - Nosy Be - Dzamandzar.jpg', 'Traditional pirogue on the Nosy Be coast'),
  },
  journeys: {
    ultimate: photo('Avenue of the Baobabs, central axis.jpg', 'Signature baobab route for the ultimate journey'),
    island: photo('Nosy Be Island when arriving from the sea (2).jpg', 'Arriving by sea for the island and inland journey'),
    wildSouth: photo('Isalo canyons.jpg', 'Southern Madagascar canyon route'),
  },
  articles: {
    lemurs: photo('Lémur brun commun (Eulemur fulvus) (28610).jpg', 'Wildlife guide lemur portrait'),
    seasons: photo('Mist over Ranomafana National Park (15719448688).jpg', 'Seasonal atmosphere in Ranomafana'),
    responsible: photo('Lowland rainforest, Masoala National Park, Madagascar (4026784053).jpg', 'Protected Masoala rainforest'),
  },
  homeArticles: [photo('Lémur brun commun (Eulemur fulvus) (37663).jpg', 'Homepage wildlife journal teaser'), photo('Parque Nacional de Ranomafana Madagascar de 20171113 053617.jpg', 'Homepage seasonal planning teaser'), photo('Lowland Rainforest, Masoala National Park, Madagascar (4027524958).jpg', 'Homepage responsible travel teaser')],
  articleHeroes: { 'where-to-see-lemurs': photo('Lémur brun commun (Eulemur fulvus) (35392).jpg', 'Lemur article hero'), 'when-to-visit': photo('River in Ranamafana National Park on Vato Trail (15721614909).jpg', 'Seasonal travel article hero'), 'responsible-travel': photo('Lowland rainforest, Masoala National Park, Madagascar (4027532178).jpg', 'Responsible travel article hero') },
  galleries: {
    andasibe: [photo('Forêt, Andasibe Madagascar.jpg', 'Andasibe forest path'), photo('Pont dans la forêt d Analamazaotra, Madagascar.jpg', 'Analamazaotra forest bridge'), photo('Rivière dans la forêt humide de Madagascar (25374).jpg', 'Andasibe humid forest river')],
    ranomafana: [photo('Namorona River in Ranomafana National Park 2013 2.jpg', 'Namorona River in Ranomafana'), photo('Chute d eau à Ranomafana.jpg', 'Ranomafana waterfall'), photo('Ranomafana - falls.jpg', 'Ranomafana falls')],
    morondava: [photo('Sunset on the Avenue of the Baobabs.jpg', 'Morondava sunset road'), photo('Adansonia grandidieri Morondava - 08.jpg', 'Morondava baobab detail'), photo('Allee des Baobabs 07.JPG', 'Baobab avenue landscape')],
    nosyBe: [photo('Nosy Be and Indian Ocean.jpg', 'Nosy Be from above'), photo('Beach at Nosy Be.jpg', 'Nosy Be beach'), photo('Port de Nosy-Be 01.jpg', 'Nosy Be harbor life')],
    isalo: [photo('Isalo Window (9590120678).jpg', 'Isalo Window formation'), photo('Natural Swiming Pool, Isalo National Park (3955536504).jpg', 'Isalo natural pool'), photo('Rock chimneys in Isalo N-P (4352882205).jpg', 'Isalo rock chimneys')],
    masoala: [photo('Masoala coast.jpg', 'Masoala coast'), photo('Plage cap Masoala.jpg', 'Cap Masoala beach'), photo('Hotel à Masoala village.jpg', 'Masoala village accommodation')],
  },
  experienceGalleries: {
    lemur: [photo('Lémur brun commun (Eulemur fulvus) (24018).jpg', 'Lemur in Andasibe'), photo('Lémur brun commun (Eulemur fulvus) (24324).jpg', 'Second lemur encounter'), photo('Lémur brun commun (Eulemur fulvus) (25849).jpg', 'Lemur in canopy')],
    trekking: [photo('Isalo - view from massif.jpg', 'Trekking view over Isalo'), photo('Escalier rocheux du Jardin du Roy, Isalo.jpg', 'Rock steps in Isalo'), photo('Isalo - Namaza - piscine naturelle.jpg', 'Trekking destination pool')],
    photography: [photo('Avenue des Baobab 2 (4990212817).jpg', 'Baobab photography scene'), photo('After Sunset on Avenue of the Baobabs.jpg', 'After-sunset landscape'), photo('Milky Way over Avenue of Baobabs (ann22042n).jpg', 'Night photography at the baobabs')],
    culture: [photo('Au marché de Nosy Be.jpg', 'Nosy Be market'), photo('Face painting in Nosey Be.jpg', 'Cultural face painting'), photo('Bateau de pêcheur Malagasy.jpg', 'Malagasy fishing culture')],
    family: [photo('Tourist parking and souvenir shops at Avenue of Baobabs in Morondava.jpg', 'Family travel stop at Morondava'), photo('Baobab Avenue.JPG', 'Family walk'), photo('Goat in front of Avenue of the Baobabs.jpg', 'Everyday life near the baobabs')],
    ocean: [photo('Port de Nosy Be.jpg', 'Nosy Be harbor'), photo('Nosy Be Island when arriving from the sea (3).jpg', 'Island arrival'), photo('Wake.JPG', 'Nosy Be shoreline')],
  },
  journeyGalleries: {
    ultimate: [photo('Adansonia grandidieri Morondava - 09.jpg', 'Ultimate journey baobab route'), photo('Sunset, Allee des Baobabs, Madagascar (27610142306).jpg', 'Golden baobab route'), photo('Madagascar baobab.JPG', 'Baobab landscape')],
    island: [photo('Nosy Be Island when arriving from the sea (4).jpg', 'Island arrival'), photo('Lago Antsidihy desde Mont Passot, Nosy Be, Madagascar, 2025-09-21, DD 107.jpg', 'Nosy Be interior landscape'), photo('Port in Nosy Be (1).jpg', 'Coastal travel')],
    wildSouth: [photo('Isalo - view from road.jpg', 'Southern road through Isalo'), photo('Sandstone Cliffs (9587326243).jpg', 'Isalo sandstone'), photo('Isalo Valley, Madagascar.jpg', 'Isalo valley')],
  },
  detailHeroes: {
    destinations: {
      andasibe: photo('Andasibe-Mantadia National Park 2013 24.jpg', 'Andasibe detail hero'), ranomafana: photo('River in Ranamafana National Park (15285410424).jpg', 'Ranomafana detail hero'), morondava: photo('Allée des Baobabs 01.JPG', 'Morondava detail hero'), nosyBe: photo('Nosy Be Island when arriving from the sea (10).jpg', 'Nosy Be detail hero'), isalo: photo('Isalo landscape.jpg', 'Isalo detail hero'), masoala: photo('Masoala National Parc.jpg', 'Masoala detail hero')
    },
    experiences: {
      'lemur-watching': photo('Lémur brun commun (Eulemur fulvus) (53002).jpg', 'Lemur watching detail hero'), trekking: photo('Isalo National Park 2013 02.jpg', 'Trekking detail hero'), photography: photo('Avenue of Baobabs (45333912101).jpg', 'Photography detail hero'), culture: photo('Séchage du poisson, cote Est sud de Nosy Be, Madagascar (25813485840).jpg', 'Culture detail hero'), 'family-journeys': photo('Goats in front of Avenue of the Baobabs.jpg', 'Family detail hero'), 'ocean-escape': photo('Port de tête en bord de mer.jpg', 'Ocean detail hero')
    },
    journeys: { ultimate: photo('Avenue of the Baobabs (9576865450).jpg', 'Ultimate journey detail hero'), island: photo('Nosy Be Island when arriving from the sea (11).jpg', 'Island and inland detail hero'), 'wild-south': photo('Isalo Valley Madagascar.jpg', 'Wild south detail hero') },
  },
};


const heroImage = siteImages.homeHero.image;
const rainforestImage = siteImages.homeStory.image;
const communityImage = siteImages.contactHero.image;
const masoalaImage = siteImages.conservation.image;

function HeroVideoSequence() { return <div className="video-wrap" aria-hidden="true"><video className="hero-video" autoPlay muted loop playsInline preload="auto" poster={heroImage}><source src="/assets/tsingy-bemaraha.mp4" type="video/mp4" /></video></div>; }
const destinations = [
  { slug: 'andasibe', name: 'Andasibe', kicker: 'Rainforest / Eastern Madagascar', description: 'Mossy forests, indri calls and intimate encounters with Madagascar’s most charismatic wildlife.', ...siteImages.destinations.andasibe },
  { slug: 'ranomafana', name: 'Ranomafana', kicker: 'Cloud forest / Highlands', description: 'A lush sanctuary where rare species hide beneath a canopy of ferns and orchids.', ...siteImages.destinations.ranomafana },
  { slug: 'morondava', name: 'Morondava', kicker: 'Baobabs / Western coast', description: 'The legendary Avenue of the Baobabs, golden light and the rhythm of the west.', ...siteImages.destinations.morondava },
  { slug: 'nosy-be', name: 'Nosy Be', kicker: 'Islands / Indian Ocean', description: 'Scented islands, coral gardens and slow days on the turquoise edge of Madagascar.', ...siteImages.destinations.nosyBe },
  { slug: 'isalo', name: 'Isalo', kicker: 'Canyons / Southern Madagascar', description: 'Sculpted sandstone, hidden pools and wide horizons made for walking.', ...siteImages.destinations.isalo },
  { slug: 'masoala', name: 'Masoala', kicker: 'Wild coast / Northeast', description: 'An untouched meeting of rainforest and sea for the most adventurous explorers.', ...siteImages.destinations.masoala },
];

const experiences = [
  { slug: 'lemur-watching', title: 'Lemur watching', label: 'Wildlife', description: 'Meet Madagascar’s remarkable primates in their natural forest home.', ...siteImages.experiences.lemur },
  { slug: 'trekking', title: 'Trekking', label: 'Adventure', description: 'Walk through changing landscapes with local guides who know every trail.', ...siteImages.experiences.trekking },
  { slug: 'photography', title: 'Photography', label: 'Creative', description: 'Chase dawn light, endemic wildlife and stories worth bringing home.', ...siteImages.experiences.photography },
  { slug: 'culture', title: 'Culture & community', label: 'Connection', description: 'Share time, food and stories with the people who make the island.', ...siteImages.experiences.culture },
  { slug: 'family-journeys', title: 'Family journeys', label: 'Together', description: 'Thoughtful adventures designed around curiosity, comfort and wonder.', ...siteImages.experiences.family },
  { slug: 'ocean-escape', title: 'Ocean escape', label: 'Slow travel', description: 'Trade the road for a pirogue, a reef and the quiet of island life.', ...siteImages.experiences.ocean },
];

const journeys = [
  { slug: 'ultimate-madagascar', title: 'The ultimate Madagascar journey', days: '10 days', type: 'Wildlife · Culture · Adventure', description: 'From the call of the indri to the sunset of the baobabs, experience the island in one unforgettable arc.', ...siteImages.journeys.ultimate },
  { slug: 'island-and-inland', title: 'Island & inland', days: '12 days', type: 'Rainforest · Coast · Slow travel', description: 'A considered route from the highlands to the Indian Ocean, with time to linger.', ...siteImages.journeys.island },
  { slug: 'wild-south', title: 'The wild south', days: '8 days', type: 'Trekking · Photography', description: 'Canyons, dry forests and dramatic landscapes for travellers who like to roam.', ...siteImages.journeys.wildSouth },
];

const articles = [
  { slug: 'where-to-see-lemurs', category: 'Wildlife guide', date: '14 May 2026', title: 'The best places to see lemurs in Madagascar', ...siteImages.articles.lemurs },
  { slug: 'when-to-visit', category: 'Planning', date: '02 April 2026', title: 'When is the best time to visit Madagascar?', ...siteImages.articles.seasons },
  { slug: 'responsible-travel', category: 'Our approach', date: '18 March 2026', title: 'A more responsible way to travel Madagascar', ...siteImages.articles.responsible },
];

function imageWithFallback(primary, fallback) {
  return primary || fallback?.image || siteImages.destinationsHero.image;
}

function destinationImageFor(slug, index = 0) {
  const key = slug === 'nosy-be' ? 'nosyBe' : slug;
  return siteImages.destinations[key] || siteImages.homeDestinations[index % siteImages.homeDestinations.length] || siteImages.destinationsHero;
}

function experienceImageFor(slug, index = 0) {
  const images = {
    'lemur-watching': siteImages.experiences.lemur,
    trekking: siteImages.experiences.trekking,
    photography: siteImages.experiences.photography,
    'wildlife-photography': siteImages.experiences.photography,
    culture: siteImages.experiences.culture,
    'cultural-discovery': siteImages.experiences.culture,
    'community-tourism': siteImages.experiences.culture,
    'family-journeys': siteImages.experiences.family,
    'family-adventure': siteImages.experiences.family,
    'ocean-escape': siteImages.experiences.ocean,
    'luxury-escape': siteImages.experiences.ocean,
    birdwatching: siteImages.experiences.lemur,
  };
  return images[slug] || siteImages.homeExperiences[index % siteImages.homeExperiences.length] || siteImages.experiencesHero;
}

function journeyImageFor(slug, index = 0) {
  const images = {
    'ultimate-madagascar': siteImages.journeys.ultimate,
    'the-ultimate-madagascar-journey': siteImages.journeys.ultimate,
    'rainforest-and-baobabs': siteImages.journeys.ultimate,
    'island-and-inland': siteImages.journeys.island,
    'wild-south': siteImages.journeys.wildSouth,
    'wild-south-expedition': siteImages.journeys.wildSouth,
  };
  return images[slug] || Object.values(siteImages.journeys)[index % Object.values(siteImages.journeys).length] || siteImages.journeysHero;
}

function formatArticleDate(value, fallback = '') {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function formatPrice(value) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? `From $${amount.toLocaleString('en-US')}` : 'Tailor-made';
}

function mapDestination(item, index = 0) {
  const fallback = destinations.find((entry) => entry.slug === item.slug || entry.name === item.name);
  const localImage = destinationImageFor(item.slug || fallback?.slug, index);
  return {
    ...(fallback || {}),
    ...item,
    slug: item.slug || fallback?.slug || `destination-${index + 1}`,
    name: item.name || fallback?.name || 'Madagascar',
    kicker: item.kicker || [item.region || fallback?.region || 'Madagascar', item.featured ? 'Featured' : 'Tailor-made'].join(' / '),
    description: item.shortDescription || item.description || fallback?.description || '',
    fullDescription: item.description || fallback?.fullDescription || fallback?.description || '',
    image: imageWithFallback(item.image, fallback || localImage),
  };
}

function mapExperience(item, index = 0) {
  const fallback = experiences.find((entry) => entry.slug === item.slug || entry.title === item.name);
  const localImage = experienceImageFor(item.slug || fallback?.slug, index);
  return {
    ...(fallback || {}),
    ...item,
    slug: item.slug || fallback?.slug || `experience-${index + 1}`,
    title: item.title || item.name || fallback?.title || 'Madagascar experience',
    label: item.label || item.category || fallback?.label || 'Experience',
    description: item.description || fallback?.description || '',
    type: item.category || fallback?.type,
    image: imageWithFallback(item.image, fallback || localImage),
  };
}

function mapJourney(item, index = 0) {
  const fallback = journeys.find((entry) => entry.slug === item.slug || entry.title === item.title);
  const localImage = journeyImageFor(item.slug || fallback?.slug, index);
  const locations = Array.isArray(item.itineraries) ? item.itineraries.map((step) => step.location).filter(Boolean) : [];
  return {
    ...(fallback || {}),
    ...item,
    slug: item.slug || fallback?.slug || `journey-${index + 1}`,
    title: item.title || fallback?.title || 'Madagascar journey',
    days: item.days || (item.duration ? `${item.duration} days` : fallback?.days || 'Tailor-made'),
    type: item.type || locations.slice(0, 3).join(' / ') || formatPrice(item.priceFrom),
    description: item.shortDescription || item.description || fallback?.description || '',
    fullDescription: item.description || fallback?.fullDescription || fallback?.description || '',
    image: imageWithFallback(item.image, fallback || localImage),
  };
}

function mapArticle(item, index = 0) {
  const fallback = articles.find((entry) => entry.slug === item.slug || entry.title === item.title);
  const localImages = Object.values(siteImages.articles);
  return {
    ...(fallback || {}),
    ...item,
    slug: item.slug || fallback?.slug || `article-${index + 1}`,
    title: item.title || fallback?.title || 'Madagascar travel story',
    category: item.category || fallback?.category || 'Journal',
    date: item.date || formatArticleDate(item.publishedAt || item.createdAt, fallback?.date),
    excerpt: item.excerpt || fallback?.excerpt,
    content: item.content || fallback?.content,
    image: imageWithFallback(item.image, fallback || localImages[index % localImages.length]),
  };
}

function mapApiList(response, mapper, fallbackItems) {
  const items = Array.isArray(response?.data) ? response.data : [];
  return items.length ? items.map(mapper) : fallbackItems;
}

const fallbackData = {
  destinations: destinations.map(mapDestination),
  experiences: experiences.map(mapExperience),
  journeys: journeys.map(mapJourney),
  articles: articles.map(mapArticle),
  testimonials: [{ content: 'Madagascar felt like a world we had never seen before. Arotiana gave us the space to be surprised by it, and the care to experience it well.', name: 'Elise & Thomas', country: 'France' }],
};

const homeDestinations = destinations.map((item, index) => ({ ...item, ...siteImages.homeDestinations[index] }));
const homeExperiences = experiences.slice(0, 3).map((item, index) => ({ ...item, ...siteImages.homeExperiences[index] }));

function useTravelData() {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [destinationResponse, experienceResponse, journeyResponse, articleResponse, testimonialResponse] = await Promise.all([
          apiRequest('/destinations?limit=20&sortBy=name&sortOrder=asc'),
          apiRequest('/experiences?limit=20&sortBy=name&sortOrder=asc'),
          apiRequest('/journeys?limit=20'),
          apiRequest('/articles?published=true&limit=20'),
          apiRequest('/testimonials'),
        ]);

        if (!active) return;
        setData({
          destinations: mapApiList(destinationResponse, mapDestination, fallbackData.destinations),
          experiences: mapApiList(experienceResponse, mapExperience, fallbackData.experiences),
          journeys: mapApiList(journeyResponse, mapJourney, fallbackData.journeys),
          articles: mapApiList(articleResponse, mapArticle, fallbackData.articles),
          testimonials: mapApiList(testimonialResponse, (item) => item, fallbackData.testimonials),
        });
      } catch (error) {
        console.warn('Arotiana API unavailable, using local fallback data.', error);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, []);

  return data;
}

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Link({ href, children, className = '', onClick }) {
  const handleClick = (event) => {
    if (href.startsWith('/')) {
      event.preventDefault();
      navigate(href);
    }
    onClick?.();
  };
  return <a href={href} className={className} onClick={handleClick}>{children}</a>;
}

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }
function SectionTitle({ eyebrow, title, intro, light = false }) { return <div className={`section-title${light ? ' light' : ''}`}><p className="eyebrow"><i />{eyebrow}</p><h2 dangerouslySetInnerHTML={{ __html: title }} />{intro && <p className="section-intro">{intro}</p>}</div>; }
function RichHeading({ children }) { return <h2 dangerouslySetInnerHTML={{ __html: children }} />; }
function Button({ href = '/custom-trip', children, secondary = false }) { return <Link href={href} className={`button ${secondary ? 'button-ghost' : ''}`}>{children}<Arrow /></Link>; }

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  const links = [['/', 'Home'], ['/destinations', 'Destinations'], ['/experiences', 'Experiences'], ['/about', 'About'], ['/journal', 'Journal'], ['/contact', 'Contact']];
  const currentPath = window.location.pathname;
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}><Link href="/" className="logo" onClick={() => setOpen(false)}><img src="/assets/arotiana-logo.jpg" alt="Arotiana Lemurs Travel" /><span>Arotiana<small>Lemurs Travel</small></span></Link><nav className={open ? 'open' : ''}>{links.map(([href, label]) => <Link key={href} href={href} className={currentPath === href ? 'active' : ''} onClick={() => setOpen(false)}>{label}</Link>)}</nav><Button href="/custom-trip">Plan your journey</Button><button className="menu-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button></header>;
}

function Footer() { return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Link href="/" className="logo"><img src="/assets/arotiana-logo.jpg" alt="Arotiana Lemurs Travel" /><span>Arotiana<small>Lemurs Travel</small></span></Link><p>Authentic journeys through Madagascar, made with care for the island and its people.</p><div className="socials"><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://youtube.com" aria-label="YouTube">yt</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a></div></div><div className="footer-links"><div><h4>Explore</h4><Link href="/destinations">Destinations</Link><Link href="/experiences">Experiences</Link><Link href="/journeys">Journeys</Link></div><div><h4>About</h4><Link href="/about">Our story</Link><Link href="/journal">Journal</Link><Link href="/contact">Contact</Link></div><div><h4>Start planning</h4><Link href="/custom-trip">Create your journey</Link><a href="mailto:bonjour@arotiana.mg">bonjour@arotiana.mg</a><a href="tel:+261340000000">+261 (0) 34 00 000 00</a></div></div></div><div className="footer-bottom"><span>© 2026 Arotiana Lemurs Travel</span><span>Madagascar, Indian Ocean</span><span>Made for meaningful travel</span></div></footer>; }

function ImageHero({ eyebrow, title, imageUrl, children }) { return <section className="page-hero"><img className="page-hero-image" src={imageUrl} alt="" /><div className="page-hero-shade" /><div className="page-hero-copy"><p className="eyebrow"><i />{eyebrow}</p><h1 dangerouslySetInnerHTML={{ __html: title }} />{children}</div></section>; }

function Home() { return <><section className="home-hero"><HeroVideoSequence /><div className="hero-shade" /><div className="home-hero-copy"><p className="eyebrow"><i /> A journey into the extraordinary</p><h1>Explore Madagascar<br /><em>differently.</em></h1><p>Authentic journeys into Madagascar’s wildlife, landscapes and cultures.</p><div className="hero-buttons"><Button href="/destinations">Explore Madagascar</Button><Button href="/custom-trip" secondary>Plan your journey</Button></div></div><div className="hero-scroll">Scroll to explore <span>↓</span></div></section><main><section className="story-section split-section"><div className="story-image image-frame"><img src={rainforestImage} alt="Andasibe rainforest in Madagascar" /></div><div><SectionTitle eyebrow="The Arotiana way" title="Discover the Madagascar <em>beyond the usual journey.</em>" intro="We design unhurried, deeply personal journeys that bring you closer to the island’s rare wildlife, remarkable landscapes and generous communities." /><Button href="/about" secondary>Our story</Button></div></section><HomeDetails /><section className="destination-section section-pad"><SectionTitle eyebrow="Places with a pulse" title="Discover <em>Madagascar.</em>" intro="Every region has its own rhythm. Find the one that speaks to you." /><div className="destination-grid">{homeDestinations.map((item, index) => <DestinationCard key={item.slug} item={item} featured={index === 0} />)}</div><div className="section-action"><Button href="/destinations" secondary>View all destinations</Button></div></section><section className="experience-band"><div><SectionTitle light eyebrow="Make it yours" title="Travel by <em>experience.</em>" intro="Go looking for lemurs. Follow the light. Taste the island. Your Madagascar is yours to shape." /><Button href="/experiences">Explore experiences</Button></div><div className="experience-mosaic">{homeExperiences.map((item) => <ExperienceCard key={item.slug} item={item} />)}</div></section><FeaturedJourney /><WhyArotiana /><Conservation /><JournalPreview /><Testimonials /><Newsletter /></main></>; }

function HomeDetails() {
  const details = [
    ['Tailor-made routes', 'Every itinerary is shaped around your dates, travel pace, interests and comfort level.'],
    ['Local guiding', 'Travel with trusted guides who understand wildlife, culture and the rhythm of each region.'],
    ['Flexible journeys', 'Choose rainforest, baobabs, coast, trekking, family travel or a full Madagascar circuit.'],
  ];
  const stats = [['8-14', 'days suggested'], ['6', 'signature regions'], ['100%', 'custom planning']];

  return <section className="home-details section-pad"><div className="home-details-copy"><p className="eyebrow"><i /> Home details</p><h2>A clear path to your <em>Madagascar journey.</em></h2><p>Arotiana Lemurs Travel helps visitors move from inspiration to a real plan: where to go, how long to stay, what to expect and how to travel responsibly.</p><Button href="/custom-trip">Start planning</Button></div><div className="home-details-panel"><div className="home-details-stats">{stats.map(([value, label]) => <span key={label}><b>{value}</b>{label}</span>)}</div>{details.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>;
}

function DestinationCard({ item, featured = false }) { return <article className={`destination-card ${featured ? 'featured' : ''}`}><img src={item.image} alt={item.name} /><div className="card-shade" /><div className="card-content"><p>{item.kicker}</p><h3>{item.name}</h3><span>{item.description}</span><Link href={`/destinations/${item.slug}`}>Explore <Arrow /></Link></div></article>; }
function ExperienceCard({ item }) { return <article className="experience-card"><img src={item.image} alt={item.title} /><div className="card-shade" /><div className="experience-content"><small>{item.label}</small><h3>{item.title}</h3><Link href={`/experiences/${item.slug}`} aria-label={`Discover ${item.title}`}><Arrow /></Link></div></article>; }
function JourneyCard({ item }) { return <article className="journey-card"><img src={item.image} alt={item.title} /><div><p className="card-meta">{item.days} <span /> {item.type}</p><h3>{item.title}</h3><p>{item.description}</p><Link href={`/journeys/${item.slug}`} className="text-link">Discover this journey <Arrow /></Link></div></article>; }

function FeaturedJourney() { return <section className="featured-journey section-pad"><div className="featured-journey-image"><img src={siteImages.featuredJourney.image} alt="Baobabs at sunset" /></div><div><p className="eyebrow"><i /> Featured journey</p><h2>The ultimate<br /><em>Madagascar journey.</em></h2><p>From rainforest mornings to the amber silhouettes of the west, this is Madagascar in one unforgettable arc.</p><div className="journey-facts"><span><b>10</b> days</span><span><b>6</b> regions</span><span><b>∞</b> memories</span></div><Button href="/journeys/ultimate-madagascar">Discover this journey</Button></div></section>; }
function WhyArotiana() { const items = [['01', 'Authentic experiences', 'Go beyond the highlights with people who know the island intimately.'], ['02', 'Local expertise', 'Our journeys are shaped on the ground, with trusted local partners.'], ['03', 'Responsible travel', 'Travel should leave a positive trace for nature and communities.'], ['04', 'Thoughtful service', 'Every detail is considered, from your first question to your return.']]; return <section className="why-section section-pad"><SectionTitle eyebrow="Why Arotiana" title="A different way to <em>see the world.</em>" /><div className="why-grid">{items.map(([number, title, text]) => <article key={number}><b>{number}</b><span className="why-icon">✦</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>; }
function Conservation() { return <section className="conservation"><div className="conservation-image" style={{ backgroundImage: `url(${masoalaImage})` }} /><div className="conservation-copy"><p className="eyebrow"><i /> Our promise</p><h2>Travel that<br /><em>gives back.</em></h2><p>Madagascar is extraordinary and fragile. We believe the best journeys protect what makes the island special, support the communities who call it home and invite travellers to care deeply.</p><div className="conservation-points"><span><b>01</b> Conservation</span><span><b>02</b> Communities</span><span><b>03</b> Responsible travel</span></div><Button href="/about" secondary>Our approach</Button></div></section>; }
function JournalPreview() { const previewArticles = articles.map((article, index) => ({ ...article, ...siteImages.homeArticles[index] })); return <section className="journal-section section-pad"><SectionTitle eyebrow="From the journal" title="Madagascar, <em>in stories.</em>" intro="Notes, field guides and thoughtful ways to travel closer to the island." /><div className="article-grid">{previewArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div><div className="section-action"><Button href="/journal" secondary>Visit the journal</Button></div></section>; }
function ArticleCard({ article }) { return <article className="article-card"><Link href={`/journal/${article.slug}`}><img src={article.image} alt={article.title} /><div><p>{article.category} <span>{article.date}</span></p><h3>{article.title}</h3><span className="read-more">Read story <Arrow /></span></div></Link></article>; }
function Testimonials() { return <section className="testimonial-section"><div className="quote-mark">“</div><blockquote>Madagascar felt like a world we had never seen before. Arotiana gave us the space to be surprised by it, and the care to experience it well.</blockquote><p>— Elise & Thomas, France</p></section>; }
function Newsletter() { const [sent, setSent] = useState(false); return <section className="newsletter"><div><p className="eyebrow"><i /> Stay curious</p><h2>Discover Madagascar<br /><em>with us.</em></h2></div>{sent ? <p className="success-message">Thank you. Your next story from Madagascar is on its way.</p> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label htmlFor="newsletter-email">Your email address</label><div><input id="newsletter-email" type="email" placeholder="you@example.com" required /><button type="submit">Subscribe <Arrow /></button></div><small>Occasional inspiration. No noise.</small></form>}</section>; }

function ListingPage({ type }) { const isDest = type === 'destinations'; const items = isDest ? destinations : type === 'experiences' ? experiences : journeys; const listingHeroImage = isDest ? siteImages.destinationsHero.image : type === 'experiences' ? siteImages.experiencesHero.image : siteImages.journeysHero.image; return <><ImageHero eyebrow={isDest ? 'The island, region by region' : type === 'experiences' ? 'Ways to travel deeper' : 'Journeys made around you'} title={isDest ? 'Find your <em>Madagascar.</em>' : type === 'experiences' ? 'Travel by <em>experience.</em>' : 'Journeys with <em>meaning.</em>'} imageUrl={listingHeroImage}><p>Thoughtfully designed routes, shaped by the character of this remarkable island.</p></ImageHero><main className="listing-page section-pad"><SectionTitle eyebrow={isDest ? 'Explore the island' : 'Choose your pace'} title={isDest ? 'Places that stay <em>with you.</em>' : 'Start with what <em>moves you.</em>'} /><div className={`listing-grid ${type}`}>{items.map((item) => isDest ? <DestinationCard key={item.slug} item={item} /> : type === 'experiences' ? <ExperienceCard key={item.slug} item={item} /> : <JourneyCard key={item.slug} item={item} />)}</div></main></>; }

function DetailPage({ type, slug }) { const source = type === 'destinations' ? destinations : type === 'experiences' ? experiences : journeys; const item = source.find((entry) => entry.slug === slug) || source[0]; const isDestination = type === 'destinations'; const title = isDestination ? `${item.name}<br /><em>${item.kicker.split(' / ')[0]}.</em>` : item.title; const destinationKey = item.slug === 'nosy-be' ? 'nosyBe' : item.slug; const detailHero = isDestination ? siteImages.detailHeroes.destinations[destinationKey] : type === 'experiences' ? siteImages.detailHeroes.experiences[item.slug] : siteImages.detailHeroes.journeys[item.slug]; const galleryImages = isDestination ? siteImages.galleries[destinationKey].map((entry) => entry.image) : type === 'experiences' ? siteImages.experienceGalleries[item.slug === 'lemur-watching' ? 'lemur' : item.slug === 'family-journeys' ? 'family' : item.slug === 'ocean-escape' ? 'ocean' : item.slug].map((entry) => entry.image) : siteImages.journeyGalleries[item.slug === 'ultimate-madagascar' ? 'ultimate' : item.slug === 'island-and-inland' ? 'island' : 'wildSouth'].map((entry) => entry.image); return <><ImageHero eyebrow={isDestination ? item.kicker : item.type || 'Arotiana journey'} title={title} imageUrl={detailHero.image}><p>{item.description}</p></ImageHero><main className="detail-page"><section className="detail-intro section-pad"><div><p className="eyebrow"><i /> {isDestination ? 'Overview' : 'The experience'}</p><h2>{isDestination ? 'A place to <em>feel fully alive.</em>' : 'Made for the <em>curious.</em>'}</h2></div><div><p>{item.description} {isDestination ? 'Spend a few days moving at the pace of the forest, with time for quiet observation and unexpected encounters.' : 'Our local guides turn every day into an invitation: to notice more, go further and travel with intention.'}</p><Button href="/custom-trip">Plan this journey</Button></div></section><section className="detail-gallery section-pad">{galleryImages.map((galleryImage) => <img key={galleryImage} src={galleryImage} alt="" />)}</section><section className="detail-facts section-pad"><div><span>01</span><h3>Highlights</h3><p>{isDestination ? 'Endemic wildlife, deep forest walks and the rare privilege of slowing down.' : 'Personal guidance, beautiful places and the freedom to follow your curiosity.'}</p></div><div><span>02</span><h3>Best time to visit</h3><p>April to November offers clear trails, bright days and exceptional wildlife encounters.</p></div><div><span>03</span><h3>Made around you</h3><p>Every Arotiana journey is tailored to your pace, interests and way of seeing.</p></div></section></main><Newsletter /></>; }

function About() { return <><ImageHero eyebrow="The Arotiana story" title="Explore Madagascar<br /><em>with intention.</em>" imageUrl={rainforestImage}><p>A small, local-minded travel studio creating meaningful journeys across the world's oldest island.</p></ImageHero><main><section className="about-copy section-pad"><SectionTitle eyebrow="Our vision" title="A country unlike <em>anywhere else.</em>" intro="Madagascar rewards attention. Its forests are full of voices, its landscapes shift from red earth to blue ocean, and its people carry stories that stay with you." /><div className="about-columns"><p>We created Arotiana because travel here deserves more than a checklist. It deserves time, context and a relationship with the places you visit.</p><p>Our role is simple: listen carefully, connect you with the right people and shape a route that feels like yours. The result is travel that is comfortable, curious and genuinely connected.</p></div></section><Conservation /><WhyArotiana /></main></>; }

function Journal() { return <><ImageHero eyebrow="Field notes & inspiration" title="The Madagascar<br /><em>travel guide.</em>" imageUrl={siteImages.journalHero.image}><p>Ideas for going further, seeing more and travelling well.</p></ImageHero><main className="listing-page section-pad"><div className="journal-filter"><span>All stories</span><span>Wildlife</span><span>Planning</span><span>Our approach</span></div><div className="article-grid article-list">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></main></>; }
function ArticlePage({ slug }) { const article = articles.find((entry) => entry.slug === slug) || articles[0]; return <><ImageHero eyebrow={`${article.category} · ${article.date}`} title={article.title} imageUrl={siteImages.articleHeroes[slug].image} /><main className="article-page"><p className="article-lede">Madagascar is best understood slowly: one forest path, one conversation, one unexpected moment at a time.</p><div className="article-body"><p>{article.title} is an invitation to look closer. Across this extraordinary island, the journey is never only about arriving. It is about the texture of the road, the people who welcome you and the wildness that remains just beyond the next bend.</p><h2>Travel with curiosity</h2><p>Our local partners help turn a destination into a lived experience. They know where the light falls, when the forest wakes and how to make space for moments that cannot be planned.</p><blockquote>“The best journeys leave you with more questions than answers.”</blockquote><p>That is the spirit we bring to every Arotiana itinerary: considered, personal and rooted in a real respect for Madagascar.</p></div></main><Newsletter /></>; }
function Contact({ custom = false }) { const [sent, setSent] = useState(false); return <><ImageHero eyebrow={custom ? 'Made around you' : 'Start a conversation'} title={custom ? 'Your Madagascar,<br /><em>your way.</em>' : 'Let’s plan something<br /><em>extraordinary.</em>'} imageUrl={custom ? siteImages.customHero.image : siteImages.contactHero.image}><p>{custom ? 'Tell us what moves you. We’ll shape the rest together.' : 'Your first conversation with Arotiana starts here.'}</p></ImageHero><main className="form-page section-pad"><div className="form-intro"><p className="eyebrow"><i /> {custom ? 'Create your journey' : 'We are listening'}</p><RichHeading>{custom ? 'Tell us a little<br /><em>about your plans.</em>' : 'The first step<br />is <em>always a conversation.</em>'}</RichHeading><p>Share a few details and our team will come back to you with thoughtful ideas, not a generic itinerary.</p><a href="mailto:bonjour@arotiana.mg">bonjour@arotiana.mg</a><br /><a href="tel:+261340000000">+261 (0) 34 00 000 00</a></div>{sent ? <div className="form-success"><span>✓</span><h2>Thank you.</h2><p>We have received your message and will be in touch soon.</p><Button href="/">Back to home</Button></div> : <form className="trip-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="form-row"><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label></div><div className="form-row"><label>Phone<input placeholder="+33 6 00 00 00 00" /></label><label>Travel dates<input type="text" placeholder="When would you like to travel?" /></label></div><div className="form-row"><label>Number of travelers<select defaultValue=""><option value="" disabled>Select</option><option>1–2</option><option>3–5</option><option>6+</option></select></label><label>Travel style<select defaultValue=""><option value="" disabled>Choose your style</option><option>Wildlife & nature</option><option>Culture & connection</option><option>Adventure</option><option>Slow & restorative</option></select></label></div><label>Preferred destinations<input placeholder="Andasibe, Isalo, the coast..." /></label><label>Tell us about your journey<textarea rows="5" placeholder="What would make this trip meaningful to you?" /></label><button className="button" type="submit">Create my journey <Arrow /></button></form>}</main></>; }

function App() { const [path, setPath] = useState(window.location.pathname); useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []); let content; const match = path.match(/^\/(destinations|experiences|journeys)\/([^/]+)$/); const articleMatch = path.match(/^\/journal\/([^/]+)$/); if (path === '/') content = <Home />; else if (path === '/destinations' || path === '/experiences' || path === '/journeys') content = <ListingPage type={path.slice(1)} />; else if (match) content = <DetailPage type={match[1]} slug={match[2]} />; else if (path === '/about') content = <About />; else if (path === '/journal') content = <Journal />; else if (articleMatch) content = <ArticlePage slug={articleMatch[1]} />; else if (path === '/contact') content = <Contact />; else if (path === '/custom-trip') content = <Contact custom />; else content = <Home />; return <><Navbar />{content}<Footer /></>; }

function ConnectedHome({ data }) {
  const homeDestinations = data.destinations.slice(0, 4);
  const homeExperiences = data.experiences.slice(0, 3);
  const featuredJourney = data.journeys.find((item) => item.featured) || data.journeys[0];

  return (
    <>
      <section className="home-hero">
        <HeroVideoSequence />
        <div className="hero-shade" />
        <div className="home-hero-copy">
          <p className="eyebrow"><i /> A journey into the extraordinary</p>
          <h1>Explore Madagascar<br /><em>differently.</em></h1>
          <p>Authentic journeys into Madagascar's wildlife, landscapes and cultures.</p>
          <div className="hero-buttons">
            <Button href="/destinations">Explore Madagascar</Button>
            <Button href="/custom-trip" secondary>Plan your journey</Button>
          </div>
        </div>
        <div className="hero-scroll">Scroll to explore <span>↓</span></div>
      </section>
      <main>
        <section className="story-section split-section">
          <div className="story-image image-frame"><img src={rainforestImage} alt="Andasibe rainforest in Madagascar" /></div>
          <div>
            <SectionTitle eyebrow="The Arotiana way" title="Discover the Madagascar <em>beyond the usual journey.</em>" intro="We design unhurried, deeply personal journeys that bring you closer to the island's rare wildlife, remarkable landscapes and generous communities." />
            <Button href="/about" secondary>Our story</Button>
          </div>
        </section>
        <HomeDetails />
        <section className="destination-section section-pad">
          <SectionTitle eyebrow="Places with a pulse" title="Discover <em>Madagascar.</em>" intro="Every region has its own rhythm. Find the one that speaks to you." />
          <div className="destination-grid">{homeDestinations.map((item, index) => <DestinationCard key={item.slug} item={item} featured={index === 0 || item.featured} />)}</div>
          <div className="section-action"><Button href="/destinations" secondary>View all destinations</Button></div>
        </section>
        <section className="experience-band">
          <div>
            <SectionTitle light eyebrow="Make it yours" title="Travel by <em>experience.</em>" intro="Go looking for lemurs. Follow the light. Taste the island. Your Madagascar is yours to shape." />
            <Button href="/experiences">Explore experiences</Button>
          </div>
          <div className="experience-mosaic">{homeExperiences.map((item) => <ExperienceCard key={item.slug} item={item} />)}</div>
        </section>
        <ConnectedFeaturedJourney journey={featuredJourney} />
        <WhyArotiana />
        <Conservation />
        <ConnectedJournalPreview articles={data.articles} />
        <ConnectedTestimonials testimonials={data.testimonials} />
        <Newsletter />
      </main>
    </>
  );
}

function ConnectedFeaturedJourney({ journey }) {
  const selected = journey || fallbackData.journeys[0];
  const stopCount = Array.isArray(selected.itineraries) && selected.itineraries.length ? selected.itineraries.length : '4+';
  const dayCount = selected.duration || String(selected.days || '').replace(/\D/g, '') || '10';

  return (
    <section className="featured-journey section-pad">
      <div className="featured-journey-image"><img src={selected.image || siteImages.featuredJourney.image} alt={selected.title} /></div>
      <div>
        <p className="eyebrow"><i /> Featured journey</p>
        <h2>{selected.title}<br /><em>journey.</em></h2>
        <p>{selected.fullDescription || selected.description}</p>
        <div className="journey-facts">
          <span><b>{dayCount}</b> days</span>
          <span><b>{stopCount}</b> stops</span>
          <span><b>{formatPrice(selected.priceFrom).replace('From ', '')}</b> from</span>
        </div>
        <Button href={`/journeys/${selected.slug}`}>Discover this journey</Button>
      </div>
    </section>
  );
}

function ConnectedJournalPreview({ articles: currentArticles }) {
  const previewArticles = (currentArticles.length ? currentArticles : fallbackData.articles).slice(0, 3);
  return <section className="journal-section section-pad"><SectionTitle eyebrow="From the journal" title="Madagascar, <em>in stories.</em>" intro="Notes, field guides and thoughtful ways to travel closer to the island." /><div className="article-grid">{previewArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div><div className="section-action"><Button href="/journal" secondary>Visit the journal</Button></div></section>;
}

function ConnectedTestimonials({ testimonials }) {
  const testimonial = testimonials?.[0] || fallbackData.testimonials[0];
  return <section className="testimonial-section"><div className="quote-mark">“</div><blockquote>{testimonial.content}</blockquote><p>— {testimonial.name}{testimonial.country ? `, ${testimonial.country}` : ''}</p></section>;
}

function ConnectedListingPage({ type, data }) {
  const isDest = type === 'destinations';
  const items = isDest ? data.destinations : type === 'experiences' ? data.experiences : data.journeys;
  const listingHeroImage = isDest ? siteImages.destinationsHero.image : type === 'experiences' ? siteImages.experiencesHero.image : siteImages.journeysHero.image;
  return <><ImageHero eyebrow={isDest ? 'The island, region by region' : type === 'experiences' ? 'Ways to travel deeper' : 'Journeys made around you'} title={isDest ? 'Find your <em>Madagascar.</em>' : type === 'experiences' ? 'Travel by <em>experience.</em>' : 'Journeys with <em>meaning.</em>'} imageUrl={listingHeroImage}><p>Thoughtfully designed routes, shaped by the character of this remarkable island.</p></ImageHero><main className="listing-page section-pad"><SectionTitle eyebrow={isDest ? 'Explore the island' : 'Choose your pace'} title={isDest ? 'Places that stay <em>with you.</em>' : 'Start with what <em>moves you.</em>'} /><div className={`listing-grid ${type}`}>{items.map((item) => isDest ? <DestinationCard key={item.slug} item={item} /> : type === 'experiences' ? <ExperienceCard key={item.slug} item={item} /> : <JourneyCard key={item.slug} item={item} />)}</div></main></>;
}

function galleryImagesFor(type, item) {
  if (type === 'destinations') {
    const destinationKey = item.slug === 'nosy-be' ? 'nosyBe' : item.slug;
    const gallery = siteImages.galleries[destinationKey];
    return gallery ? gallery.map((entry) => entry.image) : [item.image, destinationImageFor(item.slug).image, siteImages.destinationsHero.image];
  }

  if (type === 'experiences') {
    const galleryKeys = {
      'lemur-watching': 'lemur',
      trekking: 'trekking',
      photography: 'photography',
      'wildlife-photography': 'photography',
      culture: 'culture',
      'cultural-discovery': 'culture',
      'community-tourism': 'culture',
      'family-journeys': 'family',
      'family-adventure': 'family',
      'ocean-escape': 'ocean',
      'luxury-escape': 'ocean',
      birdwatching: 'lemur',
    };
    const gallery = siteImages.experienceGalleries[galleryKeys[item.slug]];
    return gallery ? gallery.map((entry) => entry.image) : [item.image, experienceImageFor(item.slug).image, siteImages.experiencesHero.image];
  }

  const journeyKeys = {
    'ultimate-madagascar': 'ultimate',
    'the-ultimate-madagascar-journey': 'ultimate',
    'rainforest-and-baobabs': 'ultimate',
    'island-and-inland': 'island',
    'wild-south': 'wildSouth',
    'wild-south-expedition': 'wildSouth',
  };
  const gallery = siteImages.journeyGalleries[journeyKeys[item.slug]];
  return gallery ? gallery.map((entry) => entry.image) : [item.image, journeyImageFor(item.slug).image, siteImages.journeysHero.image];
}

function detailHeroFor(type, item) {
  if (type === 'destinations') {
    const key = item.slug === 'nosy-be' ? 'nosyBe' : item.slug;
    return siteImages.detailHeroes.destinations[key] || { image: item.image || destinationImageFor(item.slug).image };
  }
  if (type === 'experiences') {
    return siteImages.detailHeroes.experiences[item.slug] || { image: item.image || experienceImageFor(item.slug).image };
  }
  return siteImages.detailHeroes.journeys[item.slug] || { image: item.image || journeyImageFor(item.slug).image };
}

function ConnectedDetailPage({ type, slug, data }) {
  const source = (type === 'destinations' ? data.destinations : type === 'experiences' ? data.experiences : data.journeys);
  const item = source.find((entry) => entry.slug === slug) || source[0] || fallbackData[type][0];
  const isDestination = type === 'destinations';
  const title = isDestination ? `${item.name}<br /><em>${(item.kicker || 'Madagascar').split(' / ')[0]}.</em>` : item.title;
  const detailHero = detailHeroFor(type, item);
  const galleryImages = galleryImagesFor(type, item).filter(Boolean).slice(0, 3);
  const description = item.fullDescription || item.description;

  return <><ImageHero eyebrow={isDestination ? item.kicker : item.type || item.label || 'Arotiana journey'} title={title} imageUrl={detailHero.image}><p>{description}</p></ImageHero><main className="detail-page"><section className="detail-intro section-pad"><div><p className="eyebrow"><i /> {isDestination ? 'Overview' : 'The experience'}</p><h2>{isDestination ? 'A place to <em>feel fully alive.</em>' : 'Made for the <em>curious.</em>'}</h2></div><div><p>{description} {isDestination ? 'Spend a few days moving at the pace of the forest, with time for quiet observation and unexpected encounters.' : 'Our local guides turn every day into an invitation: to notice more, go further and travel with intention.'}</p><Button href="/custom-trip">Plan this journey</Button></div></section><section className="detail-gallery section-pad">{galleryImages.map((galleryImage) => <img key={galleryImage} src={galleryImage} alt="" />)}</section><section className="detail-facts section-pad"><div><span>01</span><h3>Highlights</h3><p>{isDestination ? 'Endemic wildlife, deep forest walks and the rare privilege of slowing down.' : 'Personal guidance, beautiful places and the freedom to follow your curiosity.'}</p></div><div><span>02</span><h3>Best time to visit</h3><p>April to November offers clear trails, bright days and exceptional wildlife encounters.</p></div><div><span>03</span><h3>Made around you</h3><p>Every Arotiana journey is tailored to your pace, interests and way of seeing.</p></div></section></main><Newsletter /></>;
}

function ConnectedJournal({ articles: currentArticles }) {
  const journalArticles = currentArticles.length ? currentArticles : fallbackData.articles;
  return <><ImageHero eyebrow="Field notes & inspiration" title="The Madagascar<br /><em>travel guide.</em>" imageUrl={siteImages.journalHero.image}><p>Ideas for going further, seeing more and travelling well.</p></ImageHero><main className="listing-page section-pad"><div className="journal-filter"><span>All stories</span><span>Wildlife</span><span>Planning</span><span>Our approach</span></div><div className="article-grid article-list">{journalArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></main></>;
}

function ConnectedArticlePage({ slug, articles: currentArticles }) {
  const article = currentArticles.find((entry) => entry.slug === slug) || fallbackData.articles.find((entry) => entry.slug === slug) || currentArticles[0] || fallbackData.articles[0];
  const heroImageUrl = siteImages.articleHeroes[slug]?.image || article.image || siteImages.journalHero.image;
  return <><ImageHero eyebrow={`${article.category} · ${article.date}`} title={article.title} imageUrl={heroImageUrl} /><main className="article-page"><p className="article-lede">{article.excerpt || 'Madagascar is best understood slowly: one forest path, one conversation, one unexpected moment at a time.'}</p><div className="article-body"><p>{article.content || `${article.title} is an invitation to look closer. Across this extraordinary island, the journey is never only about arriving. It is about the texture of the road, the people who welcome you and the wildness that remains just beyond the next bend.`}</p><h2>Travel with curiosity</h2><p>Our local partners help turn a destination into a lived experience. They know where the light falls, when the forest wakes and how to make space for moments that cannot be planned.</p><blockquote>“The best journeys leave you with more questions than answers.”</blockquote><p>That is the spirit we bring to every Arotiana itinerary: considered, personal and rooted in a real respect for Madagascar.</p></div></main><Newsletter /></>;
}

function splitField(value) {
  return String(value || '').split(',').map((item) => item.trim()).filter(Boolean);
}

function ConnectedContact({ custom = false }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const basePayload = {
      name: String(form.get('name') || '').trim(),
      email: String(form.get('email') || '').trim(),
      phone: String(form.get('phone') || '').trim() || undefined,
    };

    try {
      if (custom) {
        const interests = splitField(form.get('travelStyle'));
        const destinationsList = splitField(form.get('destinations'));
        const payload = {
          ...basePayload,
          startDate: String(form.get('startDate') || '') || undefined,
          endDate: String(form.get('endDate') || '') || undefined,
          travelers: Number(form.get('travelers') || 1),
          budget: form.get('budget') ? Number(form.get('budget')) : undefined,
          interests: interests.length ? interests : ['Tailor-made travel'],
          destinations: destinationsList.length ? destinationsList : ['Madagascar'],
          accommodation: String(form.get('accommodation') || '').trim() || undefined,
          message: String(form.get('message') || '').trim(),
        };
        await apiRequest('/custom-trips', { method: 'POST', body: JSON.stringify(payload) });
      } else {
        await apiRequest('/contact', {
          method: 'POST',
          body: JSON.stringify({
            ...basePayload,
            subject: String(form.get('subject') || '').trim(),
            message: String(form.get('message') || '').trim(),
          }),
        });
      }

      setSent(true);
    } catch (submitError) {
      setError(submitError.message || 'Unable to send your request right now.');
    } finally {
      setSubmitting(false);
    }
  }

  return <><ImageHero eyebrow={custom ? 'Made around you' : 'Start a conversation'} title={custom ? 'Your Madagascar,<br /><em>your way.</em>' : 'Let’s plan something<br /><em>extraordinary.</em>'} imageUrl={custom ? siteImages.customHero.image : siteImages.contactHero.image}><p>{custom ? 'Tell us what moves you. We’ll shape the rest together.' : 'Your first conversation with Arotiana starts here.'}</p></ImageHero><main className="form-page section-pad"><div className="form-intro"><p className="eyebrow"><i /> {custom ? 'Create your journey' : 'We are listening'}</p><RichHeading>{custom ? 'Tell us a little<br /><em>about your plans.</em>' : 'The first step<br />is <em>always a conversation.</em>'}</RichHeading><p>Share a few details and our team will come back to you with thoughtful ideas, not a generic itinerary.</p><a href="mailto:bonjour@arotiana.mg">bonjour@arotiana.mg</a><br /><a href="tel:+261340000000">+261 (0) 34 00 000 00</a></div>{sent ? <div className="form-success"><span>✓</span><h2>Thank you.</h2><p>We have received your message and will be in touch soon.</p><Button href="/">Back to home</Button></div> : <form className="trip-form" onSubmit={handleSubmit}><div className="form-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label></div><div className="form-row"><label>Phone<input name="phone" placeholder="+33 6 00 00 00 00" /></label>{custom ? <label>Start date<input name="startDate" type="date" /></label> : <label>Subject<input name="subject" required placeholder="How can we help?" /></label>}</div>{custom && <><div className="form-row"><label>End date<input name="endDate" type="date" /></label><label>Number of travelers<select name="travelers" defaultValue="2" required><option value="1">1</option><option value="2">1-2</option><option value="4">3-5</option><option value="6">6+</option></select></label></div><div className="form-row"><label>Travel style<select name="travelStyle" defaultValue="Wildlife & nature" required><option>Wildlife & nature</option><option>Culture & connection</option><option>Adventure</option><option>Slow & restorative</option></select></label><label>Budget<input name="budget" type="number" min="0" step="100" placeholder="2500" /></label></div><label>Preferred destinations<input name="destinations" placeholder="Andasibe, Isalo, the coast..." /></label><label>Accommodation<input name="accommodation" placeholder="Eco lodge, boutique hotel, luxury camp..." /></label></>}<label>Tell us about your journey<textarea name="message" rows="5" required minLength="10" placeholder="What would make this trip meaningful to you?" /></label>{error && <p className="form-error">{error}</p>}<button className="button" type="submit" disabled={submitting}>{submitting ? 'Sending...' : custom ? 'Create my journey' : 'Send message'} <Arrow /></button></form>}</main></>;
}

function ConnectedApp() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  let content;
  const match = path.match(/^\/(destinations|experiences|journeys)\/([^/]+)$/);
  const articleMatch = path.match(/^\/journal\/([^/]+)$/);

  if (path === '/') content = <Home />;
  else if (path === '/destinations' || path === '/experiences' || path === '/journeys') content = <ListingPage type={path.slice(1)} />;
  else if (match) content = <DetailPage type={match[1]} slug={match[2]} />;
  else if (path === '/about') content = <About />;
  else if (path === '/journal') content = <Journal />;
  else if (articleMatch) content = <ArticlePage slug={articleMatch[1]} />;
  else if (path === '/contact') content = <ConnectedContact />;
  else if (path === '/custom-trip') content = <ConnectedContact custom />;
  else content = <Home />;

  return <><Navbar />{content}<Footer /></>;
}

export default ConnectedApp;
