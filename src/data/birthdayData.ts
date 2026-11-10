export type MissionId = "memory" | "quiz" | "stars" | "secret" | "box";
export type Trigger = MissionId | "start" | "finale";
export type Progress = { xp: number; done: MissionId[]; badges: string[] };

type Mission = { id: MissionId; title: string; teaser: string; emoji: string; xp: number; reward: string };
type Achievement = { id: string; trigger: Trigger; name: string; description: string; emoji: string };
type QuizQuestion = { q: string; options: string[]; correct: number; right: string; wrong: string };

export const birthdayData = {
  siteTitle: "Bauni's Birthday",
  tagline: "One year of friendship, countless little stories, and a lot of 'TeriMaaKi'.",
  friendName: "Suhani",
  senderName: "Bhangi",
  birthdayLabel: "25th November",
  welcome: {
    greeting: "Hey Bauni.",
    line: "Bhangi made this for you. It's full of our nonsense, so obviously you have to go through all of it.",
    button: "Let's see",
  },
  dashboard: {
    title: "Your little birthday adventure",
    subtitle: "Five missions, a few memories, one letter, and a surprise at the end.",
    lockedHint: "Finish the other four missions first. Then this one opens.",
    continueButton: "Continue",
    allDoneText: "All missions complete. Okay, now for the part I really wanted you to see.",
  },
  missions: [
    { id: "memory", title: "Memory Match", teaser: "Flip the cards and find every pair.", emoji: "🃏", xp: 100, reward: "Some of my favourite memories aren't even about doing something big. They're just us spending time together. That's usually enough." },
    { id: "quiz", title: "The Friendship Quiz", teaser: "Let's see how well you remember our nonsense.", emoji: "🧠", xp: 150, reward: "Your score is safe with me. Your wrong answers, however, will be remembered and brought up at the most inconvenient time." },
    { id: "stars", title: "Catch the Stars", teaser: "Catch as many falling stars as you can.", emoji: "🌠", xp: 150, reward: "From random plans to long walks and college days, I'm glad we've said yes to so many little adventures." },
    { id: "secret", title: "The Secret Word", teaser: "Read the clues and crack the word.", emoji: "🔐", xp: 200, reward: "Bauni is your name in my dictionary. Bhangi chor is apparently mine in yours. Fair trade, I guess." },
    { id: "box", title: "The Final Mystery Box", teaser: "One last thing is waiting for you.", emoji: "🎁", xp: 250, reward: "You once made my birthday special in a way I hadn't experienced before. I wanted to make sure you got your own little surprise too." },
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
      { icon: "👋", title: "The FYMCA meeting", date: "October 2025", description: "A foreign guest visited, we started talking, and somehow that random conversation became the beginning of all this." },
      { icon: "🛕", title: "That conversation at Babulnath", date: "", description: "We spoke about everything — life, relationships, personal things and all the stuff you don't usually tell everyone. I think we came back closer than we went." },
      { icon: "👟", title: "The Kolhapur surprise", date: "", description: "I said it jokingly, you actually remembered, and you brought Kolhapuri chappals for me. I don't think you realise how much that small gesture meant." },
      { icon: "⛰️", title: "Kalsubai and the Maggi break", date: "", description: "The climb, the tired legs, the slow steps, the Maggi and all the time spent together. I'm glad we did that trek." },
      { icon: "💃", title: "The college fest", date: "", description: "Our group dance, you cheering me on for my solo performance, and all the fun around the fest. One of those college memories I'll keep." },
      { icon: "🎂", title: "Your birthday", date: "25th November", description: "One more reason to celebrate you — and hopefully the start of many more places, plans and stories together." },
    ],
  },
  wall: {
    title: "Things Only We Would Understand",
    subtitle: "Tap, flip and reveal.",
    next: "Next: something important",
    jokes: [
      { emoji: "🤝", front: "Our official language", back: "\"TeriMaaKi\". Not the most elegant way to communicate, but somehow it works for us." },
      { emoji: "🕵️", front: "Bhangi chor", back: "Apparently that's my full government name now. I would like to appeal, but I know it won't help." },
      { emoji: "🏡", front: "Where does Bauni live?", back: "Mulund. Bhangi's village theory remains undefeated. The court is not accepting new evidence." },
      { emoji: "🍜", front: "The Kalsubai break", back: "A tiring climb somehow becomes a good memory when there's Maggi and the right company." },
    ],
    momentsTitle: "Little Stories I'll Remember",
    moments: [
      { title: "The Little Things", text: "We don't need a big plan every time. Sometimes just being together, roaming around and talking is enough to make a day memorable." },
      { title: "The Kalsubai Climb", text: "You were tired and walking slowly, so I stayed with you and we made it to the top together. The Maggi break was well deserved." },
      { title: "The Bhimashankar Bus", text: "Six people throwing up on one bus ride. Not exactly the highlight anyone planned, but definitely one of the stories we'll remember." },
      { title: "Always a Dance Partner", text: "You encouraged me for my solo dance, and we also did the group performance together. I'm glad you were part of that fest memory." },
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
      "At the college fest, Suhani cheered Bhangi on for his solo dance and they also performed together as a group.",
      "The Kalsubai Maggi break deserves its own appreciation post.",
      "At the Bhimashankar bus ride, six people got sick. Six. That's not a typo.",
    ],
  },
  letter: {
    hint: "A letter is waiting. Tap the envelope.",
    heading: "Something I Wanted You to Know",
    next: "One last thing",
    paragraphs: [
      "Hey Bauni,",
      "It's funny how one year can feel both short and full of memories. We started talking at college, and now I can't really imagine college days, random plans or half our conversations without you being around.",
      "I keep thinking about all the places we've been — National Park, Dadar, Babulnath, Bhimashankar, Kalsubai and all the random places in between. We don't always need a big plan; even ordinary time together somehow turns into a good memory.",
      "I haven't forgotten the Mahadev T-shirt you gave me for my birthday. You dropped so many hints that I almost figured it out, but the thought behind it mattered more than the surprise. It was the first time someone had given me a gift like that, so it genuinely meant a lot to me.",
      "There are plenty of moments I could list — the trek, the fest, the trips and all the random college days — but I think what matters most is that we were there for each other through them. I wouldn't trade those memories for anything.",
      "Thank you for being there, for trusting me with the things you don't tell everyone, and for being someone I can count on. I know we tease each other all the time, and our conversations are not exactly polite with all the 'TeriMaaKi' and 'Bhangi chor'. But underneath all that, you know how much I value you.",
      "And yes, somehow I am always the one who ends up saying sorry first. Don't let that go to your head. I am just accepting that peace is expensive.",
      "You're my best friend for life, and genuinely one of the best things that has happened to me. I hope we keep exploring places, making terrible plans, laughing at nonsense and collecting memories for a very long time.",
      "Happy birthday, Bauni. I'm really glad it's you.",
    ],
    placeholders: {} as Record<string, string>,
    signOff: "Always your Bhangi chor,",
  },
  finale: {
    headline: "HAPPY BIRTHDAY, BAUNI!",
    wishText: "Tap the cake to blow out the candles and make a wish",
    wishDone: "Wish made. Now go make it happen.",
    message: "Happy birthday, Suhani! I hope this year brings you everything you've been wishing for — happiness, good health, success, good food and plenty of reasons to laugh. Thank you for all the random plans, honest conversations, silly fights and memories. Stay exactly the kind of person you are. Best friend for life. ❤️",
    bonusXp: 100,
    replay: "Relive this adventure",
  },
};
