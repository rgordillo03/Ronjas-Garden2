// ╔══════════════════════════════════════════════════════════════╗
// ║  RONJA'S GARDEN — QUOTE COLLECTION                         ║
// ║                                                              ║
// ║  Edit, add, or remove quotes below.                         ║
// ║  Each quote has: text, author, category                     ║
// ║                                                              ║
// ║  Categories: yoga, mindfulness, ayurveda, psychology,       ║
// ║              motivation, growth, love, personal             ║
// ╚══════════════════════════════════════════════════════════════╝

const QUOTES = [

  // ┌──────────────────────────────────────────┐
  // │  YOGA & MOVEMENT                         │
  // └──────────────────────────────────────────┘
  { text: "The body is your temple. Keep it pure and clean for the soul to reside in.", author: "B.K.S. Iyengar", category: "yoga" },
  { text: "Yoga is not about touching your toes. It is about what you learn on the way down.", author: "Jigar Gor", category: "yoga" },
  { text: "Move your joints every day. You have to find your own tricks. Bury your mind deep in your heart, and watch the body move by itself.", author: "Sri Dharma Mittra", category: "yoga" },
  { text: "The rhythm of the body, the melody of the mind, and the harmony of the soul create the symphony of life.", author: "B.K.S. Iyengar", category: "yoga" },
  { text: "Inhale the future, exhale the past.", author: "Unknown", category: "yoga" },
  { text: "Yoga begins right where I am — not where I was yesterday.", author: "Unknown", category: "yoga" },
  { text: "In the waves of change, we find our true direction.", author: "Unknown", category: "yoga" },
  { text: "Your body exists in the past and your mind exists in the future. In yoga, they come together in the present.", author: "B.K.S. Iyengar", category: "yoga" },

  // ┌──────────────────────────────────────────┐
  // │  MINDFULNESS                             │
  // └──────────────────────────────────────────┘
  { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh", category: "mindfulness" },
  { text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh", category: "mindfulness" },
  { text: "The mind is everything. What you think, you become.", author: "Buddha", category: "mindfulness" },
  { text: "Be where you are, not where you think you should be.", author: "Unknown", category: "mindfulness" },
  { text: "Almost everything will work again if you unplug it for a few minutes. Including you.", author: "Anne Lamott", category: "mindfulness" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman", category: "mindfulness" },
  { text: "Silence is not empty. It is full of answers.", author: "Unknown", category: "mindfulness" },
  { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse", category: "mindfulness" },
  { text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.", author: "Caroline Myss", category: "mindfulness" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha", category: "mindfulness" },

  // ┌──────────────────────────────────────────┐
  // │  AYURVEDA & HEALING                      │
  // └──────────────────────────────────────────┘
  { text: "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.", author: "Ayurvedic Proverb", category: "ayurveda" },
  { text: "Every human being is the author of his own health or disease.", author: "Buddha", category: "ayurveda" },
  { text: "The natural healing force within each of us is the greatest force in getting well.", author: "Hippocrates", category: "ayurveda" },
  { text: "He who has health has hope, and he who has hope has everything.", author: "Arabian Proverb", category: "ayurveda" },
  { text: "Balance is not something you find, it's something you create — in your body, in your plate, in your day.", author: "Unknown", category: "ayurveda" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu", category: "ayurveda" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn", category: "ayurveda" },
  { text: "Healing is a matter of time, but it is sometimes also a matter of opportunity.", author: "Hippocrates", category: "ayurveda" },

  // ┌──────────────────────────────────────────┐
  // │  Favourite Authors                       │
  // └──────────────────────────────────────────┘
  { text: "The only journey is the one within.", author: "Rainer Maria Rilke", category: "mindfulness" },
{ text: "Even on the hardest morning the light finds you. Stand in it. Let it be enough.", author: "original — in the spirit of Mary Oliver", category: "mindfulness" },
{ text: "Go slowly. The flowers do not rush and they are the most beautiful things in the world.", author: "original — in the spirit of Mary Oliver", category: "mindfulness" },
{ text: "The future enters into us long before it happens.", author: "Rainer Maria Rilke", category: "mindfulness" },
{ text: "You are worth finding, worth knowing, worth loving.", author: "Atticus", category: "selflove" },
{ text: "You have been soft and strong in the same breath — do you know how rare that is?", author: "original — in the spirit of Mary Oliver", category: "selflove" },
{ text: "she was not looking for someone to complete her — she had been whole this entire time, just learning the shape of her own edges", author: "original — in the spirit of Atticus", category: "selflove" },
{ text: "she learned to hold herself the way she had always wanted someone else to — and that changed everything", author: "original — in the spirit of Warsan Shire", category: "selflove" },
{ text: "she wore her scars not as wounds but as maps of every hard place she had walked through and survived", author: "original — in the spirit of Atticus", category: "strength" },
{ text: "there is a kind of woman who builds things quietly — herself, first, then everything else", author: "original — in the spirit of Atticus", category: "strength" },
{ text: "she speaks and whole rooms rearrange themselves around her voice — she has always had that kind of power", author: "original — in the spirit of Warsan Shire", category: "strength" },
{ text: "you survived every hard day until now. your record is perfect.", author: "original — in the spirit of Rupi Kaur", category: "strength" },
{ text: "I live my life in widening circles that reach out across the world.", author: "Rainer Maria Rilke", category: "growth" },
{ text: "You must give birth to your images. They are the future waiting to be born.", author: "Rainer Maria Rilke", category: "growth" },
{ text: "You do not just wake up and become the butterfly. Growth is a process.", author: "Rupi Kaur", category: "growth" },
{ text: "she is not too much. the world was just not big enough for what she was becoming.", author: "original — in the spirit of Rupi Kaur", category: "growth" },
{ text: "There is still so much that wants to love you — the morning, the cup of tea, your own two hands.", author: "original — in the spirit of Mary Oliver", category: "healing" },
{ text: "you are allowed to be both the wound and the one who heals it", author: "original — in the spirit of Warsan Shire", category: "healing" },
{ text: "it is okay to need rest — even the sun sets every single night", author: "original — in the spirit of Rupi Kaur", category: "healing" },
{ text: "I want to be with those who know secret things, or else alone.", author: "Rainer Maria Rilke", category: "identity" },
{ text: "You are a girl made of both fire and healing water.", author: "Warsan Shire", category: "identity" },
{ text: "some days she was the storm and some days she was the calm after — but she was always the sky", author: "original — in the spirit of Atticus", category: "identity" },
{ text: "What if you stopped apologizing for taking up space — the oak never asks permission to grow", author: "original — in the spirit of Mary Oliver", category: "feminism" },
{ text: "you came from women who survived. carry that with you on the days you are not sure you will.", author: "original — in the spirit of Warsan Shire", category: "feminism" },
{ text: "your softness is not weakness — it is the most radical thing you have ever offered a world that keeps asking you to harden", author: "original — in the spirit of Warsan Shire", category: "feminism" },
{ text: "the women before you also cried on the bathroom floor and got back up. you come from that.", author: "original — in the spirit of Rupi Kaur", category: "feminism" },
{ text: "Perhaps all the dragons in our lives are princesses who are only waiting to see us act, just once, with beauty and courage.", author: "Rainer Maria Rilke", category: "courage" },
{ text: "Tell me, what is it you plan to do with your one wild and precious life?", author: "Mary Oliver", category: "courage" },
{ text: "she stopped waiting to be chosen and chose herself and that was the bravest thing anyone had ever seen", author: "original — in the spirit of Atticus", category: "courage" },
{ text: "this is not starting over. this is continuing — with everything you now know.", author: "original — in the spirit of Rupi Kaur", category: "courage" },

  
 // ┌──────────────────────────────────────────┐
  // │  PSYCHOLOGY & SELF-KNOWLEDGE             │
  // └──────────────────────────────────────────┘
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", category: "psychology" },
  { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha", category: "psychology" },
  { text: "The curious paradox is that when I accept myself just as I am, then I can change.", author: "Carl Rogers", category: "psychology" },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "psychology" },
  { text: "One does not become enlightened by imagining figures of light, but by making the darkness conscious.", author: "Carl Jung", category: "psychology" },
  { text: "We are not what happened to us. We are what we choose to become.", author: "Carl Jung", category: "psychology" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", category: "psychology" },

  
  // ┌──────────────────────────────────────────┐
  // │  MOTIVATION & STRENGTH                   │
  // └──────────────────────────────────────────┘
  { text: "She remembered who she was and the game changed.", author: "Lalah Delia", category: "motivation" },
  { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush", category: "motivation" },
  { text: "Stars can't shine without darkness.", author: "Unknown", category: "motivation" },
  { text: "The wound is the place where the light enters you.", author: "Rumi", category: "motivation" },
  { text: "What if I fall? Oh, but my darling — what if you fly?", author: "Erin Hanson", category: "motivation" },
  { text: "Be patient with yourself. Nothing in nature blooms all year.", author: "Unknown", category: "motivation" },
  { text: "She believed she could, so she did.", author: "R.S. Grey", category: "motivation" },
  { text: "A flower does not think of competing with the flower next to it. It just blooms.", author: "Zen Shin", category: "motivation" },

  // ┌──────────────────────────────────────────┐
  // │  GROWTH                                  │
  // └──────────────────────────────────────────┘
  { text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.", author: "Alan Watts", category: "growth" },
  { text: "And the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom.", author: "Anaïs Nin", category: "growth" },
  { text: "Not all storms come to disrupt your life — some come to clear your path.", author: "Paulo Coelho", category: "growth" },
  { text: "Become the person who would attract the results you seek.", author: "Jim Cathcart", category: "growth" },
  { text: "We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.", author: "Maya Angelou", category: "growth" },
  { text: "The lotus flower blooms most beautifully from the deepest and thickest mud.", author: "Buddhist Proverb", category: "growth" },

  // ┌──────────────────────────────────────────┐
  // │  RELATIONSHIP & LOVE                     │
  // └──────────────────────────────────────────┘
  { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou", category: "love" },
  { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", category: "love" },
  { text: "Love does not consist of gazing at each other, but in looking outward together in the same direction.", author: "Antoine de Saint-Exupéry", category: "love" },
  { text: "Whatever our souls are made of, his and hers are the same.", author: "Emily Brontë", category: "love" },
  { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu", category: "love" },

  // ┌──────────────────────────────────────────┐
  // │  PERSONAL — FROM YOU ❤️                   │
  // │  Edit these to make them yours!          │
  // └──────────────────────────────────────────┘
  { text: "You are my favorite adventure, and every moment with you feels like coming home.", author: "Your Love", category: "personal" },
  { text: "I fell in love with the way you fall asleep — slowly, then all at once, like the world finally feels safe.", author: "Your Love", category: "personal" },
  { text: "You make the ordinary feel extraordinary. A walk, a coffee, a silence — everything shines with you.", author: "Your Love", category: "personal" },
  { text: "My favorite place in the entire world is right next to you.", author: "Your Love", category: "personal" },
  { text: "Every picture of us is a reminder: life smiled the day I met you.", author: "Your Love", category: "personal" },
  { text: "You are my calm in the chaos, my warmth in the cold, my light in the dark.", author: "Your Love", category: "personal" },
  { text: "I didn't know what home felt like until I found you.", author: "Your Love", category: "personal" },
  { text: "Thank you for being my person — my partner, my peace, my favorite human.", author: "Your Love", category: "personal" },
  { text: "With you, I learned that love isn't just a feeling — it's a garden we grow together, every single day.", author: "Your Love", category: "personal" },
  { text: "Ronja, you are the most beautiful chapter in my story.", author: "Your Love", category: "personal" },
];

export default QUOTES;
