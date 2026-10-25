/* Business 2025: starting a social media marketing agency (SMMA) from zero.
   Written from the LaunchPad community material (founders' 2025 story, communication modules,
   tech stack and GoHighLevel setup, planning) plus the Vinh Giang and Vanessa Van Edwards
   interview transcripts it links to. Unit 1 defines beginner terms the course assumes you know.
   See classes/_template/content.js for what every field means. */
(function () {

const UNITS = {
  1: 'Agency Basics',
  2: 'The LaunchPad Story',
  3: 'Communication = Sales',
  4: 'Your Voice',
  5: 'Body, Presence & Charisma',
  6: 'Conversations & Daily Reps',
  7: 'Tools & GHL Setup',
  8: 'Planning Your Days'
};

const CARDS = [], QS = [], TF = [], CLOZE = [], MATCH = [], SORTS = [], LISTS = [], HOOKS = [];
const LESSONS = {};

/* ======================================================================
   UNIT 1: Agency Basics (start here if you know nothing)
   ====================================================================== */
LESSONS[1] = { intro: 'Start here if you are at zero. This unit explains what a marketing agency is, how it makes money, and the words the rest of the course uses without explaining. The course itself assumes you already know these.', items: [
  { h: 'What an SMMA is', t: [
    'An **SMMA** (social media marketing agency) is a small business that gets customers for **other** businesses. You run ads and follow-up systems for a business owner, and they pay you.',
    'The people who pay you are your **clients**. The people your ads attract for them are the client\'s **leads** (potential customers).',
    'LaunchPad\'s example **niche** (the one industry they focus on) is **roofing**. A roofing company wants more homeowners asking for roof quotes. The agency runs ads, collects the leads, calls them, and books appointments for the roofer.',
    'Why focus on one niche? You learn one industry deeply, your results become proof for the next client in the same industry, and your pitch gets sharper. LaunchPad picked roofing because the founders had sold roofing door to door.'],
    ex: 'A roofer pays your agency every month. You run ads to homeowners nearby, your system texts and calls each new lead, and appointments show up on the roofer\'s calendar.',
    chk: ['Who is your client, and who is your client\'s lead?', 'The client is the business that pays you (the roofer). The lead is a potential customer of that business (a homeowner).'] },

  { h: 'How an agency makes money', t: [
    'The course mentions several ways clients pay. In plain terms:',
    '- **Retainer**: a fixed fee the client pays every month to keep your service running. The steadiest income.',
    '- **Up-front payment**: money collected at the start, before or as the work begins.',
    '- **Revenue share (revshare)**: instead of paying up front, the client pays you a cut of the results. LaunchPad\'s first clients included two on revshare, so they collected nothing from them at the start.',
    '- **Revenue** (or "collected") is all the money that comes in. **Profit** is what is left after costs (ad tools, software, contractors). **Margin** = Profit / Revenue.',
    'LaunchPad\'s first 6 months: about **$66,000** collected and **$26,000** profit, a margin of about **40%**.'],
    exam: 'Revenue is not profit. In one month LaunchPad collected **$11,025** and profited **$28**. Always ask what is left after costs.',
    chk: ['An agency collects $20,000 in a month and spends $12,000. Profit and margin?', 'Profit $8,000; margin 40%.'] },

  { h: 'The two halves of every agency', t: [
    'Think of your agency as **two parts** that work together:',
    '- **Acquisition**: everything you do to **get clients**.',
    '- **Fulfillment** (also called service delivery): everything you do to **deliver what you promised** those clients.',
    'Each part has a **front end** (direct actions with people) and a **back end** (the systems that support those actions):'],
    tbl: { head: ['', 'Acquisition', 'Fulfillment'], rows: [['Main goal', '**Get clients**', '**Deliver the service**'], ['Front end', 'Direct actions that turn prospects into clients: cold calls, conversations, closing, following up', 'Client-facing actions involved in delivering the service: calling your client\'s leads to book appointments, checking in with the client'], ['Back end', 'Systems and processes that support client acquisition: automations, calendar links', 'Systems and processes that support service delivery: onboarding, building the system, running the ads, connecting leads to the people who call them']] },
    exam: 'The single biggest lesson from LaunchPad\'s first 6 months: **never pause acquisition** to work on fulfillment. You get better at fulfillment by doing it with real clients.',
    chk: ['Building the automation that texts a new lead is front end or back end? Acquisition or fulfillment?', 'Back end. It is fulfillment if it is for a client\'s leads, acquisition if it is for your own prospects.'] },

  { h: 'Getting clients: cold calling and the sales process', t: [
    'LaunchPad got **all** of its first clients from **cold calling**: phoning business owners who do not know you yet.',
    'Words you will hear:',
    '- **Prospect**: a business you would like as a client.',
    '- **Dial**: one call attempt. LaunchPad did **150 dials a day, 6 days a week, for months**.',
    '- **Setting**: booking a meeting. **Closing**: getting the client to say yes and pay. **High-ticket sales**: selling something expensive, which usually needs a real conversation.',
    '- **Strategy call** (closing call): the meeting where you pitch and close.',
    '- **Show-up rate**: how many booked people actually attend.',
    'The process the course sets up in GoHighLevel:',
    '**New prospect → Strategy call → Close deal → Collect payment → Onboarding call.**',
    '**Onboarding** is the call after the sale where you collect everything you need to start delivering.'],
    ex: 'Why so many dials? Volume is how you learn fast. The founder did not know how to close yet; high volume gave the reps to learn closing, booking, and getting people to show up, all at once.',
    chk: ['Put these in order: onboarding call, strategy call, collect payment, new prospect, close deal.', 'New prospect, strategy call, close deal, collect payment, onboarding call.'] },

  { h: 'Systems words: CRM, SOP, outsourcing', t: [
    '- **CRM** (customer relationship manager): software that keeps every lead, conversation, and appointment in one place. **GoHighLevel (GHL)** is the CRM this course uses (Unit 7).',
    '- **Pipeline**: the stages a lead moves through, like the 5-step process above.',
    '- **Automation**: the software doing a step for you (sending a text when a lead comes in).',
    '- **SOP** (standard operating procedure): a written or recorded "how we do this" guide so a task is done the same way every time.',
    '- **Outsourcing**: paying another person or agency to do part of the work. LaunchPad outsourced fulfillment in month 3 so the back-end founder could learn from the experts, which cost a lot of profit.',
    '- **Incorporating**: legally registering your business as a company. The course says you do not need to right away; get **3 to 5 clients** first, and check the rules where you live.'],
    chk: ['What is an SOP for?', 'So a task is done the same way every time, by you or by a team member.'] }
]};

CARDS.push(
  [1, 'SMMA', 'Social media marketing agency: a business that gets customers for other businesses with ads and follow-up systems.'],
  [1, 'Client vs lead', 'Client: the business that pays you. Lead: a potential customer of that business.'],
  [1, 'Niche', 'The one industry you focus on. LaunchPad\'s is roofing.'],
  [1, 'Retainer', 'A fixed fee the client pays every month for your service.'],
  [1, 'Revenue share (revshare)', 'The client pays you a cut of results instead of paying up front.'],
  [1, 'Revenue vs profit', 'Revenue (collected) is all money in. Profit is what is left after costs.'],
  [1, 'Margin', 'Profit / Revenue. LaunchPad\'s first 6 months: about 40%.'],
  [1, 'Acquisition', 'Everything the agency does to get more clients.'],
  [1, 'Fulfillment', 'Everything the agency does to deliver the service it promised clients.'],
  [1, 'Front end vs back end', 'Front end: direct actions with people (calls, closing, check-ins). Back end: systems supporting them (automations, onboarding).'],
  [1, 'Cold calling', 'Phoning business owners who do not know you yet. All of LaunchPad\'s first clients came from it.'],
  [1, 'Dial', 'One call attempt. LaunchPad: 150 a day, 6 days a week.'],
  [1, 'Setting vs closing', 'Setting books the meeting. Closing gets the yes and the payment.'],
  [1, 'Strategy call', 'The sales (closing) call where you pitch and close a prospect.'],
  [1, 'Onboarding', 'After the sale: collecting everything you need to build the system and start delivering.'],
  [1, 'The sales process', 'New prospect → Strategy call → Close deal → Collect payment → Onboarding call.'],
  [1, 'CRM', 'Software that keeps leads, conversations, and appointments in one place. This course uses GoHighLevel.'],
  [1, 'SOP', 'Standard operating procedure: a guide so a task is done the same way every time.'],
  [1, 'When to incorporate', 'Not right away. The course suggests after 3 to 5 clients; check local rules.']
);

QS.push(
  [1, 'Your agency runs ads for a roofing company. The homeowners who respond are:', ['your client\'s leads', 'your clients', 'your prospects', 'your team'], 'The roofer is the client; homeowners are the roofer\'s leads.'],
  [1, 'An agency collects $11,025 in a month and profits $28. What does that show?', ['Revenue is not profit', 'The agency had no clients', 'Margin was 100%', 'Retainers are bad'], 'That was LaunchPad\'s month 5. Costs ate almost everything.'],
  [1, 'Which is acquisition work?', ['Cold calling business owners', 'Running a client\'s ads', 'Onboarding a new client', 'Calling a client\'s leads to book roof quotes'], 'Acquisition gets you clients; the others deliver the service.'],
  [1, 'Which is back-end fulfillment work?', ['Onboarding a client to get the information to build their system', 'Closing a strategy call', 'Following up with a prospect', 'Cold calling'], 'Back end builds the system; fulfillment serves a client.'],
  [1, 'What comes right after "close deal" in the course\'s sales process?', ['Collect payment', 'Onboarding call', 'Strategy call', 'New prospect'], 'Prospect → strategy call → close → collect payment → onboarding.'],
  [1, 'A client pays you a cut of results instead of paying up front. That is:', ['revenue share', 'a retainer', 'an onboarding fee', 'profit'], 'Two of LaunchPad\'s first three clients were revshare.'],
  [1, 'Revenue $20,000, costs $12,000. Margin:', ['40%', '60%', '$8,000', '20%'], '$8,000 / $20,000.'],
  [1, 'Why did LaunchPad do 150 dials a day early on?', ['Volume gave the reps to learn closing and booking fast', 'Each dial earned money', 'Their software required it', 'To avoid learning fulfillment'], 'High volume is the fastest way to learn.'],
  [1, 'When does the course suggest thinking about incorporating?', ['After about 3 to 5 clients', 'Before your first call', 'Never', 'After $1 million in revenue'], 'It costs money; it also depends on your country.']
);

TF.push(
  [1, `Revenue and profit mean the same thing.`, false, `Profit is what is left after costs.`],
  [1, `Onboarding happens before you close the deal.`, false, `It is the call after the client pays.`],
  [1, `LaunchPad got all of its first clients from cold calling.`, true, `"All of this came from cold calling."`],
  [1, `A niche is the one industry your agency focuses on.`, true, `LaunchPad's niche is roofing.`],
  [1, `You must incorporate before you can take your first client.`, false, `The course says you can wait until you have a few clients; check local rules.`]
);

CLOZE.push(
  [1, `Everything an agency does to get clients is called ___.`, [`acquisition`]],
  [1, `Delivering the service you promised is called ___.`, [`fulfillment`, `fulfilment`, `service delivery`]],
  [1, `A fixed monthly fee a client pays is a ___.`, [`retainer`]],
  [1, `Profit / Revenue = ___.`, [`margin`, `profit margin`]],
  [1, `The call after the sale, to collect what you need to start, is the ___ call.`, [`onboarding`]]
);

MATCH.push(
  [1, `Acquisition`, `Getting clients`],
  [1, `Fulfillment`, `Delivering the service`],
  [1, `Retainer`, `Monthly fee`],
  [1, `Revshare`, `Cut of results`],
  [1, `CRM`, `Keeps leads in one place`],
  [1, `SOP`, `How-we-do-it guide`],
  [1, `Niche`, `One industry you serve`]
);

SORTS.push(
  { u: [1], title: `Acquisition or fulfillment?`, b: [`Acquisition`, `Fulfillment`], items: [[`Cold calling a roofing company`, 0], [`Running ads for a client`, 1], [`Following up with a prospect`, 0], [`Calling a client's leads to book appointments`, 1], [`Closing a strategy call`, 0], [`Onboarding a new client`, 1], [`Checking in with a client`, 1], [`Building your own calendar link for strategy calls`, 0]] },
  { u: [1], title: `Front end or back end?`, b: [`Front end`, `Back end`], items: [[`Cold calls`, 0], [`Automations`, 1], [`Closing`, 0], [`Calendar links`, 1], [`Calling a client's leads`, 0], [`Onboarding to collect build information`, 1], [`Checking in with a client by phone`, 0]] }
);

LISTS.push(
  { u: [1], title: `The five steps of the sales process`, items: [[`New prospect`, [`prospect`]], [`Strategy call`, [`strategy`]], [`Close deal`, [`close`]], [`Collect payment`, [`payment`, `collect`]], [`Onboarding call`, [`onboard`]]] }
);

HOOKS.push(
  { u: 1, t: `The two halves of an agency`, h: `Get them, then serve them.`, w: `**Acquisition** gets clients. **Fulfillment** serves them. Each has a front end (talking to people) and a back end (systems).` },
  { u: 1, t: `The sales process`, h: `Prospect, Pitch, Close, Cash, Kickoff.`, w: `New **prospect** → strategy call (**pitch**) → **close** the deal → collect payment (**cash**) → onboarding call (**kickoff**).` }
);

/* ======================================================================
   UNIT 2: The LaunchPad Story and First 6 Months
   ====================================================================== */
LESSONS[2] = { intro: 'Who is teaching you, what their first six months really looked like, and the mistakes they want you to skip. Also how to get the most out of the community.', items: [
  { h: 'Who LaunchPad are', t: [
    '**June 2024**: the two founders, Amber and Noah, met at a door-to-door sales office selling TELUS internet and phone plans in Canada.',
    '**Summer to winter 2024**: they knocked doors from -40°C to +50°C, and learned to sell, recruit, interview, train, and lead sales teams of about 10 people.',
    '**Late 2024**: they became door-to-door sales managers at a roofing company, building the pitch, offer, and systems from scratch on **pure commission**.',
    '**The realization**: why work 10 to 14 hour days on commission building someone else\'s business when you could build your own?',
    '**January 2025**: LaunchPad was born. They niched into **roofing** because they knew it.',
    'Their promise: everything they teach is what they are actively using, and they share everything they know (the "Hormozi method" of not gatekeeping).'],
    chk: ['Why did LaunchPad pick roofing?', 'The founders had sold roofing door to door and built roofing sales systems.'] },

  { h: 'The first 6 months, month by month', t: [
    'All of this came from **cold calling**: about 150 dials a day, 6 days a week.'],
    tbl: { head: ['Month', 'Collected', 'Profit', 'What happened'], rows: [
      ['1 (March)', '$939', '$469', 'Closed 3 clients; 2 were revenue share, so only one paid up front'],
      ['2', 'about $4,000', '$2,959', 'Kept dialing, still learning to close'],
      ['3', '$11,613', 'very low', 'Outsourced fulfillment to another agency that taught them as it worked'],
      ['4', '$17,369', '$8,616', 'Growing; "we\'ve made it"'],
      ['5', '$11,025', '$28', 'Paused acquisition to fix fulfillment; lost retainers anyway'],
      ['6', '$21,467', '$13,481', 'Locked in with lessons learned; momentum'],
      ['Total', 'about $66,000', 'about $26,000', 'Margin about 40%']] },
    ex: 'It was not a straight line up. Before month 1 they spent about **two months "getting ready"** without calling. Looking back, the founder says they could have started cold calling on the **third day**.',
    chk: ['What happened in month 5 and why?', 'They paused acquisition to improve fulfillment, lost retainers, and profited $28.'] },

  { h: 'The three big lessons', t: [
    '- **Start sooner.** They lost two months "learning" before dialing. You can learn while doing.',
    '- **Never pause acquisition to learn fulfillment.** You learn fulfillment through reps with real clients. If you are honest and transparent with clients about where you are, it is not a problem.',
    '- **Outsourcing to learn costs profit.** Month 3 brought in $11,613 but almost no profit because another agency did the work while teaching them. The founder does not regret it, but know the price.',
    'Their belief: you can go further than they did in 6 months just by skipping their mistakes. It takes lots of action and consistency.'],
    exam: 'If you remember one line from this unit: "You don\'t pause acquisition to learn fulfillment."',
    chk: ['Why does the course say not to pause acquisition?', 'You learn fulfillment through reps with real clients, and pausing kills income (month 5: $28 profit).'] },

  { h: 'How to use the community', t: [
    'Three things to get the most value:',
    '- **Go to the calendar** and find the **Launch Lab** sessions: weekly live calls (about 60 to 90 minutes) with specific lessons and Q&A.',
    '- **Learn the classroom.** It is numbered. Go **one module at a time** and implement before moving on. Do **not** watch everything first and act later.',
    '- **Be active**: post, ask questions, DM members, use the **map** to find people near you. **Your environment is everything.** If no entrepreneurs are around you in person, find them online.',
    'The classroom has **checkpoints** ("do not continue yet") with **missions** you must finish first. If you already started an agency, the missions you have done tell you where to start.',
    'The course also covers life outside work (team, hobbies like juggling, a mindset vault). The goal: financial freedom, location freedom, and freedom to choose the life you want.'],
    chk: ['What is wrong with watching the whole classroom before doing anything?', 'The course is built to learn, then implement, one module at a time. Checkpoints require missions before continuing.'] }
]};

CARDS.push(
  [2, 'LaunchPad founders\' background', 'Door-to-door sales (TELUS), then roofing sales managers, building sales systems on pure commission.'],
  [2, 'When LaunchPad started', 'January 2025.'],
  [2, 'First 6 months totals', 'About $66,000 collected, $26,000 profit, about 40% margin.'],
  [2, 'Where all early clients came from', 'Cold calling: about 150 dials a day, 6 days a week.'],
  [2, 'Month 3 lesson', 'Outsourcing fulfillment to learn from another agency brought revenue ($11,613) but very little profit.'],
  [2, 'Month 5 lesson', 'Pausing acquisition to fix fulfillment: lost retainers, $11,025 collected, $28 profit.'],
  [2, 'Biggest regret', 'Spending about two months "getting ready" instead of cold calling from day three.'],
  [2, 'Launch Lab', 'Weekly live session (about 60 to 90 minutes) with lessons and Q&A.'],
  [2, 'Checkpoint', 'A "do not continue yet" stop in the classroom with missions to complete first.'],
  [2, 'Why be active in the community', 'Your environment is everything; if there are no entrepreneurs near you, find them online.'],
  [2, 'How to go through the classroom', 'One numbered module at a time: learn, then implement, then continue.']
);

QS.push(
  [2, 'Roughly how much did LaunchPad collect in its first 6 months?', ['$66,000', '$26,000', '$21,467', '$150,000'], '$26,000 was the profit.'],
  [2, 'Which month had $11,025 collected and $28 profit?', ['Month 5, when they paused acquisition', 'Month 1', 'Month 3, when they outsourced', 'Month 6'], 'Pausing acquisition cost them retainers and income.'],
  [2, 'Why was month 3 profit so low despite $11,613 collected?', ['They paid another agency to do fulfillment while teaching them', 'All clients were on revenue share', 'They stopped cold calling', 'They refunded clients'], 'Outsourcing to learn costs profit.'],
  [2, 'What does the founder say they should have done in the first two months?', ['Start cold calling on about day three', 'Take more courses', 'Incorporate first', 'Build a website first'], 'They spent too long getting ready.'],
  [2, 'How should you move through the classroom?', ['One module at a time, implementing before continuing', 'Watch everything, then start', 'Skip to scaling', 'Only attend live calls'], 'Checkpoints and missions enforce this.'],
  [2, 'What are Launch Lab sessions?', ['Live group calls with lessons and Q&A', 'Paid one-on-one coaching', 'A software tool', 'A cold-call script'], 'Find them in the community calendar.'],
  [2, 'The founders met while:', ['selling TELUS products door to door', 'working at a marketing agency', 'studying business at university', 'running ads for roofers'], 'June 2024, at a door-to-door office.'],
  [2, 'The course\'s answer to "should I pause getting clients so I can learn delivery first?"', ['No. Learn fulfillment by continuing to acquire, and be honest with clients', 'Yes, until you are an expert', 'Only if you have a team', 'Yes, for one month'], 'That was their most expensive lesson.']
);

TF.push(
  [2, `LaunchPad's growth was a straight line up.`, false, `Month 5 dropped to $28 of profit.`],
  [2, `LaunchPad started cold calling on day one.`, false, `They spent about two months getting ready first, and regret it.`],
  [2, `It's okay to keep acquiring clients while you're still learning fulfillment, if you are transparent with clients.`, true, `That is the course's main lesson.`],
  [2, `You should watch the whole classroom before taking any action.`, false, `Learn one module, implement, then continue.`],
  [2, `LaunchPad's first-6-month margin was about 40%.`, true, `About $26,000 of $66,000.`]
);

CLOZE.push(
  [2, `"You don't pause ___ to learn fulfillment."`, [`acquisition`]],
  [2, `LaunchPad started in January ___.`, [`2025`]],
  [2, `The weekly live community sessions are called Launch ___.`, [`lab`]],
  [2, `A stop in the classroom that requires missions first is a ___.`, [`checkpoint`]]
);

MATCH.push(
  [2, `Month 1`, `3 clients, $939 collected`],
  [2, `Month 3`, `Outsourced to learn`],
  [2, `Month 5`, `Paused acquisition, $28 profit`],
  [2, `Month 6`, `$21,467 collected`],
  [2, `Launch Lab`, `Weekly live Q&A`],
  [2, `Checkpoint`, `Missions before continuing`]
);

LISTS.push(
  { u: [2], title: `Three things to do in the community`, items: [[`Find Launch Lab sessions in the calendar`, [`launch lab`, `calendar`, `live`]], [`Learn how the classroom works`, [`classroom`, `navigate`]], [`Be active and engaged`, [`active`, `engage`, `post`, `community`]]] },
  { u: [2], title: `LaunchPad's three big lessons`, items: [[`Start sooner`, [`start`, `sooner`, `day three`, `getting ready`]], [`Never pause acquisition to learn fulfillment`, [`pause`, `acquisition`]], [`Outsourcing to learn costs profit`, [`outsourc`]]] }
);

HOOKS.push(
  { u: 2, t: `Month 5`, h: `Stop dialing, stop eating.`, w: `Pausing acquisition to work on fulfillment dropped LaunchPad to **$28** of profit. Keep acquiring; learn fulfillment through reps.` }
);

/* ======================================================================
   UNIT 3: Communication = Sales
   ====================================================================== */
LESSONS[3] = { intro: 'The founder\'s biggest claim: if you want to get better at sales, get better at communication first. This unit explains why, and who to study.', items: [
  { h: 'Sales is a transfer of belief', t: [
    '**Sales is simply a transfer of belief, emotion, and energy onto another person.**',
    'The only difference between salespeople is their **level of delivery**, and delivery comes down to communication skills.',
    'Business owners do not want to talk to a salesperson. They want to talk to **a human being who genuinely understands their problem and has the resources to help**. They have to **like you as a person** to buy from you.',
    'In door-to-door, everyone else studied sales trainers. The founder studied **communication** instead, and the founder\'s pitch delivery improved dramatically. Teaching it to the team raised the team\'s sales too.'],
    chk: ['Two salespeople have the same script. What makes the difference, according to the course?', 'Their level of delivery, which comes from communication skills.'] },

  { h: 'Why you should do your own selling', t: [
    'People ask: can I just outsource setting and closing to someone and give them commission? The course says **no**, for two reasons:',
    '- You give away **20 to 40% of your profit**.',
    '- You give up building **arguably the most important skill in the world**.',
    'Communication is a dying skill. Everyone in the coffee line, the shared Uber, and the cafe is on their phone. If you build it, your value as a person goes way up.'],
    chk: ['What two things do you lose by outsourcing your sales calls early?', '20 to 40% of profit, and the chance to build the most valuable skill.'] },

  { h: 'Who to study', t: [
    '**1. Vinh Giang** (YouTube; Asian guy, glasses, spiky hair). A former magician who went from shy and bullied to speaking on stages to thousands. He has practical exercises. Start with his video on the **five vocal foundations** (Unit 4).',
    '**2. Vanessa Van Edwards**, a behavioral scientist who teaches **charisma as a skill, not something you are born with**. Vanessa makes social skills feel like a system (Unit 5).',
    'The founder\'s advice: study these two **every single day**, and actually do their exercises in daily life.'],
    chk: ['Which teacher focuses on the voice, and which on charisma as a system?', 'Vinh Giang: the voice (vocal foundations). Vanessa Van Edwards: charisma (warmth and competence).'] },

  { h: 'Warmth + competence = charisma', t: [
    'Vanessa Van Edwards\'s core idea (from research by Dr. Susan Fiske): **charisma is a mix of warmth and competence**, and the two make up about **82%** of the impressions people form of you.',
    '- **Warmth** says: I like you, you can trust me. (Trust, likability, friendliness.)',
    '- **Competence** says: I know what I am talking about, you can rely on me. (Power, reliability, capability.)',
    'If you only have one: **competence without warmth** makes people **suspicious** of you (they push back on your numbers, you cannot close). **Warmth without competence** makes you seem nice but not credible. **Low on both** is the danger zone.',
    'Most people lean one way. Typically (not always) **men lean competence, women lean warmth**. Find which side you lean toward and **train the other**. The founder leans competence, so studied warmth to balance it.',
    'Think of it like a thermostat: dial up warmth cues or competence cues depending on what you need.'],
    exam: 'Too much of any one cue backfires: constant nodding, laughing, or agreeing reads as "too warm" and costs you competence.',
    chk: ['A prospect keeps pushing back on your price even though your offer is good. Which side do you probably need more of?', 'Warmth. Competence without warmth breeds suspicion.'] }
]};

CARDS.push(
  [3, 'What is sales?', 'A transfer of belief, emotion, and energy onto another person.'],
  [3, 'What separates salespeople?', 'Their level of delivery, which comes down to communication skills.'],
  [3, 'What business owners want', 'A human who genuinely understands their problem and can help, not a salesperson.'],
  [3, 'Why not outsource setting and closing early?', 'You lose 20 to 40% of profit and skip building the most important skill.'],
  [3, 'Vinh Giang', 'Communication coach and former magician; teaches the five vocal foundations.'],
  [3, 'Vanessa Van Edwards', 'Behavioral scientist; teaches charisma as a learnable system (warmth + competence).'],
  [3, 'Charisma', 'Warmth + competence, signaled together.'],
  [3, 'Warmth signals', 'I like you; you can trust me.'],
  [3, 'Competence signals', 'I know what I am talking about; you can rely on me.'],
  [3, 'Competence without warmth', 'People feel suspicious and push back.'],
  [3, 'Warmth without competence', 'People like you but do not take you seriously.'],
  [3, 'How to use your lean', 'Find whether you lean warmth or competence, then train the other.']
);

QS.push(
  [3, 'According to the course, sales is:', ['a transfer of belief, emotion, and energy', 'a script you memorize', 'mostly about price', 'luck plus volume'], 'Delivery is what transfers it.'],
  [3, 'Why does the course say not to outsource closing at the start?', ['You lose 20 to 40% of profit and the chance to build the skill', 'Closers are illegal', 'Clients refuse to talk to closers', 'GHL does not allow it'], 'Two reasons: money and skill.'],
  [3, 'Charisma, per Vanessa Van Edwards, is:', ['warmth plus competence', 'confidence plus volume', 'humor plus looks', 'something you are born with'], 'Both together.'],
  [3, 'Someone with high competence but low warmth tends to make people feel:', ['suspicious', 'relaxed', 'bored', 'sorry for them'], 'They push back and do not trust.'],
  [3, 'Someone with high warmth but low competence comes across as:', ['nice but not credible', 'intimidating', 'suspicious', 'cold'], 'People like them but do not rely on them.'],
  [3, 'If you lean competence, the course says to:', ['study and practice warmth', 'double down on competence', 'avoid sales', 'talk louder'], 'Train the side you lack.'],
  [3, 'Which teacher should you watch for the five vocal foundations?', ['Vinh Giang', 'Vanessa Van Edwards', 'Alex Hormozi', 'Jeremy Miner'], 'His "five vocal foundations" video.']
);

TF.push(
  [3, `Business owners prefer talking to a polished salesperson.`, false, `They want a human who understands their problem.`],
  [3, `Charisma is something you're born with and can't learn.`, false, `Vanessa Van Edwards teaches it as a skill.`],
  [3, `Too much warmth can hurt how competent you seem.`, true, `Constant nodding and laughing can read as not credible.`],
  [3, `Warmth and competence together make up most first impressions.`, true, `About 82% in the research Vanessa cites.`]
);

CLOZE.push(
  [3, `Sales is a transfer of belief, emotion, and ___.`, [`energy`]],
  [3, `Charisma = warmth + ___.`, [`competence`]],
  [3, `The only difference between salespeople is their level of ___.`, [`delivery`]]
);

MATCH.push(
  [3, `Warmth`, `I like you, trust me`],
  [3, `Competence`, `I know my stuff, rely on me`],
  [3, `Vinh Giang`, `Five vocal foundations`],
  [3, `Vanessa Van Edwards`, `Charisma as a system`]
);

SORTS.push(
  { u: [3, 5], title: `Warmth signal or competence signal?`, b: [`Warmth`, `Competence`], items: [[`Smiling, friendly face`, 0], [`Steeple hand gesture`, 1], [`Body angled toward the person`, 0], [`Downward inflection when stating your price`, 1], [`Eye contact at the end of your sentence`, 1], [`Slow, interested nod`, 0], [`Shoulders down, ears far from shoulders`, 1], [`Head tilt while listening`, 0]] }
);

HOOKS.push(
  { u: 3, t: `Charisma`, h: `Like me and lean on me.`, w: `**Warmth** = they like you and trust you. **Competence** = they can lean on you. You need both.` }
);

/* ======================================================================
   UNIT 4: Your Voice (Vinh Giang's five vocal foundations)
   ====================================================================== */
LESSONS[4] = { intro: 'Your voice is an instrument, not a tool. Most people only ever play one or two keys. These are the five ways to play more of the piano, plus how to practice them.', items: [
  { h: 'Your voice is an instrument', t: [
    'Vinh Giang\'s first vocal teacher played one piano key for two minutes, then a beautiful song, and said: **most people go through life speaking like the one key.**',
    'A hammer is a tool you use. A piano is an instrument you **play**. Treat your voice like a piano with 88 keys.',
    'The voice you have now is **not "natural"**: you copied it as a child from people you admired. It is **a series of habits**: how you move air, shape your lips, place your tongue. Habits can change.',
    'When new sounds feel "fake," they are just **unfamiliar** keys. You can make the sound, so it is you.',
    'Most people can make a radical change in **3 to 6 months** if they want it.',
    'Three changes transform how people see you: **more volume, more melody, bigger hand gestures.**'],
    chk: ['Why does a new way of speaking feel fake at first?', 'It is unfamiliar, not fake. Your current voice is just a set of habits you practiced for years.'] },

  { h: 'The five vocal foundations', t: [
    '**1. Rate of speech** (how fast). **Slow down to highlight** something important; speed up to show energy and passion. Nervous people speed up. Aim around **150 to 180 words per minute**; above about 210 is too fast. The *change* between slow and fast is what hooks people.',
    '**2. Volume** (how loud). The "lifeblood" of your voice: it carries the other four. Too quiet signals low confidence; too loud without the others feels aggressive or arrogant. You can also highlight by going **quiet**.',
    '**3. Pitch / melody** (how high or low). More melody makes you more memorable. In one study, the most melodic voice in a group was the one people heard. Avoid the "sing-song" pattern that repeats the same melody (the receptionist or newsreader sound).',
    '**4. Tonality** (the emotion under your words). Your **face is the remote control**: change your expression and your voice follows. You can hear a smile.',
    '**5. Pausing.** A pause **intensifies the emotion** right before it and gives the listener time to process. Silence after a crescendo is the most important note. Be comfortable in silence, especially on closing calls.',
    'The rule: **anything you do by default stops working.** Variety is the point.'],
    tbl: { head: ['Foundation', 'How to highlight with it'], rows: [['Rate of speech', 'Slow down on the important part'], ['Volume', 'Go louder, or go quiet'], ['Pitch / melody', 'Vary it; avoid one repeating pattern'], ['Tonality', 'Change your face, and the emotion follows'], ['Pausing', 'Pause after the key line to let it land']] },
    chk: ['You are about to say the most important line of your pitch. Name two things to do with your voice.', 'Slow down, and pause right after it (you could also drop your volume).'] },

  { h: 'Pitch and gender: the founder\'s door-to-door lesson', t: [
    'When the founder trained women coming from retail, many used a high, bright **customer-service voice**. In a store that is fine, because the customer is already in a buying mood. On a cold approach or a sales call, it **puts up a wall of sales resistance** (door slam).',
    'The fix: drop the pitch and speak with more authority.',
    'Men often have the opposite problem: they stay low and flat the whole time and become **boring**. The fix for them: go **up a little at the end of some sentences** to show friendliness and warmth.',
    'Either way, the skill is the same: **vary your pitch** on purpose.'],
    chk: ['Why does a high "retail voice" hurt on a cold call?', 'It sounds salesy and triggers sales resistance; the person is not in a buying mood.'] },

  { h: 'Record and review: how to actually improve', t: [
    'Vinh\'s three-step process (most people avoid it because they hate hearing themselves):',
    '- **Record** a 5-minute video of yourself speaking **impromptu**, standing up. (Get a random conversation starter and just talk.)',
    '- **Wait a day.** You will judge yourself less.',
    '- **Review it three ways:** (1) **sound only**, phone face down: rate, volume, melody, tonality, pauses. (2) **Video only**, muted: swiveling, no gestures, touching your face. (3) **Transcript**: highlight filler words ("like," "you know," "um," "okay") and rambling.',
    'Then **pick one thing** and work on it for a whole week. Record and review again. If it has not changed, keep the same focus next week. Build a **12-week plan**, one week at a time. (Kaizen: relentless improvement.)',
    'To kill filler words, replace them with a **pause**.',
    'Why your recorded voice sounds weird: you normally hear yourself through **bone**, which sounds deeper. Others hear you through **air**. Listen to yourself until it stops making you cringe.'],
    exam: 'If you only do one thing from this unit, do record and review. Three changes picked from it can transform how you come across.',
    chk: ['What do you review in the transcript pass?', 'Filler words and nonwords (um, like, you know, okay) and rambling.'] },

  { h: 'Warm-ups and practice drills', t: [
    '- **Siren technique**: read something starting low and sliding high and back, within each sentence. It shows you how much range you have.',
    '- **Lip trills**: push your cheeks in with your index fingers and "brrr" through a whole song. Wakes up your voice before an early call.',
    '- **Read a children\'s book aloud** with full emotion. Kids react instantly; it proves you can change how people feel.',
    '- **Practice on "neutral ears"**: strangers (gas station, grocery store) who have no idea how you normally sound. Trying new behaviors there helps them stick without anyone saying "why are you talking like that?"',
    '- Before trying it at home, **prime** your partner: "I\'ve been quiet my whole life and want to give you more of me. If you see me playing with my voice, please encourage me."',
    'Before a big call: breathing to calm down, a little brisk movement to burn off adrenaline, and shift your focus off yourself and **onto the other person**. You cannot be self-conscious while you are thinking about serving them.'],
    chk: ['What are "neutral ears"?', 'People who have no idea how you normally sound, so you can try new behaviors without being judged.'] }
]};

CARDS.push(
  [4, 'Voice as an instrument', 'A tool you use; an instrument you play. Most people play one or two keys.'],
  [4, 'Is your voice "natural"?', 'No. It is a set of habits you copied as a child, so it can change.'],
  [4, 'The five vocal foundations', 'Rate of speech, volume, pitch/melody, tonality, pausing.'],
  [4, 'Rate of speech', 'How fast you talk. Slow down to highlight; aim around 150 to 180 words per minute.'],
  [4, 'Volume', 'How loud. Carries the other foundations. Highlight by going louder or quiet.'],
  [4, 'Pitch / melody', 'High and low notes in your voice. More melody = more memorable.'],
  [4, 'Tonality', 'The emotion under your words. Your face is the remote control.'],
  [4, 'Pausing', 'Intensifies the emotion before it and gives the listener time to process.'],
  [4, 'Sing-song voice', 'Repeating the same melody pattern. Sounds scripted.'],
  [4, 'Three quick changes', 'More volume, more melody, bigger hand gestures.'],
  [4, 'Record and review', 'Record 5 minutes impromptu, wait a day, review audio only, video only, then a transcript.'],
  [4, 'How to remove filler words', 'Replace them with a pause.'],
  [4, '12-week plan', 'One focus per week; record and review; repeat until it changes.'],
  [4, 'Siren technique', 'Read sliding low to high and back to expand your range.'],
  [4, 'Lip trills', 'Cheeks pushed in, "brrr" through a song to wake up your voice.'],
  [4, 'Neutral ears', 'Strangers with no idea how you normally sound: safe practice partners.'],
  [4, 'Why your recorded voice sounds odd', 'You usually hear yourself through bone (deeper); others hear you through air.'],
  [4, 'High "retail" voice on a cold call', 'Sounds salesy and triggers sales resistance.']
);

QS.push(
  [4, 'Which is NOT one of the five vocal foundations?', ['Accent', 'Rate of speech', 'Volume', 'Pausing'], 'The five: rate, volume, pitch/melody, tonality, pausing.'],
  [4, 'To highlight an important point with rate of speech, you should:', ['slow down', 'speed up', 'stay at your default', 'whisper it fast'], 'Slowing down creates an auditory highlight.'],
  [4, 'Vinh says the "remote control" for your tonality is your:', ['facial expression', 'hands', 'microphone', 'breathing'], 'Change your face and the emotion comes through.'],
  [4, 'What does a pause do?', ['Intensifies the emotion before it and gives time to process', 'Signals you forgot your script', 'Invites interruption every time', 'Lowers your credibility'], 'Get comfortable with silence.'],
  [4, 'Which "too much" problem makes someone seem aggressive or arrogant?', ['Too much volume without the other foundations', 'Too many pauses', 'Too much melody', 'Speaking too slowly'], 'Volume needs the others to balance it.'],
  [4, 'A comfortable speaking rate is roughly:', ['150 to 180 words per minute', '60 to 90', '220 to 260', '300+'], 'Above about 210 is too fast.'],
  [4, 'In record and review, what do you do right after recording?', ['Wait a day', 'Watch it immediately', 'Delete it', 'Post it'], 'Time makes you less harsh on yourself.'],
  [4, 'The three review passes are:', ['audio only, video muted, transcript', 'watch twice, then post', 'audio, then ask a friend, then retake', 'transcript only'], 'Each pass shows different habits.'],
  [4, 'After record and review shows 20 problems, Vinh says:', ['pick one and work on it for a week', 'fix all 20 at once', 'hire a coach first', 'record more until it feels better'], 'One focus per week, 12-week plan.'],
  [4, 'Why practice new behaviors on "neutral ears"?', ['No one there expects you to sound a certain way', 'They give better feedback', 'It is quieter', 'They are potential clients'], 'Less judgment helps new habits stick.'],
  [4, 'A man who stays low and flat the entire call should try:', ['lifting his pitch a little at the end of some sentences', 'speaking louder only', 'speeding up', 'whispering'], 'Adds friendliness and warmth.']
);

TF.push(
  [4, `Your current voice is the natural one you were born with.`, false, `It is a set of habits copied from people you admired as a kid.`],
  [4, `Anything you do by default stops being effective.`, true, `Variety is what makes the foundations work.`],
  [4, `You can highlight a point by suddenly going quiet.`, true, `Volume highlights work both ways.`],
  [4, `When nervous, most people slow down.`, false, `They speed up.`],
  [4, `Replacing "um" with a short pause is a good habit.`, true, `That is how Vinh says to remove filler words.`],
  [4, `Introverts can't become good communicators.`, false, `Introversion is about where you get energy, not skill.`]
);

CLOZE.push(
  [4, `Your face is the remote control for your ___.`, [`tonality`, `tone`]],
  [4, `Record, wait a day, then ___.`, [`review`]],
  [4, `The five foundations: rate, volume, pitch, tonality, and ___.`, [`pausing`, `pause`]],
  [4, `Reading low to high and back to expand range is the ___ technique.`, [`siren`]],
  [4, `Strangers with no idea how you normally sound are ___ ears.`, [`neutral`]]
);

MATCH.push(
  [4, `Rate of speech`, `Slow down to highlight`],
  [4, `Volume`, `Carries all the others`],
  [4, `Melody`, `Makes you memorable`],
  [4, `Tonality`, `Emotion under the words`],
  [4, `Pausing`, `Lets the point land`],
  [4, `Lip trills`, `Voice warm-up`]
);

SORTS.push(
  { u: [4], title: `Which vocal foundation is this about?`, b: [`Rate`, `Volume`, `Pitch/melody`, `Tonality`, `Pausing`], items: [[`Talking fast when excited, slow for the key line`, 0], [`Going quiet to make people lean in`, 1], [`Avoiding a sing-song receptionist pattern`, 2], [`Smiling so the warmth comes through`, 3], [`Silence after stating your price`, 4], [`Speaking at a 3 out of 10 the whole call`, 1], [`Lifting your voice slightly at the end of a sentence`, 2], [`Making a confused face so you sound confused`, 3]] }
);

LISTS.push(
  { u: [4], title: `The five vocal foundations`, items: [[`Rate of speech`, [`rate`, `speed`, `pace`]], [`Volume`, [`volume`, `loud`]], [`Pitch / melody`, [`pitch`, `melody`]], [`Tonality`, [`tonal`, `tone`, `emotion`]], [`Pausing`, [`paus`, `silence`]]] },
  { u: [4], title: `Three ways to review your recording`, items: [[`Audio only (phone face down)`, [`audio`, `listen`, `sound`]], [`Video only, muted`, [`video`, `mute`, `watch`]], [`Transcript`, [`transcri`, `text`]]] }
);

HOOKS.push(
  { u: 4, t: `The five vocal foundations`, h: `"Really Valuable People Tune Pianos."`, w: `**R**ate, **V**olume, **P**itch, **T**onality, **P**ausing. Your voice is the piano.` },
  { u: 4, t: `Highlighting`, h: `Slow it, drop it, hold it.`, w: `To make a line land: **slow** your rate, **drop** your volume (or raise it), and **hold** a pause after it.` },
  { u: 4, t: `Record and review`, h: `Ears, eyes, words.`, w: `Review your recording with your **ears** (audio only), your **eyes** (muted video), then the **words** (transcript).` }
);

/* ======================================================================
   UNIT 5: Body, Presence & Charisma
   ====================================================================== */
LESSONS[5] = { intro: 'Communication is not only verbal. This unit covers hand gestures, presence, the five competence cues from Vanessa Van Edwards, and showing up well on Zoom, where most of your sales calls will happen.', items: [
  { h: 'Hand gestures and the Power Sphere', t: [
    'A monotone voice comes from a monotone body. Move your body and your voice changes with it.',
    'The **Power Sphere** (from body language expert Mark Bowden): the space between your **belly button and your eyes**. Gesture inside it, out to its edges. Shy people gesture low and keep elbows pinned ("T-Rex arms"). Getting your elbows off your sides adds presence.',
    '"Executive presence" is just **vocal presence plus physical presence**.',
    'Five foundational gestures (from family therapist Virginia Satir):'],
    tbl: { head: ['Gesture', 'What it looks like', 'What it signals'], rows: [['Placator', 'Palms up and out', 'Open, no threat; great for greeting. Close cousin of "I don\'t know"'], ['Leveler', 'Palms facing down', 'Authority and control; your pitch drops naturally'], ['Blamer', 'Pointing (soften to an all-fingers point)', 'Strong, can feel accusing'], ['Computer', 'One arm across, hand at chin, head tilted', '"I\'m processing what you\'re saying"'], ['Distractor', 'A clap and a quick movement', 'A pattern break to win back attention']] },
    chk: ['You want to sound more authoritative when you state a rule. Which gesture helps?', 'Leveler: palms facing down.'] },

  { h: 'Five competence (power) cues', t: [
    'From Vanessa Van Edwards:',
    '- **The steeple**: fingertips together in a relaxed triangle. Rated the top hand gesture leaders make. Keep it still (no drumming "evil fingers").',
    '- **Max distance between earlobes and shoulders**: shoulders down and back, chin level. Hunched shoulders read as anxious, and anxiety is contagious.',
    '- **Eye contact at the end of your sentence**: it is fine to look away while thinking, but land your point looking at them. Aim for **60 to 70%** eye contact; over 70% feels territorial.',
    '- **The lower lid flex**: slightly tightening your lower eyelids shows you are focused on them. When you **see** someone do it to you, they may be skeptical or confused, so ask: "Does that make sense? Any questions?"',
    '- **Downward inflection**: end statements going **down**. If your voice goes up at the end, a statement sounds like a question, and the listener starts scrutinizing. **Never "ask" your price.** "The cost is five thousand dollars?" invites negotiation.'],
    exam: 'For sales: state your price with a downward inflection, then pause.',
    chk: ['Why is saying your price with an upward inflection a mistake?', 'It sounds like a question: you seem unsure, and you invite negotiation.'] },

  { h: 'Warmth cues mentioned in the material', t: [
    'The transcript in this module cuts off before Vanessa\'s five warmth cues. These warmth signals do appear in it:',
    '- **Fronting**: angling your body and toes toward the person.',
    '- An **"up" face** (a slight smile) instead of a resting serious face.',
    '- **Reacting with your face** while someone talks, so they know you are with them without interrupting.',
    '- A **head tilt** to soften and show you are listening.',
    '- A **slow nod** means "I love this, tell me more." A **fast nod** means "hurry up, I want to talk."',
    'Too much of any warmth cue (constant laughing, nodding, agreeing) can make you seem less competent.'],
    chk: ['What does a fast nod tell the other person?', 'That you want them to stop so you can talk.'] },

  { h: 'Showing up on Zoom', t: [
    'Video calls drain your foundations: in front of a webcam most people go flat. So **bring a bigger version of yourself** and be generous with your **energy** (the third kind of generosity after money and time).',
    '- **Framing**: do not appear as a giant head (that is "intimate space"). Sit back so they see your **torso and hands**.',
    '- **Lighting**: learn three-point lighting (a key light, a fill light, a light behind you).',
    '- **Camera and mic**: a 1080p webcam and an external microphone beat the laptop\'s.',
    '- **Good internet.**',
    'Match the other person\'s energy first, then lead them toward where you want to go. Meet them where they are.'],
    chk: ['Why sit farther back from your webcam?', 'So they see your torso and gestures instead of an uncomfortably close face.'] }
]};

CARDS.push(
  [5, 'Power Sphere', 'The space between your belly button and eyes. Gesture inside it, out to its edges.'],
  [5, 'Executive presence', 'Vocal presence + physical presence.'],
  [5, 'Placator gesture', 'Palms up and out: open and non-threatening.'],
  [5, 'Leveler gesture', 'Palms down: authority and control.'],
  [5, 'Blamer gesture', 'Pointing. Soften it to an all-fingers point.'],
  [5, 'Computer gesture', 'Arm across, hand at chin, head tilt: "I\'m processing."'],
  [5, 'Distractor gesture', 'A clap and quick movement: a pattern break to regain attention.'],
  [5, 'Steeple', 'Fingertips together in a relaxed triangle. Top-rated leader gesture.'],
  [5, 'Earlobe-to-shoulder distance', 'Keep it big: shoulders down, chin level. Small = anxious.'],
  [5, 'Ideal eye contact', '60 to 70% of the conversation, landing at the end of your sentences.'],
  [5, 'Lower lid flex', 'Slightly tightened lower eyelids = focus. If they do it, check for confusion or skepticism.'],
  [5, 'Downward inflection', 'End statements going down. An upward ending sounds like a question.'],
  [5, 'Asking your price', 'An upward inflection on your price invites negotiation.'],
  [5, 'Slow nod vs fast nod', 'Slow: tell me more. Fast: hurry up, I want to talk.'],
  [5, 'Zoom framing', 'Show your torso and hands, not just a close-up of your face.'],
  [5, 'Third form of generosity', 'Energy (after money and time).']
);

QS.push(
  [5, 'Where should your hand gestures mostly happen?', ['Between your belly button and your eyes', 'Below your waist', 'Above your head', 'Out of view'], 'The Power Sphere.'],
  [5, 'Which gesture signals authority?', ['Leveler (palms down)', 'Placator (palms up)', 'Computer', 'Distractor'], 'Palms down.'],
  [5, 'The top-rated hand gesture leaders make, per Vanessa Van Edwards:', ['The steeple', 'Crossed arms', 'Hands in pockets', 'Pointing'], 'Keep it still.'],
  [5, 'Ideal eye contact is about:', ['60 to 70% of the conversation', '100%', '30%', '90%'], 'Over 70% feels territorial.'],
  [5, 'You state your price and your voice rises at the end. What happens?', ['It sounds like a question and invites negotiation', 'It sounds confident', 'It sounds warmer and closes faster', 'Nothing'], 'Use a downward inflection.'],
  [5, 'A prospect does a lower lid flex while you explain your offer. Best move:', ['Check for confusion or skepticism before moving on', 'Talk faster', 'Ignore it', 'End the call'], 'Ask if it makes sense or if they have questions.'],
  [5, 'On Zoom, Vinh recommends:', ['bringing a bigger version of yourself', 'staying very calm and flat', 'turning the camera off', 'sitting as close to the camera as possible'], 'Webcams flatten your foundations.'],
  [5, 'High shoulders close to your ears signal:', ['anxiety', 'confidence', 'warmth', 'authority'], 'Keep the distance big.']
);

TF.push(
  [5, `A monotone voice often comes from a monotone body.`, true, `Move your body and your voice changes.`],
  [5, `More eye contact is always better.`, false, `Over 70% feels territorial; aim for 60 to 70%.`],
  [5, `Keeping your elbows pinned to your sides adds presence.`, false, `Get your elbows off your sides and use the Power Sphere.`],
  [5, `A fast nod tells the speaker you want them to keep going.`, false, `A fast nod means hurry up; a slow nod means tell me more.`],
  [5, `On video, people should be able to see your torso and hands.`, true, `It is more comfortable and lets you gesture.`]
);

CLOZE.push(
  [5, `Fingertips together in a relaxed triangle is the ___.`, [`steeple`]],
  [5, `End statements with a ___ inflection.`, [`downward`, `down`, `falling`]],
  [5, `The space between your belly button and your eyes is the Power ___.`, [`sphere`]],
  [5, `Palms facing down is the ___ gesture.`, [`leveler`, `leveller`]]
);

MATCH.push(
  [5, `Placator`, `Palms up, open`],
  [5, `Leveler`, `Palms down, authority`],
  [5, `Computer`, `Hand at chin, processing`],
  [5, `Distractor`, `Pattern break`],
  [5, `Steeple`, `Top leader gesture`],
  [5, `Lower lid flex`, `Focus or skepticism`]
);

LISTS.push(
  { u: [5], title: `Five foundational hand gestures`, items: [[`Placator`, [`placat`]], [`Leveler`, [`level`]], [`Blamer`, [`blam`]], [`Computer`, [`computer`]], [`Distractor`, [`distract`]]] },
  { u: [5], title: `Five competence (power) cues`, items: [[`Steeple`, [`steeple`]], [`Earlobe-to-shoulder distance`, [`shoulder`, `earlobe`]], [`Eye contact at the end of sentences`, [`eye`]], [`Lower lid flex`, [`lid`]], [`Downward inflection`, [`inflection`, `downward`]]] }
);

HOOKS.push(
  { u: 5, t: `Saying your price`, h: `State it down, then shut up.`, w: `Use a **downward inflection** on your number and **pause**. An upward ending turns your price into a question.` },
  { u: 5, t: `Five gestures`, h: `Please, Level, Blame, Compute, Distract.`, w: `**Placator** (palms up), **Leveler** (palms down), **Blamer** (point), **Computer** (hand at chin), **Distractor** (clap and pattern break).` }
);

/* ======================================================================
   UNIT 6: Conversations & Daily Reps
   ====================================================================== */
LESSONS[6] = { intro: 'You cannot get good at sales calls only on sales calls. This unit gives you everyday reps: starting conversations with strangers, keeping them going, and training your brain to handle chaos.', items: [
  { h: 'Cause and effect: start the conversation', t: [
    'In public, the average person is on their phone: the coffee line, the shared Uber, the elevator. Average behavior gets average results.',
    'The founder\'s stories from just saying hi:',
    '- After selling internet door to door, the founder stayed to chat with the customer, who turned out to run Tesla\'s North America operations and offered a job on the spot. The founder later worked at Tesla.',
    '- A "how\'s your day going?" at a pool in Mexico led to a **$55,000** appliance sale to a custom home builder.',
    '- Asking a skateboarder to teach a trick led to free tickets to Canada\'s biggest music festival.',
    'None of it happens without the **cause**: starting the conversation. You will also get rejected. That says more about them than you, and it trains you for sales rejection.',
    'Being an **introvert** does not stop you. Introverts recharge alone; they can still communicate brilliantly. They just spend their energy on purpose.'],
    exam: '**Mission: start 10 conversations with strangers this week.** Elevators, drive-thrus, coffee shops, checkouts, transit, Ubers.',
    chk: ['What is the "cause" in the founder\'s cause-and-effect stories?', 'Starting a conversation.'] },

  { h: 'Openers that work', t: [
    'Openers the founder has used:',
    '- "Those are fire. Where\'d you get them?"',
    '- "Yo, that\'s a sick tattoo. What\'s the story behind it?"',
    '- "What\'s been the best part of your week so far?"',
    '- "Random question, but this has been controversial today: would you put corn on pizza?"',
    '- "So... what\'s your deepest, darkest secret?" (hilarious in an elevator; use your judgment)',
    'Good openers are about **them** and are easy to answer.'],
    chk: ['Write your own opener for a coffee line.', 'Anything easy and about them works, like "What are you getting? I can never decide here."'] },

  { h: 'Keeping conversations going', t: [
    'Tools from Vinh Giang:',
    '- **High, Low, Buffalo**: for deepening a relationship (a coworker you only ever say hi to). Each person shares a **high** (something going great), a **low** (something not great), and a **buffalo** (something random and interesting about them). That is six conversation threads instead of one.',
    '- **FORD**: topics beyond "what do you do?": **F**amily, **O**ccupation, **R**ecreation, **D**reams. "What do you do in your free time?" opens more doors than asking about their job.',
    '- **3-2-1** for brief small talk: answer with "the **three** steps to...", "the **two** types of...", or "the **one** thing about..." to stay short and clear.',
    '- **"Yes, and" instead of "yes, but"**: "but" negates what they said; "and" builds on it. On a price objection: "Yes, and the reason is..."',
    '- **Storytelling**: do not **report** a story (who, what, when, like a news anchor). **Relive** it: add what you **saw, heard, felt, and smelled**, and use dialogue. Then link it to your point.',
    '- **Match then lead**: match the other person\'s energy first, then gradually bring them to where you want to go.'],
    tbl: { head: ['Tool', 'Use it when'], rows: [['High, Low, Buffalo', 'You want to really connect with someone you already know'], ['FORD', 'You need more to talk about than work'], ['3-2-1', 'You want to keep small talk brief and clear'], ['Yes, and', 'Someone pushes back or criticizes'], ['Reliving a story', 'You want your point to stick'], ['Match then lead', 'Their energy is very different from yours']] },
    chk: ['A prospect says "you\'re too expensive." Start your answer with...', '"Yes, and..." (not "yes, but").'] },

  { h: 'Coordination: juggling for your brain', t: [
    'The founder juggles, and not just a neat pattern: throwing the balls chaotically and reacting. **Everything in the physical translates to the mental.** Controlling chaos with your hands builds the pathways you use to improvise, negotiate, be witty, and find a new path in a conversation.',
    'It also makes talking with your hands feel natural.',
    '**Mission: 15 minutes a day this week** on a skill that makes you react and adjust in real time: juggling, jump rope tricks, freestyle dancing to music you do not know, or drumming along and improvising when the beat changes.',
    'You will mess up. The practice is catching yourself, adjusting, and continuing. That is exactly what a sales call needs.'],
    chk: ['Why does the course include juggling?', 'Handling physical chaos builds comfort with reacting and adjusting in conversations.'] }
]};

CARDS.push(
  [6, 'Cause and effect in conversations', 'Starting the conversation (the cause) is what creates opportunities (the effect).'],
  [6, '10-conversation mission', 'Start 10 conversations with strangers this week.'],
  [6, 'Rejection when starting conversations', 'Says more about them than you, and trains you for sales.'],
  [6, 'Introverts and communication', 'Introverts recharge alone but can communicate brilliantly; they spend energy on purpose.'],
  [6, 'High, Low, Buffalo', 'Share something going great, something not great, and something random about you: six threads.'],
  [6, 'FORD', 'Family, Occupation, Recreation, Dreams: topics beyond work.'],
  [6, '3-2-1 small talk', 'The three steps to, the two types of, or the one thing about. Keeps it brief.'],
  [6, '"Yes, and" vs "yes, but"', '"But" negates the other person; "and" builds on what they said.'],
  [6, 'Reporting vs reliving a story', 'Reporting is who/what/when. Reliving adds sights, sounds, feelings, smells, and dialogue.'],
  [6, 'Match then lead', 'Meet their energy first, then bring them to where you want to go.'],
  [6, 'Why juggle?', 'Physical chaos training builds mental comfort reacting and adjusting.'],
  [6, 'Coordination mission', '15 minutes a day on a react-and-adjust skill (juggling, jump rope, freestyle dance, drumming).']
);

QS.push(
  [6, 'What does High, Low, Buffalo give a conversation?', ['Multiple threads to pull on', 'A sales pitch', 'A way to end it quickly', 'An agenda'], 'Three threads from each person.'],
  [6, 'In FORD, the D stands for:', ['Dreams', 'Details', 'Decisions', 'Dinner'], 'Family, Occupation, Recreation, Dreams.'],
  [6, 'A prospect says your price is high. The better start is:', ['"Yes, and the reason is..."', '"Yes, but you don\'t understand..."', '"No, it\'s not."', 'Silence, then a discount'], '"And" builds instead of negating.'],
  [6, 'Reliving a story (instead of reporting it) means adding:', ['what you saw, heard, felt, and smelled, plus dialogue', 'more dates and times', 'a summary at the start', 'statistics'], 'Make it visual and sensory.'],
  [6, 'The weekly conversation mission is:', ['10 conversations with strangers', '1 conversation a day with family', '50 cold calls', 'none'], 'In everyday places.'],
  [6, 'The coordination mission is:', ['15 minutes a day of a react-and-adjust skill', 'an hour of gym a day', 'reading a book a week', 'meditation only'], 'Juggling, jump rope, freestyle dance, drumming.'],
  [6, 'Someone comes up to you quietly and nervously. Best approach:', ['Match their energy first, then lead them up', 'Match nothing, stay at full energy', 'Go quieter than them', 'End the conversation'], 'Meet them where they are.']
);

TF.push(
  [6, `Being an introvert means you can't be a strong communicator.`, false, `The founder is an introvert.`],
  [6, `Getting rejected when you start a conversation is useful training for sales.`, true, `It builds your tolerance for rejection.`],
  [6, `"Yes, but" builds on what the other person said.`, false, `"But" negates; "and" builds.`],
  [6, `"What do you do in your free time?" can open more doors than "What do you do for work?"`, true, `It is part of FORD.`]
);

CLOZE.push(
  [6, `High, Low, ___.`, [`buffalo`]],
  [6, `FORD: Family, Occupation, Recreation, ___.`, [`dreams`]],
  [6, `Say "yes, ___" instead of "yes, but".`, [`and`]],
  [6, `Mission: start ___ conversations with strangers this week.`, [`10`, `ten`]]
);

MATCH.push(
  [6, `High, Low, Buffalo`, `Deepen a connection`],
  [6, `FORD`, `Beyond-work topics`],
  [6, `3-2-1`, `Brief small talk`],
  [6, `Yes, and`, `Build instead of negate`],
  [6, `Reliving`, `Sensory storytelling`],
  [6, `Juggling`, `Training for chaos`]
);

LISTS.push(
  { u: [6], title: `FORD conversation topics`, items: [[`Family`, [`family`]], [`Occupation`, [`occupation`, `job`, `work`]], [`Recreation`, [`recreation`, `hobb`, `free time`]], [`Dreams`, [`dream`]]] },
  { u: [6], title: `React-and-adjust skills for the coordination mission`, items: [[`Juggling`, [`juggl`]], [`Jump rope tricks`, [`jump`, `rope`]], [`Freestyle dancing`, [`danc`]], [`Drumming and improvising`, [`drum`]]] }
);

HOOKS.push(
  { u: 6, t: `Starting conversations`, h: `No cause, no effect.`, w: `Every opportunity in the founder\'s stories started with saying something first. Do the uncomfortable thing.` },
  { u: 6, t: `High, Low, Buffalo`, h: `Up, down, weird.`, w: `Something going **up** (a high), something **down** (a low), something **weird** about you (a buffalo).` }
);

/* ======================================================================
   UNIT 7: Tools & GHL Setup
   ====================================================================== */
LESSONS[7] = { intro: 'The software that runs the agency, what it costs, and the first setup steps. The rule: start lean and spend time on clients, not tools.', items: [
  { h: 'GoHighLevel (GHL): your home base', t: [
    '**GoHighLevel (GHL)** is the CRM at the center of the agency. You use it two ways: for **your own agency**, and to **deliver services for clients** (covered in later fulfillment modules).',
    'For your agency, GHL:',
    '- Tracks leads from every acquisition channel (cold call, cold email, cold SMS, ads, organic).',
    '- Books **strategy calls** and **onboarding calls**.',
    '- Collects **payments**.',
    'Most people start with cold calling, so GHL is where all your prospects live. The process it tracks: **New prospect → Strategy call → Close deal → Collect payment → Onboarding call.**',
    '**Agency view vs sub-account view**: the agency view manages everything. Each **sub-account** is a separate workspace: **one for your agency**, and **one for each client**.'],
    chk: ['How many sub-accounts will you have with 3 clients?', 'Four: one for your agency and one per client.'] },

  { h: 'The tech stack and what it costs', t: [
    'Prices are in USD and may change. You do not need every paid plan on day one.'],
    tbl: { head: ['Tool', 'Cost', 'Used for'], rows: [['GoHighLevel', '$97 Starter (up to 3 sub-accounts) or $297 Unlimited', 'Leads, pipelines, conversations, calendars, automations, follow-up, reporting'], ['Google Workspace + Calendar', 'From $7/user/month', 'Business email, Drive, Docs, Sheets, scheduling'], ['Zoom', 'Free, or Pro about $14/month', 'Sales calls, client and team meetings (free has a 40-minute limit on group meetings)'], ['Loom', 'Free, then $18/month', 'Recording SOPs, updates, trainings, walkthroughs'], ['Stripe', 'Transaction fees only', 'One-time payments, recurring retainers, invoices'], ['GoDaddy', 'Depends on the domain', 'Your domain for a website and business email (check the renewal price)'], ['ChatGPT Plus', '$20/month (free to start)', 'Research, offers, scripts, SOPs, analyzing calls'], ['Claude Pro', '$18/month (not needed at the start)', 'Building and editing websites, landing pages, internal tools']] },
    exam: '**Start lean.** Minimum: (1) a professional domain and email, (2) a calendar and meeting platform, (3) a GHL account, (4) a reliable payment processor. Upgrade only when clients and real needs justify it, "not because buying software feels like building a business."',
    chk: ['Name the four minimum tools.', 'Domain and email, a calendar and meeting platform, GHL, a payment processor.'] },

  { h: 'Setting up your agency sub-account', t: [
    'Steps from the setup video:',
    '- In GHL, go to **Sub-accounts → Create sub-account → Blank snapshot → Add manually**.',
    '- Enter your business name, phone, and address (your personal address is fine if you are not registered), the right **time zone**, and keep sample data **off**.',
    '- In **Settings → Team**, edit yourself and under roles and permissions **assign the new sub-account to yourself**.',
    '- Switch into the sub-account. In **Settings → Calendars → Connections**, connect your calendar (they recommend **Google Calendar**).',
    '- **Conflict calendars**: check any calendars you do not want to be double-booked over.',
    '- **Linked calendar**: choose which Google calendar new GHL bookings land in.',
    '- **Video conferencing**: connect **Google Meet** (free, no time cap) or **Zoom** (free has a 40-minute cap; paid has more features).'],
    chk: ['What does a conflict calendar prevent?', 'Being double-booked over events you already have.'] },

  { h: 'Getting paid: Stripe', t: [
    'LaunchPad has only ever used **Stripe**, because it has a **$0 subscription fee**: you pay only transaction fees.',
    'Do not spend more than **5 minutes** choosing a payment processor. Pick one and spend the time closing deals.',
    'Connecting it: in your agency sub-account, **Settings → Integrations → Stripe → Connect**, then log into Stripe.',
    'Sending an invoice: **Invoices → New**, add the customer, create a product (like "Marketing services") with a price and currency, add tax only if you are incorporated (rules vary by country), set the invoice title, and send it by email or text. On a closing call you can also **copy the payment link into the chat** and have them pay right there.'],
    chk: ['How long should you spend comparing payment processors?', 'No more than 5 minutes. Pick one and move on.'] },

  { h: 'Organizing Google Drive', t: [
    'Create five folders:',
    '- **All Clients**: one folder per client; everything about delivering their service lives there.',
    '- **Finances**: anything money-related.',
    '- **Onboarding SOPs**: the live onboarding documents (the course shares theirs).',
    '- **Ops**: internal systems that keep the agency running. If you do not know what goes here yet, that is fine; it will become clear as you grow.',
    '- **Team**: a folder per team member with contracts, pay structure, and assigned clients.'],
    chk: ['Where does a new client\'s ad material go?', 'In their own folder inside All Clients.'] }
]};

CARDS.push(
  [7, 'GoHighLevel (GHL)', 'The CRM at the center of the agency: leads, calendars, pipelines, automations, payments.'],
  [7, 'Two ways you use GHL', 'For your own agency, and to deliver services for clients.'],
  [7, 'Agency view vs sub-account', 'Agency view manages everything; each sub-account is one workspace (yours or a client\'s).'],
  [7, 'GHL plans', '$97 Starter (up to 3 sub-accounts); $297 Unlimited once you add clients.'],
  [7, 'Start lean: minimum tools', 'Domain and email, calendar and meeting platform, GHL, payment processor.'],
  [7, 'Zoom free plan limit', '40 minutes on group meetings. Google Meet has no time cap.'],
  [7, 'Loom', 'Screen recordings for SOPs, updates, training, and walkthroughs.'],
  [7, 'Why Stripe', '$0 subscription fee; only transaction fees.'],
  [7, 'Choosing a payment processor', 'Spend no more than 5 minutes. Pick one, move on.'],
  [7, 'Conflict calendar', 'Calendars GHL checks so you are not double-booked.'],
  [7, 'Linked calendar', 'Which Google calendar new GHL bookings are added to.'],
  [7, 'Collecting payment on a closing call', 'Paste the Stripe payment link into the chat.'],
  [7, 'Five Google Drive folders', 'All Clients, Finances, Onboarding SOPs, Ops, Team.'],
  [7, 'Buying software', 'Upgrade only when clients and real needs justify it.']
);

QS.push(
  [7, 'How many GHL sub-accounts do you need with 5 clients?', ['6', '5', '1', '10'], 'One for your agency plus one per client.'],
  [7, 'Which is NOT on the course\'s "start lean" minimum list?', ['Claude Pro', 'A GHL account', 'A payment processor', 'A domain and business email'], 'Claude Pro is "not necessary when starting out."'],
  [7, 'Why did LaunchPad choose Stripe?', ['No subscription fee, only transaction fees', 'Lowest transaction fees in the world', 'GHL requires it', 'It handles taxes for you'], 'And they did not spend long deciding.'],
  [7, 'You need a free video tool with no time limit for closing calls. Use:', ['Google Meet', 'Zoom free', 'Loom', 'Stripe'], 'Zoom free caps group meetings at 40 minutes.'],
  [7, 'In GHL setup, what do you do right after creating the agency sub-account?', ['Assign it to yourself in Settings → Team', 'Send an invoice', 'Create client folders', 'Buy a domain'], 'Then switch into it and connect your calendar.'],
  [7, 'Where do a team member\'s contract and pay structure go?', ['Team folder', 'Ops folder', 'All Clients folder', 'Finances folder'], 'One folder per team member.'],
  [7, 'Which tool do they use to record SOPs and walkthroughs?', ['Loom', 'Stripe', 'GoDaddy', 'GHL'], 'Free to start.'],
  [7, 'The course\'s view on buying lots of software early:', ['Don\'t; upgrade only when clients justify it', 'Buy everything to look professional', 'Buy annual plans to save money', 'Only buy AI tools'], '"Buying software feels like building a business," but it isn\'t.']
);

TF.push(
  [7, `You need every paid tool before your first client.`, false, `Start lean.`],
  [7, `Each client gets its own GHL sub-account.`, true, `Plus one for your agency.`],
  [7, `It's worth spending days comparing payment processor fees.`, false, `No more than 5 minutes.`],
  [7, `Free Zoom limits group meetings to 40 minutes.`, true, `Pro removes it; Google Meet has no cap.`],
  [7, `Domain promo prices may be lower than the renewal price.`, true, `Check both before buying.`]
);

CLOZE.push(
  [7, `Each client gets their own GHL ___.`, [`sub-account`, `subaccount`, `sub account`]],
  [7, `LaunchPad's payment processor is ___.`, [`stripe`]],
  [7, `The course's rule for tools: start ___.`, [`lean`]],
  [7, `Calendars GHL checks to avoid double-booking are ___ calendars.`, [`conflict`]]
);

MATCH.push(
  [7, `GoHighLevel`, `Agency home base (CRM)`],
  [7, `Stripe`, `Payments and invoices`],
  [7, `Loom`, `Recorded walkthroughs`],
  [7, `GoDaddy`, `Domain`],
  [7, `Google Workspace`, `Email, Drive, Calendar`],
  [7, `Zoom`, `Sales and team calls`]
);

SORTS.push(
  { u: [7], title: `Day one, or later?`, b: [`Day one (start lean)`, `Later, when justified`], items: [[`Professional domain and email`, 0], [`Calendar and meeting platform`, 0], [`GHL account`, 0], [`Payment processor`, 0], [`GHL $297 Unlimited plan`, 1], [`Zoom Pro`, 1], [`Claude Pro / Max`, 1], [`Paid Loom`, 1], [`Incorporating`, 1]] },
  { u: [7], title: `Which Google Drive folder?`, b: [`All Clients`, `Finances`, `Onboarding SOPs`, `Ops`, `Team`], items: [[`A client's ad creatives`, 0], [`Monthly profit tracker`, 1], [`Your onboarding checklist document`, 2], [`An internal system for weekly reporting`, 3], [`A setter's contract`, 4], [`A client's onboarding answers`, 0], [`Team member pay structure`, 4]] }
);

LISTS.push(
  { u: [7], title: `Start lean: minimum tools`, items: [[`Professional domain and email`, [`domain`, `email`]], [`Calendar and meeting platform`, [`calendar`, `meeting`, `zoom`, `meet`]], [`GHL account`, [`ghl`, `highlevel`, `crm`]], [`Payment processor`, [`payment`, `stripe`, `processor`]]] },
  { u: [7], title: `Five Google Drive folders`, items: [[`All Clients`, [`client`]], [`Finances`, [`financ`]], [`Onboarding SOPs`, [`onboard`, `sop`]], [`Ops`, [`ops`, `operation`]], [`Team`, [`team`]]] },
  { u: [7], title: `What GHL does for your agency`, items: [[`Tracks leads from every channel`, [`lead`, `track`]], [`Books strategy calls`, [`strategy`]], [`Books onboarding calls`, [`onboard`]], [`Collects payments`, [`payment`, `collect`]]] }
);

HOOKS.push(
  { u: 7, t: `Start lean`, h: `Domain, Diary, Dashboard, Dollars.`, w: `The four minimum tools: a **domain** and email, a calendar (**diary**) and meeting tool, GHL (your **dashboard**), and a payment processor (**dollars**).` },
  { u: 7, t: `Payment processor`, h: `Five minutes, then dial.`, w: `Pick a processor (Stripe) in under 5 minutes and spend the time closing deals.` }
);

/* ======================================================================
   UNIT 8: Planning Your Days
   ====================================================================== */
LESSONS[8] = { intro: 'Your time and energy are the agency\'s fuel. This unit covers planning, protecting agency time, and the checkpoint missions you must finish before moving on.', items: [
  { h: 'Plan the night before', t: [
    'We make decisions two ways: with **logic** (calm, proactive, responsive) or with **emotion** (reactive, sometimes nonsensical). Think of something you said while upset and regretted later.',
    'The night before, your brain is calm, so you can plan from the facts.',
    'In the morning you get a natural spike of **cortisol** (stress), plus notifications, messages, emails, family, roommates, and chores. Planning then is reactive.',
    'Energy is finite. If you start at 100% and spend 20% deciding what to do in the morning, you wasted 20%. Decide the night before and spend the morning **acting**.',
    '**Never plan your day in the morning. Plan it the night before.**'],
    chk: ['Why does planning in the morning cost you?', 'Cortisol and incoming stimuli make decisions reactive, and you spend limited energy deciding instead of acting.'] },

  { h: 'Protect your agency time', t: [
    'The checkpoint missions ask you to **build your weekly agency calendar** and **block dedicated agency work time**.',
    'What that means in practice:',
    '- Put recurring blocks on your calendar for agency work (for example, your cold-calling block) and treat them like appointments.',
    '- Use your calendar\'s conflict settings (Unit 7) so prospects cannot book over your blocks.',
    '- Remember the founders\' pace early on: 150 dials a day, 6 days a week. You will need real, protected hours.',
    'Volume and consistency are what produced the first 6 months of results.'],
    chk: ['What are the two calendar missions?', 'Build your weekly agency calendar, and block dedicated agency work time.'] },

  { h: 'Checkpoint: your missions', t: [
    '🚨 **Do not continue yet.** Your foundation needs to be set before moving forward:',
    '- Complete the **communication modules** (Units 3 to 6 here).',
    '- **Build your weekly agency calendar.**',
    '- **Block your dedicated agency work time.**',
    '- **Choose the next module** you need to complete.',
    '- **Commit to following the modules in order.**',
    'Plus the practice missions: **10 conversations with strangers this week**, and **15 minutes a day** of a react-and-adjust skill. The **Daily Reps** tab tracks them.'],
    chk: ['List the five checkpoint missions.', 'Finish the communication modules, build your weekly calendar, block agency work time, choose your next module, commit to doing modules in order.'] }
]};

CARDS.push(
  [8, 'When to plan your day', 'The night before, never in the morning.'],
  [8, 'Why not plan in the morning', 'Morning cortisol and incoming stimuli make you reactive, and deciding burns limited energy.'],
  [8, 'Logic vs emotion decisions', 'Logic is calm and proactive; emotion is reactive and sometimes nonsensical.'],
  [8, 'Energy', 'Finite each day. Spend it acting, not deciding.'],
  [8, 'Checkpoint missions', 'Communication modules, weekly agency calendar, blocked work time, choose next module, commit to order.'],
  [8, 'Practice missions', '10 conversations with strangers a week; 15 minutes a day of a react-and-adjust skill.']
);

QS.push(
  [8, 'When does the course say to plan your day?', ['The night before', 'First thing in the morning', 'At lunch', 'Only on Sundays'], 'Your brain is calmer and more logical the night before.'],
  [8, 'Why is the morning a bad time to plan?', ['Cortisol and incoming messages make decisions reactive', 'You are too sleepy to write', 'Calendars do not sync in the morning', 'It is not; mornings are best'], 'And deciding uses up energy.'],
  [8, 'Which is NOT a checkpoint mission?', ['Incorporate your business', 'Build your weekly agency calendar', 'Block dedicated agency work time', 'Commit to following modules in order'], 'Incorporating can wait until 3 to 5 clients.'],
  [8, 'Decisions made from emotion tend to be:', ['reactive and sometimes nonsensical', 'calm and logical', 'always better', 'proactive'], 'That is why you plan when calm.']
);

TF.push(
  [8, `You should plan your day as soon as you wake up.`, false, `Plan it the night before.`],
  [8, `Daily energy is finite.`, true, `Do not waste it deciding.`],
  [8, `You should finish the checkpoint missions before moving on.`, true, `"Do not continue yet."`]
);

CLOZE.push(
  [8, `Plan your day the night ___.`, [`before`]],
  [8, `The morning stress hormone is ___.`, [`cortisol`]]
);

MATCH.push(
  [8, `Night before`, `When to plan`],
  [8, `Cortisol`, `Morning stress spike`],
  [8, `Logic`, `Calm, proactive decisions`],
  [8, `Emotion`, `Reactive decisions`]
);

LISTS.push(
  { u: [8], title: `The five checkpoint missions`, items: [[`Complete the communication modules`, [`communication`]], [`Build your weekly agency calendar`, [`weekly`, `calendar`]], [`Block dedicated agency work time`, [`block`, `work time`]], [`Choose the next module`, [`next module`, `choose`]], [`Commit to following the modules in order`, [`order`, `commit`]]] }
);

HOOKS.push(
  { u: 8, t: `Planning`, h: `Decide at night, do in the light.`, w: `Plan the night before while you are calm. Spend the morning acting, not deciding.` }
);

/* ======================================================================
   Course settings
   ====================================================================== */
window.COURSE = {
  id: 'business',
  title: 'Business 2025',
  unitLabel: 'Unit',
  units: UNITS,
  cards: CARDS,
  questions: QS,
  lessons: LESSONS,
  tf: TF,
  cloze: CLOZE,
  match: MATCH,
  sorts: SORTS,
  lists: LISTS,
  hooks: HOOKS,

  groups: [
    { label: 'Foundations · 1–2', units: [1, 2] },
    { label: 'Communication · 3–6', units: [3, 4, 5, 6] },
    { label: 'Setup · 7–8', units: [7, 8] }
  ],

  planTitle: 'Your path from zero',
  plan: [
    [-1, 'Step 1 · Units 1–2', 'Learn the words and the LaunchPad story. Flashcards until the basics are automatic.'],
    [-1, 'Step 2 · Units 3–6', 'Communication. Do the Daily Reps every day: 10 conversations a week and 15 minutes of coordination.'],
    [-1, 'Step 3 · Units 7–8', 'Set up GHL, Stripe, Drive and your weekly calendar. Then finish the checkpoint missions.']
  ],

  tips: [
    '<b>Learn, then do.</b> The course is built to implement one module at a time. Finish a unit\'s missions before the next.',
    '<b>Use Daily Reps.</b> Reading about your voice changes nothing. Recording yourself and talking to strangers does.',
    '<b>Record and review weekly.</b> Pick one vocal foundation per week and stick with it until it changes.',
    '<b>Do not get stuck "getting ready."</b> LaunchPad\'s biggest regret was two months of preparing instead of dialing.'
  ]
};
})();
