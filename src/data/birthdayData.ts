export type MissionId = "memory" | "quiz" | "stars" | "secret" | "box";
export type Trigger = MissionId | "start" | "finale";
export type Progress = { xp: number; done: MissionId[]; badges: string[] };

type Mission = { id: MissionId; title: string; teaser: string; emoji: string; xp: number; reward: string };
type Achievement = { id: string; trigger: Trigger; name: string; description: string; emoji: string };
type QuizQuestion = { q: string; options: string[]; correct: number; right: string; wrong: string };

export const birthdayData = {
  siteTitle: "Bauni's Birthday",
  tagline: "One year of friendship, endless nonsense, and a language only we understand.",
  friendName: "Suhani",
  senderName: "Bhangi",
  birthdayLabel: "25th November",
  welcome: {
    greeting: "Hey Bauni.",
    line: "Bhangi made this for you. It has our stories, our nonsense, and a few things I don't say often enough. So go on, Bauni.",
    button: "Let's see",
  },
  dashboard: {
    title: "Your little birthday adventure",
    subtitle: "Five little missions, our kind of memories, one letter, and something waiting at the end.",
    lockedHint: "Finish the other four missions first. Then this one opens.",
    continueButton: "Continue",
    allDoneText: "All missions complete. Okay, now for the part I really wanted you to see.",
  },
  missions: [
    { id: "memory", title: "Memory Match", teaser: "Flip the cards and find every pair.", emoji: "🃏", xp: 100, reward: "The best part of our friendship is that even an ordinary college day becomes a story when we are together." },
    { id: "quiz", title: "The Friendship Quiz", teaser: "Let's see how well you remember our nonsense.", emoji: "🧠", xp: 150, reward: "Your score is safe with me. Your wrong answers, however, will be remembered and brought up at the most inconvenient time." },
    { id: "stars", title: "Catch the Stars", teaser: "Catch as many falling stars as you can.", emoji: "🌠", xp: 150, reward: "We have a talent for turning random plans into stories. I hope we never run out of places to explore." },
    { id: "secret", title: "The Secret Word", teaser: "Read the clues and crack the word.", emoji: "🔐", xp: 200, reward: "Bauni is your name in my dictionary. Bhangi chor is apparently mine in yours. Fair trade, I guess." },
    { id: "box", title: "The Final Mystery Box", teaser: "One last thing is waiting for you.", emoji: "🎁", xp: 250, reward: "You made my birthday feel special with a gift I still remember. This time, let me return a little of that thoughtfulness." },
  ] as Mission[],
  achievements: [
    { id: "first_step", trigger: "start", name: "First Step", description: "You started the birthday adventure.", emoji: "👣" },
    { id: "memory_master", trigger: "memory", name: "Memory Master", description: "You matched every pair.", emoji: "🧩" },
    { id: "friendship_expert", trigger: "quiz", name: "Friendship Expert", description: "You survived Bhangi's quiz.", emoji: "🎓" },
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
      intro: "No studying for this one. Just answer and accept Bhangi's judgement.",
      questions: [
        { q: "What is Mulund, according to Bhangi?", options: ["A suburb of Mumbai", "A village", "A hill station", "A different country"], correct: 1, right: "Correct. Finally, someone understands Bhangi's geography.", wrong: "Wrong. Bhangi's village theory is still going strong. No evidence required." },
        { q: "Who usually says sorry first after a fight?", options: ["Suhani", "Bhangi", "Both at the same time", "Neither. The fight just expires"], correct: 1, right: "Correct. Bhangi's peacekeeping department is always on duty.", wrong: "It's usually Bhangi. Someone has to end the cold war." },
        { q: "Which dogs does Suhani love the most?", options: ["White", "Brown", "Black", "Golden"], correct: 2, right: "Correct. Black dogs have a permanent fan club of one: you.", wrong: "Black dogs! This one should have been easy." },
        { q: "What did Bhangi and Suhani perform together at the college fest?", options: ["A drama", "A group dance", "A singing duet", "A fashion show"], correct: 1, right: "Correct. And there was a solo dance too, with some very important encouragement.", wrong: "It was a group dance. And Suhani was also there cheering Bhangi on for his solo." },
        { q: "What happened on the Bhimashankar bus ride?", options: ["The bus broke down", "Six people threw up", "Everyone fell asleep", "They missed the stop"], correct: 1, right: "Correct. A trip memory that nobody on that bus is likely to forget.", wrong: "Six people got sick on the bus. That ride had its own kind of drama." },
      ] as QuizQuestion[],
      results: [
        { min: 0, title: "Friendship Intern", message: "Bauni, we need to revisit our own stories. This score is suspicious." },
        { min: 40, title: "Solid Sidekick", message: "Not bad. Some details clearly need a little revision." },
        { min: 70, title: "Friendship Pro", message: "Okay, you do remember our adventures. I'll give you that." },
        { min: 100, title: "Friendship Legend", message: "Perfect score! Fine, you know our stories better than I expected." },
      ],
    },
    stars: {
      intro: "Drag your finger (or use the arrow keys) to move the basket. Catch the stars.",
      durationSeconds: 30,
      target: 15,
      winTitle: "Star Collector",
      winMessage: "You caught them all. Now don't let all this winning get to your head.",
      loseMessage: "So close. The stars are clearly avoiding you. Try again?",
    },
    secret: {
      intro: "Tap the letters in the right order to spell the secret word.",
      answer: "BAUNI",
      decoys: "",
      clues: ["It's what Bhangi calls you instead of your real name.", "It's a nickname that stuck.", "It has five letters and starts with B."],
      hints: ["Hint: it starts with the letter B.", "Hint: it ends with the letter I.", "Hint: it's your nickname."],
      successTitle: "Secret unlocked",
      successMessage: "Bauni. Your name, according to Bhangi. No complaints accepted.",
    },
    box: {
      intro: "A little surprise is waiting. You've made it to the end.",
      lockedText: "This box opens after every other mission is complete.",
      tapText: "Tap the box to open it",
      surpriseTitle: "Your Birthday Surprise",
      surpriseMessage: "Your birthday surprise is waiting for you at Siddhivinayak. I wanted to do something thoughtful for you, just like you did for me. Let's make this plan happen properly and add one more memory to our list.",
    },
  },
  timeline: {
    title: "A Few Chapters of Us",
    subtitle: "Not every memory needs a photo. Some just stay with you.",
    next: "On to the fun part",
    entries: [
      { icon: "👋", title: "The FYMCA meeting", date: "October 2025", description: "A foreign guest visited, we got talking, and neither of us knew that one ordinary college meeting would lead to this friendship." },
      { icon: "🛕", title: "That conversation at Babulnath", date: "", description: "That day, the conversation went way beyond ordinary catching up. We spoke openly about life, relationships and things we usually keep to ourselves. It changed how close we felt." },
      { icon: "👟", title: "The Kolhapur surprise", date: "", description: "I mentioned Kolhapuri chappals as a joke, but you remembered and actually brought them for me. It was a small thing, but it showed me how carefully you listen." },
      { icon: "⛰️", title: "Kalsubai and the Maggi break", date: "", description: "You were exhausted and taking slow steps, so I stayed beside you until we reached the top. Then came the well-earned Maggi. Reaching the summit was good; sharing that moment was better." },
      { icon: "💃", title: "The college fest", date: "", description: "We had our group performance, and you cheered me on for my solo too. I still remember how much fun we had around the fest." },
      { icon: "🎂", title: "Your birthday", date: "25th November", description: "One more reason to celebrate you — and hopefully the start of many more places, plans and stories together." },
    ],
  },
  wall: {
    title: "Things Only We Would Understand",
    subtitle: "A few things that probably make sense only to us.",
    next: "Next: something important",
    jokes: [
      { emoji: "🤝", front: "Our official language", back: "\"TeriMaaKi\". Not the most elegant way to communicate, but somehow it works for us." },
      { emoji: "🕵️", front: "Bhangi chor", back: "Apparently that's my full government name now. I would like to appeal, but I know it won't help." },
      { emoji: "🏡", front: "Where does Bauni live?", back: "Mulund. Bhangi's village theory remains undefeated. The court is not accepting new evidence." },
      { emoji: "🍜", front: "The Kalsubai break", back: "A tiring climb somehow becomes a good memory when there's Maggi and the right company." },
    ],
    momentsTitle: "Little Stories I'll Remember",
    moments: [
      { title: "The Little Things", text: "Some of my favourite college moments are the unplanned ones — walking around, talking about absolutely anything, and just having you there. We don't need an elaborate plan to have a good day." },
      { title: "The Kalsubai Climb", text: "You were tired on the climb, so we took it at your pace and made it to the top together. The Maggi afterwards tasted even better because we had earned it." },
      { title: "The Bhimashankar Bus", text: "That Bhimashankar bus ride deserves no explanation beyond this: six people got sick. Somehow, even that became part of our group lore." },
      { title: "Always a Dance Partner", text: "You backed me for my solo dance, and we shared the group performance too. Having you in the crowd and on the stage made the fest more memorable." },
    ],
    teaseButton: "Tease Me",
    teases: [
      "You can be tired, sleepy or distracted, but somehow you still have energy for food.",
      "You call me Bhangi chor like it's written on my ID card.",
      "You can turn a simple plan into a full-day adventure.",
      "You remember the most random things, but somehow still manage to forget the simplest ones.",
    ],
    factButton: "Random Fun Fact",
    facts: [
      "Suhani loves black dogs. This is important information.",
      "Suhani cheered Bhangi on for his solo dance, and they also performed together as a group at the college fest.",
      "The Kolhapuri chappals are proof that Bauni remembers even the random things Bhangi says.",
      "At the Bhimashankar bus ride, six people got sick. Six. That's not a typo.",
    ],
  },
  letter: {
    hint: "A letter is waiting. Tap the envelope.",
    heading: "Something I Wanted You to Know",
    next: "One last thing",
    paragraphs: [
      "Hey Bauni,",
      "It's strange how one year can feel so short and still hold so many memories. We started talking at college, and somewhere along the way you became part of my everyday life. College days genuinely feel different when you are not around — we have become each other's constant without even planning it.",
      "From random outings to the trips we planned, I am glad we kept saying yes to going out and making memories. Some days were exciting, some were tiring, and some were just us roaming around and talking. I would not trade those ordinary moments either.",
      "I haven't forgotten the Mahadev T-shirt you gave me for my birthday. You dropped so many hints that I almost figured it out, but the thought behind it mattered more than the surprise. It was the first time someone had given me a gift like that, so it genuinely meant a lot to me.",
      "I could keep listing moments, but the bigger thing is how comfortable this friendship has become. I can be completely myself around you, without having to think twice about what I say or how I act. That kind of comfort is rare, and I don't take it for granted.",
      "Thank you for trusting me with the things you do not tell everyone, for remembering the little things, and for standing by me. I hope you know that you can count on me too. Our conversations may be full of 'TeriMaaKi' and 'Bhangi chor', but you know how much I value you beneath all that nonsense.",
      "And yes, somehow I am always the one who ends up saying sorry first. Don't let that go to your head. I am just accepting that peace is expensive.",
      "You are my best friend for life, and one of the best things that has happened to me. I want to see you happy, doing well, trying new things and getting everything you work for. And selfishly, I hope we keep making questionable plans, laughing at nonsense and collecting stories for years.",
      "Happy birthday, Bauni. I'm really glad it's you.",
    ],
    placeholders: {} as Record<string, string>,
    signOff: "Always your Bhangi chor,",
  },
  finale: {
    headline: "HAPPY BIRTHDAY, BAUNI!",
    wishText: "Tap the cake to blow out the candles and make a wish",
    wishDone: "Wish made. Now go make it happen.",
    message: "Happy birthday, Suhani! I hope this year brings you happiness, good health, success, good food and plenty of reasons to smile. I hope you get to do the things you dream about and feel proud of how far you have come. Thank you for being my person through college days, random plans, honest conversations and silly fights. Best friend for life. ❤️",
    bonusXp: 100,
    replay: "Relive this adventure",
  },
};
