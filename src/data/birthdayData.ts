export type MissionId = "memory" | "quiz" | "stars" | "secret" | "box";
export type Trigger = MissionId | "start" | "finale";
export type Progress = { xp: number; done: MissionId[]; badges: string[] };

type Mission = { id: MissionId; title: string; teaser: string; emoji: string; xp: number; reward: string };
type Achievement = { id: string; trigger: Trigger; name: string; description: string; emoji: string };
type QuizQuestion = { q: string; options: string[]; correct: number; right: string; wrong: string };

export const birthdayData = {
  siteTitle: "Bauni's Birthday",
  tagline: "One year, a few unforgettable moments, and one very solid friendship.",
  friendName: "Suhani",
  senderName: "Bhangi",
  birthdayLabel: "25th November",

  welcome: {
    greeting: "Hey Bauni.",
    line: "Bhangi made a little something for you. No skipping ahead. Enjoy.",
    button: "Let's see",
  },

  dashboard: {
    title: "Something made for you",
    subtitle: "Five little missions. A few memories. One letter. And a surprise.",
    lockedHint: "Finish the other four missions first. Then this one opens.",
    continueButton: "Continue",
    allDoneText: "You did it. Now comes the part I actually wanted you to see.",
  },

  missions: [
    {
      id: "memory",
      title: "Memory Match",
      teaser: "Flip the cards and find every pair.",
      emoji: "🃏",
      xp: 100,
      reward: "You're one of those people I can talk to without rehearsing what I'm going to say. That's a rare kind of comfort, and I value it.",
    },
    {
      id: "quiz",
      title: "The Friendship Quiz",
      teaser: "A very serious test of your very questionable memory.",
      emoji: "🧠",
      xp: 150,
      reward: "Your score is not going to change anything. You're already a pretty important part of my life. But I will still judge your answers.",
    },
    {
      id: "stars",
      title: "Catch the Stars",
      teaser: "Catch as many falling stars as you can.",
      emoji: "🌠",
      xp: 150,
      reward: "You have a talent for making ordinary days memorable. Even when you're being an absolute menace.",
    },
    {
      id: "secret",
      title: "The Secret Word",
      teaser: "Read the clues and crack the word.",
      emoji: "🔐",
      xp: 200,
      reward: "Some nicknames are just names. This one has a whole friendship attached to it. And yes, it's reserved for you.",
    },
    {
      id: "box",
      title: "The Final Mystery Box",
      teaser: "You've made it this far. There's something waiting.",
      emoji: "🎁",
      xp: 250,
      reward: "The best part isn't the surprise itself. It's getting to celebrate you and make another memory together.",
    },
  ] as Mission[],

  achievements: [
    { id: "first_step", trigger: "start", name: "First Step", description: "You started the birthday adventure.", emoji: "👣" },
    { id: "memory_master", trigger: "memory", name: "Memory Master", description: "You matched every pair.", emoji: "🧩" },
    { id: "friendship_expert", trigger: "quiz", name: "Friendship Expert", description: "You survived Bhangi's extremely biased quiz.", emoji: "🎓" },
    { id: "star_collector", trigger: "stars", name: "Star Collector", description: "You caught the falling stars.", emoji: "⭐" },
    { id: "mystery_solver", trigger: "secret", name: "Mystery Solver", description: "You cracked the secret word.", emoji: "🕵️" },
    { id: "birthday_champion", trigger: "finale", name: "Birthday Champion", description: "You reached the grand finale.", emoji: "👑" },
  ] as Achievement[],

  games: {
    memory: {
      intro: "Flip two cards at a time. Match every pair to win.",
      emojis: ["🎂", "🎁", "🐕", "🍕", "🛕", "🎓", "🏡", "🗳️"],
      winTitle: "Memory Master",
    },

    quiz: {
      intro: "Answer honestly. Bhangi promises to be only slightly judgemental.",
      questions: [
        {
          q: "What is Mulund?",
          options: ["A suburb of Mumbai", "A village", "A hill station", "A different country"],
          correct: 1,
          right: "Correct. You know Bhangi's geography syllabus by now.",
          wrong: "Wrong. Bhangi's official theory is still that Mulund is a village. The debate continues.",
        },
        {
          q: "On the Siddhivinayak plan day, who was ready and waiting at 8 AM?",
          options: ["Suhani", "Bhangi", "The priest", "Nobody"],
          correct: 1,
          right: "Correct. Bhangi was there on time. This achievement deserves a certificate.",
          wrong: "It was Bhangi. Some plans become memories for all the wrong reasons.",
        },
        {
          q: "Which colour of dogs does Suhani love the most?",
          options: ["White", "Brown", "Black", "Golden"],
          correct: 2,
          right: "Correct. Black dogs have a permanent place in your heart.",
          wrong: "Come on, you love black dogs. This one should have been easy.",
        },
        {
          q: "Where did our first conversation happen?",
          options: ["In the canteen", "In the library", "At an FYMCA meeting when a foreign guest visited", "On a train"],
          correct: 2,
          right: "Correct. A random college meeting turned into a friendship neither of us expected.",
          wrong: "It was the FYMCA meeting with the foreign guest. Quite an unexpected beginning.",
        },
        {
          q: "What is Suhani's greatest talent?",
          options: ["Making everyone laugh", "Eating", "Waking up on time", "Remembering every little thing"],
          correct: 1,
          right: "Correct. Her dedication to food is genuinely unmatched.",
          wrong: "Eating. Let's not pretend this was a difficult question.",
        },
      ] as QuizQuestion[],
      results: [
        { min: 0, title: "Friendship Intern", message: "We clearly need to spend more time revising these memories." },
        { min: 40, title: "Solid Sidekick", message: "Not bad. A few details need work, but I'll allow it." },
        { min: 70, title: "Friendship Pro", message: "Okay, you do pay attention sometimes. Impressive." },
        { min: 100, title: "Friendship Legend", message: "Perfect score. You remember more than I expected. Don't get used to the praise." },
      ],
    },

    stars: {
      intro: "Drag your finger (or use the arrow keys) to move the basket. Catch the stars.",
      durationSeconds: 30,
      target: 15,
      winTitle: "Star Collector",
      winMessage: "Small package, unlimited energy. You did it.",
      loseMessage: "So close. The stars are clearly playing hard to get. Try again?",
    },

    secret: {
      intro: "Tap the letters in the right order to spell the secret word.",
      answer: "BAUNI",
      decoys: "",
      clues: [
        "It's what Bhangi calls you instead of your real name.",
        "It's a nickname with its own little story.",
        "It has five letters and starts with B.",
      ],
      hints: [
        "Hint: it starts with the letter B.",
        "Hint: it ends with the letter I.",
        "Hint: it's the nickname only Bhangi gets to use.",
      ],
      successTitle: "Secret unlocked",
      successMessage: "Bauni. Five letters, countless jokes, and a nickname that will always remind me of you.",
    },

    box: {
      intro: "A little surprise is waiting. You've earned the right to open it.",
      lockedText: "This box opens after every other mission is complete.",
      tapText: "Tap the box to open it",
      surpriseTitle: "Your Birthday Surprise",
      surpriseMessage: "Your real gift is waiting for you at Siddhivinayak on your birthday. One more chance to make that plan happen properly. This time, let's both show up and make a good memory.",
    },
  },

  timeline: {
    title: "How One Year Happened",
    subtitle: "A few moments that turned into a friendship I genuinely value.",
    next: "On to the fun part",
    entries: [
      {
        icon: "👋",
        title: "The FYMCA meeting",
        date: "October 2025",
        description: "A foreign guest visited, and somehow that became the beginning of our first conversation. Neither of us knew it would turn into this.",
      },
      {
        icon: "🗳️",
        title: "The CR voting",
        date: "",
        description: "When my CR voting came around, we got a little closer. I went there for a vote and came away with a friendship I didn't see coming.",
      },
      {
        icon: "🎁",
        title: "My birthday gift",
        date: "",
        description: "You gave me a gift nobody had ever given me before. It meant more than I probably managed to express, and I still remember it.",
      },
      {
        icon: "🤝",
        title: "The little everyday moments",
        date: "",
        description: "The random conversations, silly jokes, food talks and all the small things. Somewhere along the way, they became some of my favourite memories.",
      },
      {
        icon: "🎂",
        title: "Your day",
        date: "25th November",
        description: "One year of knowing you. Here's to more memories, more laughter and many more years of this friendship.",
      },
    ],
  },

  wall: {
    title: "Things Only We Would Understand",
    subtitle: "Tap, flip and reveal.",
    next: "Next: something important",
    jokes: [
      {
        emoji: "🏡",
        front: "Where does Bauni live?",
        back: "Mulund. Bhangi's official village theory remains undefeated. No evidence has been accepted so far.",
      },
      {
        emoji: "🕗",
        front: "The legendary 8 AM plan",
        back: "Bhangi was ready. Bauni was asleep. We will leave the rest of this historical investigation closed for now.",
      },
      {
        emoji: "🍕",
        front: "Suhani and food",
        back: "Some people have hobbies. Bauni has a committed, long-term relationship with food.",
      },
      {
        emoji: "🧩",
        front: "Bauni's signature move",
        back: "Fumbling something and then carrying on like nothing happened. Consistency is important.",
      },
    ],
    momentsTitle: "Funny Friendship Moments",
    moments: [
      {
        title: "The Great Ditch",
        text: "One early-morning plan, one person waiting, and one person who apparently had a much stronger relationship with her bed. The plan didn't happen, but the story stayed.",
      },
      {
        title: "The Village Theory",
        text: "Bhangi decided Mulund is a village. Bauni lives in Mulund. According to this extremely questionable logic, the matter is settled.",
      },
      {
        title: "The Food Chronicles",
        text: "You don't need a special occasion to think about food. For you, every day is a food festival waiting to happen.",
      },
    ],
    teaseButton: "Tease Me",
    teases: [
      "You can turn the smallest task into a full adventure. Honestly, impressive.",
      "Your height may be modest, but your confidence clearly didn't get the memo.",
      "You fumble things so often that it has become part of your personal brand.",
      "You can be distracted by almost anything, especially if food is involved.",
    ],
    factButton: "Random Fun Fact",
    facts: [
      "Bauni's love for black dogs is serious business.",
      "Bhangi's Mulund-is-a-village theory has survived every attempt at correction.",
      "This friendship started because of a foreign guest at an FYMCA meeting. Not the most predictable origin story.",
      "A conversation, a CR election and a few ordinary days were enough to start something genuinely special.",
    ],
  },

  letter: {
    hint: "A letter is waiting. Tap the envelope.",
    heading: "Something I Wanted You to Know",
    next: "One last thing",
    paragraphs: [
      "Hey Bauni,",
      "It's been a year since that FYMCA meeting with the foreign guest, where we randomly started talking. I had no idea that one ordinary college day would lead to a friendship that would become this important to me.",
      "We've had our share of random conversations, stupid jokes, teasing, food discussions and moments that probably wouldn't mean much to anyone else. But that's what makes them ours. I genuinely enjoy having someone with whom even the most ordinary day can become memorable.",
      "I tease you about your height, your fumbles, your food obsession and my never-ending Mulund village theory. But jokes aside, I hope you know that I respect you and value the person you are. You don't have to do anything special to earn that. Your presence itself has become something I appreciate.",
      "And about the birthday gift you gave me: I don't think I properly explained how much it meant. Nobody had given me something like that before. I still remember it, and I am genuinely grateful. Some gestures stay with you long after the moment has passed. That was one of them.",
      "I hope this year brings you happiness, good health, success, new experiences and plenty of reasons to smile. I hope you keep being your unapologetically goofy, food-loving self. And I hope we get to make many more memories, including plans that actually happen.",
      "There's a little birthday surprise waiting for you at Siddhivinayak. Consider it my way of making another memory with you. This time, let's make the plan work.",
      "Happy birthday, Bauni. Thank you for becoming such a lovely part of my year. I'm genuinely glad we became friends.",
    ],
    placeholders: {} as Record<string, string>,
    signOff: "Always your friend,",
  },

  finale: {
    headline: "HAPPY BIRTHDAY, BAUNI!",
    wishText: "Tap the cake to blow out the candles and make a wish",
    wishDone: "Wish made. Now go make it happen.",
    message:
      "Happy birthday, Suhani! I hope your day is full of good food, genuine smiles and all the happiness you deserve. Keep being you, keep laughing at my terrible jokes, and please never lose that lovely energy of yours. Here's to more conversations, more adventures and many more years of friendship. Lots of love, Bauni!",
    bonusXp: 100,
    replay: "Relive this adventure",
  },
};
