export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  caption?: string;
  featured?: boolean;
  isCoverStory?: boolean;
  pullQuote?: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface IssueEdition {
  id: string;
  issueNumber: string;
  volume: string;
  monthYear: string;
  dateDisplay: string;
  title: string;
  subtitle: string;
  editor: string;
  coverImage: string;
  pages: number;
  price: string;
  status: 'current' | 'archive' | 'upcoming';
  highlights: string[];
}

export interface MastheadMember {
  role: string;
  name: string;
  credentials?: string;
  location?: string;
}

export const MASTHEAD_MEMBERS: MastheadMember[] = [
  { role: "Owner, Publisher & Editor", name: "Parvaiz Ahmad Reshi", credentials: "Senior Investigative Journalist", location: "Bandipora / Srinagar" },
  { role: "Executive Editor", name: "Fayaz Qureshi", credentials: "Author & Political Columnist", location: "Srinagar" },
  { role: "Managing Editor", name: "Nahida Noor", credentials: "Education & Social Policy Analyst", location: "Baramulla" },
  { role: "Associate Editor", name: "Milind Champanerkar", credentials: "Editorial Columnist & Author", location: "Pune / Srinagar" },
  { role: "Associate Editor", name: "Aijaz Ahmad", credentials: "Public Affairs Specialist", location: "Srinagar" },
  { role: "Chief Advisor", name: "Dr. Suresh Khairnar", credentials: "Distinguished Social Scientist & Educator", location: "New Delhi" },
  { role: "Bureau Chief", name: "Reshi Junaid", credentials: "Field Reporting & Civic Investigations", location: "Bandipora" },
  { role: "Legal Adviser", name: "Adv. Zeza Majid Qureshi", credentials: "High Court of J&K and Ladakh", location: "Srinagar" },
  { role: "Legal Adviser", name: "Adv. Khalid Qureshi", credentials: "High Court of J&K and Ladakh", location: "Srinagar" },
  { role: "Art & Layout Designer", name: "Ubaid Malik", credentials: "Editorial & Publication Design", location: "Srinagar" },
];

export const MAGAZINE_DETAILS = {
  name: "The Legends Ink Monthly",
  tagline: "Ink That Speaks The Truth.",
  subline: "For a Better, Informed Society.",
  rniNumber: "JKENG/2026/89412",
  postalReg: "JK-BPR/09/2026-28",
  issn: "2583-9985",
  volume: "Volume 01",
  issue: "Issue 04",
  dateMonth: "November 2026",
  coverPrice: "Rs. 50",
  annualSubscription: "Rs. 550",
  editorInChief: "Parvaiz Ahmad Reshi",
  editorialOffice: "Reshi Complex, Hilal Abad, Nesbal Sumbal, Bandipore, J&K - 193501",
  printingPress: "Valley Offset Printers, Industrial Estate, Rangreth, Srinagar",
  phone: "+91 1957 220000",
  email: "thelegendsink@gmail.com",
  website: "www.thelegendsink.com",
  courtJurisdiction: "Disputes are subject to the exclusive jurisdiction of competent courts in Srinagar only."
};

export const ISSUE_EDITIONS: IssueEdition[] = [
  {
    id: "nov-2026",
    issueNumber: "Issue 04",
    volume: "Volume 01",
    monthYear: "November 2026",
    dateDisplay: "SUNDAY, NOVEMBER 01, 2026",
    title: "THE RED GOLD OF KASHMIR",
    subtitle: "Saffron Cultivation, Dying Chinars & The Constitutional Compass",
    editor: "BY EDITORIAL BOARD",
    coverImage: "/november-2026-cover.png",
    pages: 32,
    price: "Rs. 50",
    status: "current",
    highlights: [
      "Cover Story: The Red Gold of Kashmir — Saffron Cultivation in Pampore & Economic Revival",
      "Kashmir’s Dying Chinars: Who Will Save The Soul Of The Valley?",
      "Social Audit: The Rising Tide of Divorce in Kashmir Courts",
      "Sports: Young Cricketer Mohsin Reshi & ITF Junior Tennis Champions",
      "Essays: Mahatma Gandhi in World Literature & Nobel Laureate Anne Carson"
    ]
  },
  {
    id: "oct-2026",
    issueNumber: "Issue 03",
    volume: "Volume 01",
    monthYear: "October 2026",
    dateDisplay: "FRIDAY, OCTOBER 16, 2026",
    title: "YOUNG ACHIEVERS OF KASHMIR",
    subtitle: "Civil Services Excellence, Valley Aspirations & Academic Brilliance",
    editor: "BY EDITORIAL BOARD",
    coverImage: "/october-2026-cover.png",
    pages: 68,
    price: "Rs. 50",
    status: "archive",
    highlights: [
      "Suvan Sharma (AIR 148), Sugandha Gupta (AIR 207), Towseef Ahmad Ganaie (AIR 254), Ritika Bhan (AIR 456)",
      "Omar Abdullah as CM: Delivery vs Rhetoric",
      "Indu Kanwal Chib: Bureaucracy with Empathy",
      "Special Report: River Jehlum's Sumbal Bridge"
    ]
  },
  {
    id: "sep-2026",
    issueNumber: "Issue 02",
    volume: "Volume 01",
    monthYear: "September 2026",
    dateDisplay: "MONDAY, SEPTEMBER 01, 2026",
    title: "THE NARCOTICS CRACKDOWN",
    subtitle: "J&K Police Frontlines & The Battle For The Valley's Youth",
    editor: "BY FAYAZ QURESHI",
    coverImage: "/magazine_images/magazine_photo_08.jpg",
    pages: 64,
    price: "Rs. 50",
    status: "archive",
    highlights: [
      "De-addiction Rehabilitation Centers in Anantnag & Baramulla",
      "Financial Trails: Narco-Terror Enforcement",
      "Voices of Mothers across North Kashmir"
    ]
  },
  {
    id: "aug-2026",
    issueNumber: "Issue 01",
    volume: "Volume 01",
    monthYear: "August 2026",
    dateDisplay: "SATURDAY, AUGUST 15, 2026",
    title: "ASSEMBLY 2026 & CIVIC RENAISSANCE",
    subtitle: "Democratic Mandates Beyond Political Sloganeering",
    editor: "BY PARVAIZ AHMAD RESHI",
    coverImage: "/magazine_images/magazine_photo_12.jpg",
    pages: 60,
    price: "Rs. 50",
    status: "archive",
    highlights: [
      "Inaugural Address: The Mission of Independent Print",
      "Governance Benchmarks for Jammu & Kashmir",
      "Youth Employment & Industrial Policy Audit"
    ]
  },
  {
    id: "dec-2026",
    issueNumber: "Issue 05",
    volume: "Volume 01",
    monthYear: "December 2026",
    dateDisplay: "TUESDAY, DECEMBER 15, 2026",
    title: "WINTER SHADOWS & ARTISAN RESILIENCE",
    subtitle: "Pashmina Weavers, Power Tariffs, and High-Altitude Economies",
    editor: "BY NAHIDA NOOR",
    coverImage: "/magazine_images/magazine_photo_21.jpg",
    pages: 72,
    price: "Rs. 50",
    status: "upcoming",
    highlights: [
      "Handloom Artisans of Old Srinagar & Budgam",
      "Hydropower Deficits During Chilai Kalan",
      "Tourism Forecast for Gulmarg & Pahalgam"
    ]
  }
];

export const NOVEMBER_ARTICLES: Article[] = [
  {
    "id": "nov-art-1",
    "slug": "the-red-gold-of-kashmir-saffron-cultivation",
    "title": "The Red Gold of Kashmir: Saffron Cultivation, Global Heritage & Economic Revival",
    "subtitle": "A deep dive into Pampore's historic saffron plateaus, climatic vulnerabilities, GI tagging, and the survival of the world's most precious spice.",
    "category": "Cover Story",
    "author": "The Legends Ink Investigative Desk",
    "authorRole": "Bureau of Agro-Economic Investigations",
    "date": "November 2026",
    "readTime": "9 min read",
    "image": "/november_images/page_17_img_19.jpg",
    "caption": "A blooming purple saffron crocus field in Pampore, Pulwama — the historic center of Kashmir's saffron heritage.",
    "featured": true,
    "isCoverStory": true,
    "pullQuote": "Saffron is not just an agricultural crop for Jammu & Kashmir; it is an epochal identity, a cultural rhythm, and one of the finest gifts of our fertile soil to world commerce.",
    "excerpt": "Kashmir is known across the world for its breathtaking landscapes, rich cultural heritage, traditional handicrafts, and unique agricultural treasures. Among these, Kashmiri saffron holds a special place. Known locally as Kong, this extraordinary spice has been cultivated in the Valley for centuries, earning international acclaim for its deep crimson colour, distinct aroma, and high concentration of safranal and crocin.",
    "content": [
      "Kashmir is known across the world for its breathtaking landscapes, rich cultural heritage, traditional handicrafts, and unique agricultural treasures. Among these, Kashmiri saffron holds a special place. Known locally as Kong, this extraordinary spice has been cultivated in the Valley for centuries, earning international acclaim for its deep crimson colour, distinct aroma, and high concentration of safranal and crocin.",
      "The saffron plateaus of Pampore, nestled on the karewas of South Kashmir, represent one of the very few environments on earth with the precise altitude, soil drainage, and climatic balance required to produce saffron of such legendary potency.",
      "However, climate variability, irregular rainfall patterns, rising production costs, urban encroachment on agricultural karewas, and changing market conditions have made saffron cultivation increasingly challenging over the past two decades. Competition from cheap, adulterated foreign varieties placed severe downward pressure on market prices.",
      "To preserve this delicate heritage, scientific irrigation interventions under the National Saffron Mission, combined with rigorous enforcement of Geographical Indication (GI) certification and laser-etched origin packaging, are helping growers regain trust in global auctions.",
      "For thousands of families across Pulwama and surrounding hamlets, the November harvest remains a celebration of ancestral resilience. Preserving Pampore's saffron heritage is not merely an economic necessity; it is a sacred cultural covenant to safeguard the soul of Kashmir's soil."
    ],
    "tags": [
      "Cover Story",
      "Saffron",
      "Pampore",
      "Agriculture",
      "Kashmir Economy"
    ]
  },
  {
    "id": "nov-art-2",
    "slug": "kashmirs-dying-chinars-soul-of-the-valley",
    "title": "Kashmir’s Dying Chinars: Who Will Save The Soul Of The Valley?",
    "subtitle": "Investigating unchecked felling, bureaucratic delays, pruning controversies, and the urgent race to preserve Kashmir's centuries-old royal trees.",
    "category": "Culture",
    "author": "The Legends Ink Monthly",
    "authorRole": "Environmental & Heritage Bureau",
    "date": "November 2026",
    "readTime": "7 min read",
    "image": "/november_images/page_26_img_30.jpg",
    "caption": "Centuries-old royal Chinar trees in the Kashmir Valley displaying their resplendent autumn foliage amidst urgent conservation appeals.",
    "featured": true,
    "isCoverStory": false,
    "pullQuote": "A tree that has stood for centuries cannot be replaced in a single season by planting saplings. When a Chinar falls, centuries of history fall with it.",
    "excerpt": "There was a time when autumn in Kashmir was incomplete without the breathtaking sight of Chinar leaves turning from amber to fiery scarlet. Known as Booune in Kashmiri, the Chinar has graced royal gardens, village squares, roadside avenues, and shrine courtyards for generations. Today, this iconic symbol of Valley heritage is facing a quiet, agonizing decline.",
    "content": [
      "There was a time when autumn in Kashmir was incomplete without the breathtaking sight of Chinar leaves turning from amber to fiery scarlet. Known as Booune in Kashmiri, the Chinar has graced royal gardens, village squares, roadside avenues, and shrine courtyards for generations. Today, this iconic symbol of Valley heritage is facing a quiet, agonizing decline.",
      "The Chinar is much more than a botanical wonder. It is a living witness to Kashmir's history — sheltering Sufi saints, scholars, traveling caravans, and community elders during evening village assemblies under its majestic canopy.",
      "Over the past three decades, highway expansions, unplanned concrete construction, root asphyxiation from paved sidewalks, and illicit felling under the guise of 'hazardous pruning' have depleted the Chinar census drastically across Srinagar, Anantnag, and Baramulla.",
      "The controversy surrounding Chinar trees at Rani Bagh in Anantnag highlighted public anger over arbitrary branch chopping without qualified arborists present. Environmentalists and citizen watchdogs are demanding strict digital geotagging, public accountability for felling permissions, and penal sanctions for unauthorized felling under the Jammu & Kashmir Preservation of Specified Trees Act.",
      "Protecting the remaining Chinars requires a whole-of-society commitment. We cannot afford to become the generation that stood by while the emerald and crimson canopy of the Valley faded into history."
    ],
    "tags": [
      "Culture",
      "Chinar Trees",
      "Environment",
      "Heritage",
      "Kashmir"
    ]
  },
  {
    "id": "nov-art-3",
    "slug": "kashmirs-silent-fracture-rising-tide-of-divorce",
    "title": "Kashmir’s Silent Fracture: The Rising Tide of Divorce and the Lives Left Behind",
    "subtitle": "An unsparing sociological investigation into economic pressures, domestic conflicts, prolonged litigation, and the quiet dissolution of families across Valley courts.",
    "category": "Social Issues",
    "author": "The Legends Ink Editorial Desk",
    "authorRole": "Social & Legal Investigations",
    "date": "November 2026",
    "readTime": "8 min read",
    "image": "/november_images/page_9_img_13.jpg",
    "caption": "Family court records across Srinagar, Baramulla, and Pulwama reveal an unprecedented surge in matrimonial petitions.",
    "featured": true,
    "isCoverStory": false,
    "pullQuote": "Marriages that once drew strength from joint-family mediation now find themselves untangled in overcrowded court corridors.",
    "excerpt": "In the quiet lanes of Srinagar and the villages of the Valley, a shift is underway that few openly discuss. Marriages that once formed the bedrock of Kashmiri social cohesion are dissolving at rates never before witnessed in the region's modern history.",
    "content": [
      "In the quiet lanes of Srinagar and the villages of the Valley, a shift is underway that few openly discuss. Marriages that once formed the bedrock of Kashmiri social cohesion are dissolving at rates never before witnessed in the region's modern history.",
      "Lawyers and court staff in Baramulla, Pulwama, Anantnag, and Budgam report that the number of formal matrimonial petitions has multiplied by 300 to 400 per cent compared with the early 2000s, when district courts recorded barely 50 to 60 cases annually. More than 60 per cent of these petitions involve couples under the age of 35.",
      "Sociologists point to a compounding matrix of pressures: rampant youth unemployment, crushing dowry and wedding expenditure expectations, rapid social media alienation, psychological distress, and the breakdown of traditional elder-mediated reconciliation committees.",
      "The human toll falls heaviest upon young mothers and children caught in years of acrimonious maintenance battles. While social workers advocate for pre-marital counseling hubs and community arbitration councils, the legal system remains clogged with thousands of unresolved disputes.",
      "Addressing this crisis requires society to move past shame and stigma, engaging in honest communal dialogue about realistic matrimonial expectations, gender equity, and mental health support."
    ],
    "tags": [
      "Social Issues",
      "Family Courts",
      "Divorce Rates",
      "Kashmir Society",
      "Legal Reform"
    ]
  },
  {
    "id": "nov-art-4",
    "slug": "indian-constitution-foundation-of-justice-equality",
    "title": "The Indian Constitution: The Foundation of Justice, Equality and National Progress",
    "subtitle": "Why an informed, constitutionally literate citizenry is the true bedrock of democratic sovereignty and institutional accountability.",
    "category": "Politics",
    "author": "Political Desk, The Legends Ink",
    "authorRole": "Constitutional Affairs Specialist",
    "date": "November 2026",
    "readTime": "6 min read",
    "image": "/november_images/page_5_img_9.jpg",
    "caption": "The Preamble of the Indian Constitution, articulating the eternal commitments to Justice, Liberty, Equality, and Fraternity.",
    "featured": false,
    "isCoverStory": false,
    "pullQuote": "Responsible citizenship begins with understanding that rights and duties are two sides of the same coin.",
    "excerpt": "The Constitution of India is one of the most important documents in the history of our country. It is not simply a legal rulebook for governance; it is a living charter that articulates the vision of a just, equitable, and harmonious republic where every citizen is protected under the law.",
    "content": [
      "The Constitution of India is one of the most important documents in the history of our country. It is not simply a legal rulebook for governance; it is a living charter that articulates the vision of a just, equitable, and harmonious republic where every citizen is protected under the law.",
      "Drafted by the visionary assembly led by Dr. B.R. Ambedkar, the Constitution established universal adult franchise, fundamental rights against discrimination, and directive principles geared towards socioeconomic justice.",
      "Article 51A outlines the Fundamental Duties of citizens — including respecting the Constitution, cherishing the ideals of the freedom struggle, promoting communal harmony, protecting the natural environment, and developing a scientific temper.",
      "In an era marked by rapid legislative changes and public debates over civil liberties, constitutional literacy is the ultimate safeguard against arbitrary power. When citizens know their constitutional rights and conscientiously fulfill their civic duties, democratic institutions flourish."
    ],
    "tags": [
      "Politics",
      "Constitution of India",
      "Democracy",
      "Dr. B.R. Ambedkar",
      "Civic Rights"
    ]
  },
  {
    "id": "nov-art-5",
    "slug": "young-talent-big-dreams-mohsin-reshi-cricket",
    "title": "Young Talent, Big Dreams: Mohsin Reshi Makes His Mark in Cricket",
    "subtitle": "How a Class 6 student of RJ’s International School, Sumbal, earned his place in the prestigious C11CL League match in Jammu.",
    "category": "Sports",
    "author": "The Legends Ink Monthly",
    "authorRole": "Sports & Youth Development Desk",
    "date": "November 2026",
    "readTime": "5 min read",
    "image": "/november_images/page_24_img_28.jpg",
    "caption": "Young cricketing talent Mohsin Reshi proudly posing with cricket equipment representing RJ's International School, Sumbal.",
    "featured": false,
    "isCoverStory": false,
    "pullQuote": "Sports are not merely about winning matches; they are about discipline, character, and daring to dream from small town academies to national arenas.",
    "excerpt": "Sports are not merely about winning trophies; they are about discipline, dedication, perseverance, and building character. Across Jammu & Kashmir, young athletes are demonstrating that with proper training and supportive mentorship, talent from rural hamlets can shine on competitive platforms.",
    "content": [
      "Sports are not merely about winning trophies; they are about discipline, dedication, perseverance, and building character. Across Jammu & Kashmir, young athletes are demonstrating that with proper training and supportive mentorship, talent from rural hamlets can shine on competitive platforms.",
      "One such inspiring story is that of Mohsin Reshi, a Class 6 student of RJ’s International School, Sumbal, Bandipora. Mohsin recently earned selection and participated in a high-intensity C11CL League match held in Jammu.",
      "Balancing academic coursework with rigorous morning practice on turf pitches, Mohsin demonstrated remarkable bowling precision and composure under tournament pressure, earning praise from senior coaches.",
      "His coaches emphasize that education and sports must proceed hand-in-hand. For rural North Kashmir, where grassroots sports infrastructure has long been neglected, youngsters like Mohsin prove that talent is boundless when given opportunity and structured encouragement."
    ],
    "tags": [
      "Sports",
      "Cricket",
      "Young Achievers",
      "Sumbal Bandipora",
      "Youth Inspiration"
    ]
  },
  {
    "id": "nov-art-6",
    "slug": "beyond-borders-indian-pakistani-tennis-stars-itf-title",
    "title": "Beyond Borders: Indian and Pakistani Tennis Stars Win ITF Junior Doubles Title",
    "subtitle": "India's Amrit Vats and Pakistan's Muhammad Yahya join forces at the ITF World Tennis Tour in Djibouti to prove the transcendent power of sportsmanship.",
    "category": "Sports",
    "author": "The Legends Ink Sports Desk",
    "authorRole": "International Sports Bureau",
    "date": "November 2026",
    "readTime": "5 min read",
    "image": "/november_images/page_14_img_16.jpg",
    "caption": "Amrit Vats (India) and Muhammad Yahya (Pakistan) hoisting their ITF Junior Doubles trophy in Djibouti.",
    "featured": false,
    "isCoverStory": false,
    "pullQuote": "On the tennis court, national rivalries dissolved into seamless communication, tactical synergy, and mutual respect.",
    "excerpt": "In a remarkable moment for international junior tennis, India's Amrit Vats and Pakistan's Muhammad Yahya joined forces to win the boys' doubles title at the ITF World Tennis Tour Juniors J30 tournament in Djibouti.",
    "content": [
      "In a remarkable moment for international junior tennis, India's Amrit Vats and Pakistan's Muhammad Yahya joined forces to win the boys' doubles title at the ITF World Tennis Tour Juniors J30 tournament in Djibouti.",
      "Facing formidable international opponents, the subcontinental duo displayed exceptional coordination, court coverage, and tactical poise, defeating Thailand's top-seeded contenders in a nail-biting final tie-break.",
      "Their triumph resonated far beyond the borders of the African venue, sending a powerful message that athletic camaraderie and mutual respect can bridge geopolitical divides.",
      "As both young champions advance on the ITF junior circuit, their victory stands as an enduring testament to the unifying magic of sport."
    ],
    "tags": [
      "Sports",
      "Tennis",
      "ITF Junior Tour",
      "Amrit Vats",
      "Muhammad Yahya"
    ]
  },
  {
    "id": "nov-art-7",
    "slug": "jantar-mantar-and-cjp-when-streets-demand-answers",
    "title": "Jantar Mantar and CJP: When The Streets Demand Answers",
    "subtitle": "Examining digital youth activism, public dissent, police protocols, and the democratic right to peaceful assembly in New Delhi.",
    "category": "Politics",
    "author": "The Editorial Desk",
    "authorRole": "National Affairs & Civil Liberties",
    "date": "November 2026",
    "readTime": "6 min read",
    "image": "/november_images/page_11_img_14.jpg",
    "caption": "Peaceful assemblies and citizens demanding institutional transparency at historic protest grounds in the national capital.",
    "featured": false,
    "isCoverStory": false,
    "pullQuote": "Democracy is not measured solely by ballots cast, but by how respectfully a state listens to citizens peacefully voicing grievance.",
    "excerpt": "Democracy is not measured only by the number of elections held, the speeches delivered by political leaders, or the promises made in manifestos. It is equally defined by whether ordinary citizens have the constitutional space to assemble peacefully and demand answers from those in authority.",
    "content": [
      "Democracy is not measured only by the number of elections held, the speeches delivered by political leaders, or the promises made in manifestos. It is equally defined by whether ordinary citizens have the constitutional space to assemble peacefully and demand answers from those in authority.",
      "The emergence of youth-led movements like CJP, which transitioned from viral social media organizing to organized public gatherings at Delhi's Jantar Mantar, highlights the changing dynamics of civic activism.",
      "While administrative authorities cite traffic regulation and security mandates to enforce designated protest zones, legal scholars emphasize that the right to peaceful assembly cannot be rendered ineffective through excessive bureaucratic barriers.",
      "Striking the balance between public order and democratic dissent remains a core test for any modern constitutional republic."
    ],
    "tags": [
      "Politics",
      "Civil Liberties",
      "Jantar Mantar",
      "Youth Movements",
      "Free Speech"
    ]
  },
  {
    "id": "nov-art-8",
    "slug": "mahatma-gandhi-in-world-literature-non-violence",
    "title": "Mahatma Gandhi in World Literature: When the Pen Met the Power of Non-Violence",
    "subtitle": "How Gandhi’s philosophy of Satyagraha inspired global novelists, Nobel laureates, and civil rights philosophers across continents.",
    "category": "Personality",
    "author": "Special Cultural Correspondent",
    "authorRole": "Literary & Historical Studies",
    "date": "November 2026",
    "readTime": "7 min read",
    "image": "/november_images/page_20_img_22.jpg",
    "caption": "Mahatma Gandhi, whose life and writings on non-violent resistance became a profound global literary and philosophical touchstone.",
    "featured": false,
    "isCoverStory": false,
    "pullQuote": "Gandhi's uncompromising message: technological progress without moral progress is a hazard to human civilization.",
    "excerpt": "Mahatma Gandhi was not merely a political leader of India. He became a global moral archetype whose philosophy of non-violent resistance, Satyagraha, resonated deeply within world literature and international thought.",
    "content": [
      "Mahatma Gandhi was not merely a political leader of India. He became a global moral archetype whose philosophy of non-violent resistance, Satyagraha, resonated deeply within world literature and international thought.",
      "Writers such as Romain Rolland, Leo Tolstoy in their historic correspondence, George Orwell in his critical reflections, and Martin Luther King Jr. in his speeches drew heavily upon Gandhi's synthesis of truth and moral courage.",
      "British historian Arnold Toynbee observed that Gandhi introduced moral accountability into 20th-century political warfare, demonstrating that an unarmed mass movement could challenge colonial might through moral force.",
      "In an era fraught with geopolitical tensions and military posturing, Gandhi’s insights into dialogue, humility, and moral integrity remain as urgent and revolutionary as ever."
    ],
    "tags": [
      "Personality",
      "Mahatma Gandhi",
      "World Literature",
      "Non-Violence",
      "History"
    ]
  },
  {
    "id": "nov-art-9",
    "slug": "anne-carson-nobel-triumph-redefines-literature",
    "title": "Anne Carson: A Nobel Triumph That Redefines The World Of Literature",
    "subtitle": "How the Canadian poet and classicist transformed ancient traditions into an audacious, avant-garde modern literary language.",
    "category": "Personality",
    "author": "Parvaiz Ahmad Reshi",
    "authorRole": "Editor-in-Chief",
    "date": "November 2026",
    "readTime": "6 min read",
    "image": "/november_images/page_30_img_32.jpg",
    "caption": "Celebrated poet and translator Anne Carson, whose boundary-defying literary career has redefined contemporary world poetry.",
    "featured": false,
    "isCoverStory": false,
    "pullQuote": "Carson demonstrates that serious classical scholarship and fearless artistic experimentation can coexist with searing emotional honesty.",
    "excerpt": "The world of literature has a profound reason to celebrate. Canadian poet, essayist, translator, and MacArthur fellow Anne Carson has cemented her place as one of the most innovative and fearless literary minds of our century.",
    "content": [
      "The world of literature has a profound reason to celebrate. Canadian poet, essayist, translator, and MacArthur fellow Anne Carson has cemented her place as one of the most innovative and fearless literary minds of our century.",
      "Combining deep erudition in Ancient Greek literature with radical typographical experimentation, Carson’s works — including 'Autobiography of Red', 'Nox', and 'The Beauty of the Husband' — dismantle rigid genre boundaries between verse, tragedy, and criticism.",
      "Her translations of Euripides and Sappho bring ancient human agony into stark, luminous contemporary focus, capturing the fractures of love, grief, and longing.",
      "For writers and readers in Kashmir and beyond, Carson’s enduring contribution is a reminder that literature is at its most potent when it refuses to conform to sterile conventions and instead dares to speak the unvarnished truth of human experience."
    ],
    "tags": [
      "Personality",
      "Anne Carson",
      "Poetry",
      "Literature",
      "Nobel Prize"
    ]
  },
  {
    "id": "nov-art-10",
    "slug": "world-at-a-crossroads-war-rising-prices-peace",
    "title": "The World At A Crossroads: War, Rising Prices and the Search for Peace",
    "subtitle": "Analyzing geopolitical fragmentation, energy inflation, supply chain bottlenecks, and the urgent imperative for diplomatic dialogue.",
    "category": "Politics",
    "author": "The Legends Ink Editorial Desk",
    "authorRole": "Global Affairs Bureau",
    "date": "November 2026",
    "readTime": "6 min read",
    "image": "/november_images/page_7_img_11.jpg",
    "caption": "International diplomatic corridors and economic summits face escalating geopolitical tests across Eastern Europe and the Middle East.",
    "featured": false,
    "isCoverStory": false,
    "pullQuote": "Military force alone cannot build lasting stability. Meaningful dialogue, respect for sovereignty, and negotiated compromises remain irreplaceable.",
    "excerpt": "The world stands at a critical juncture. While scientific discoveries, digital networks, and artificial intelligence are transforming human life, international conflicts, escalating defense expenditures, and severe cost-of-living spikes are placing immense burdens upon ordinary families across the globe.",
    "content": [
      "The world stands at a critical juncture. While scientific discoveries, digital networks, and artificial intelligence are transforming human life, international conflicts, escalating defense expenditures, and severe cost-of-living spikes are placing immense burdens upon ordinary families across the globe.",
      "From Eastern Europe to the Middle East and maritime trade corridors, armed clashes have disrupted fertilizer shipments, grain exports, and petroleum logistics, driving up domestic food inflation in vulnerable developing nations.",
      "Multilateral institutions like the United Nations face unprecedented friction as polarized blocs weaponize veto powers and economic sanctions.",
      "Sustainable peace cannot be achieved through rhetoric or military escalation. Lasting security demands genuine diplomatic concessions, disarmament accords, and renewed investment in global poverty alleviation and climate resilience."
    ],
    "tags": [
      "Politics",
      "World Affairs",
      "Global Economy",
      "Diplomacy",
      "Peace"
    ]
  },
  {
    "id": "nov-art-11",
    "slug": "beyond-promises-kashmir-deserves-accountability",
    "title": "Beyond Promises: Kashmir Deserves Accountability, Not Excuses",
    "subtitle": "The Legends Ink Editorial: Why democratic governance must translate into verifiable civic delivery, road connectivity, and institutional transparency.",
    "category": "Investigative",
    "author": "Parvaiz Ahmad Reshi",
    "authorRole": "Owner, Publisher & Editor-in-Chief",
    "date": "November 2026",
    "readTime": "5 min read",
    "image": "/november_images/page_3_img_4.jpg",
    "caption": "Editorial dispatch: Demanding transparency and public scrutiny for civic infrastructure across Jammu & Kashmir.",
    "featured": false,
    "isCoverStory": false,
    "pullQuote": "Every passing month brings fresh announcements. The people of Jammu & Kashmir do not need rhetoric; they need clean water, paved roads, and honest answers.",
    "excerpt": "Every passing month brings fresh announcements, political speeches, and administrative promises. Yet for the ordinary citizens living in the towns and villages of Jammu & Kashmir, daily struggles with power outages, delayed infrastructure, and bureaucratic apathy continue unchecked.",
    "content": [
      "Every passing month brings fresh announcements, political speeches, and administrative promises. Yet for the ordinary citizens living in the towns and villages of Jammu & Kashmir, daily struggles with power outages, delayed infrastructure, and bureaucratic apathy continue unchecked.",
      "Whether it is the decade-long stall in footbridges over River Jehlum, erratic smart-meter billing, or the slow pace of hospital specialist deployments, citizens are tired of passing the buck between departments.",
      "The Legends Ink was founded upon a clear editorial pledge: 'Ink That Speaks The Truth. For a Better, Informed Society.' We will continue to hold public officials accountable, audit expenditure of public funds, and amplify the voices of the unheard.",
      "Accountability is not an act of hostility; it is the lifeblood of a healthy, functioning democracy."
    ],
    "tags": [
      "Investigative",
      "Editorial",
      "Governance",
      "Public Accountability",
      "Kashmir"
    ]
  }
];

export const OCTOBER_ARTICLES: Article[] = [

  {
    id: "art-1",
    slug: "young-achievers-of-kashmir-upsc-stars",
    title: "Young Achievers of Kashmir: Quiet Toil, Unyielding Purpose",
    subtitle: "How Suvan Sharma, Sugandha Gupta, Towseef Ahmad Ganaie and Ritika Bhan redefined civil services preparation in the Valley.",
    category: "Education",
    author: "Parvaiz Ahmad Reshi",
    authorRole: "Editor-in-Chief",
    date: "October 16, 2026",
    readTime: "7 min read",
    image: "/cover-young-achievers.png",
    caption: "Suvan Sharma (AIR 148) and the emerging cohort of civil servants transforming public administration from Jammu & Kashmir.",
    featured: true,
    isCoverStory: true,
    pullQuote: "Success in the civil services is not a medal of personal triumph; in Kashmir, it is a generational contract to serve with empathy and transparent accountability.",
    excerpt: "When the Union Public Service Commission released the final merit list for 2026, four names from Jammu & Kashmir echoed through library halls from Bandipora to Jammu: Suvan Sharma (AIR 148), Sugandha Gupta (AIR 207), Towseef Ahmad Ganaie (AIR 254), and Ritika Bhan (AIR 456). Their journey is less about luck and entirely about unrelenting intellectual discipline.",
    content: [
      "In the reading rooms of Jammu University, the public libraries of Srinagar, and study nooks across Bandipora, a profound transformation is quietly underway. It does not advertise itself on billboards or scream through partisan microphones. It is etched into the steady rustle of standard reference manuals, hand-annotated constitution commentaries, and late-night revisions by candlelight during winter power curtailments.",
      "When the Union Public Service Commission published the final rank rolls, Suvan Sharma (AIR 148), Sugandha Gupta (AIR 207), Towseef Ahmad Ganaie (AIR 254), and Ritika Bhan (AIR 456) cemented a historic collective milestone. Their selection is not an isolated flash in the pan; it represents a systemic cultural pivot among Jammu & Kashmir’s youth towards high-stakes meritocracy.",
      "For Towseef Ahmad Ganaie, whose roots in rural South Kashmir meant commuting through uncertain transit corridors and navigating economic hardship, the civil services examination was never merely a job prospect. 'In Jammu & Kashmir,' Towseef reflects in an exclusive conversation with The Legends Ink Monthly, 'an administrator is not a distant bureaucrat behind bulletproof glass. An administrator is often the only accessible bridge between a struggling apple farmer and constitutional entitlement.'",
      "Similarly, Sugandha Gupta (AIR 207) and Ritika Bhan (AIR 456) dismantled long-held prejudices regarding opportunities for women aspirants from the region. Studying with meticulous consistency, their preparation relied heavily on primary research, ethical philosophy, and deep immersion in public administration frameworks.",
      "The Legends Ink Monthly salutes these young minds not with empty hagiography, but by recognizing their standard of discipline. They embody our editorial promise: Real People. Real Issues. Real Change."
    ],
    tags: ["UPSC", "Kashmir Youth", "Education", "Governance", "Cover Story"]
  },
  {
    id: "art-2",
    slug: "omar-abdullah-chief-minister-expectations-delivery",
    title: "Omar Abdullah as Chief Minister: Between Expectations and Delivery",
    subtitle: "Navigating the constitutional tightrope between statehood promises and daily bureaucratic realities.",
    category: "National",
    author: "Fayaz Qureshi",
    authorRole: "Executive Editor",
    date: "October 14, 2026",
    readTime: "9 min read",
    image: "/magazine_images/magazine_photo_04.jpg",
    caption: "Chief Minister Omar Abdullah: navigating governance, statehood expectations, and daily administrative delivery.",
    featured: true,
    pullQuote: "The voters of Jammu & Kashmir did not cast ballots for poetry; they voted for electric meters that don't fabricate bills, hospitals with surgeons, and roads that survive winter.",
    excerpt: "Assuming the leadership of Jammu & Kashmir's elected administration in 2026, Omar Abdullah faces an unprecedented governance matrix. With power distributed across Raj Bhavan and the Civil Secretariat, the mandate demands pragmatism over rhetorical flourishes.",
    content: [
      "The political landscape of Jammu & Kashmir has entered a phase where symbolic grandstanding has ceased to satisfy the electorate. With the 2026 Assembly in full session, Chief Minister Omar Abdullah inherits a polity weary of protracted limbo.",
      "On one hand, the popular mandate expects immediate action on unemployment, restoration of statehood guarantees, rationalization of inflated electricity tariffs, and democratic dignity. On the other hand, the legal apparatus forged post-August 2019 demands constant institutional collaboration with the Lieutenant Governor's secretariat.",
      "Our ground investigation across Ganderbal, Baramulla, and Jammu shows that citizens are evaluating the administration on granular metrics: Has the clearance for local development funds improved? Are school teachers stationed where needed? Is governance transparent or hostage to old political patronage?",
      "To succeed, the Chief Minister must resist the temptation of political grievance-mongering and focus ruthlessly on delivery. In our pages, The Legends Ink Monthly will continue to question both Raj Bhavan and the Civil Secretariat with rigorous facts and zero hostility."
    ],
    tags: ["Omar Abdullah", "J&K Assembly", "Statehood", "Governance", "National", "Politics"]
  },
  {
    id: "art-3",
    slug: "indu-kanwal-chib-public-service-with-purpose",
    title: "Indu Kanwal Chib: Public Service With Purpose",
    subtitle: "A detailed profile of a civil servant whose institutional interventions bridge the citizen-state divide.",
    category: "Interviews",
    author: "Nahida Noor",
    authorRole: "Managing Editor",
    date: "October 12, 2026",
    readTime: "6 min read",
    image: "/magazine_images/magazine_photo_02.jpg",
    caption: "Administrative leadership defined by ground audits and citizen-centric grievance resolution.",
    featured: true,
    pullQuote: "A district officer cannot govern through drone views and digital PowerPoint decks; you must smell the soil, inspect the clinic shelves, and listen without defensive interruptions.",
    excerpt: "Throughout her postings across Jammu and the Valley, Indu Kanwal Chib has established a reputation for unflinching field presence, administrative velocity, and institutional accountability.",
    content: [
      "In an administrative culture often characterized by red tape and protracted bureaucratic memoranda, certain officers demonstrate how leadership can invigorate public faith.",
      "Indu Kanwal Chib’s administrative record highlights the power of systematic listening. Whether addressing rural water access schemes or accelerating school infrastructure upgrades, her approach emphasizes field visits over armchair conferencing.",
      "During an extensive conversation with The Legends Ink Monthly, Chib emphasized: 'The citizen who travels sixty kilometers from a border village does not want to hear about fiscal quarters or departmental bifurcations. They want their pension file moved, their transformer replaced, and their dignity acknowledged.'",
      "This profile documents key reforms she spearheaded in grievance redressal and offers actionable templates for young aspirants entering administrative services."
    ],
    tags: ["Civil Services", "Women in Leadership", "Public Administration"]
  },
  {
    id: "art-4",
    slug: "drugs-in-kashmir-the-battle-is-far-from-over",
    title: "Drugs in Kashmir: The Battle Is Far From Over",
    subtitle: "Inside the narco-trade supply lines, community rehabilitation failures, and the J&K Police crusade.",
    category: "Social Issues",
    author: "Reshi Junaid",
    authorRole: "Bureau Chief",
    date: "October 10, 2026",
    readTime: "11 min read",
    image: "/magazine_images/magazine_photo_15.jpg",
    caption: "The silent epidemic threatening Kashmiri households: investigative audit of rehabilitation facilities.",
    featured: true,
    pullQuote: "If we lose our youth to synthetic opioids, what use are new highway tunnels and flyovers? The war against narcotics is a battle for our very soul as a society.",
    excerpt: "The influx of synthetic heroin and pharmaceutical opioids into North and Central Kashmir has escalated into a societal emergency. While the J&K Police have disrupted key interstate syndicates, lasting victory requires de-stigmatized healthcare and collective community mobilization.",
    content: [
      "Behind the picturesque saffron fields and postcard chinar groves lies an acute, painful tragedy: thousands of young Kashmiri boys and girls trapped in synthetic opioid dependency.",
      "Data gathered by The Legends Ink Monthly from district hospitals in Bandipora, Baramulla, and Srinagar indicates a 340% increase in patient registrations at de-addiction centers over the past four years.",
      "While law enforcement has intensified seizures—attaching properties of major drug peddlers under NDPS provisions—the supply chain mutates rapidly. Cheap pharmaceutical adulterants and dark-web channels pose new hurdles.",
      "More critically, civil society remains immobilized by social stigma. Families conceal addiction until organ failure or financial ruin forces them into the open. We propose a comprehensive civic framework uniting mosques, schools, sports clubs, and healthcare authorities to treat victims with clinical compassion while prosecuting syndicates without quarter."
    ],
    tags: ["Narcotics", "JK Police", "Health", "Social Issues", "Investigation"]
  },
  {
    id: "art-5",
    slug: "sumbal-footbridge-a-decade-of-waiting",
    title: "Sumbal Footbridge: More Than a Decade of Waiting",
    subtitle: "Over the River Jehlum, concrete pillars stand as an expensive monument to stalled public works.",
    category: "Social Issues",
    author: "Parvaiz Ahmad Reshi",
    authorRole: "Editor-in-Chief",
    date: "October 08, 2026",
    readTime: "8 min read",
    image: "/magazine_images/magazine_photo_11.jpg",
    caption: "Unfinished bridge spans over River Jehlum: daily hazard for Sonawari school children.",
    featured: false,
    pullQuote: "For twelve years, children in Nesbal have rowed across swelling winter currents because two spans of concrete remain unbolted.",
    excerpt: "Sanctioned over a decade ago to connect crucial Sonawari hamlets across the River Jehlum, the Sumbal Footbridge project has consumed millions in public funds without a single pedestrian crossing its span.",
    content: [
      "In Nesbal Sumbal, the morning school commute is fraught with peril. Every morning, hundreds of students, elderly residents, and patients must choose between an eight-kilometer circuitous detour or boarding precarious wooden shikaras across the rushing Jehlum waters.",
      "The Sumbal Footbridge was sanctioned with high fanfare in 2013. Twelve years later, skeletal concrete pillars rise from the riverbed like weathered tombstones of departmental apathy.",
      "Our examination of RTI disclosures reveals a saga of repeated contractor defaults, bureaucratic dispute referrals, and uncoordinated utility shifting between the R&B Department and Flood Control authorities.",
      "The Legends Ink Monthly demands an immediate time-bound audit and a fixed commissioning deadline. Accountability is not an abstract virtue; it is the safety of our children."
    ],
    tags: ["Bandipora", "Sumbal", "Infrastructure", "Civic Rights", "Social Issues", "Investigation"]
  },
  {
    id: "art-6",
    slug: "dr-apj-abdul-kalam-the-man-who-taught-a-nation-to-dream",
    title: "Dr. A.P.J. Abdul Kalam: The Man Who Taught a Nation to Dream",
    subtitle: "Reflecting on Kalam's educational philosophy and its enduring resonance for Himalayan students.",
    category: "Culture",
    author: "Milind Champanerkar",
    authorRole: "Associate Editor",
    date: "October 06, 2026",
    readTime: "7 min read",
    image: "/magazine_images/magazine_photo_05.jpg",
    caption: "The power of scientific curiosity: empowering young students in remote mountain schools.",
    featured: false,
    pullQuote: "Dreams are not what you see in your sleep; they are the things that do not let you sleep. For a Kashmiri student, scientific inquiry is the truest liberation.",
    excerpt: "Dr. Kalam’s historic visits to Srinagar and Jammu ignited thousands of young minds. His message of relentless scientific inquiry, self-reliance, and ethical citizenship remains our guiding north star.",
    content: [
      "Whenever the People’s President, Dr. A.P.J. Abdul Kalam, stepped into an auditorium filled with school children, the atmosphere crackled with pure possibility.",
      "He did not lecture from elevated rostrums; he took questions from backbenchers, looked into the eyes of students from remote frontier districts, and asked them what scientific challenges they dreamed of solving.",
      "In Kashmir, where historical disruptions often cast shadows over youth ambitions, Dr. Kalam’s tenet that 'Knowledge makes you great' provided an unshakeable bedrock.",
      "This essay revisits his interactions in Jammu & Kashmir and extracts timeless lessons for our civil services candidates, young coders, and agricultural innovators."
    ],
    tags: ["Dr Kalam", "Education", "Inspiration", "Youth"]
  },
  {
    id: "art-7",
    slug: "article-370-35a-what-did-jk-receive-what-was-paid",
    title: "Article 370 & 35A: What Did J&K and Ladakh Receive, and What Did They Pay?",
    subtitle: "A balanced, data-driven post-mortem on land laws, investment figures, job reservations, and political autonomy.",
    category: "National",
    author: "Aijaz Ahmad",
    authorRole: "Associate Editor",
    date: "October 04, 2026",
    readTime: "12 min read",
    image: "/magazine_images/magazine_photo_12.jpg",
    caption: "The changing constitutional landscape of Jammu & Kashmir: a factual, balance-sheet approach.",
    featured: false,
    pullQuote: "True journalism neither mourns with blind nostalgia nor applauds with uncritical cheer; it lays out the ledger of gains, losses, and constitutional realities.",
    excerpt: "Seven years after the constitutional reorganization of Jammu, Kashmir, and Ladakh, The Legends Ink Monthly compiles an objective, unvarnished balance sheet of economic inflows, job outcomes, domicile protections, and regional anxieties.",
    content: [
      "Few subjects provoke as much visceral debate in modern India as the abrogation of Articles 370 and 35A on August 5, 2019. Yet public discourse remains polarized between celebratory official narratives and lamentations.",
      "In this rigorous 12-page investigation, our editorial desk analyzed primary data from the Reserve Bank of India, J&K Employment Department, industrial licensing boards, and legal records across Srinagar, Jammu, and Leh.",
      "On the ledger of gains: direct central funding for major highway corridors, railway linkage via the Chenab Bridge, central welfare scheme coverage (PMAY, Ayushman Bharat SEHAT), and the removal of regressive provisions against women marrying outside the state.",
      "On the ledger of costs and unaddressed anxieties: the loss of local legislative control over land ownership, severe shrinkage of small business credit, rising unemployment among educated postgraduates, and acute bureaucratic alienation.",
      "Our verdict: statehood restoration and ironclad legislative safeguards for land and local employment are not secessionist demands; they are the indispensable foundation for genuine, durable integration."
    ],
    tags: ["Article 370", "Constitutional Law", "Economy", "Statehood", "Analysis"]
  },
  {
    id: "art-8",
    slug: "junaid-reshi-built-by-discipline-defined-by-achievement",
    title: "Junaid Reshi: Built by Discipline, Defined by Achievement",
    subtitle: "From Bandipora's sports grounds to national acclaim: an inspirational journey of grit.",
    category: "Interviews",
    author: "Fayaz Qureshi",
    authorRole: "Executive Editor",
    date: "October 02, 2026",
    readTime: "5 min read",
    image: "/magazine_images/magazine_photo_07.jpg",
    caption: "Physical stamina, mental fortitude, and youth leadership in North Kashmir.",
    featured: false,
    pullQuote: "Discipline is doing what must be done when nobody is watching, when the ground is frozen, and when defeat feels inevitable.",
    excerpt: "A profile tracing Junaid Reshi’s unwavering journey through athletic discipline, social organizing, and youth mentorship in Bandipora district.",
    content: [
      "In every district, there are individuals who become standard-bearers for their peers not through inheritance, but through sheer work ethic.",
      "Junaid Reshi’s trajectory in Bandipora exemplifies how consistent physical discipline, sportsmanship, and community service form a bulwark against despondency.",
      "Training through harsh Kashmiri winters on frozen turf, his focus never wavered. Today, his initiatives in training local youth for competitive fitness and civil service tests have transformed dozens of lives.",
      "We trace his formative years, his philosophy on mental toughness, and his vision for sports infrastructure along the banks of Wular Lake."
    ],
    tags: ["Sports", "Youth Icon", "Bandipora", "Fitness"]
  },
  {
    id: "art-9",
    slug: "valley-healthcare-tertiary-care-deficits",
    title: "Valley Healthcare at Crossroads: Tertiary Care Deficits & District Clinic Upgrades",
    subtitle: "Why rural patients travel 90 km to SKIMS for basic diagnostics, and the roadmap for health equity.",
    category: "Medical",
    author: "Nahida Noor",
    authorRole: "Managing Editor",
    date: "October 01, 2026",
    readTime: "8 min read",
    image: "/magazine_images/magazine_photo_17.jpg",
    caption: "SKIMS Soura and peripheral hospitals: addressing the referral crisis in Northern Kashmir.",
    featured: false,
    pullQuote: "A healthcare system cannot claim modern excellence when a pregnant mother in Gurez must brave snowbound passes to access an emergency ultrasound.",
    excerpt: "An investigative dossier examining district hospital infrastructure across Baramulla, Anantnag, and Bandipora, spotlighting medical technician shortages, generic drug distribution, and emergency response.",
    content: [
      "In the emergency corridors of Sher-i-Kashmir Institute of Medical Sciences (SKIMS) Soura and SMHS Hospital in Srinagar, the crush of humanity tells an unmistakable story. Over 65 percent of daily outpatient visits originate from peripheral districts where sub-district hospitals and primary health centers remain severely under-equipped.",
      "Our ground audit revealed that while new hospital buildings have been erected with central funds, critical specialists—radiologists, cardiologists, and pediatric intensivists—are in chronic deficit. Diagnostic machines remain idle for months due to tender disputes over maintenance contracts.",
      "The Legends Ink Monthly outlines an urgent three-pillar healthcare doctrine: decentralized telemedicine nodes, mandatory rural service rotations for super-specialty postgraduates, and guaranteed district blood bank refrigeration.",
      "Healing Kashmir begins by ensuring that quality medical care is not a privilege reserved for the capital city."
    ],
    tags: ["Healthcare", "SKIMS", "Medical", "Rural Health", "Hospitals"]
  },
  {
    id: "art-10",
    slug: "himalayan-geopolitics-climate-shift-central-asia",
    title: "The Himalayan Arc: Central Asian Geopolitics & Glacial Retreat in the Karakoram",
    subtitle: "How shifting global supply corridors and melting high-altitude permafrost will reshape Kashmir's future.",
    category: "International",
    author: "Milind Champanerkar",
    authorRole: "Associate Editor",
    date: "September 28, 2026",
    readTime: "10 min read",
    image: "/magazine_images/magazine_photo_08.jpg",
    caption: "The Karakoram and Pir Panjal mountain ranges: frontiers of climate impact and trade geopolitics.",
    featured: false,
    pullQuote: "Kashmir sits not at the periphery of the continent, but at the ancient crossroads of Central, South, and East Asia. What happens to its glaciers dictates the water security of two billion people.",
    excerpt: "Analyzing satellite glaciological data, Central Asian energy corridors, and international climate treaties affecting the Indus River Basin.",
    content: [
      "For centuries, the mountain passes connecting Kashmir to Yarkand, Tashkent, and Kashgar carried silk, paper, saffron, and philosophical thought. Today, new geopolitical architectures and rapid climatic shifts are redefining this vital mountain biome.",
      "Recent remote-sensing surveys over the Siachen and Kolahoi glaciers reveal accelerated glacial melting rates, threatening perennial irrigation flows into the Jhelum and Chenab valleys.",
      "Concurrently, the expansion of regional rail networks and trans-Eurasian transport corridors places Jammu & Kashmir in a strategic pivot. International climate agreements must treat Himalayan ecology as a transboundary urgency rather than a partisan dispute.",
      "This international report combines climatic modeling from international institutes with strategic analysis from Pune and Srinagar foreign affairs scholars."
    ],
    tags: ["Climate Change", "Geopolitics", "International", "Himalayas", "Glaciers"]
  }
];

// Default active articles are the latest November 2026 edition
export const ARTICLES: Article[] = [...NOVEMBER_ARTICLES];

export const NAVIGATION_CATEGORIES = [
  "Home",
  "Social Issues",
  "National",
  "International",
  "Medical",
  "Education",
  "Interviews",
  "Culture",
  "Politics",
  "Cover Story"
] as const;

export type NavigationCategory = typeof NAVIGATION_CATEGORIES[number];
