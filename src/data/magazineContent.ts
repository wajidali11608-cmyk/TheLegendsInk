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
  issue: "Issue 03",
  dateMonth: "October 2026",
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
    status: "current",
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
    id: "nov-2026",
    issueNumber: "Issue 04",
    volume: "Volume 01",
    monthYear: "November 2026",
    dateDisplay: "SUNDAY, NOVEMBER 15, 2026",
    title: "THE JEHLUM ARTERIES",
    subtitle: "A Decade Waiting for the Sumbal Footbridge & Forgotten Tributaries",
    editor: "BY RESHI JUNAID",
    coverImage: "/magazine_images/magazine_photo_11.jpg",
    pages: 64,
    price: "Rs. 50",
    status: "upcoming",
    highlights: [
      "Field Audit of Bridge Foundations in Sonawari",
      "Public Expenditure and Contractor Delays",
      "Impact on School Children & Local Orchards"
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

export const ARTICLES: Article[] = [
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
