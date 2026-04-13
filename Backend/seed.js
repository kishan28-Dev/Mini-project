require('dotenv').config();
const mongoose = require('mongoose');
const Shlok = require('./models/Shlok');

// A highly curated dataset covering all primary emotions for the presentation
const seedShloks = [
  // --- ANXIETY ---
  {
    emotionCategory: "Anxiety",
    chapter: 2,
    verse: 14,
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत।।",
    transliteration: "mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ | āgamāpāyino ’nityās tāns titikṣhasva bhārata ||",
    meaning: "O son of Kunti, the nonpermanent appearance of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer seasons. They arise from sense perception, and one must learn to tolerate them without being disturbed.",
    practicalSteps: ["Acknowledge that your current anxious feelings are temporary.", "Practice deep breathing when overwhelmed.", "Focus on the present moment, not the uncertain future."],
    dailySuggestion: "Spend 5 minutes observing your thoughts without judgment, watching them pass like clouds."
  },
  {
    emotionCategory: "Anxiety",
    chapter: 18,
    verse: 66,
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।।",
    transliteration: "sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja | ahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ ||",
    meaning: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    practicalSteps: ["Release the need to control everything.", "Trust in a higher power or the natural flow of life.", "Whenever you feel panicked, repeat to yourself: 'I am safe. I let go.'"],
    dailySuggestion: "Write down 3 things you are worried about, physically tear the paper, and let them go."
  },

  // --- DEPRESSION ---
  {
    emotionCategory: "Depression",
    chapter: 6,
    verse: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः।।",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet | ātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ ||",
    meaning: "One must elevate himself by his own mind, not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well.",
    practicalSteps: ["Be kind to yourself; treat yourself as a friend.", "Set one tiny, achievable goal for today to build momentum.", "Speak gently to yourself when making mistakes."],
    dailySuggestion: "Look in the mirror and say one genuinely kind thing to yourself today."
  },
  {
    emotionCategory: "Depression",
    chapter: 2,
    verse: 11,
    sanskrit: "श्रीभगवानुवाच | अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे। गतासूनगतासूंश्च नानुशोचन्ति पण्डिताः।।",
    transliteration: "śhrī bhagavān uvācha: aśhochyān-anvaśhochas-tvaṁ prajñā-vādānśh cha bhāṣhase | gatāsūn-agatāsūnśh-cha nānuśhochanti paṇḍitāḥ ||",
    meaning: "The Supreme Personality of Godhead said: While speaking learned words, you are mourning for what is not worthy of grief. Those who are wise lament neither for the living nor for the dead.",
    practicalSteps: ["Acknowledge your sadness, but do not let it define your entire identity.", "Focus on the eternal nature of your soul.", "Seek connection with loved ones or nature."],
    dailySuggestion: "Take a 10-minute walk outside and focus only on the sounds of nature around you."
  },

  // --- STRESS ---
  {
    emotionCategory: "Stress",
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana | mā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi ||",
    meaning: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    practicalSteps: ["Focus only on the work in front of you right now.", "Stop worrying about grades, promotions, or outcomes.", "Do your best, and mentally detach from the result."],
    dailySuggestion: "Pick your most stressful task today and work on it for 20 minutes without worrying about the outcome."
  },
  {
    emotionCategory: "Stress",
    chapter: 6,
    verse: 35,
    sanskrit: "श्रीभगवानुवाच | असंशयं महाबाहो मनो दुर्निग्रहं चलम्। अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते।।",
    transliteration: "śhrī bhagavān uvācha: asanśhayaṁ mahā-bāho mano durnigrahaṁ chalam | abhyāsena tu kaunteya vairāgyeṇa cha gṛihyate ||",
    meaning: "Lord Krishna said: O mighty-armed son of Kunti, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice and by detachment.",
    practicalSteps: ["Accept that a stressed, wandering mind is normal.", "Bring your focus back to your breath whenever you feel overwhelmed.", "Practice detachment by stepping away from screens for a while."],
    dailySuggestion: "Do a 5-minute breathing exercise: Inhale for 4 seconds, hold for 4, exhale for 6."
  },

  // --- LOW CONFIDENCE ---
  {
    emotionCategory: "Low Confidence",
    chapter: 11,
    verse: 33,
    sanskrit: "तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून्भुङ्क्ष्व राज्यं समृद्धम्। मयैवैते निहताः पूर्वमेव निमित्तमात्रं भव सव्यसाचिन्।।",
    transliteration: "tasmāt tvam uttiṣhṭha yaśho labhasva jitvā śhatrūn bhuṅkṣhva rājyaṁ samṛiddham | mayaivaite nihatāḥ pūrvam eva nimitta-mātraṁ bhava savya-sāchin ||",
    meaning: "Therefore, get up. Prepare to fight and win glory. Conquer your enemies and enjoy a flourishing kingdom. They are already put to death by My arrangement, and you, O Savyasaci, can be but an instrument in the fight.",
    practicalSteps: ["Stand up straight and correct your posture.", "Realize you are meant for greatness and act as an instrument of the divine.", "Take action despite your fear; confidence comes after the action."],
    dailySuggestion: "Do one small thing today that scares you, even if it's just speaking up in a meeting or class."
  },
  {
    emotionCategory: "Low Confidence",
    chapter: 18,
    verse: 78,
    sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः। तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम।।",
    transliteration: "yatra yogeśhvaraḥ kṛiṣhṇo yatra pārtho dhanur-dharaḥ | tatra śhrīr vijayo bhūtir dhruvā nītir matir mama ||",
    meaning: "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality. That is my opinion.",
    practicalSteps: ["Align your goals with righteousness and good intentions.", "Believe that when you do the right thing, the universe supports you.", "Visualize yourself succeeding before you start."],
    dailySuggestion: "Write down 3 of your past achievements to remind yourself of your capabilities."
  },

  // --- ANGER ---
  {
    emotionCategory: "Anger",
    chapter: 2,
    verse: 63,
    sanskrit: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति।।",
    transliteration: "krodhād bhavati sammohaḥ sammohāt smṛiti-vibhramaḥ | smṛiti-bhranśhād buddhi-nāśho buddhi-nāśhāt praṇaśhyati ||",
    meaning: "From anger, complete delusion arises, and from delusion bewilderment of memory. When memory is bewildered, intelligence is lost, and when intelligence is lost one falls down again into the material pool.",
    practicalSteps: ["Walk away from the situation immediately when you feel heat rising.", "Drink a glass of cold water.", "Count backwards from 10 before speaking."],
    dailySuggestion: "If someone irritates you today, pause for 3 full seconds before giving a response."
  },
  {
    emotionCategory: "Anger",
    chapter: 16,
    verse: 21,
    sanskrit: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः। कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्।।",
    transliteration: "tri-vidhaṁ narakasyedaṁ dvāraṁ nāśhanam ātmanaḥ | kāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet ||",
    meaning: "There are three gates leading to this hell—lust, anger, and greed. Every sane man should give these up, for they lead to the degradation of the soul.",
    practicalSteps: ["Recognize that anger ultimately harms you more than the other person.", "Channel your aggressive energy into a physical workout.", "Practice forgiveness as a gift to yourself, not the offender."],
    dailySuggestion: "Write a letter to the person you are angry with expressing everything, then tear it up and throw it away."
  },

  // --- CONFUSION ---
  {
    emotionCategory: "Confusion",
    chapter: 2,
    verse: 7,
    sanskrit: "कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसम्मूढचेताः। यच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे शिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम्।।",
    transliteration: "kārpaṇya-doṣhopahata-svabhāvaḥ pṛichchhāmi tvāṁ dharma-sammūḍha-chetāḥ | yach-chhreyaḥ syānniśhchitaṁ brūhi tanme śhiṣhyaste ’haṁ śhādhi māṁ tvāṁ prapannam ||",
    meaning: "Now I am confused about my duty and have lost all composure because of miserly weakness. In this condition I am asking You to tell me for certain what is best for me. Now I am Your disciple, and a soul surrendered unto You. Please instruct me.",
    practicalSteps: ["Admit that you do not have all the answers right now.", "Seek mentorship or advice from someone wiser than you.", "Take a step back; clarity often comes when you stop forcing it."],
    dailySuggestion: "List the pros and cons of your current dilemma on a piece of paper to get it out of your head."
  },
  {
    emotionCategory: "Confusion",
    chapter: 18,
    verse: 73,
    sanskrit: "अर्जुन उवाच | नष्टो मोहः स्मृतिर्लब्धा त्वत्प्रसादान्मयाच्युत। स्थितोऽस्मि गतसन्देहः करिष्ये वचनं तव।।",
    transliteration: "arjuna uvācha: naṣhṭo mohaḥ smṛitir labdhā tvat-prasādān mayāchyuta | sthito ’smi gata-sandehaḥ kariṣhye vachanaṁ tava ||",
    meaning: "Arjuna said: My dear Krishna, O infallible one, my illusion is now gone. I have regained my memory by Your mercy. I am now firm and free from doubt and am prepared to act according to Your instructions.",
    practicalSteps: ["Trust that confusion is just the step before clarity.", "Commit to a decision and follow it through.", "Quiet your mind; your intuition already knows the answer."],
    dailySuggestion: "Spend 10 minutes in absolute silence today without any music, screens, or books."
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB...");
    
    // Clear the existing data to prevent duplicates
    await Shlok.deleteMany({});
    
    // Insert the new curated data
    await Shlok.insertMany(seedShloks);
    
    console.log(`Database seeded successfully with ${seedShloks.length} verses!`);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });