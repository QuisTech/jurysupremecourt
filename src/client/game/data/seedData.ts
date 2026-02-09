import { CaseData } from '../types';

export const CASES: CaseData[] = [
  {
    id: 0,
    title: "The Office Cookie Thief",
    scenario: "Coworker stealing cookies due to financial struggle.",
    evidence: [
      { id: 'e1', label: 'The Crime', icon: '🍪', text: 'Your coworker has been stealing your homemade cookies from the office fridge for months.' },
      { id: 'e2', label: 'The Evidence', icon: '📹', text: 'You set up a hidden camera and caught them red-handed eating a double-chocolate chip.' },
      { id: 'e3', label: 'The Defense', icon: '🥺', text: 'They apologized, claiming financial struggles and that the cookies were sometimes their only lunch.' }
    ],
    verdictOptions: ["Guilty - Report to HR", "Not Guilty - Forgive them", "Abstain - Too complicated"],
    mockTopComment: {
      author: "OfficeDweller99",
      text: "Stealing is stealing, but reporting them to HR when they're starving? That's nuclear. YTA if you report them without offering help first.",
      score: 1420
    }
  },
  {
    id: 1,
    title: "The Wedding Plus-One",
    scenario: "Sister bringing kid to child-free wedding.",
    evidence: [
      { id: 'e1', label: 'The Rule', icon: '💒', text: 'You have a strict "no kids" rule for your wedding to ensure a formal atmosphere.' },
      { id: 'e2', label: 'The Conflict', icon: '👶', text: 'Your sister says she can\'t come unless she brings her 6-year-old because she can\'t afford a sitter.' },
      { id: 'e3', label: 'The Fallout', icon: '🗣️', text: 'You told her she can\'t come then. Now the family is divided and calling you selfish.' }
    ],
    verdictOptions: ["Guilty - Unreasonable", "Not Guilty - Your Day, Your Rules", "Abstain - Family Drama"],
    mockTopComment: {
      author: "BridezillaHunter",
      text: "It's your wedding, but don't be surprised if relationships are damaged forever. A wedding is a day, family is for life.",
      score: 890
    }
  },
  {
    id: 2,
    title: "The Found Wallet",
    scenario: "Keeping cash from a billionaire's wallet.",
    evidence: [
        { id: 'e1', label: 'The Discovery', icon: '👛', text: 'You found a wallet containing $500 cash and an ID.' },
        { id: 'e2', label: 'The Owner', icon: '🕴️', text: 'The ID belongs to a local billionaire CEO known for unethical business practices and wage theft.' },
        { id: 'e3', label: 'The Action', icon: '💸', text: 'You returned the wallet and ID, but kept the $500 cash as a "finder\'s fee".' }
    ],
    verdictOptions: ["Guilty - Theft is Theft", "Not Guilty - Robin Hood Moment", "Abstain - Karma"],
    mockTopComment: {
      author: "MoralCompass",
      text: "Two wrongs don't make a right. Returning the wallet is good, but stealing the cash undermines the good deed entirely.",
      score: 2100
    }
  },
  {
    id: 3,
    title: "The Cheat Sheet",
    scenario: "Reporting a best friend for cheating.",
    evidence: [
        { id: 'e1', label: 'The Scene', icon: '📝', text: 'During a final exam, you saw your best friend using a cheat sheet.' },
        { id: 'e2', label: 'The Stakes', icon: '🎓', text: 'This exam determines scholarship eligibility. If they fail, they drop out due to costs.' },
        { id: 'e3', label: 'The Dilemma', icon: '🤐', text: 'If you report them, you lose the friendship. If you don\'t, they win unfairly over others.' }
    ],
    verdictOptions: ["Guilty - Report Them", "Not Guilty - Stay Silent", "Abstain - Not My Business"],
    mockTopComment: {
      author: "AcademicIntegrity",
      text: "If they need to cheat to keep the scholarship, they aren't learning the material. But snitching on a best friend? That's a tough line to cross.",
      score: 550
    }
  },
  {
    id: 4,
    title: "The Re-Gifter",
    scenario: "Regifting a gift to the giver's circle.",
    evidence: [
        { id: 'e1', label: 'The Gift', icon: '🎁', text: 'Your aunt gave you an expensive blender for your birthday. You already own one.' },
        { id: 'e2', label: 'The Regift', icon: '♻️', text: 'You gifted the new blender to a mutual friend for their wedding to save money.' },
        { id: 'e3', label: 'The Discovery', icon: '😡', text: 'Your aunt attended the wedding, recognized the blender, and is furious.' }
    ],
    verdictOptions: ["Guilty - Disrespectful", "Not Guilty - Efficient", "Abstain - It's a Blender"],
    mockTopComment: {
      author: "GiftHorse",
      text: "Once a gift is given, it belongs to the receiver. Better it gets used by someone than sits in a closet gathering dust.",
      score: 300
    }
  },
  {
    id: 5,
    title: "The Late Night Drummer",
    scenario: "Noise complaints against a pro musician.",
    evidence: [
        { id: 'e1', label: 'The Neighbor', icon: '🥁', text: 'Your neighbor is a professional drummer practicing daily 6 PM - 9 PM.' },
        { id: 'e2', label: 'The Law', icon: '⚖️', text: 'He is technically within city noise ordinance hours (stops before 10 PM).' },
        { id: 'e3', label: 'The Context', icon: '🌙', text: 'You work night shifts and try to sleep during that time. You filed a formal complaint.' }
    ],
    verdictOptions: ["Guilty - He's Legal", "Not Guilty - He's Rude", "Abstain - Buy Earplugs"],
    mockTopComment: {
      author: "SleepDeprived",
      text: "Legal doesn't always mean considerate. But if he's a pro, that's his job. Maybe try to compromise on a schedule?",
      score: 720
    }
  },
  {
    id: 6,
    title: "The Honest Review",
    scenario: "Giving a friend's business a bad review.",
    evidence: [
        { id: 'e1', label: 'The Favor', icon: '🍔', text: 'Your friend opened a restaurant and asked you to write a 5-star Yelp review to launch it.' },
        { id: 'e2', label: 'The Reality', icon: '🤢', text: 'The food was dry and service was slow. It was frankly terrible.' },
        { id: 'e3', label: 'The Act', icon: '⭐', text: 'You wrote an honest 3-star review instead of the fake 5-star one. They aren\'t speaking to you.' }
    ],
    verdictOptions: ["Guilty - Should have lied", "Not Guilty - Integrity First", "Abstain - Should have posted nothing"],
    mockTopComment: {
      author: "FoodieCritic",
      text: "A fake 5-star review hurts customers. A real 3-star review hurts your friend. The middle ground was probably not reviewing it at all.",
      score: 1100
    }
  }
];
