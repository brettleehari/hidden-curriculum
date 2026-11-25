---
title: "The Hidden Curriculum of Software Engineering: How American Cultural Metaphors Shape Global Technical Vocabulary and Why AI Is Making Them Invisible"
author: "Hari Prasad Sudharsan"
date: "Consolidated edition, November 2026"
---

Independent Researcher. Chennai, India; Dallas, USA. github.com/brettleehari

*Reference framework paper. This edition merges and supersedes the drafts dated January to June 2026.*

## Abstract

Every culture which pioneers a field leaves its metaphors in the vocabulary. Tamil gave English "catamaran." Persian scholarship gave "algorithm." Japanese manufacturing gave "kaizen" and "kanban." American computing gave "punt," "sandbox," "dashboard," "cowboy coding," and hundreds more. This paper documents the American share and asks what happens when nobody marks it as American.

The paper makes four contributions. First, a taxonomy of 289 unique culturally embedded terms across 12 American cultural domains, printed in full in Appendix A. Second, a two-layer barrier model. Layer 1 is cultural and affects every developer raised outside the United States, including native English speakers from the UK, Australia, and South Africa. Layer 2 is linguistic and compounds on top for non-native English speakers. In a 30-term representative sample, 23 terms (77%) sit in Layer 1. Third, an AI amplification argument backed by a six-term pilot: no explanation gave full cultural disclosure, every explanation presented the term as universal, and none acknowledged a non-American reader. Fourth, a research agenda with five study designs.

The paper is a reference framework. It supplies the taxonomy, the model, and the testable designs. It does not claim proof of causal effects.

**Keywords:** cultural metaphors, software engineering vocabulary, hidden curriculum, two-layer barrier model, cognitive load, AI cultural bias, cross-cultural computing

## 1. Introduction

My first programming was VB and C. All in English. The language felt abstract to me, and not in the way science or social studies were abstract. I had general English proficiency. I handled those subjects fine. Computer science language was different. Something was missing, and I did not know what.

The answer came after I moved from Chennai to the United States. A Git tutorial told me to "fork the repository." My first mental image was an eating utensil, the only fork I had ever known. I read the documentation and memorized the definition. It stayed abstract.

Then came my first drive on American roads. "Take a right at the fork," my companion said. I looked ahead and saw one road split into two. In one instant the word clicked. Whether or not the Unix authors had a road in mind, the image reached me on a road, years after the definition did. The definition was learned. The image was recognized.

More followed. When senior engineers discussed a "north star metric," I searched for what a star had to do with goals. When a code review mentioned "cattle vs pets," I pictured animals, not a server management philosophy borrowed from ranching. The missing piece was not English. It was American culture.

There are 47.2 million developers worldwide [10]. Most of them grew up outside the United States. India alone has 5.43 million technology employees [11]. Guo's survey of 840 programming learners in 86 countries found 78% of respondents were non-native English speakers. Their most reported barrier was reading instructional materials [1]. One respondent wrote: "I had to look up the meaning of a nickel, dime etc. while reading about dynamic programming on a blog."

Prior work frames this as an English problem. This paper makes a narrower and stronger claim. For most of the terms documented here, the barrier is cultural before it is linguistic. A native English speaker from London hits the same wall with "punt" (American football) and "Hail Mary" (American football again) as a developer from Chennai. English proficiency does not remove it. American cultural knowledge does.

### 1.1 Contributions

- **C1.** A taxonomy of American cultural metaphors in software engineering and technology business vocabulary: 289 unique terms, 12 domains, full list in Appendix A.
- **C2.** A two-layer cultural and linguistic barrier model, with a first quantification on 30 terms.
- **C3.** An AI amplification framework: a five-stage feedback loop, plus a pilot measurement of cultural disclosure in AI-mediated explanations.
- **C4.** A research agenda with five study designs, each stated so other researchers are able to run it.

## 2. A Note on Cultural Contributions

This paper is not anti-American. Vocabulary follows whoever does the pioneering work. Table 1 shows the pattern across five cultures.

| Culture of origin | Example terms in global English | Field |
|---|---|---|
| Tamil | catamaran, cheroot, curry | Seafaring, trade, cuisine |
| Arabic and Persian scholarship | algorithm, algebra, cipher | Mathematics, cryptography |
| Indian mathematics, via Arabic | zero as a numeral | Mathematics |
| Japanese manufacturing | kaizen, kanban | Process improvement |
| Greek | cybernetics, technology | Science, engineering |
| American English | punt, sandbox, dashboard, cowboy coding | Computing: 289 terms in this paper |

*Table 1. Every pioneering culture embeds its vocabulary in the field it builds.*

American engineers sat at the center of the software revolution. Their daily life entered the vocabulary: their car dashboards, their dryer lint traps, their children's sandboxes, their Sunday football games. Nobody sat down and decided a kitchen toaster should name a notification pattern. It happened without a plan. This is how language works.

The question is not whether American culture belongs in programming vocabulary. The question is what happens when one culture's metaphors become the global standard and most learners process them as outsiders. The intervention is not to erase American influence. The intervention is to recognize it, mark it, and build plurality into how we teach and design technology.

## 3. Related Work

**Language barriers in computing education.** Guo [1] ran the first large survey of non-native English speakers learning programming: 840 responses, 86 countries, 74 native languages. Hermans built Hedy [8], a gradual programming language now offered in dozens of natural languages. Nasser built قلب (Qalb) [9], a language written entirely in Arabic, as a response to Anglophone bias in programming tools. Dasgupta and Hill [6] studied Scratch users who code in localized blocks. Pal and Iyer [7] isolated narration language in programming screencasts.

**Terminology reform.** The Inclusive Naming Initiative [15] replaces socially harmful terms such as master/slave and blacklist/whitelist. Its focus is social harm. Cognitive load from cultural metaphor is outside its present scope.

**Cultural bias in language models.** Tao et al. [14] placed five OpenAI models on the Inglehart-Welzel cultural map and compared them with survey data from 107 countries. Atari et al. [18] found GPT responses grow less similar to human responses as cultural distance from the United States grows. Messner et al. [20] found the cultural self-perception of ChatGPT and Bard aligns most with English-speaking countries. Longpre et al. [13] audited nearly 4,000 public AI datasets by geographic origin. These studies examine general cultural values. None applies the lens to software engineering terminology.

**The gap.** Three things are missing from this literature: a systematic record of culturally embedded metaphors in software vocabulary, an analysis separating cultural barriers from linguistic ones, and a measurement of whether AI systems disclose or hide the cultural origin of technical terms. This paper addresses all three.

## 4. Method

### 4.1 Term identification

I collected terms from four source categories:

1. Official documentation of 15 tools and frameworks: Python, JavaScript/Node.js, Git, Kubernetes, AWS, Ansible, Chef, Docker, Terraform, React, Django, Ruby on Rails, Jenkins, GitHub Actions, Homebrew.
2. Developer discourse: Stack Overflow questions, GitHub issue threads, and engineering blogs from large technology companies.
3. Agile and DevOps methodology vocabulary: the Scrum Guide, the SAFe framework, the DevOps Handbook.
4. My own 20 years of professional experience as a non-American developer inside American technology organizations.

### 4.2 Inclusion criteria

A term enters the taxonomy when it passes three tests.

1. **Metaphorical, not literal.** "Array" is literal. "Sandbox" is metaphorical.
2. **Traceable to an American cultural domain.** Sports, military, food, frontier mythology, and so on. Terms with widely shared metaphorical sources, such as "thread" from textiles, stay out.
3. **In active professional use.** The term appears in documentation, code, or engineering discourse today.

### 4.3 Classification schema

Each term carries six fields: Term, Cultural Domain, What Americans See, What Software Means, What Non-Americans Read, and Affects All Non-Americans (yes or no). The last field is the discriminator for the two-layer model. The released dataset adds identifier, domain code, where the term appears, neutral alternative, contributor, and source.

### 4.4 Limits of the method

One researcher built the taxonomy. Inter-rater reliability is unmeasured. The 30-term sample behind the Layer 1 figure was chosen for domain spread, not drawn at random. Appendix A is the working list from the audit; a criterion-by-criterion review of every entry is still in progress, and some entries will move or drop. Section 14 proposes the validation study. Treat the taxonomy as a reference list awaiting validation, not as a validated dataset.

## 5. The Two-Layer Barrier Model

Earlier research describes one barrier: non-native English speakers struggle with English-medium programming. I propose two layers.

### 5.1 Layer 1: the cultural barrier

Layer 1 affects every developer raised outside the United States. An Australian developer hears "let's punt on this" in a code review. In Australian English, a punt is a bet or a flat-bottomed boat. In American football, a punt is a deliberate kick to give up possession and defer the fight. The Australian speaks English natively and still misses the meaning. Only American cultural knowledge resolves it.

The same holds for "Hail Mary" (a desperate last-second football pass), "slam dunk" (basketball), "ballpark estimate" (baseball), and "moonshot" (the Apollo program). These terms are opaque to the UK, Australia, South Africa, India, Nigeria, and Germany alike.

### 5.2 Layer 2: the linguistic barrier

Layer 2 compounds on top for non-native English speakers. A developer in Chennai, São Paulo, or Jakarta decodes the English word first, then the American reference behind it. Terms which an Australian reads without trouble, such as "roadmap" or "cold start," still cost effort at this layer.

### 5.3 First quantification

Table 3 in Section 6 classifies 30 representative terms. By the flags in the table, 23 of 30 (77%) are Layer 1. The 30-term seed set released with the dataset overlaps this sample but is not identical, and it carries 24 Layer 1 flags of 30 (80%). The two passes disagree on three terms: vanilla, hamburger menu, and sandbox. I report both numbers because the disagreement is itself the finding: one annotator, two passes, three changed labels. The proportion is roughly four in five. The exact figure waits for multiple annotators (Section 14.1).

The group facing both layers, raised outside the United States and working in a second language, is the global majority of software developers.

## 6. The Hidden Curriculum: 289 Terms in 12 Domains

"Hidden curriculum" is an education term for what learners must absorb alongside the stated content. In software engineering, the hidden curriculum is the cultural context inside the terminology.

### 6.1 Domain statistics

| # | Domain | Entries | Example terms |
|---|---|---|---|
| 1 | American Sports | 55 | punt, MVP, ballpark estimate, playbook, slam dunk |
| 2 | Silicon Valley Business Jargon | 52 | sunset, grandfathered, elevator pitch, moonshot, unicorn |
| 3 | Military and Cold War | 42 | blast radius, nuke, DMZ, war room, bastion |
| 4 | American Food Culture | 26 | hamburger menu, toast, cookbook, kitchen sink |
| 5 | American Car Culture | 24 | dashboard, throttling, cold start, guardrails |
| 6 | American Household | 22 | lint, bucket, sandbox, circuit breaker |
| 7 | Wild West and Frontier | 18 | cowboy coding, bug bounty, pets vs cattle |
| 8 | American Pop Culture | 17 | showstopper, grok, yak shaving |
| 9 | American Industrial Trades | 14 | smoke test, golden image, bulkhead |
| 10 | Cybersecurity and Espionage | 11 | honeypot, watering hole, spear phishing |
| 11 | American Hacker Subculture | 10 | duck typing, monkey patching, cargo cult, kludge |
| 12 | American Slang and Idioms | 9 | shebang, bang, LGTM, TL;DR |
| | **Total entries** | **300** | |
| | **Unique terms** | **289** | 11 terms are listed under two domains |

*Table 2. Domain statistics. Counts match Appendix A row for row.*

Core version-control vocabulary (fork, merge, branch, checkout, commit, HEAD, push, pull, daemon) sits outside the count. Some of these terms have widely shared metaphorical sources and fail the second inclusion criterion. The dataset tracks them as a separate candidate group.

### 6.2 Representative terms with layer classification

| Term | Domain | What Americans see | What software means | What non-Americans read | Layer 1? |
|---|---|---|---|---|---|
| Punt | Sports (football) | Strategic kick to defer | Defer a decision | A flat-bottomed boat; a bet | Yes |
| MVP | Sports | Most Valuable Player trophy | Minimum Viable Product | The best of the best | Yes |
| Slam dunk | Sports (basketball) | Guaranteed score | Obvious, easy win | A forceful action | Yes |
| Hail Mary | Sports (football) | Desperate last-second pass | Last-resort attempt | A Catholic prayer | Yes |
| Ballpark estimate | Sports (baseball) | Inside the stadium bounds | Rough approximation | A children's play area? | Yes |
| Playbook | Sports (football) | Coach's strategy book | Documented procedures (Ansible) | A children's book | Yes |
| Dashboard | Car culture | Vehicle instrument panel | Data visualization interface | A board on a dash | No |
| Throttling | Car culture | Engine fuel flow control | Rate limiting requests | To strangle someone | Yes |
| Cold start | Car culture | Engine struggling in winter | Serverless initialization delay | A low-temperature beginning | No |
| Roadmap | Car culture | Highway map | Product or project timeline | A map of roads | No |
| Hamburger menu | Food | Stacked burger layers | Three-line navigation icon | A restaurant menu | Yes |
| Boilerplate | Food / industrial | Ready-cast printing plates | Reusable template code | A plate for boiling? | Yes |
| Vanilla | Food | Plain, default ice cream | Unmodified version | An exotic orchid spice | Yes |
| Cookie | Food | Sweet baked snack | Browser data file | A baked food item | No |
| Blast radius | Military | Scope of a nuclear explosion | Scope of a system failure | Weapon destruction area | No |
| DMZ | Military | Korean buffer zone | Network security zone | Military border zone | No |
| Nuke | Military | Nuclear weapon; microwave | Destroy data completely | A nuclear weapon | No |
| Sandbox | Household | Children's play area | Isolated test environment | A box with sand | Yes |
| Lint / linter | Household | Dryer lint trap fibers | Static code analysis tool | Fabric fibers | Yes |
| Garbage collection | Household | Weekly trash truck pickup | Automatic memory management | Collecting garbage | Yes |
| Cowboy coding | Frontier | Wild West individualism | Unstructured development | Sloppy work (UK sense) | Yes |
| North star metric | Frontier | Polaris guiding travelers | Primary business metric | A star in the sky | Yes |
| Stakeholder | Frontier | Staking a claim | Anyone with a project interest | A person holding a stake? | Yes |
| Moonshot | Business / history | Apollo moon landing | High-risk transformative project | Shooting at the moon? | Yes |
| Grandfathered | Business / legal | Post-Civil War voting laws | Legacy exemption from new rules | Related to grandfathers? | Yes |
| Sunsetting | Business | Legislative sunset provisions | Phasing out a product or API | The sun going down | Yes |
| Grok | Hacker culture | Heinlein science fiction | Understand a system deeply | Opaque | Yes |
| Cargo cult | Hacker culture | Feynman's Caltech address | Imitating patterns blindly | A religious cult? | Yes |
| Honeypot | Cybersecurity | Espionage honey trap | Decoy system to attract attackers | A pot of honey | Yes |
| Shebang (#!) | Slang and idioms | "The whole shebang" | Script interpreter directive | Opaque | Yes |

*Table 3. Thirty representative terms. "Layer 1? Yes" means the term affects all non-American developers regardless of English proficiency. 23 of 30 are Layer 1.*

### 6.3 Three patterns in the data

**Engineering decisions get narrated as sports commentary.** Sports is the largest domain, with 55 entries. A manager says: "Let's punt on the database migration and focus on the home-run features." A developer from Vietnam or Kenya does not need one definition. They need a whole framework of American football and baseball before the sentence resolves.

**Whole tools are built on one cultural frame.** Chef names its abstractions cookbook, recipe, knife, and kitchen. Homebrew uses tap, formula, cask, cellar, and bottle. Rancher, lasso, and "pets vs cattle" carry ranching into cluster management. A developer learning one of these tools learns the frame or memorizes every noun as an arbitrary label.

**The metaphors encode value systems, not definitions alone.** "Cowboy coding" carries American ambivalence about individualism. "Grandfathered" carries the weight of racial history. "Moonshot" carries Cold War technological triumph. "Nuke the database" reflects a casual relationship with nuclear vocabulary. A non-American developer memorizes the definition and still misses the emotional freight the word carries for Americans.

## 7. Case Studies

### 7.1 The shebang

The first line of millions of Unix scripts is `#!`, called the shebang. Every Unix tutorial teaches it. Almost none explains the name. The name stacks two American references.

The first is the idiom. "The whole shebang" is 19th-century American slang for the entire affair. Its origin is uncertain. One proposed source is the Irish "shebeen," an unlicensed drinking house.

The second is the symbol names. American programmers call `!` a "bang," the comic-book sound of an explosion. `#` is "hash" or "sharp." "Hash-bang" or "sharp-bang" contracts to "shebang," a pun on the idiom.

| | How Americans read it | How the rest of the world reads it |
|---|---|---|
| The word "shebang" | A familiar idiom: the whole shebang, everything | An unfamiliar word with no anchor |
| The `#` symbol | "Pound" or "hash," seen daily | "Hash" or "number sign"; "pound" means weight or currency |
| The `!` symbol | "Bang," playful, from comics | "Exclamation mark"; "bang" for punctuation is new |
| Combined `#!` | A pun. Clever and memorable | Two symbols with an arbitrary name. No pun lands |
| Learning pathway | Recognition: it sets up the whole shebang | Memorization of an arbitrary fact |

*Table 4. One script header, two readings.*

What Americans experience as wordplay, everyone else experiences as arbitrary jargon. The mnemonic value is lost. What remains is memorization.

### 7.2 Homebrew and apt

Homebrew is a macOS package manager. Its vocabulary comes from American home beer brewing. You "tap" a repository, as you tap a keg. A package definition is a "formula." Packages install into a "cellar." Prebuilt binaries are "bottles."

The design is clever and expressive. It reflects a culture of handmade, do-it-yourself production. A developer with no home-brewing schema gets none of this. Each noun is one more label to memorize.

Compare apt, the Debian package tool. Its commands are install, remove, update, upgrade, search. Plain imperative verbs. Both tools do the same job. One requires a cultural frame. The other requires verb forms every programmer already uses.

## 8. Cognitive Science Foundation

Four bodies of theory predict a cost for culturally embedded terminology.

### 8.1 Conceptual Metaphor Theory

Lakoff and Johnson [2] showed human thought is metaphorical at its base. We understand abstract concepts through concrete ones. They separate primary metaphors, grounded in bodily experience and shared across cultures, from complex metaphors, assembled from cultural tradition. Software vocabulary is mostly complex metaphor. "Sandbox" maps a suburban childhood play area onto an isolated runtime. The mapping works only when the source image already means something to the reader.

### 8.2 Schema Theory

Anderson [4] and Rumelhart [5] showed learning depends on the schema a learner brings. An American hears "sandbox" and a schema fires: childhood, contained, safe, a place to experiment. The schema maps cleanly onto the technical concept. A learner without the schema has two options: build it, spending effort, or memorize the term as a bare symbol.

This is a schema availability problem, not an intelligence problem. The same person fluent in Tamil poetry and unfamiliar with American suburbs finds schema-dependent documentation harder. The documentation asks more of them.

### 8.3 Cognitive Load Theory

Sweller [3] separates intrinsic load (the difficulty of the material), extraneous load (effort imposed by presentation), and germane load (effort spent building understanding). Working memory is small, by Miller's classic estimate about seven items [17].

Culturally embedded terminology is extraneous load. To decode "cattle vs pets," a learner activates ranching culture, maps the metaphor, and applies it to servers, all at once. An American does the first two steps without noticing. Everyone else deliberates. The difference repeats across hundreds of terms and months of learning.

### 8.4 Cross-cultural metaphor processing

Chen, Lv, and Chen [12] tested Chinese learners of English in three behavioural experiments, including eye tracking (n = 38, 34, and 36). Interpreting second-language metaphors drew more inhibitory control than literal sentences. The effect was larger during late reading of culturally incongruent metaphors and absent for culturally congruent ones. The reader first suppresses the wrong reading, then builds the right one.

The study covers one language pair and general metaphors, not programming terms. It supports the direction of the prediction here. It does not confirm the size.

## 9. Evidence from Prior Research

The following studies give indirect support. Direct validation needs the experiments in Section 14.

### 9.1 Guo (2018): what learners report

Guo [1] surveyed visitors to a programming education website: 840 responses, 86 countries, 74 native languages. 78% of respondents were non-native English speakers. Table 5 gives the two results most relevant here.

| Barriers reported by non-native speakers (N = 384) | Share |
|---|---|
| Problems reading instructional materials | 35% |
| Problems with technical communication | 24% |
| Hard to learn English and programming together | 17% |
| Problems reading code | 16% |
| Problems writing code | 11% |

| Improvements requested by non-native speakers (N = 464) | Share |
|---|---|
| Simplified English without culture-specific slang | 36% |
| More visuals and multimedia | 23% |
| More culturally agnostic examples | 21% |
| Inline dictionaries | 21% |

*Table 5. From Guo [1], Tables 3 and 4. N is the number of non-native respondents who answered each question, a subset of the 656 non-native respondents. Responses allowed more than one category.*

Two points stand out. The top barrier is reading, not coding. And the top request names culture directly: remove culture-specific slang. Learners already ask for what this paper proposes.

### 9.2 Pal and Iyer (2015): narration language

Pal and Iyer [7] compared three groups of 35 first-year engineering undergraduates in North India learning programming from screencasts. Hindi-medium students watching Hindi narration scored 45.00. English-medium students watching English narration scored 42.51. The difference was not significant (p = .118). Both groups beat Hindi-medium students watching English narration, who scored 37.57 (p < .001). Slides and code were in English for all three groups, so narration language was the isolated variable.

The result does not show native-language instruction is superior in general. It shows English delivery imposes a measurable penalty on vernacular-medium learners, and native-language narration removes the penalty.

### 9.3 Dasgupta and Hill (2017): localized blocks

Dasgupta and Hill [6] studied Scratch users in several countries. Novices who coded with blocks localized into their own language learned new programming concepts faster than peers from the same countries who used English blocks. Same tool, different interface language, different learning rate.

### 9.4 Employment data from India

A 2015 Aspiring Minds study of 30,000 engineering students across 500 institutions found 2.9% spoke English at the level required for high-end jobs in software, sales, or consulting [16]. Azam, Chin, and Prakash [19] found men in India who speak fluent English earn roughly 34% higher hourly wages than men who speak no English, after controls.

These findings concern English skill, not cultural metaphor. They show the economic stakes of the linguistic layer. Whether the cultural layer adds its own penalty is an open question, and Section 14.4 proposes a way to test it.

## 10. The AI Amplification Layer

This section assigns no blame. Software engineering did not set out to exclude anyone. The internet did not grow unequally by design. One culture sat at the center of a technological revolution, and the tools now teaching technology to the world inherited its assumptions.

### 10.1 What the training data looks like

English is the content language of about half of all websites, far above the share of the world's population who speak it as a first language [21]. Longpre et al. [13] audited nearly 4,000 public AI datasets: organizations in North America and Europe account for 93% of text tokens, while organizations in Africa and South America account for under 0.2% across modalities.

### 10.2 What the models inherit

Tao et al. [14] tested five OpenAI models, GPT-3 through GPT-4o, against survey data from 107 countries. Their conclusion: "All models exhibit cultural values resembling English-speaking and Protestant European countries." Atari et al. [18] found the similarity between GPT responses and human responses falls as cultural distance from the United States grows (r = -.70). Messner et al. [20] found the same direction for ChatGPT and Bard.

This matters for software engineering because AI now sits inside how developers learn. Code assistants suggest code. Chat models explain concepts. Each system learned from a corpus where "punt," "sandbox," and "north star" appear as plain technical vocabulary, with no flag on origin.

### 10.3 The feedback loop

The pattern reinforces itself in five stages.

1. **Culture encodes.** American engineers name tools and practices with metaphors from daily life. The terms enter codebases, documentation, and forum answers.
2. **The internet preserves.** The terms spread worldwide and become standard vocabulary.
3. **AI trains.** Models learn the terms as technical facts, with no marker of origin.
4. **AI teaches.** Tutoring tools and code assistants explain the terms to the next generation as neutral defaults.
5. **The cycle repeats.** Learners reproduce the vocabulary in their own writing, and the next model trains on it.

Each pass ties "professional software development" more tightly to one culture's vocabulary.

### 10.4 What AI makes invisible

Before AI tutors, a confused developer at least noticed the gap. "Why is this called a sandbox? It makes no sense to me." The friction was a signal: something culturally specific is happening here.

With an AI system as mediator, the friction goes away. The model explains the term smoothly and confidently, as if the metaphor were obvious. It does not say where the image comes from. It offers no second mental model. The assumption turns invisible, first to the American who never questioned it, and now to the non-American who learns through AI and never meets the friction which once prompted the question.

A learnable barrier has turned into an invisible one. Section 11 gives a first measurement.

## 11. LLM Cultural Disclosure: A Pilot

### 11.1 Method

I selected six terms with heavy cultural embedding from different domains: cowboy coding, north star metric, sandbox, shebang, cargo cult programming, and moonshot. In June 2026 I collected explanations of each term from AI-mediated sources: LLM answers, search engine summaries, and AI-generated glossaries.

I scored each explanation on three dimensions.

- **D1, cultural origin disclosed.** Does the explanation name the specific American source? Full (1.0), partial (0.5), none (0.0).
- **D2, presented as universal.** Does it treat the term as culturally neutral? Yes (1), no (0).
- **D3, non-American perspective.** Does it acknowledge possible confusion for readers outside the United States? Yes (1), no (0).

### 11.2 Results

| Term | D1: origin disclosed | D2: universal | D3: non-American view |
|---|---|---|---|
| Cowboy coding | Partial (0.5). Cowboys implied; Wild West specificity not flagged | Yes (1) | No (0) |
| North star metric | None (0.0). Polaris and frontier navigation absent | Yes (1) | No (0) |
| Sandbox | None (0.0). Children's play area absent | Yes (1) | No (0) |
| Shebang (#!) | Partial (0.5). Hash-bang noted; American idiom not flagged | Yes (1) | No (0) |
| Cargo cult | Partial (0.5). Feynman and wartime islands noted; not flagged as an American reference | Yes (1) | No (0) |
| Moonshot | Partial (0.5). Apollo noted; not flagged as an American touchstone | Yes (1) | No (0) |
| **Mean** | **0.33** | **1.00** | **0.00** |

*Table 6. Cultural disclosure pilot, six terms, June 2026.*

Full disclosure: 0 of 6. Partial: 4 of 6. None: 2 of 6. Presented as universal: 6 of 6. Non-American perspective acknowledged: 0 of 6.

### 11.3 Reading the result

Even where an explanation gives partial context ("moonshot comes from Apollo"), it presents the context as general knowledge, not as an American reference a reader in Lagos or Jakarta might lack.

This is a pilot. Six terms, one scorer, mixed sources. It shows the measurement is feasible and the direction matches the amplification argument. It proves nothing at scale.

To take it to scale, the dataset repository includes a benchmark tool, the Cultural Disclosure index (CDi). It poses a frozen prompt per term to a model under test, scores D1 to D3 with a fixed rubric, and reports the three means as a triple. The pilot baseline is (0.33, 1.00, 0.00). A culturally aware model trends toward (1.00, 0.00, 1.00). Section 14.3 states the full study.

## 12. The Cultural Ceiling: A Hypothesis

I hypothesize the hidden curriculum compounds at senior levels.

Senior strategy discourse in technology companies leans on American cultural metaphor: north star metric, flywheel, moat, blast radius, land and expand, beachhead, pre-wire, greenfield, boil the ocean, move the needle, two-pizza team, tiger team, war room. These are not technical terms. They are strategic vocabulary, and fluency in them signals seniority.

Consider one exchange.

> Junior PM: "We should build feature X."
>
> Senior PM: "Feature X addresses this segment's job to be done while strengthening our data moat and accelerating the flywheel."

The senior sentence deploys a castle defense image popularized by an American investor and an industrial image popularized by an American retailer. An engineer from Bangalore with the same strategic judgment and different phrasing delivers the same content without the signal. A listener hears "less strategic." The gap is vocabulary, not capability.

| Term | American source | Business meaning |
|---|---|---|
| Flywheel | Industrial machinery | Self-reinforcing business cycle |
| Two-pizza team | Pizza as meeting food | Team small enough to feed with two pizzas |
| Tiger team | US military and aerospace | Cross-functional group for an urgent problem |
| Beachhead | D-Day landings | First market foothold |
| Land and expand | Frontier expansion | Small deployment first, then growth |
| Pre-wire | Electrical wiring, corporate politics | Align stakeholders before the formal meeting |
| Bar raiser | High jump | Interviewer guarding the hiring standard |
| Red teaming | Cold War exercises | Structured adversarial testing |

*Table 7. Examples of senior-level strategic vocabulary.*

I state this as a hypothesis. Earlier drafts gave a percentage for the American share of leadership vocabulary. No systematic corpus study of leadership vocabulary by cultural origin exists yet, so this edition gives no number. Section 14.4 proposes the study.

## 13. Proposed Interventions

Six interventions follow, ordered from lowest to highest cost.

**13.1 AI cultural flagging.** Have models mark culturally specific terms at the point of use. When a model writes "north star metric," it adds a short note: American business term; the image is Polaris used for navigation. This acts where the amplification loop is strongest. There is direct evidence models respond to cultural context: Tao et al. [14] found cultural prompting improved alignment for 71 to 81% of countries on the GPT-4 family.

**13.2 Schema-first teaching.** Teach the cultural image before the technical concept. For "sandbox," show the play area, then the runtime. For "circuit breaker," show the household electrical panel, then the pattern. This makes visible the work non-American learners already do in private.

**13.3 Neutral alternatives.** Publish supported alternatives next to the embedded terms. "Pets vs cattle" pairs with "unique vs replaceable instances." "North star metric" pairs with "primary success metric." "Playbook" pairs with "procedure guide." Longer, and transparent. The goal is choice, not removal.

**13.4 Culturally agnostic examples.** Write code examples around cities, weather, food, and transport instead of baseball statistics and coin denominations. One in five non-native respondents in Guo's survey asked for this [1].

**13.5 Localized environments and messages.** Support Hedy [8], localized Scratch [6], and projects like them. Offer error messages in more languages. An error message is the first thing a learner reads when code fails.

**13.6 A wider Inclusive Naming scope.** The Inclusive Naming Initiative [15] already runs a working process for term replacement. Extend its scope from socially harmful terms to culturally opaque ones, starting with the highest-frequency entries in this taxonomy.

## 14. Research Agenda

### 14.1 Taxonomy validation

Recruit five annotators from different backgrounds: American, British, Indian, Chinese, Brazilian. Each classifies 100 randomly drawn terms with the schema in Section 4.3. Report inter-rater agreement (Fleiss' kappa) for inclusion and for the Layer 1 flag. This replaces the single-annotator figure in Section 5.3.

### 14.2 Comprehension study

**Participants.** Two groups of practising developers matched on experience and on a programming pre-test: raised in the United States, and raised elsewhere. Within the second group, record first language to separate Layer 1 from Layer 2. Target 60 per group.

**Materials.** Forty term pairs. Each pair states one concept twice: once in embedded form, once in neutral form. "Pets vs cattle" against "unique vs replaceable instances." Two raters code the embedding independently.

**Measures.** Accuracy on a forced-choice definition task and response latency. A Stroop task as a covariate for inhibitory control, following [12].

**Design.** Two by two, mixed. Group between subjects, term type within subjects, counterbalanced so no participant sees both forms of one concept.

**What each outcome means.** An interaction between group and term type indicates a cost specific to cultural outsiders. A main effect of term type alone indicates embedded terms are harder for everyone, which reframes the argument as one about terminology quality. No effect indicates professional exposure neutralizes the barrier, and attention should shift to beginners. All three outcomes are informative.

### 14.3 Cultural disclosure at scale

Run the CDi benchmark over 50 or more terms and five or more models from different vendors. Use at least two human raters on a sample to check the automated judge. Test whether a one-line system prompt asking for cultural flags moves the triple.

### 14.4 Career progression

Track international engineers at US technology companies for three to five years. Measure American cultural vocabulary fluency against promotion velocity, with controls for technical performance, tenure, and team composition. In parallel, code a corpus of public strategy documents by cultural origin of vocabulary to produce the missing number in Section 12.

### 14.5 A community-validated corpus

The taxonomy is released as an open dataset. One master CSV in the GitHub repository is the source of truth; the website and the HuggingFace mirror are generated from it. Contributors submit a term through a web form or a GitHub issue. An automated check reviews required fields, domain, and duplicates. A maintainer then reviews the term against the three inclusion criteria. Approved terms enter the dataset with a contributor credit, and a weekly health check compares the mirror against the master file. Target: 500 validated terms within 12 months of launch, with at least two annotators per term.

## 15. Limitations

1. **Single annotator.** One researcher built and classified the taxonomy. A researcher with a different background would include and classify differently. My two passes over the 30-term sample disagree on three labels.
2. **Unreviewed entries.** Appendix A is the full working list. Some entries, such as "coach," "draft," and "bottleneck," are doubtful under the second inclusion criterion and are under review. Eleven terms are cross-listed.
3. **Etymology.** Several origins are folk etymologies or disputed. "Stakeholder" predates the American frontier in the sense of holding wagered stakes. "MVP" in product work is an acronym collision with the sports award, not a derivation from it. "Fork" has no settled road origin. The barrier claim depends on what readers picture today, not on first coinage, but each origin field needs a source.
4. **Non-random sample.** The Layer 1 proportion rests on 30 terms chosen for domain spread.
5. **Pilot scale.** The disclosure pilot covers six terms, one scorer, and mixed sources.
6. **Indirect evidence.** The prior studies in Section 9 concern language of instruction and English skill. None isolates cultural metaphor. The causal claims here are predictions from cognitive theory.
7. **Population figures.** The developer total comes from one industry estimate [10]. This edition gives no percentage for developers raised outside the United States or for non-native English speakers, because I found no primary source for the figures used in earlier drafts.

These limits fit the paper's position as a reference framework. The contributions are the taxonomy, the model, and the agenda.

## 16. Conclusion

Software engineering vocabulary is not culturally neutral. It grew in a specific place and time and borrowed from the life around it: football fields, highways, kitchens, ranches, Cold War bunkers, and startup offices. The borrowing was natural. Leaving it unmarked is the problem.

This paper contributes four things. A taxonomy of 289 terms in 12 domains, printed in full. A two-layer model in which the cultural layer reaches every developer raised outside the United States and the linguistic layer compounds for those working in a second language. A feedback loop explaining how AI turns a learnable barrier into an invisible one, with a first measurement. And five study designs open to anyone with a participant pool.

The paper does not argue for replacing the vocabulary wholesale. It argues for awareness: what feels universal is often cultural, and what feels neutral is often the product of one place and one period.

For me, learning to program meant absorbing a cultural curriculum without recognizing it. VB and C in English felt abstract, and the reason was never the English. For the next generation of developers in India, Brazil, Egypt, Nigeria, and Vietnam, it does not have to go the same way. The work begins with documentation. It continues with tooling. It succeeds when 47 million developers think clearly without translating through someone else's culture.

Send corrections, additions, and translations. There is always room for improvement.

## Data Availability

- Repository and master dataset: github.com/brettleehari/hidden-curriculum (`data/hidden-curriculum.csv`)
- Dataset mirror: huggingface.co/datasets/brettleehari/hidden-curriculum
- Website and submission form: brettleehari.github.io/hidden-curriculum

The dataset has two parts. The validated set holds terms with the full schema, reviewed against the inclusion criteria: 30 terms at the time of writing. The candidate set holds the remaining Appendix A entries with their cultural source and technical meaning, awaiting review. Counts on the website and the dataset card regenerate from the master file, so they will move ahead of the numbers printed here. The CDi benchmark code is in the same repository.

## References

[1] Guo, P. J. (2018). Non-Native English Speakers Learning Computer Programming: Barriers, Desires, and Design Opportunities. *Proc. CHI 2018*, Paper 396. ACM. DOI 10.1145/3173574.3173970

[2] Lakoff, G. and Johnson, M. (1980). *Metaphors We Live By*. University of Chicago Press.

[3] Sweller, J. (1988). Cognitive Load During Problem Solving: Effects on Learning. *Cognitive Science*, 12(2), 257-285.

[4] Anderson, R. C. (1977). The Notion of Schemata and the Educational Enterprise. In R. C. Anderson, R. J. Spiro, and W. E. Montague (Eds.), *Schooling and the Acquisition of Knowledge*. Lawrence Erlbaum.

[5] Rumelhart, D. E. (1980). Schemata: The Building Blocks of Cognition. In R. J. Spiro, B. C. Bruce, and W. F. Brewer (Eds.), *Theoretical Issues in Reading Comprehension*. Lawrence Erlbaum.

[6] Dasgupta, S. and Hill, B. M. (2017). Learning to Code in Localized Programming Languages. *Proc. Learning @ Scale 2017*, 33-39. ACM. DOI 10.1145/3051457.3051464

[7] Pal, Y. and Iyer, S. (2015). Effect of Medium of Instruction on Programming Ability Acquired through Screencast. *Proc. LaTiCE 2015*, 17-21. IEEE. DOI 10.1109/LaTiCE.2015.38

[8] Hermans, F. (2020). Hedy: A Gradual Language for Programming Education. *Proc. ICER 2020*, 259-270. ACM. DOI 10.1145/3372782.3406262

[9] Nasser, R. (2012). قلب (Qalb). Programming language and art project, Eyebeam Art + Technology Center. nas.sr/قلب

[10] SlashData (2025). There Are 47.2 Million Developers in the World: Global Developer Population Trends 2025.

[11] nasscom (2024). Technology Sector in India: Strategic Review 2024.

[12] Chen, J., Lv, J., and Chen, B. (2025). Crossing the Cultural Bridge: The Role of Inhibitory Control during Second Language Metaphor Comprehension. *Bilingualism: Language and Cognition*, 28, 1393-1409. DOI 10.1017/S1366728924001081

[13] Longpre, S. et al. (2025). Bridging the Data Provenance Gap Across Text, Speech, and Video. *Proc. ICLR 2025*. arXiv:2412.17847

[14] Tao, Y., Viberg, O., Baker, R. S., and Kizilcec, R. F. (2024). Cultural Bias and Cultural Alignment of Large Language Models. *PNAS Nexus*, 3(9), pgae346. DOI 10.1093/pnasnexus/pgae346

[15] Inclusive Naming Initiative. Word lists and guidelines. inclusivenaming.org

[16] Aspiring Minds (2015). The National Spoken English Skills of Engineers Report.

[17] Miller, G. A. (1956). The Magical Number Seven, Plus or Minus Two. *Psychological Review*, 63(2), 81-97.

[18] Atari, M., Xue, M. J., Park, P. S., Blasi, D. E., and Henrich, J. (2023). Which Humans? PsyArXiv preprint.

[19] Azam, M., Chin, A., and Prakash, N. (2013). The Returns to English-Language Skills in India. *Economic Development and Cultural Change*, 61(2), 335-367. DOI 10.1086/668277

[20] Messner, W., Greene, T., and Matalone, J. (2025). From Bytes to Biases: Investigating the Cultural Self-Perception of Large Language Models. *Journal of Public Policy & Marketing*. DOI 10.1177/07439156251319788

[21] W3Techs (2026). Usage Statistics of Content Languages for Websites. w3techs.com

*License: CC BY 4.0 for the text and dataset.*

## Appendix A. Complete Taxonomy

This appendix lists every entry behind Table 2: 300 entries, 289 unique terms. A dagger (†) marks the 11 terms listed under two domains. Each row gives the term, its American cultural source, and its technical or business meaning. The machine-readable version ships with the dataset: reviewed terms in the validated set with the full schema, the rest in the candidate set.

This is a living list. Send additions, corrections, and translations through github.com/brettleehari/hidden-curriculum.

### A.1 American Sports (55 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| ballpark | Baseball stadium | Rough estimate |
| bench | Sports reserve seating | Remove from active duty |
| block | Sports obstruction | Prevent progress |
| champion | Sports winner | Advocate strongly for |
| coach | Sports trainer | Mentor or guide |
| cover all bases | Baseball defense | Consider all possibilities |
| curveball | Baseball pitch type | Unexpected challenge |
| down for the count | Boxing knocked down | Defeated or exhausted |
| draft | Sports player selection | Initial version |
| drop the ball | Fumble/error | Fail to follow through |
| full court press | Basketball defensive strategy | Intensive effort |
| fumble | Football dropped ball | Make a mistake |
| game changer | Sports momentum shift | Revolutionary development |
| game plan | Sports strategy | Project or product strategy |
| go to bat for | Baseball support | Advocate for someone |
| goal | Sports objective | Target or objective |
| halftime | Sports mid-game break | Midpoint review |
| heavy hitter | Powerful baseball player | Important person |
| hit it out of the park | Baseball home run | Exceed expectations |
| home run | Baseball over-fence hit | Major success |
| huddle | Football team circle | Quick team meeting |
| in the bullpen | Baseball waiting area | Ready and waiting |
| in the weeds | Golf rough grass | Stuck in details |
| keep your eye on the ball | Sports focus | Stay focused |
| kickoff | Football game start | Project start |
| league | Sports organization | Group of related items |
| level playing field | Fair sports conditions | Equal opportunity |
| major league | Top sports division | Highly professional |
| minor league | Lower sports division | Less important |
| move the goalposts | Change objective location | Change requirements unfairly |
| MVP | Most Valuable Player | Minimum Viable Product |
| on the ropes | Boxing near defeat | In serious trouble |
| out of left field | Baseball unexpected direction | Surprising or unexpected |
| overtime | Extra game time | Working beyond normal hours |
| par for the course | Golf expected score | Expected outcome |
| pass | Sports ball transfer | Skip or transfer |
| pinch hitter | Baseball substitute | Last-minute replacement |
| play hardball | Baseball vs softball | Negotiate aggressively |
| playbook | Football strategy book | Collection of standard procedures |
| punt | Football kick retreat | Deliberately defer a decision |
| rookie | First-year player | Inexperienced person |
| saved by the bell | Boxing round end | Rescued at last moment |
| score | Sports points | Achieve success |
| scrum | Rugby formation | Agile framework with daily standups |
| slam dunk | Basketball easy score | Guaranteed success |
| sprint | Track and field race | Time-boxed development period |
| step up to the plate | Baseball batting position | Take responsibility |
| strike out | Baseball three misses | Fail completely |
| sucker punch | Unexpected boxing hit | Unfair surprise attack |
| swing and miss | Baseball failed hit | Failed attempt |
| tackle | Football/rugby contact | Address a problem directly |
| team player | Cooperative athlete | Collaborative worker |
| throw in the towel | Boxing surrender | Give up |
| timeout | Sports pause | System pause or break |
| touch base † | Baseball tag base | Brief check-in communication |

### A.2 Silicon Valley Business Jargon (52 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| 10x engineer | Multiplication factor | Exceptionally productive developer |
| ASAP | As Soon As Possible | Urgent timeline |
| bandwidth | Signal capacity | Available time/capacity |
| beachhead | D-Day invasion point | Initial market foothold |
| boil the ocean | Impossible task | Attempt too much |
| bootstrap | Pull yourself up by bootstraps | Self-fund without outside capital |
| burn rate | Fire consumption speed | Rate of spending cash |
| circle back | Return to origin | Revisit later |
| day 1 | Beginning mythology | Startup mentality forever |
| deep dive | Scuba exploration | Thorough investigation |
| disagree and commit | Corporate philosophy | Support despite disagreement |
| disrupt | Break apart | Transform industry with innovation |
| dogfooding † | Eating own dog food | Using own product internally |
| drink the Kool-Aid | Jonestown massacre reference | Believe without questioning |
| drink your own champagne | Self-celebration | Using own premium product |
| eating your own cooking | Self-consumption | Using own product |
| ecosystem | Biological environment | Interconnected business network |
| EOD/COB | End of Day/Close of Business | Daily deadline |
| evangelist | Religious spreader | Passionate product advocate |
| fail fast | Quick failure | Learn rapidly from mistakes |
| flywheel | Industrial/gym equipment | Self-reinforcing cycle |
| founder mode | Pioneer leadership | Hands-on visionary style |
| FYI | For Your Information | Informational notification |
| guru † | Hindi spiritual teacher (Americanized) | Expert or authority |
| heads up | Look above warning | Advance notice |
| high agency | Self-determination | Proactive initiative |
| hockey stick | Sports equipment shape | Exponential growth curve |
| land and expand | Territorial conquest | Enter small, grow organically |
| leverage † | Physics force multiplier | Use resources strategically |
| loop in | Include in circle | Add to communication |
| low-hanging fruit † | Easy orchard picking | Easily achievable goals |
| moat | Castle defense water | Competitive advantage barrier |
| moonshot | Apollo space program | Ambitious long-term goal |
| move the needle | Gauge indicator | Make measurable impact |
| ninja † | Japanese warrior (Americanized) | Highly skilled specialist |
| north star metric | Frontier navigation star | Primary guiding metric |
| ping | Sonar sound | Send quick message |
| pivot | Basketball turn | Strategic direction change |
| pre-wire | Electrical preparation | Align stakeholders beforehand |
| rockstar † | Music celebrity | Top performer |
| runway | Airport takeoff strip | Time until funding runs out |
| scale | Measurement device | Grow capacity exponentially |
| stakeholder | Bet holder | Interested party |
| strong opinions loosely held | Conviction with flexibility | Confident but open to change |
| sync up | Synchronize | Align understanding |
| synergy | Combined effect | Collaborative benefit |
| take offline | Computer disconnect | Discuss separately |
| the ask | Direct request noun | Specific request needed |
| the unlock | Key mechanism | Critical enabling factor |
| touch base † | Baseball tag base | Brief check-in communication |
| unicorn † | Mythical rare creature | Billion-dollar startup |
| win-win | Mutual victory | Mutually beneficial outcome |

### A.3 Military and Cold War (42 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| abort | Mission cancellation | Terminate process |
| battle-tested | Combat proven | Thoroughly proven |
| blast radius | Nuclear explosion scope | Impact scope of failure |
| blue team | Friendly forces | Defense/protection team |
| boots on the ground | Deployed soldiers | People at actual location |
| breach | Wall break | Security violation |
| bunker | Protective shelter | Secure backup location |
| camouflage | Visual concealment | Disguise or hide |
| checkpoint | Military inspection point | Progress verification point |
| collateral damage | Unintended casualties | Unintended negative effects |
| command line | Military command | Text-based interface |
| de-escalate | Reduce conflict | Reduce tension |
| deploy | Troop deployment | Release to production |
| DMZ | Demilitarized Zone (Korea) | Network security buffer |
| escalate | Increase conflict level | Raise to higher authority |
| execute | Carry out orders | Run a program |
| fallback | Retreat position | Backup option |
| firewall | Fire barrier | Network security barrier |
| forward deploy | Advance positioning | Deploy closer to users |
| friendly fire | Accidental allied attack | Unintended internal harm |
| guardrails † | Highway barriers + military | Policy constraints |
| in the trenches | WWI warfare | Doing difficult daily work |
| kill | Terminate life | Stop a process |
| kill switch | Emergency stop | Emergency disable mechanism |
| launch | Missile/rocket launch | Release product |
| lockdown | Secure facility mode | Code freeze period |
| mission critical | Essential to mission | Business essential |
| nuclear option | Extreme weapon | Last resort extreme action |
| nuke | Nuclear bomb | Delete everything |
| ops | Military operations | Operations work |
| post-mortem | After death analysis | Analyze what went wrong |
| pre-mortem | Before death analysis | Anticipate failure causes |
| radar | Detection system | Monitoring system |
| recon | Reconnaissance | Research or investigation |
| red team | Cold War adversary simulation | Adversarial testing group |
| scorched earth | Destruction retreat | Aggressive competitive tactics |
| stand down | Cease readiness | Stop aggressive action |
| stealth | Undetectable aircraft | Hidden or secret |
| target | Aim point | Goal or objective |
| tiger team | Special ops unit | Elite problem-solving group |
| war room | Pentagon planning | Crisis response space |
| zombie † | Undead creature | Orphaned process |

### A.4 American Food Culture (26 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| appetite | Hunger level | Willingness to invest resources |
| bite-sized | Small food portions | Small manageable pieces |
| boilerplate | Printed meal menu template | Standard template code |
| breadcrumb | Trail of crumbs | Navigation path indicator |
| can of worms | Fishing bait container | Complex problematic situation |
| cherry-pick | Select best cherries | Select only best items |
| chocolate | Flavored confection | Dark mode or variant |
| cookbook | Recipe collection | Guide or manual |
| cookie | Baked sweet treat | Browser data file |
| couch potato | Lazy person on couch | Inactive user |
| dogfooding † | Eating own dog food | Using own product internally |
| eat your own cooking | Self-consumption | Use own product |
| flavor | Taste variety | Variant or version |
| half-baked | Undercooked | Incomplete or poorly thought out |
| hamburger menu | Fast food sandwich icon | Three-line navigation icon |
| hot potato | Too hot to hold food | Controversial issue passed around |
| ingredient | Food component | Component or element |
| low-hanging fruit † | Easy orchard picking | Easily achievable goals |
| meat and potatoes | Basic American meal | Core fundamental features |
| recipe | Cooking instructions | Step-by-step procedure |
| spaghetti code | Tangled pasta | Messy unstructured code |
| spicy | Flavorful hot | Controversial or risky |
| strawberry | Berry flavor | Another variant |
| toast notification | Toaster pop-up bread | Auto-dismissing notification |
| two-pizza team | Pizza delivery sizing | Small enough team for 2 pizzas |
| vanilla | Plain ice cream flavor | Default/unmodified version |

### A.5 American Car Culture (24 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| accelerator | Gas pedal | Speed up process |
| backseat driver | Unwanted advice giver | Micromanager |
| bottleneck | Narrow passage | Constraint limiting flow |
| brake | Stop pedal | Slow or stop |
| collision | Vehicles hitting | Conflicting changes |
| congestion | Too many vehicles | System overload |
| crash | Vehicle collision | System failure |
| cruise control | Automatic speed | Automatic steady operation |
| dashboard | Car instrument panel | Visual metrics display |
| dead end | No exit road | No viable path forward |
| detour | Alternate route | Workaround |
| fast lane | High-speed lane | Quick path to success |
| fork | Highway road split | Create independent copy |
| guardrails † | Highway barriers + military | Policy constraints |
| in the driver's seat | Controlling vehicle | In control |
| kick the tires | Test vehicle | Preliminary testing |
| merge | Lane combining | Combine code branches |
| milestone | Distance marker | Progress checkpoint |
| offboarding | Getting off vehicle | User departure process |
| onboarding | Getting on vehicle | New user introduction |
| roadmap | Travel route plan | Product/project plan |
| throttle | Engine speed control | Rate limiting |
| traffic | Vehicle congestion | Network data flow |
| under the hood | Engine compartment | Internal implementation |

### A.6 American Household (22 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| blackout | Complete power loss | Total outage |
| brownout | Partial power loss | Degraded service |
| circuit breaker | Electrical protection | Overload protection |
| clean up | Tidying home | Remove unnecessary items |
| footprint | Floor space used | Resource usage |
| fuse | Electrical safety device | Protection mechanism |
| garbage collection | Weekly trash pickup | Automatic memory cleanup |
| hardwired | Permanently connected | Fixed/unchangeable |
| housekeeping | Home maintenance | Maintenance tasks |
| lint/linter | Dryer lint trap | Code static analysis |
| overhead | Attic/above storage | Additional resource cost |
| plug-in | Electrical outlet device | Software extension |
| power cycle | Turn off and on | Full restart |
| reboot | Restart (kick again) | Restart system |
| recycle bin | Recycling container | Recoverable deleted items |
| sandbox | Children's play area | Isolated test environment |
| socket | Electrical outlet | Network connection point |
| spring cleaning | Annual deep clean | Major cleanup effort |
| switch | Light switch | Toggle control |
| trash | Household waste | Deleted items |
| unplug | Remove from outlet | Disconnect |
| wire/wiring | Electrical cables | Connections |

### A.7 Wild West and Frontier (18 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| brownfield | Previously developed | Existing codebase work |
| bug bounty | Wanted poster rewards | Vulnerability finding rewards |
| claim | Territory assertion | Request for ownership |
| corral | Animal enclosure | Contain or organize |
| cowboy coding | Lone individualist | Unstructured solo development |
| frontier | Unexplored territory | Cutting edge |
| gold rush | California 1849 | Rapid opportunity pursuit |
| greenfield | Undeveloped land | New project from scratch |
| lasso | Rope catching tool | Capture or contain |
| outlaw | Criminal outside law | Unauthorized user |
| pioneer | First settler | Early adopter/creator |
| posse | Law enforcement group | Team assembled for task |
| roundup | Cattle gathering | Summary or collection |
| rustler | Cattle thief | Resource thief |
| sheriff | Town law enforcement | Security administrator |
| stake | Land claim marker | Investment or interest |
| trailblazer | Path creator | Innovator |
| wild west | Lawless frontier | Unregulated environment |

### A.8 American Pop Culture (17 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| bootcamp | Military/fitness training | Intensive learning program |
| easter egg | Hidden holiday treat | Hidden feature |
| ghost | Supernatural spirit | Deleted but visible |
| gremlin | Mischievous creature | Bug or problem |
| guru † | Hindi spiritual teacher (Americanized) | Expert or authority |
| influencer | Social media celebrity | Person with reach |
| magic | Supernatural power | Impressive capability |
| ninja † | Japanese warrior (Americanized) | Highly skilled specialist |
| rockstar † | Music celebrity | Top performer |
| skeleton | Bone structure | Minimal framework |
| spam | Monty Python sketch | Unwanted messages |
| thought leader | Celebrity intellectual | Industry expert to follow |
| troll † | Internet harasser (evolved) | Disruptive person |
| unicorn † | Mythical rare creature | Billion-dollar startup |
| vampire | Blood-drinking creature | Resource draining |
| wizard | Fantasy magic user | Expert at something |
| zombie † | Undead creature | Orphaned process |

### A.9 American Industrial Trades (14 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| architect | Building designer | System designer |
| blueprint | Construction plan | Technical design |
| drill down | Mining/construction | Investigate deeper |
| forge | Metalworking shop | Create or build |
| foundation | Building base | Core infrastructure |
| framework | Building structure | Code foundation |
| hammer | Tool | Command line tool |
| leverage † | Physics force multiplier | Use resources strategically |
| nuts and bolts | Hardware basics | Fundamental details |
| pipeline | Oil/gas transport | Data processing sequence |
| refactor | Factory reorganization | Code restructuring |
| scaffolding | Construction support | Temporary supporting code |
| toolbox | Tool container | Collection of utilities |
| wrench | Tool | Configuration tool |

### A.10 Cybersecurity and Espionage (11 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| backdoor | Secret house entrance | Hidden access point |
| cloak | Concealing garment | Hide or conceal |
| honeypot | Bee trap | Decoy to attract attackers |
| man in the middle | Interception spy | Communication interception |
| masquerade | Costume party | Pretending to be another |
| phishing | Fishing with ph | Deceptive data theft |
| sniffing | Dog detection | Network packet capture |
| spear phishing | Targeted fishing | Personalized attack |
| spoofing | Impersonation | Identity faking |
| trojan | Greek horse trick | Hidden malicious code |
| whaling | Big game hunting | Targeting executives |

### A.11 American Hacker Subculture (10 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| flame | Angry fire | Hostile message |
| geek | Carnival performer | Technical enthusiast |
| hack | Rough cut | Clever solution or breach |
| hacker | One who hacks | Skilled programmer or attacker |
| leet/1337 | Elite misspelling | Expert status |
| lurk | Hide and watch | Read without posting |
| nerd | 1950s slang | Intellectual enthusiast |
| noob | Newbie abbreviation | Inexperienced person |
| pwn | Typo of own | Defeat or compromise |
| troll † | Internet harasser (evolved) | Disruptive person |

### A.12 American Slang and Idioms (9 entries)

| Term | American cultural source | Technical or business meaning |
|---|---|---|
| bang | Comic book sound | Exclamation mark (!) |
| FOMO | Social media anxiety | Fear of Missing Out |
| hash | Pound symbol evolution | Number sign (#) |
| LGTM | Casual approval | Looks Good To Me |
| shebang | Civil War shelter/whole thing | Script interpreter line (#!) |
| TL;DR | Reddit/forum | Too Long; Did Not Read |
| touch grass | Gen Z meme | Engage with physical world |
| vibe coding | Feeling-based | Intent-described programming |
| YOLO | Drake song | You Only Live Once |

