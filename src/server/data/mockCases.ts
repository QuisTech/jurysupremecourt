export const OFFLINE_CASES = [
  // --- TECH & AI ---
  {
    title: 'The AI Artist',
    scenario:
      'An artist used an AI tool to generate a painting and won a major competition. The runner-up, who painted by hand, claims it is cheating. The rules didn\'t explicitly ban AI, but implied "original creation". The AI artist argues they spent 100 hours refining prompts.',
    evidence: [
      { id: 'e1', label: 'Contest Rules', icon: '📋', text: '"Submit your original creation."' },
      { id: 'e2', label: 'Prompt Log', icon: '⌨️', text: 'Over 5,000 iterations of prompts.' },
      { id: 'e3', label: 'The Painting', icon: '🎨', text: 'It looks weirdly like the judge.' },
    ],
    mockTopComment: { author: 'BrushStroke', text: 'It is a tool, not a talent.', score: 890 },
    verdictOptions: ['Guilty (Cheating)', 'Not Guilty (Innovative)', 'Abstain'],
  },
  {
    title: 'The Lost Bitcoin Password',
    scenario:
      'A man threw away a hard drive with 1,000 Bitcoin in 2010. He now wants to pay the city $10 million to dig up the landfill. Environmentalists say digging up the landfill will release toxic gas. He argues the wealth could fund green energy.',
    evidence: [
      { id: 'e1', label: 'Hard Drive', icon: '💾', text: 'Buried under 10 years of trash.' },
      {
        id: 'e2',
        label: 'City Report',
        icon: '📉',
        text: 'Excavation risks groundwater pollution.',
      },
      { id: 'e3', label: 'Offer Letter', icon: '💰', text: '$10M donation pledged if recovered.' },
    ],
    mockTopComment: {
      author: 'CryptoKing',
      text: 'Let it stay buried. The planet is worth more.',
      score: 1200,
    },
    verdictOptions: ['Dig It Up', 'Keep Buried', 'Abstain'],
  },
  {
    title: 'The Autocorrect Breakup',
    scenario:
      'A boyfriend sent a breakup text that was meant to be a joke, but autocorrect made it look serious. His girlfriend blocked him immediately and moved on. He demands she pay him back for the non-refundable vacation tickets he bought for them next week.',
    evidence: [
      {
        id: 'e1',
        label: 'The Text',
        icon: '📱',
        text: 'Sent: "I want to break up" (Meant: "I want to break cup")',
      },
      { id: 'e2', label: 'Plane Tickets', icon: '✈️', text: '$2,000, non-refundable.' },
      {
        id: 'e3',
        label: 'Blocked Status',
        icon: '🚫',
        text: 'She blocked him on everything instantly.',
      },
    ],
    mockTopComment: {
      author: 'TextRegret',
      text: 'Communication is key. He should have called.',
      score: 450,
    },
    verdictOptions: ['Pay Him Back', 'His Fault', 'Abstain'],
  },

  // --- FAMILY & INHERITANCE ---
  {
    title: 'The Pizza Inheritance',
    scenario:
      'A wealthy grandfather leaves his entire estate to his favorite local pizza place, citing "they were there for me when my family wasn\'t." The family is suing the pizzeria, claiming undue influence and mental instability. The pizza owner says the grandfather was perfectly sane and just really loved pepperoni.',
    evidence: [
      {
        id: 'e1',
        label: 'The Will',
        icon: '📜',
        text: 'Clearly written on a napkin, but notarized.',
      },
      {
        id: 'e2',
        label: 'Medical Record',
        icon: '🩺',
        text: 'Doctor notes: "Patient loves pizza, otherwise healthy."',
      },
      {
        id: 'e3',
        label: 'Family Texts',
        icon: '📱',
        text: 'Grandson text: "Pop-pop is wasting our money on crusts again."',
      },
    ],
    mockTopComment: { author: 'PizzaLover99', text: 'Crust is thicker than blood.', score: 1500 },
    verdictOptions: ['Guilty (Family)', 'Not Guilty (Pizza)', 'Abstain'],
  },
  {
    title: 'The Secret Sibling',
    scenario:
      'A DNA test revealed a secret half-sibling. The biological father wants to welcome them into the family, but the mother (who is not the biological mother of the new child) threatens divorce if he brings "that reminder of infidelity" into their home.',
    evidence: [
      { id: 'e1', label: 'DNA Test', icon: '🧬', text: '99.9% Match.' },
      { id: 'e2', label: 'Marriage Cert', icon: '💍', text: 'Married 30 years.' },
      { id: 'e3', label: 'Child Photo', icon: '📷', text: 'Looks exactly like the father.' },
    ],
    mockTopComment: {
      author: 'FamilyFeud',
      text: 'The child is innocent. The father is the guilty one.',
      score: 2100,
    },
    verdictOptions: ['Welcome Child', 'Respect Mother', 'Abstain'],
  },
  {
    title: 'The Wedding Dress Code',
    scenario:
      'A bride demanded all guests wear beige so she would "pop" in photos. Her sister-in-law wore a light blush pink dress. The bride kicked her out. The family is divided.',
    evidence: [
      { id: 'e1', label: 'Invite', icon: '💌', text: '"Strict Neutral Tones Only."' },
      {
        id: 'e2',
        label: 'The Dress',
        icon: '👗',
        text: 'Very pale pink, arguably beige in dim light.',
      },
      { id: 'e3', label: 'Photo Evidence', icon: '📸', text: 'Bride looks furious in background.' },
    ],
    mockTopComment: {
      author: 'BridezillaWatcher',
      text: "It's a wedding, not a photo shoot.",
      score: 3200,
    },
    verdictOptions: ['Team Bride', 'Team Sister', 'Abstain'],
  },

  // --- NEIGHBOR & PETTY DISPUTES ---
  {
    title: 'The Fence War',
    scenario:
      'Neighbor A built a fence 2 inches onto Neighbor B\'s property 10 years ago. Neighbor B just found out and demands it be torn down. Neighbor A says "adverse possession" means the land is his now.',
    evidence: [
      { id: 'e1', label: 'Survey', icon: '🗺️', text: 'Fence is clearly over the line.' },
      { id: 'e2', label: 'Calendar', icon: '📅', text: 'Fence stood for 12 years unchallenged.' },
      { id: 'e3', label: 'Cost', icon: '💸', text: '$5,000 to move the fence.' },
    ],
    mockTopComment: { author: 'GoodFences', text: 'Rules are rules. Move it back.', score: 670 },
    verdictOptions: ['Tear It Down', 'Keep It', 'Abstain'],
  },
  {
    title: 'The Tree House',
    scenario:
      "A dad built an epic treehouse that overlooks the neighbor's pool. The neighbor claims it invades their privacy. The dad says the tree is on his land and he can build what he wants.",
    evidence: [
      { id: 'e1', label: 'View Photo', icon: '👀', text: 'Direct line of sight into the pool.' },
      { id: 'e2', label: 'Permit', icon: '📝', text: 'City approved the structure.' },
      { id: 'e3', label: 'Kids', icon: '🧒', text: 'They love it and refuse to leave.' },
    ],
    mockTopComment: {
      author: 'PrivacyPlease',
      text: 'Put up some curtains or blinds on the treehouse.',
      score: 500,
    },
    verdictOptions: ['Remove Treehouse', 'Keep Treehouse', 'Abstain'],
  },
  {
    title: 'The Parking Spot',
    scenario:
      'In winter, a man shoveled a public street parking spot for an hour. He put a chair in it to save it ("dibs"). Someone moved the chair and parked there. The shoveler buried their car in snow.',
    evidence: [
      { id: 'e1', label: 'Shovel', icon: '❄️', text: 'Heavy snowfall, hard work.' },
      { id: 'e2', label: 'The Chair', icon: '🪑', text: 'Old plastic lawn chair.' },
      { id: 'e3', label: 'Buried Car', icon: '🚗', text: 'Completely encased in ice.' },
    ],
    mockTopComment: {
      author: 'SnowPatrol',
      text: 'Dibs is sacred. You move the chair, you pay the price.',
      score: 4000,
    },
    verdictOptions: ['Shoveler (Valid Dibs)', 'Parker (Public Road)', 'Abstain'],
  },

  // --- WORKPLACE ---
  {
    title: 'The Lunch Thief',
    scenario:
      'Someone kept stealing specific yogurts from the office fridge. The owner spiked one with extremely hot ghost pepper sauce. The thief had an allergic reaction and had to go to the hospital. HR is firing the lunch owner.',
    evidence: [
      { id: 'e1', label: 'Yogurt', icon: 'ep', text: 'Labeled with name clearly.' },
      { id: 'e2', label: 'Medical Bill', icon: '🏥', text: '$500 ER visit.' },
      { id: 'e3', label: 'HR Handbook', icon: 'book', text: '"Booby traps are prohibited."' },
    ],
    mockTopComment: {
      author: 'SpicyJustice',
      text: "Don't eat food that isn't yours.",
      score: 2200,
    },
    verdictOptions: ['Fire Lunch Owner', 'Fire Thief', 'Abstain'],
  },
  {
    title: 'The Lottery Pool',
    scenario:
      'An office lottery pool won $50,000. One coworker forgot to contribute his $5 that specific week because he was sick. He claims he\'s been in the pool for 5 years and deserves a share. The group says "no pay, no play".',
    evidence: [
      { id: 'e1', label: 'Attendance', icon: '🤒', text: 'Out sick with flu.' },
      { id: 'e2', label: 'History', icon: 'clock', text: 'Paid every week for 5 years.' },
      { id: 'e3', label: 'Rules', icon: 'rules', text: 'Verbal agreement: "Weekly buy-in".' },
    ],
    mockTopComment: { author: 'LottoLuck', text: "Cut him a break. He's a regular.", score: 1100 },
    verdictOptions: ['Give Share', 'Exclude Him', 'Abstain'],
  },

  // --- ETHICAL DILEMMAS ---
  {
    title: 'The Found Wallet',
    scenario:
      'You find a wallet with $500 cash and an ID. The ID belongs to a known local billionaire who is notoriously mean to staff. Do you return the cash or donate it to charity and return just the ID?',
    evidence: [
      { id: 'e1', label: 'Cash', icon: '💵', text: '$500 in twenties.' },
      { id: 'e2', label: 'ID Card', icon: '💳', text: 'Mr. Scrooge, Local Billionaire.' },
      { id: 'e3', label: 'Charity', icon: '❤️', text: 'Local shelter needs exactly $500.' },
    ],
    mockTopComment: {
      author: 'RobinHood',
      text: "He won't miss it. The shelter will save lives.",
      score: 900,
    },
    verdictOptions: ['Return All', 'Donate Cash', 'Abstain'],
  },
  {
    title: 'The Trolley Problem (Actual)',
    scenario:
      'A trolley is heading towards 5 people. You can pull a lever to divert it to a track with one person. That one person is your ex who cheated on you. Do you pull the lever?',
    evidence: [
      { id: 'e1', label: 'Lever', icon: '🕹️', text: 'Rusty but functional.' },
      { id: 'e2', label: '5 Stangers', icon: '👥', text: 'Totally innocent.' },
      { id: 'e3', label: 'The Ex', icon: '💔', text: 'Cheated with your best friend.' },
    ],
    mockTopComment: {
      author: 'EthicsProf',
      text: 'Utilitarianism says pull. Bitterness says... still pull.',
      score: 3000,
    },
    verdictOptions: ['Pull Lever (Save 5)', 'Do Nothing (Save Ex)', 'Abstain'],
  },
  {
    title: 'The Rescued Dog',
    scenario:
      'You found a stray dog, nursed it to health, and bonded for 2 years. The original owner sees you walking it and proves it was their lost dog (microchipped). They want it back. The dog seems happy with you.',
    evidence: [
      { id: 'e1', label: 'Microchip', icon: '💾', text: 'Registered to original owner.' },
      { id: 'e2', label: 'Vet Bills', icon: '⚕️', text: '$3,000 paid by you.' },
      { id: 'e3', label: 'Dog Tail', icon: '🐕', text: 'Wags for both of you.' },
    ],
    mockTopComment: {
      author: 'DogLover',
      text: '2 years is too long. Possession is 9/10ths of the law.',
      score: 1800,
    },
    verdictOptions: ['Keep Dog', 'Return Dog', 'Abstain'],
  },
  {
    title: "The Roommate's Cat",
    scenario:
      "Your roommate neglects their cat (empty water, dirty litter). You start taking care of it. When you move out, you want to take the cat. Roommate says it's theft.",
    evidence: [
      { id: 'e1', label: 'Litter Box', icon: '💩', text: 'Cleaned only by you.' },
      { id: 'e2', label: 'Cat', icon: '🐈', text: 'Sleeps in your bed every night.' },
      { id: 'e3', label: 'Lease', icon: '📄', text: 'Pet deposit paid by roommate.' },
    ],
    mockTopComment: {
      author: 'CatLady',
      text: 'The cat chooses the owner. You are the chosen one.',
      score: 2500,
    },
    verdictOptions: ['Take Cat', 'Leave Cat', 'Abstain'],
  },

  // --- WILD & ABSURD ---
  {
    title: 'The Ghost Toast',
    scenario:
      'A woman claims she saw the face of a celebrity in her toast and sold it on eBay for $1,000. It arrived crumbly. Buyer wants a refund. Seller says "ghosts are fragile".',
    evidence: [
      { id: 'e1', label: 'Toast', icon: '🍞', text: 'Burnt pattern resembling a face.' },
      { id: 'e2', label: 'Shipping', icon: '📦', text: 'Sent in a standard envelope.' },
      {
        id: 'e3',
        label: 'Listing',
        icon: '💻',
        text: '"Sold as is. No refunds on supernatural items."',
      },
    ],
    mockTopComment: {
      author: 'ToastMaster',
      text: 'Should have used bubble wrap for the afterlife.',
      score: 600,
    },
    verdictOptions: ['Refund', 'No Refund', 'Abstain'],
  },
  {
    title: 'The Time Traveler',
    scenario:
      'A man claims he is from 2050 and warns you not to eat the shrimp at the buffet. You eat it and get sick. He demands a "consulting fee" for the warning you ignored.',
    evidence: [
      { id: 'e1', label: 'Outfit', icon: '👕', text: 'Shiny silver jumpsuit.' },
      { id: 'e2', label: 'Shrimp', icon: '🦐', text: 'Looked sketchy.' },
      { id: 'e3', label: 'Bill', icon: '🧾', text: '$50 for "Temporal Advisory Services".' },
    ],
    mockTopComment: {
      author: 'FutureMan',
      text: 'Always listen to the silver jumpsuit guy.',
      score: 800,
    },
    verdictOptions: ['Pay Fee', 'Ignore Him', 'Abstain'],
  },
  {
    title: 'The Wedding Objection',
    scenario:
      'At a wedding, the officiant asked "If anyone objects...". A guest stood up and said "The groom owes me $50." The wedding stopped. Bride is suing the guest for ruining the day.',
    evidence: [
      { id: 'e1', label: 'Debt', icon: '💸', text: 'Groom actually owes him $50.' },
      { id: 'e2', label: 'Timing', icon: '⏱️', text: 'Worst possible moment.' },
      { id: 'e3', label: 'Damages', icon: '😭', text: 'Emotional distress + wasted cake.' },
    ],
    mockTopComment: { author: 'PartyPooper', text: 'Technically, he did object.', score: 1400 },
    verdictOptions: ['Guest Pays', 'Groom Pays', 'Abstain'],
  },
  {
    title: 'The Shared Netflix',
    scenario:
      "You've been using your ex's Netflix for 3 years post-breakup. They finally noticed and changed the password. You are in the middle of a series finale. Is it wrong to text them for the new password just to finish?",
    evidence: [
      { id: 'e1', label: 'History', icon: '📅', text: '3 years of free mooching.' },
      { id: 'e2', label: 'Show', icon: '📺', text: 'Cliffhanger ending.' },
      { id: 'e3', label: 'Breakup', icon: '💔', text: 'Amicable, but distant.' },
    ],
    mockTopComment: {
      author: 'BingeWatcher',
      text: 'Have some dignity. Buy your own sub.',
      score: 1900,
    },
    verdictOptions: ['Text Them', 'Move On', 'Abstain'],
  },
  {
    title: 'The "Unlimited" Buffet',
    scenario:
      'A man was kicked out of an "All You Can Eat" buffet after 4 hours and 15 plates of crab legs. He sues for false advertising.',
    evidence: [
      { id: 'e1', label: 'Sign', icon: '🍽️', text: '"ALL YOU CAN EAT."' },
      { id: 'e2', label: 'Stomach', icon: '🦀', text: 'Bottomless pit.' },
      { id: 'e3', label: 'Manager', icon: '😠', text: '"He is putting us out of business."' },
    ],
    mockTopComment: {
      author: 'HungryHippo',
      text: 'It\'s not "All You Can Eat In An Hour".',
      score: 3500,
    },
    verdictOptions: ['Man is Right', 'Buffet is Right', 'Abstain'],
  },
];
