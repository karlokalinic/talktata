/**
 * ENGLESKI ZA TATU — Curriculum Data
 * ====================================
 * Sve lekcije, fraze, vježbe i postignuća.
 * Sve lekcije, fraze, vježbe i postignuća.
 * 13 lekcija potpuno funkcionalno. Američki engleski.
 *
 * Otac: 0% engleskog, govori samo hrvatski, ide u SAD.
 * Fokus: praktične putničke fraze, američki izgovor, kulturni kontekst.
 */

/* eslint-disable */
const CURRICULUM = {

    /* ═══════════════════════════════════════════════════
       LEKCIJE
       ═══════════════════════════════════════════════════ */
    lessons: [
        {
            id: 'L1',
            title: 'Osnovni Pozdravi',
            subtitle: 'Riječi koje otvaraju vrata',
            icon: '👋',
            locked: false,
            context: 'Upravo ste stigli na njujorški aerodrom JFK. Oko vas su ljudi iz cijeloga svijeta. Ne trebate znati savršen engleski — dovoljno je nekoliko ključnih fraza da se snađete!',
            culturalTip: 'Amerikanci su otvoreni i prijateljski. Uvijek kažu "please" i "thank you" — i vole kratki small talk. Osmijeh i "Hi!" otvaraju sva vrata!',
            phrases: [
                {
                    id: 'L1P1',
                    en: 'Hello!',
                    hr: 'Bok! Zdravo!',
                    phonetic: 'HE-lou',
                    phoneticHr: 'Kao naše "he" + "LOU" (s naglaskom na "lou")',
                    tip: 'Univerzalan pozdrav. Amerikanci češće kažu "Hi!" — kraće i opuštenije.',
                    difficulty: 1,
                },
                {
                    id: 'L1P2',
                    en: 'Thank you.',
                    hr: 'Hvala.',
                    phonetic: 'FENK-ju',
                    phoneticHr: 'Stavite jezik između zuba i ispušite "f" — "FENK", zatim brzo "ju"',
                    tip: 'Najvažnija fraza u Americi! Koristite je stalno — u dućanu, restoranu, taksiju.',
                    difficulty: 1,
                },
                {
                    id: 'L1P3',
                    en: 'Yes.',
                    hr: 'Da.',
                    phonetic: 'JES',
                    phoneticHr: 'Kratko i jasno — "JES"',
                    tip: 'Jednostavno ali moćno. Amerikanci često kažu i "Yeah" (JE-a) — neformalno.',
                    difficulty: 1,
                },
                {
                    id: 'L1P4',
                    en: 'No.',
                    hr: 'Ne.',
                    phonetic: 'NOU',
                    phoneticHr: 'Duže nego naše "no" — "NOU" (s jasnim "ou" na kraju)',
                    tip: 'Zvuči slično hrvatskom ali malo duže. Naglasak je na "ou".',
                    difficulty: 1,
                },
                {
                    id: 'L1P5',
                    en: 'Please.',
                    hr: 'Molim.',
                    phonetic: 'PLIIZ',
                    phoneticHr: 'Dugo "ii" — "PLIIZ" (kao da razvlačite "i")',
                    tip: 'Dodajte na kraj bilo koje molbe. "Coffee, please." = "Kavu, molim." Čini čuda!',
                    difficulty: 1,
                },
                {
                    id: 'L1P6',
                    en: 'Excuse me.',
                    hr: 'Oprostite. / Ispričavam se.',
                    phonetic: 'iks-KJUUZ MII',
                    phoneticHr: '"iks" (kratko) + "KJUUZ" (naglasak!) + "MII" (dugo)',
                    tip: 'Za privlačenje pažnje (u redu, na ulici, kod konobara). Izuzetno korisno!',
                    difficulty: 2,
                },
                {
                    id: 'L1P7',
                    en: 'I don\'t understand.',
                    hr: 'Ne razumijem.',
                    phonetic: 'aj DOUNT an-der-STEND',
                    phoneticHr: '"aj" + "DOUNT" (ne izgovarajte "t" jako) + "ander-STEND"',
                    tip: 'KLJUČNA rečenica! Kad ovo kažete, ljudi će pokušati govoriti sporije ili drugačije objasniti.',
                    difficulty: 2,
                },
                {
                    id: 'L1P8',
                    en: 'Goodbye!',
                    hr: 'Doviđenja!',
                    phonetic: 'gud-BAJ',
                    phoneticHr: '"gud" (kratko, kao "gut" bez "t") + "BAJ" (naglasak)',
                    tip: 'Za rastanak. Amerikanci često kažu "Bye!" ili "See you!" — još jednostavnije!',
                    difficulty: 1,
                },
                {
                    id: 'L1P9',
                    en: 'Good morning.',
                    hr: 'Dobro jutro.',
                    phonetic: 'gud MOR-ning',
                    phoneticHr: '"gud" (kratko) + "MOR-ning" (naglasak na "MOR")',
                    tip: 'Koristite do otprilike podneva. Svi Amerikanci vas pozdravljaju s "Good morning!" u hotelu, dućanu...',
                    difficulty: 1,
                },
                {
                    id: 'L1P10',
                    en: 'Good night.',
                    hr: 'Laku noć.',
                    phonetic: 'gud NAJT',
                    phoneticHr: '"gud" + "NAJT" (slično hrvatskom "najt")',
                    tip: 'NE koristiti kao pozdrav pri dolasku! Samo kad odlazite navečer ili idete spavati.',
                    difficulty: 1,
                },
                {
                    id: 'L1P11',
                    en: 'How are you?',
                    hr: 'Kako ste?',
                    phonetic: 'hau AR ju',
                    phoneticHr: '"hau" + "AR" (naglasak) + "ju"',
                    tip: 'Ovo NIJE pravo pitanje! Amerikanci to koriste kao pozdrav. Odgovorite: "Good, thanks!" i gotovo.',
                    difficulty: 2,
                },
                {
                    id: 'L1P12',
                    en: 'I\'m fine, thanks.',
                    hr: 'Dobro sam, hvala.',
                    phonetic: 'ajm FAJN, fenks',
                    phoneticHr: '"ajm" + "FAJN" + "fenks" (kratko za "thank you")',
                    tip: 'Standardni odgovor na "How are you?" — čak i kad niste baš dobro, kažete "I\'m fine!"',
                    difficulty: 2,
                },
                {
                    id: 'L1P13',
                    en: 'Sorry.',
                    hr: 'Oprosti. / Žao mi je.',
                    phonetic: 'SO-ri',
                    phoneticHr: '"SO-ri" (kratko "o", naglasak na "SO")',
                    tip: 'Za ispričavanje. Razlika: "Excuse me" = privlačite pažnju, "Sorry" = ispričavate se.',
                    difficulty: 1,
                },
                {
                    id: 'L1P14',
                    en: 'Nice to meet you.',
                    hr: 'Drago mi je.',
                    phonetic: 'najs tu MIIT ju',
                    phoneticHr: '"najs" + "tu" + "MIIT" (dugo "ii") + "ju"',
                    tip: 'Kažete kad se prvi put upoznajete s nekim. Jako pristojno i ljudi to cijene!',
                    difficulty: 2,
                },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte englesku frazu i odaberite točan hrvatski prijevod.',
                    questions: [
                        {
                            phraseId: 'L1P1',
                            options: ['Bok! Zdravo!', 'Hvala.', 'Oprostite.', 'Molim.'],
                            correct: 0,
                        },
                        {
                            phraseId: 'L1P2',
                            options: ['Ne.', 'Da.', 'Hvala.', 'Doviđenja!'],
                            correct: 2,
                        },
                        {
                            phraseId: 'L1P6',
                            options: ['Doviđenja!', 'Ne razumijem.', 'Oprostite.', 'Da.'],
                            correct: 2,
                        },
                        {
                            phraseId: 'L1P7',
                            options: ['Molim.', 'Bok!', 'Ne razumijem.', 'Hvala.'],
                            correct: 2,
                        },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite englesku frazu s hrvatskim prijevodom.',
                    pairs: [
                        { en: 'Hello!', hr: 'Bok!' },
                        { en: 'Thank you.', hr: 'Hvala.' },
                        { en: 'Please.', hr: 'Molim.' },
                        { en: 'Goodbye!', hr: 'Doviđenja!' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli u ovoj situaciji?',
                    questions: [
                        {
                            situation: 'Upravo ste ušli u hotel i želite pozdraviti recepcionera.',
                            options: ['Goodbye!', 'Hello!', 'I don\'t understand.'],
                            correct: 1,
                        },
                        {
                            situation: 'Konobar vam je upravo donio kavu.',
                            options: ['Excuse me.', 'No.', 'Thank you.'],
                            correct: 2,
                        },
                        {
                            situation: 'Netko vam objašnjava nešto ali ne razumijete ništa.',
                            options: ['I don\'t understand.', 'Yes.', 'Goodbye!'],
                            correct: 0,
                        },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        {
                            hr: 'Bok! Zdravo!',
                            answer: 'hello',
                            accept: ['hello', 'hello!'],
                            hint: 'H _ _ _ o',
                        },
                        {
                            hr: 'Hvala.',
                            answer: 'thank you',
                            accept: ['thank you', 'thank you.', 'thankyou'],
                            hint: 'T _ _ _ k  y _ _',
                        },
                        {
                            hr: 'Molim.',
                            answer: 'please',
                            accept: ['please', 'please.'],
                            hint: 'P _ _ _ _ e',
                        },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"Hello" na hrvatskom znači "Bok! Zdravo!"', correct: true, explanation: 'Točno! "Hello" = Bok/Zdravo. Najosnovniji pozdrav.' },
                        { statement: '"Thank you" na hrvatskom znači "Oprostite."', correct: false, explanation: '"Thank you" = Hvala. "Excuse me" = Oprostite. NE miješajte ovo!' },
                        { statement: '"Goodbye" na hrvatskom znači "Doviđenja."', correct: true, explanation: 'Točno! "Goodbye" = Doviđenja. Kratka verzija: "Bye!"' },
                        { statement: '"Please" na hrvatskom znači "Ne."', correct: false, explanation: '"Please" = Molim. "No" = Ne. Ovo su POTPUNO različite riječi!' },
                        { statement: '"Yes" znači "Da" na hrvatskom.', correct: true, explanation: 'Točno! "Yes" = Da. Najkraća i najjednostavnija potvrda.' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara ova riječ? Slušajte pa odaberite.',
                    questions: [
                        { word: 'Thank you', options: ['TENK-ju', 'FENK-ju', 'TANK-ju', 'FANK-ju'], correct: 1, explanation: 'Ispravno: "FENK-ju". Zvuk "TH" u engleskom se izgovara sa jezikom IZMEĐU ZUBA — zvuči kao naše "F", ne "T"!' },
                        { word: 'Hello', options: ['HE-lou', 'HA-lou', 'HI-lou', 'HE-lo'], correct: 0, explanation: '"Hello" se izgovara "HE-lou" — naglasak je na drugom slogu "LOU"!' },
                        { word: 'Please', options: ['PLIZ', 'PLIIZ', 'PLEZ', 'PLAZ'], correct: 1, explanation: '"Please" = "PLIIZ" — dugo "ii" kao naše "i" ali DUŽE. Ne kratko "i"!' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'Excuse ___, where is the exit?', answer: 'me', accept: ['me'], hint: 'Zamjenica za "meni/mene" — dva slova', context: 'Tražite izlaz na aerodromu.' },
                        { sentence: '___ you very much!', answer: 'thank', accept: ['thank', 'Thank'], hint: 'Riječ za "hvala"', context: 'Zahvaljujete taksisti.' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['don\'t', 'understand', 'I'], answer: 'I don\'t understand', accept: ['I don\'t understand', 'I don\'t understand.'], context: 'Ne razumijete što vam govore.' },
                        { words: ['you', 'thank', 'much', 'very'], answer: 'thank you very much', accept: ['thank you very much', 'thank you very much.'], context: 'Zahvaljujete nekome.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku u rečenici.',
                    questions: [
                        { wrong: 'Tanks you.', options: ['Thank you.', 'Thanks you.', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'I no understand.', options: ['I don\'t understand.', 'I not understand.', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
                {
                    type: 'image-choose',
                    instruction: '🖼️ Pogledajte sliku i odaberite ispravan engleski izraz.',
                    questions: [
                        { image: '👋', prompt: 'Što prikazuje ovaj simbol?', options: ['Hello / Hi', 'Goodbye', 'Sorry', 'Help'], correct: 0 },
                        { image: '🙏', prompt: 'Što prikazuje ovaj simbol?', options: ['Please', 'Thank you', 'Sorry', 'Help me'], correct: 1 },
                        { image: '😊', prompt: 'Kako se kaže kad je netko sretan?', options: ['Sad', 'Angry', 'Happy', 'Tired'], correct: 2 },
                    ],
                },
                {
                    type: 'dialogue',
                    instruction: '💬 Popunite nedostajuću repliku u razgovoru.',
                    questions: [
                        { lines: [{ speaker: 'A', text: 'Hello! How are you?' }, { speaker: 'B', blank: true }], options: ['I am fine, thank you!', 'My name is hotel.', 'Where is the door?', 'Goodbye forever!'], correct: 0, explanation: 'Na "How are you?" odgovaramo "I\'m fine, thank you!" ili slično.' },
                        { lines: [{ speaker: 'A', text: 'What is your name?' }, { speaker: 'B', blank: true }], options: ['It is 5 o\'clock.', 'My name is Ana.', 'I don\'t like coffee.', 'The hotel is big.'], correct: 1, explanation: 'Na "What is your name?" odgovaramo s "My name is...".' },
                    ],
                },
                {
                    type: 'shadowing',
                    instruction: '🗣️ Slušajte pa ponovite naglas — imitirajte izgovor!',
                    questions: [
                        { phrase: 'Hello, how are you?', phonetic: 'he-LOU, hau ar JU?' },
                        { phrase: 'Thank you very much!', phonetic: 'THENK ju VE-ri mač!' },
                        { phrase: 'Nice to meet you.', phonetic: 'NAJS tu MIIT ju.' },
                    ],
                },
                {
                    type: 'minimal-pairs',
                    instruction: '🎧 Slušajte pažljivo — koja je riječ izgovorena?',
                    questions: [
                        { words: ['thank', 'tank'], phonetics: ['/θæŋk/', '/tæŋk/'], correct: 0, explanation: '"Thank" ima "TH" zvuk — jezik ide IZMEĐU zuba! "Tank" je rezervoar/tenk.' },
                        { words: ['three', 'tree'], phonetics: ['/θriː/', '/triː/'], correct: 0, explanation: '"Three" = tri (TH zvuk). "Tree" = drvo (T zvuk). Hrvati ih često miješaju!' },
                    ],
                },
                {
                    type: 'role-play',
                    instruction: '🎭 Što biste rekli u ovoj situaciji?',
                    questions: [
                        { icon: '🤝', situation: 'Upoznajete nekoga prvi put na zabavi. Što kažete?', options: ['Nice to meet you!', 'See you later!', 'I am hungry.', 'Where is the exit?'], correct: 0, explanation: '"Nice to meet you" = Drago mi je. Standardni pozdrav pri upoznavanju.' },
                        { icon: '🚪', situation: 'Netko vam drži vrata. Što kažete?', options: ['Go away!', 'Thank you!', 'My name is...', 'How much?'], correct: 1, explanation: '"Thank you" je pravilan odgovor kad vam netko napravi uslugu.' },
                    ],
                },
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite točan prijevod — nove fraze!',
                    questions: [
                        { phraseId: 'L1P9', options: ['Laku noć.', 'Dobro jutro.', 'Dobar dan.', 'Doviđenja!'], correct: 1 },
                        { phraseId: 'L1P10', options: ['Dobro jutro.', 'Kako ste?', 'Laku noć.', 'Hvala.'], correct: 2 },
                        { phraseId: 'L1P11', options: ['Kako ste?', 'Oprosti.', 'Drago mi je.', 'Molim.'], correct: 0 },
                        { phraseId: 'L1P13', options: ['Molim.', 'Ne.', 'Oprosti.', 'Bok!'], correct: 2 },
                        { phraseId: 'L1P14', options: ['Laku noć.', 'Drago mi je.', 'Ne razumijem.', 'Dobro sam.'], correct: 1 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove — novi pozdravi!',
                    pairs: [
                        { en: 'Good morning.', hr: 'Dobro jutro.' },
                        { en: 'Good night.', hr: 'Laku noć.' },
                        { en: 'How are you?', hr: 'Kako ste?' },
                        { en: 'Sorry.', hr: 'Oprosti.' },
                        { en: 'Nice to meet you.', hr: 'Drago mi je.' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli u ovoj situaciji? — Novi scenariji!',
                    questions: [
                        { situation: 'Dolazite ujutro na recepciju hotela.', options: ['Good night.', 'Good morning.', 'Sorry.'], correct: 1 },
                        { situation: 'Slučajno ste gurnuli nekoga u redu.', options: ['Nice to meet you.', 'How are you?', 'Sorry.'], correct: 2 },
                        { situation: 'Upoznajete novog susjeda.', options: ['I\'m fine, thanks.', 'Nice to meet you.', 'Good night.'], correct: 1 },
                        { situation: 'Netko vas pita "How are you?"', options: ['Goodbye!', 'I\'m fine, thanks.', 'Please.'], correct: 1 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite ove nove fraze na engleskom.',
                    questions: [
                        { hr: 'Dobro jutro.', answer: 'good morning', accept: ['good morning', 'good morning.'], hint: 'G _ _ d  m _ _ _ _ _ g' },
                        { hr: 'Oprosti.', answer: 'sorry', accept: ['sorry', 'sorry.'], hint: 'S _ _ _ y' },
                        { hr: 'Kako ste?', answer: 'how are you', accept: ['how are you', 'how are you?'], hint: 'H _ w  a _ _  y _ u' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"Good morning" znači "Dobro jutro."', correct: true, explanation: 'Točno! Koristite do podneva.' },
                        { statement: '"Good night" znači "Dobar dan."', correct: false, explanation: '"Good night" = Laku noć! "Good afternoon" = Dobar dan.' },
                        { statement: '"Sorry" i "Excuse me" znače potpuno isto.', correct: false, explanation: '"Sorry" = isprika. "Excuse me" = privlačenje pažnje. RAZLIČITA značenja!' },
                        { statement: '"How are you?" je pravo pitanje o zdravlju u Americi.', correct: false, explanation: 'NE! To je samo pozdrav. Odgovorite "I\'m fine, thanks!" i nastavite dalje.' },
                        { statement: '"Nice to meet you" se kaže pri upoznavanju.', correct: true, explanation: 'Točno! Kažete to prvi put kad upoznajete nekoga.' },
                    ],
                },
                {
                    type: 'memory-match',
                    instruction: '🃏 Okrenite kartice i pronađite parove (engleski ↔ hrvatski)!',
                    pairs: [
                        { en: 'Hello', hr: 'Bok' },
                        { en: 'Thank you', hr: 'Hvala' },
                        { en: 'Please', hr: 'Molim' },
                        { en: 'Sorry', hr: 'Oprostite' },
                        { en: 'Goodbye', hr: 'Doviđenja' },
                    ],
                },
            ],
        },

        {
            id: 'L2',
            title: 'Na Aerodromu',
            subtitle: 'Passport, prtljaga, prijevoz',
            icon: '✈️',
            locked: true,
            context: 'Prošli ste passport kontrolu na JFK-u i sada trebate naći svoju prtljagu i taksi ili Uber do hotela.',
            culturalTip: 'Na američkim aerodromima sve je označeno na engleskom i ponekad španjolskom. "Arrivals" = dolasci, "Baggage Claim" = preuzimanje prtljage, "Exit" = izlaz, "Ground Transportation" = prijevoz.',
            phrases: [
                {
                    id: 'L2P1',
                    en: 'Where is the exit?',
                    hr: 'Gdje je izlaz?',
                    phonetic: 'WER IZ di EK-sit?',
                    phoneticHr: '"WER" (kratko) + "IZ" + "di" (brzo) + "EK-sit"',
                    tip: '"Where is...?" je magična formula. Dodajte bilo što na kraj!',
                    difficulty: 2,
                },
                {
                    id: 'L2P2',
                    en: 'I need a taxi.',
                    hr: 'Trebam taksi.',
                    phonetic: 'aj NIID e TEK-si',
                    phoneticHr: '"aj" + "NIID" (dugo ii) + "e" (kratko) + "TEK-si"',
                    tip: '"I need..." = "Trebam..." — vrlo korisna konstrukcija. U SAD-u je Uber/Lyft isto čest.',
                    difficulty: 2,
                },
                {
                    id: 'L2P3',
                    en: 'My name is...',
                    hr: 'Zovem se...',
                    phonetic: 'maj NEJM iz...',
                    phoneticHr: '"maj" + "NEJM" + "iz" — pa dodajte svoje ime',
                    tip: 'Na passport kontroli ćete ovo možda trebati. Vaše ime izgovorite polako i jasno.',
                    difficulty: 2,
                },
                {
                    id: 'L2P4',
                    en: 'How much is this?',
                    hr: 'Koliko ovo košta?',
                    phonetic: 'HAU mač iz DIS?',
                    phoneticHr: '"HAU" (kao "hau") + "mač" (kratko) + "iz" + "DIS"',
                    tip: 'Za kupovinu, taksi, ulaznice — svugdje korisno!',
                    difficulty: 2,
                },
                {
                    id: 'L2P5',
                    en: 'Can you help me?',
                    hr: 'Možete li mi pomoći?',
                    phonetic: 'ken ju HELP mii?',
                    phoneticHr: '"ken" (kratko) + "ju" + "HELP" + "mii" (dugo)',
                    tip: 'Ljudima se sviđa kad ih pristojno zamoliš za pomoć.',
                    difficulty: 2,
                },
                {
                    id: 'L2P6',
                    en: 'Where is the restroom?',
                    hr: 'Gdje je zahod/WC?',
                    phonetic: 'WER IZ di REST-ruum?',
                    phoneticHr: '"WER IZ di REST-ruum"',
                    tip: 'U Americi kažite "restroom" ili "bathroom" — nikad "toilet" (to zvuči čudno Amerikancima).',
                    difficulty: 2,
                },
                {
                    id: 'L2P7',
                    en: 'I have a reservation.',
                    hr: 'Imam rezervaciju.',
                    phonetic: 'aj HEV e re-zer-VEJ-šn',
                    phoneticHr: '"aj" + "HEV" + "e" + "re-zer-VEJ-šn"',
                    tip: 'Za hotel, restoran, rent-a-car — uvijek koristite ovu frazu na recepciji.',
                    difficulty: 2,
                },
                {
                    id: 'L2P8',
                    en: 'I don\'t speak English.',
                    hr: 'Ne govorim engleski.',
                    phonetic: 'aj DOUNT spiik ING-liš',
                    phoneticHr: '"aj DOUNT spiik ING-liš"',
                    tip: 'Ironično — ovu rečenicu na engleskom trebate znati! Ljudi će tada pokušati komunicirati gestama ili naći prevoditelja.',
                    difficulty: 2,
                },
                {
                    id: 'L2P9',
                    en: 'Can you speak slowly?',
                    hr: 'Možete li govoriti sporije?',
                    phonetic: 'ken ju SPIIK SLOU-li?',
                    phoneticHr: '"ken ju SPIIK SLOU-li"',
                    tip: 'Kad Amerikanci govore brzo (a UVIJEK govore brzo!), ovo je spas.',
                    difficulty: 2,
                },
                {
                    id: 'L2P10',
                    en: 'Where is baggage claim?',
                    hr: 'Gdje se preuzima prtljaga?',
                    phonetic: 'WER IZ BA-gidž klejm?',
                    phoneticHr: '"WER IZ BA-gidž klejm"',
                    tip: 'Baggage claim = mjesto gdje pokupiš kofere nakon leta. Slijedite znakove!',
                    difficulty: 2,
                },
                {
                    id: 'L2P11',
                    en: 'This is my first time here.',
                    hr: 'Ovo mi je prvi put ovdje.',
                    phonetic: 'DIS iz maj FIRST tajm HIIR',
                    phoneticHr: '"DIS iz maj FIRST tajm HIIR"',
                    tip: 'Američki carinici pitaju "First time?" — ovo vam je spreman odgovor.',
                    difficulty: 2,
                },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite točan prijevod.',
                    questions: [
                        { phraseId: 'L2P1', options: ['Gdje je izlaz?', 'Koliko košta?', 'Trebam taksi.', 'Zovem se...'], correct: 0 },
                        { phraseId: 'L2P4', options: ['Zovem se...', 'Koliko ovo košta?', 'Gdje je WC?', 'Trebam taksi.'], correct: 1 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'Where is the exit?', hr: 'Gdje je izlaz?' },
                        { en: 'I need a taxi.', hr: 'Trebam taksi.' },
                        { en: 'How much is this?', hr: 'Koliko ovo košta?' },
                        { en: 'Can you help me?', hr: 'Možete li mi pomoći?' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Izgubili ste se na aerodromu i ne možete naći izlaz.', options: ['Where is the exit?', 'My name is...', 'How much is this?'], correct: 0 },
                        { situation: 'Želite saznati cijenu suvenira u dućanu.', options: ['I need a taxi.', 'Where is the restroom?', 'How much is this?'], correct: 2 },
                        { situation: 'Trebate WC na aerodromu.', options: ['Where is the exit?', 'Where is the restroom?', 'I need a taxi.'], correct: 1 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Trebam taksi.', answer: 'I need a taxi', accept: ['i need a taxi', 'i need a taxi.'], hint: 'I n _ _ _ a t _ _ _' },
                        { hr: 'Gdje je izlaz?', answer: 'where is the exit', accept: ['where is the exit', 'where is the exit?'], hint: 'W _ _ _ _ i _ t _ _ e _ _ _?' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"Where is the exit?" znači "Gdje je izlaz?"', correct: true, explanation: 'Točno! "Exit" = izlaz. "Where is the..." = Gdje je...' },
                        { statement: '"I need a taxi" znači "Imam taksi."', correct: false, explanation: '"I need" = Trebam, NE "imam". "I have" = Imam. Velika razlika u značenju!' },
                        { statement: '"How much is this?" znači "Koliko ovo košta?"', correct: true, explanation: 'Točno! "How much" = koliko (za cijenu). Korisno u svakom dućanu!' },
                        { statement: '"Can you help me?" znači "Mogu li vam pomoći?"', correct: false, explanation: '"Can you help ME?" = Možete li MI pomoći? Vi tražite pomoć, ne nudite je! "Can I help you?" bi bilo "Mogu li vam pomoći?"' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Where', options: ['VER', 'WER', 'VIER', 'VJER'], correct: 1, explanation: '"Where" = "WER". Engleski "W" NIJE naše "V"! Zaoblite USNE kao da pijete kroz slamku, pa izgovorite "WER".' },
                        { word: 'Taxi', options: ['TAK-si', 'TEK-si', 'TAKS-i', 'TAK-zi'], correct: 0, explanation: '"Taxi" = "TAK-si". Ovo je lako — zvuči gotovo isto kao na hrvatskom!' },
                        { word: 'Restroom', options: ['REST-rum', 'REST-ruum', 'RIS-trum', 'RE-stroom'], correct: 1, explanation: '"Restroom" = "REST-ruum". Naglasak na REST, a "room" je dugo "uu".' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['is', 'exit', 'where', 'the'], answer: 'where is the exit', accept: ['where is the exit', 'where is the exit?'], context: 'Tražite izlaz.' },
                        { words: ['a', 'taxi', 'I', 'need'], answer: 'I need a taxi', accept: ['I need a taxi', 'I need a taxi.'], context: 'Trebate prijevoz.' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'Where is the ___?', answer: 'exit', accept: ['exit'], hint: 'Izlaz — 4 slova', context: 'Tražite izlaz na aerodromu.' },
                        { sentence: 'How ___ is this?', answer: 'much', accept: ['much'], hint: 'Koliko (za cijenu)', context: 'Pitajte za cijenu.' },
                    ],
                },
                {
                    type: 'dictation',
                    instruction: '🎧 Slušajte rečenicu i upišite što čujete.',
                    questions: [
                        { sentence: 'Where is the exit?' },
                        { sentence: 'I need a taxi, please.' },
                    ],
                },
                {
                    type: 'context-guess',
                    instruction: '🧠 Pogodite značenje označene riječi iz konteksta.',
                    questions: [
                        { sentence: 'I need to claim my baggage at the carousel.', targetWord: 'baggage', options: ['prtljaga', 'karta', 'hrana', 'novac'], correct: 0 },
                        { sentence: 'The flight was delayed by two hours.', targetWord: 'delayed', options: ['otkazan', 'kasni/odgođen', 'preusmjeren', 'besplatan'], correct: 1 },
                    ],
                },
                {
                    type: 'error-detect',
                    instruction: '🔍 Kliknite na KRIVU riječ u rečenici.',
                    questions: [
                        { sentence: 'Where is a exit?', wrongWordIdx: 2, correction: 'the', correctedSentence: 'Where is the exit?' },
                        { sentence: 'I wants a taxi please.', wrongWordIdx: 1, correction: 'want', correctedSentence: 'I want a taxi please.' },
                    ],
                },
                {
                    type: 'story-sequence',
                    instruction: '📖 Poredajte događaje u ispravan kronološki redoslijed.',
                    questions: [
                        { title: 'Dolazak na aerodrom — što se događa kojim redom?', sentences: ['The plane lands at JFK airport.', 'You go through passport control.', 'You pick up your baggage.', 'You find a taxi outside.', 'You arrive at the hotel.'] },
                    ],
                },
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte nove aerodromske fraze i odaberite prijevod.',
                    questions: [
                        { phraseId: 'L2P7', options: ['Imam rezervaciju.', 'Trebam taksi.', 'Gdje je izlaz?', 'Koliko košta?'], correct: 0 },
                        { phraseId: 'L2P8', options: ['Ne razumijem.', 'Ne govorim engleski.', 'Oprosti.', 'Hvala.'], correct: 1 },
                        { phraseId: 'L2P9', options: ['Možete li govoriti sporije?', 'Gdje je WC?', 'Koliko košta?', 'Imam rezervaciju.'], correct: 0 },
                        { phraseId: 'L2P10', options: ['Trebam taksi.', 'Imam rezervaciju.', 'Gdje se preuzima prtljaga?', 'Zovem se...'], correct: 2 },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli u ovoj situaciji?',
                    questions: [
                        { situation: 'Na aerodromu ne znate gdje su kovčezi.', options: ['Can you speak slowly?', 'Where is baggage claim?', 'I have a reservation.'], correct: 1 },
                        { situation: 'Netko govori prebrzo i ništa ne razumijete.', options: ['Can you speak slowly?', 'How much is this?', 'Where is the exit?'], correct: 0 },
                        { situation: 'Dolazite na recepciju hotela.', options: ['I don\'t speak English.', 'Where is baggage claim?', 'I have a reservation.'], correct: 2 },
                        { situation: 'Carinik vas pita nešto što ne razumijete. Želite objasniti da ne znate engleski.', options: ['I don\'t speak English.', 'This is my first time here.', 'I need a taxi.'], correct: 0 },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Točno ili netočno?',
                    questions: [
                        { statement: '"Baggage claim" je mjesto za preuzimanje prtljage.', correct: true, explanation: 'Točno! Na aerodromu slijedite znakove "Baggage Claim".' },
                        { statement: '"I don\'t speak English" znači "Govorim engleski."', correct: false, explanation: '"I DON\'T speak English" = NE govorim engleski. "Don\'t" znači "ne".' },
                        { statement: '"Can you speak slowly?" je pristojno pitanje.', correct: true, explanation: 'Točno! Amerikanci će obično pokušati usporiti kad ih zamolite.' },
                        { statement: '"I have a reservation" koristite samo u restoranu.', correct: false, explanation: 'Koristite svugdje — hotel, restoran, rent-a-car, izleti...' },
                    ],
                },
            ],
        },

        {
            id: 'L3',
            title: 'U Hotelu',
            subtitle: 'Prijava, soba, doručak',
            icon: '🏨',
            locked: true,
            context: 'Stigli ste u hotel na Manhattanu. Recepcioner vas čeka sa smiješkom.',
            culturalTip: 'U američkim hotelima uvijek kažite "please" i "thank you". Check-in je obično od 15:00 (3 PM), a check-out do 11:00 AM. Napojnica (tip) za nosača prtljage je $1-2 po koferu.',
            phrases: [
                { id: 'L3P1', en: 'I have a reservation.', hr: 'Imam rezervaciju.', phonetic: 'aj hev e re-zer-VEJ-šn', phoneticHr: '"aj hev" + "e" + "rezer-VEJ-šn"', tip: 'Prvo što kažete na recepciji.', difficulty: 2 },
                { id: 'L3P2', en: 'What time is breakfast?', hr: 'U koliko sati je doručak?', phonetic: 'WAT TAJM iz BREK-fest?', phoneticHr: '"WAT TAJM iz BREK-fest"', tip: 'Doručak (breakfast) je obično 7-10 ujutro.', difficulty: 2 },
                { id: 'L3P3', en: 'The room is very nice.', hr: 'Soba je jako lijepa.', phonetic: 'de RUUM iz VE-ri NAJS', phoneticHr: '"de RUUM iz VE-ri NAJS"', tip: 'Kompliment koji će razveseliti osoblje!', difficulty: 2 },
                { id: 'L3P4', en: 'Could I have the key?', hr: 'Mogu li dobiti ključ?', phonetic: 'kud aj hev de KII?', phoneticHr: '"kud aj hev de KII?"', tip: '"Could I have...?" = "Mogu li dobiti...?" — uljudan način traženja.', difficulty: 3 },
                { id: 'L3P5', en: 'Where is the restaurant?', hr: 'Gdje je restoran?', phonetic: 'WER IZ de RES-trant?', phoneticHr: '"WER IZ de RES-trant?" (naglasak na RES)', tip: '"Where is the...?" + bilo što = pitanje za lokaciju.', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L3P1', options: ['Imam rezervaciju.', 'Gdje je restoran?', 'Soba je lijepa.', 'U koliko je doručak?'], correct: 0 },
                        { phraseId: 'L3P4', options: ['Mogu li dobiti ključ?', 'Imam rezervaciju.', 'Gdje je restoran?', 'Soba je lijepa.'], correct: 0 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'I have a reservation.', hr: 'Imam rezervaciju.' },
                        { en: 'What time is breakfast?', hr: 'Koliko sati je doručak?' },
                        { en: 'The room is very nice.', hr: 'Soba je jako lijepa.' },
                        { en: 'Where is the restaurant?', hr: 'Gdje je restoran?' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Stigli ste u hotel i želite se prijaviti.', options: ['I have a reservation.', 'The room is very nice.', 'What time is breakfast?'], correct: 0 },
                        { situation: 'Želite znati kad počinje doručak.', options: ['Could I have the key?', 'What time is breakfast?', 'Where is the restaurant?'], correct: 1 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Imam rezervaciju.', answer: 'I have a reservation', accept: ['i have a reservation', 'i have a reservation.'], hint: 'I h _ _ _ a r _ _ _ _ v _ _ _ _ n' },
                        { hr: 'Soba je jako lijepa.', answer: 'the room is very nice', accept: ['the room is very nice', 'the room is very nice.'], hint: 'T _ _ r _ _ _ i _ v _ _ _ n _ _ _' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"I have a reservation" znači "Imam rezervaciju."', correct: true, explanation: 'Točno! "Reservation" se koristi za hotelske i restoranske rezervacije.' },
                        { statement: '"What time is breakfast?" znači "Gdje je doručak?"', correct: false, explanation: '"What TIME" = U koliko SATI, ne "gdje". "Where is breakfast?" bi značilo "Gdje je doručak?"' },
                        { statement: '"Could I have the key?" znači "Imam ključ."', correct: false, explanation: '"Could I HAVE...?" = Mogu li DOBITI? To je PITANJE, ne tvrdnja! "I have the key" bi značilo "Imam ključ."' },
                        { statement: '"Where is the restaurant?" znači "Gdje je restoran?"', correct: true, explanation: 'Točno! "Where is the...?" je univerzalni obrazac za traženje lokacije.' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Reservation', options: ['re-zer-VA-tion', 're-zer-VEJ-šn', 're-SER-va-tion', 'RE-ser-va-tion'], correct: 1, explanation: '"Reservation" = "re-zer-VEJ-šn". Naglasak na VEJ! Krajnje "-tion" se izgovara "šn", NE "tion"!' },
                        { word: 'Breakfast', options: ['BRE-ak-fast', 'BREK-fest', 'BREK-fast', 'BRI-kfest'], correct: 1, explanation: '"Breakfast" = "BREK-fest". Dva sloga, naglasak na BREK. Ne izgovarajte svako slovo — "break" + "fast" se stapaju u "BREK-fest".' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['time', 'what', 'breakfast', 'is'], answer: 'what time is breakfast', accept: ['what time is breakfast', 'what time is breakfast?'], context: 'Pitate kad je doručak.' },
                        { words: ['the', 'I', 'have', 'key', 'could'], answer: 'could I have the key', accept: ['could I have the key', 'could I have the key?'], context: 'Tražite ključ od sobe.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'I have reservation.', options: ['I have a reservation.', 'I have the reservation.', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'Where is restaurant?', options: ['Where is a restaurant?', 'Where is the restaurant?', 'Rečenica je ispravna.'], correct: 1 },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'I have ___ reservation.', answer: 'a', accept: ['a'], hint: 'Neodređeni član — jedno slovo!', context: 'Prijavljivanje u hotel.' },
                        { sentence: 'What ___ is breakfast?', answer: 'time', accept: ['time'], hint: 'Riječ za "vrijeme/sat"', context: 'Pitate za raspored doručka.' },
                    ],
                },
                {
                    type: 'memory-match',
                    instruction: '🃏 Spojite engleske i hrvatske hotelske fraze!',
                    pairs: [
                        { en: 'Check in', hr: 'Prijaviti se' },
                        { en: 'Check out', hr: 'Odjaviti se' },
                        { en: 'Key card', hr: 'Kartica za sobu' },
                        { en: 'Elevator', hr: 'Dizalo' },
                        { en: 'Lobby', hr: 'Predvorje' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L4 — U Restoranu
        // ═══════════════════════════════════════════════════
        {
            id: 'L4',
            title: 'U Restoranu',
            subtitle: 'Naručivanje hrane i pića',
            icon: '🍽️',
            locked: true,
            context: 'Sjedite u tipičnom američkom restoranu. Konobarica se približava s izbornik om i osmijehom. "Hi, how are y\'all doing today?"',
            culturalTip: 'U Americi se napojnica OBAVEZNO daje — 15-20% računa. Konobar/ica živi od napojnica! "Check" je američki za račun. Voda je u restoranima obično besplatna.',
            phrases: [
                { id: 'L4P1', en: 'A table for two, please.', hr: 'Stol za dvoje, molim.', phonetic: 'e TEJBL for TUU, PLIIZ', phoneticHr: '"e TEJBL for TUU PLIIZ"', tip: 'Recite broj osoba: "for one", "for two", "for three"...', difficulty: 2 },
                { id: 'L4P2', en: 'Can I see the menu?', hr: 'Mogu li vidjeti jelovnik?', phonetic: 'ken aj SII de MEN-ju?', phoneticHr: '"ken aj SII de MEN-ju?"', tip: '"Menu" se izgovara "MEN-ju". U Americi ga često dobijete automatski.', difficulty: 2 },
                { id: 'L4P3', en: 'I would like a coffee, please.', hr: 'Htio bih kavu, molim.', phonetic: 'aj wud LAJK e KA-fi, PLIIZ', phoneticHr: '"aj wud LAJK e KA-fi PLIIZ"', tip: '"I would like..." je uljudan način naručivanja. U Americi kava često ima besplatno dopunjavanje (free refills)!', difficulty: 2 },
                { id: 'L4P4', en: 'Water, please.', hr: 'Vodu, molim.', phonetic: 'WAH-ter, PLIIZ', phoneticHr: '"WAH-ter PLIIZ" (američki: "WAH-ter", ne "VOO-ter")', tip: 'U Americi voda u restoranu je obično besplatna — "tap water".', difficulty: 1 },
                { id: 'L4P5', en: 'The check, please.', hr: 'Račun, molim.', phonetic: 'de ČEK, PLIIZ', phoneticHr: '"de ČEK PLIIZ"', tip: '"Check" = račun u Americi. Ne "bill" — to je više britanski.', difficulty: 1 },
                { id: 'L4P6', en: 'This is delicious!', hr: 'Ovo je ukusno!', phonetic: 'DIS iz di-LI-šes!', phoneticHr: '"DIS iz di-LI-šes!"', tip: 'Lijep kompliment! Amerikanci vole čuti da uživate u hrani.', difficulty: 2 },
                { id: 'L4P7', en: 'I am vegetarian.', hr: 'Ja sam vegetarijanac.', phonetic: 'aj em ve-dže-TER-i-en', phoneticHr: '"aj em ve-dže-TER-i-en"', tip: 'Korisno ako imate posebne prehrambene zahtjeve. U Americi je vegetarijanstvo vrlo rašireno.', difficulty: 2 },
                { id: 'L4P8', en: 'No sugar, thank you.', hr: 'Bez šećera, hvala.', phonetic: 'NOU ŠU-ger, FENK-ju', phoneticHr: '"NOU ŠU-ger FENK-ju"', tip: 'Jednostavan način da kažete što ne želite.', difficulty: 1 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte englesku frazu i odaberite točan prijevod.',
                    questions: [
                        { phraseId: 'L4P3', options: ['Htio bih kavu, molim.', 'Račun, molim.', 'Vodu, molim.', 'Stol za dvoje.'], correct: 0 },
                        { phraseId: 'L4P5', options: ['Vodu, molim.', 'Ovo je ukusno!', 'Račun, molim.', 'Bez šećera, hvala.'], correct: 2 },
                        { phraseId: 'L4P1', options: ['Stol za dvoje, molim.', 'Mogu li vidjeti jelovnik?', 'Htio bih kavu.', 'Račun, molim.'], correct: 0 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite englesku frazu s hrvatskim prijevodom.',
                    pairs: [
                        { en: 'A table for two, please.', hr: 'Stol za dvoje, molim.' },
                        { en: 'The check, please.', hr: 'Račun, molim.' },
                        { en: 'Water, please.', hr: 'Vodu, molim.' },
                        { en: 'This is delicious!', hr: 'Ovo je ukusno!' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli u ovoj situaciji?',
                    questions: [
                        { situation: 'Konobar vas pita što želite popiti.', options: ['The check, please.', 'I would like a coffee, please.', 'This is delicious!'], correct: 1 },
                        { situation: 'Završili ste jelo i želite platiti.', options: ['Can I see the menu?', 'A table for two, please.', 'The check, please.'], correct: 2 },
                        { situation: 'Nemate posebnih zahtjeva, ali ne želite šećer u kavi.', options: ['I am vegetarian.', 'No sugar, thank you.', 'Water, please.'], correct: 1 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Vodu, molim.', answer: 'water please', accept: ['water please', 'water, please', 'water, please.', 'water please.'], hint: 'W _ _ _ r, p _ _ _ _ e' },
                        { hr: 'Račun, molim.', answer: 'the check please', accept: ['the check please', 'the check, please', 'the check, please.', 'check please'], hint: 'T _ _ c _ _ _ _, p _ _ _ _ e' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'I would like ___ coffee, please.', answer: 'a', accept: ['a'], hint: 'Članak za jedninu — jedno slovo!', context: 'Naručujete kavu u restoranu.' },
                        { sentence: 'The ___, please.', answer: 'check', accept: ['check'], hint: 'Američki engleski za "račun"', context: 'Želite platiti u restoranu.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'I would like coffee, please.', options: ['I would like a coffee, please.', 'I would like the coffee, please.', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'Can I see menu?', options: ['Can I see a menu?', 'Can I see the menu?', 'Rečenica je ispravna.'], correct: 1 },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['please', 'a', 'coffee', 'I', 'like', 'would'], answer: 'I would like a coffee please', accept: ['I would like a coffee please', 'I would like a coffee, please'], context: 'Naručujete kavu.' },
                        { words: ['please', 'check', 'the'], answer: 'the check please', accept: ['the check please', 'the check, please'], context: 'Želite platiti.' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"The check, please" znači "Račun, molim."', correct: true, explanation: 'Točno! U Americi "check" = račun u restoranu. U Britaniji kažu "bill".' },
                        { statement: '"Water, please" znači "Vino, molim."', correct: false, explanation: '"Water" = VODA, ne vino! "Wine" = vino. Ove riječi zvuče slično Hrvatima ali su potpuno različite!' },
                        { statement: '"I am vegetarian" znači "Ja sam gladan."', correct: false, explanation: '"Vegetarian" = vegetarijanac. "I am hungry" = Ja sam gladan. Potpuno različito značenje!' },
                        { statement: '"This is delicious!" znači "Ovo je ukusno!"', correct: true, explanation: 'Točno! "Delicious" = ukusno/izvrsno. Odličan kompliment kuharu!' },
                        { statement: '"No sugar" znači "Više šećera."', correct: false, explanation: '"No" = BEZ/NE. "No sugar" = bez šećera. "More sugar" bi bilo "više šećera"!' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Water', options: ['VA-ter', 'WAH-ter', 'VOO-ter', 'VEJ-ter'], correct: 1, explanation: '"Water" = "WAH-ter" u američkom! NE "VOO-ter"! Usne zaoblite za "W", a "a" je otvoreno "AH". Ovo je jedna od NAJČEŠĆIH grešaka Hrvata!' },
                        { word: 'Would', options: ['VOULD', 'VULD', 'WUD', 'VOOD'], correct: 2, explanation: '"Would" = "WUD". Slovo "L" se NE IZGOVARA! I opet — "W" nije naše "V"!' },
                        { word: 'Delicious', options: ['de-li-CI-ous', 'di-LI-šes', 'de-li-ŠOUS', 'DEL-i-cious'], correct: 1, explanation: '"Delicious" = "di-LI-šes". Naglasak na LI, a "-cious" se izgovara "šes", ne "ci-ous"!' },
                    ],
                },
                {
                    type: 'image-choose',
                    instruction: '🖼️ Pogledajte sliku i odaberite ispravan engleski izraz.',
                    questions: [
                        { image: '🍕', prompt: 'Kako se kaže ova hrana na engleskom?', options: ['Pizza', 'Burger', 'Salad', 'Pasta'], correct: 0 },
                        { image: '☕', prompt: 'Što je ovo?', options: ['Tea', 'Juice', 'Coffee', 'Water'], correct: 2 },
                        { image: '🧊', prompt: 'Ako tražite led u piće, kažete...', options: ['With ice, please', 'Cold water', 'No fire', 'Freeze please'], correct: 0 },
                    ],
                },
                {
                    type: 'context-guess',
                    instruction: '🧠 Pogodite značenje označene riječi iz konteksta rečenice.',
                    questions: [
                        { sentence: 'The waiter brought us the bill after dessert.', targetWord: 'bill', options: ['račun', 'piće', 'desert', 'stol'], correct: 0 },
                        { sentence: 'This steak is so tender and juicy!', targetWord: 'tender', options: ['skupo', 'mekano/nježno', 'slano', 'veliko'], correct: 1 },
                    ],
                },
                {
                    type: 'dictation',
                    instruction: '🎧 Slušajte rečenicu i upišite na engleskom.',
                    questions: [
                        { sentence: 'I would like a coffee, please.' },
                        { sentence: 'Can I have the check?' },
                    ],
                },
                {
                    type: 'error-detect',
                    instruction: '🔍 Kliknite na KRIVU riječ.',
                    questions: [
                        { sentence: 'I would likes a salad.', wrongWordIdx: 2, correction: 'like', correctedSentence: 'I would like a salad.' },
                    ],
                },
                {
                    type: 'story-sequence',
                    instruction: '📖 Poredajte radnje u ispravnom redoslijedu.',
                    questions: [
                        { title: 'Večera u restoranu — kronološki redoslijed:', sentences: ['You enter the restaurant.', 'The waiter gives you the menu.', 'You order food and drinks.', 'The waiter brings your food.', 'You eat and enjoy the meal.', 'You ask for the check.', 'You pay and leave a tip.'] },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L5 — Pitam za Put (Directions)
        // ═══════════════════════════════════════════════════
        {
            id: 'L5',
            title: 'Pitam za Put',
            subtitle: 'Lijevo, desno, ravno — snalaženje u gradu',
            icon: '🗺️',
            locked: true,
            context: 'Hodate ulicama New Yorka i tražite Times Square. Netko staje da vam pomogne.',
            culturalTip: 'Amerikanci koriste "blocks" za označavanje udaljenosti u gradu. "It\'s two blocks away" = dve ulice dalje. Manhattan ima numeriran grid — vrlo lako za snalaženje!',
            phrases: [
                { id: 'L5P1', en: 'Excuse me, where is the museum?', hr: 'Oprostite, gdje je muzej?', phonetic: 'iks-KJUUZ mii, WER iz de mju-ZII-em?', phoneticHr: '"iks-KJUUZ mii, WER iz de mju-ZII-em?"', tip: '"Excuse me" + "Where is the..." = savršeno pitanje za lokaciju.', difficulty: 2 },
                { id: 'L5P2', en: 'Turn left.', hr: 'Skrenite lijevo.', phonetic: 'TERN LEFT', phoneticHr: '"TERN LEFT"', tip: 'Left = lijevo. Zapamtite: L kao Lijevo.', difficulty: 1 },
                { id: 'L5P3', en: 'Turn right.', hr: 'Skrenite desno.', phonetic: 'TERN RAJT', phoneticHr: '"TERN RAJT"', tip: 'Right = desno. Također znači "ispravno" — dva značenja!', difficulty: 1 },
                { id: 'L5P4', en: 'Go straight ahead.', hr: 'Idite ravno naprijed.', phonetic: 'GOU STREJT e-HED', phoneticHr: '"GOU STREJT e-HED"', tip: '"Straight" = ravno. "Ahead" = naprijed.', difficulty: 2 },
                { id: 'L5P5', en: 'Is it far?', hr: 'Je li daleko?', phonetic: 'iz it FAAR?', phoneticHr: '"iz it FAAR?" (dugo "aa")', tip: 'Kratko pitanje, jako korisno kad ne znate koliko ćete hodati.', difficulty: 1 },
                { id: 'L5P6', en: 'It is on the left.', hr: 'To je lijevo.', phonetic: 'it iz an de LEFT', phoneticHr: '"it iz an de LEFT"', tip: 'Kad vam netko kaže ovo, gledajte lijevo!', difficulty: 2 },
                { id: 'L5P7', en: 'Can you show me on the map?', hr: 'Možete li mi pokazati na karti?', phonetic: 'ken ju ŠHOU mii an de MEP?', phoneticHr: '"ken ju ŠHOU mii an de MEP?"', tip: 'Odlično ako imate kartu na mobitelu — pokažite ekran i pitajte.', difficulty: 3 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite točan prijevod.',
                    questions: [
                        { phraseId: 'L5P2', options: ['Skrenite desno.', 'Skrenite lijevo.', 'Idite ravno.', 'Je li daleko?'], correct: 1 },
                        { phraseId: 'L5P4', options: ['To je lijevo.', 'Je li daleko?', 'Idite ravno naprijed.', 'Skrenite desno.'], correct: 2 },
                        { phraseId: 'L5P5', options: ['Idite ravno.', 'Je li daleko?', 'Skrenite lijevo.', 'Oprostite, gdje je muzej?'], correct: 1 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'Turn left.', hr: 'Skrenite lijevo.' },
                        { en: 'Turn right.', hr: 'Skrenite desno.' },
                        { en: 'Go straight ahead.', hr: 'Idite ravno naprijed.' },
                        { en: 'Is it far?', hr: 'Je li daleko?' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Tražite muzej i želite pitati prolaznika.', options: ['Turn left.', 'Excuse me, where is the museum?', 'The bill, please.'], correct: 1 },
                        { situation: 'Netko vam je rekao put ali vi imate kartu na mobitelu.', options: ['Is it far?', 'Go straight ahead.', 'Can you show me on the map?'], correct: 2 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Skrenite lijevo.', answer: 'turn left', accept: ['turn left', 'turn left.'], hint: 'T _ _ _ l _ _ _' },
                        { hr: 'Je li daleko?', answer: 'is it far', accept: ['is it far', 'is it far?'], hint: 'I _ i _ f _ _?' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"Turn left" znači "Skrenite lijevo."', correct: true, explanation: 'Točno! "Left" = lijevo, "Right" = desno. Zapamtite: L-lijevo, R-right/desno.' },
                        { statement: '"Go straight ahead" znači "Skrenite desno."', correct: false, explanation: '"Go straight ahead" = Idite RAVNO naprijed! "Turn right" bi bilo "Skrenite desno."' },
                        { statement: '"Is it far?" znači "Je li daleko?"', correct: true, explanation: 'Točno! "Far" = daleko. Korisno pitanje kad ne znate koliko još trebate hodati.' },
                        { statement: '"Excuse me" znači "Izvinite, kriv sam."', correct: false, explanation: '"Excuse me" = "Oprostite" (za skretanje pažnje). NE znači ispriku za krivnju — to bi bilo "I\'m sorry"!' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Museum', options: ['MU-ze-um', 'mju-ZI-em', 'MU-zi-um', 'mu-SE-um'], correct: 1, explanation: '"Museum" = "mju-ZI-em". Naglasak na ZI! Englesko "u" se ovdje čita kao "ju".' },
                        { word: 'Right', options: ['RIHT', 'RAJT', 'RIT', 'RIGT'], correct: 1, explanation: '"Right" = "RAJT". "GH" je TIHO — ne izgovara se! Isto kao u "night" = "NAJT".' },
                        { word: 'Straight', options: ['STRAJT', 'STREJT', 'STRA-ight', 'STRIT'], correct: 1, explanation: '"Straight" = "STREJT". Opet, "GH" je tiho, a "AI" se čita "EJ".' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['the', 'where', 'museum', 'me', 'is', 'excuse'], answer: 'excuse me where is the museum', accept: ['excuse me where is the museum', 'excuse me, where is the museum', 'excuse me, where is the museum?'], context: 'Tražite muzej.' },
                        { words: ['show', 'can', 'me', 'on', 'the', 'you', 'map'], answer: 'can you show me on the map', accept: ['can you show me on the map', 'can you show me on the map?'], context: 'Molite za pomoć s kartom.' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'Turn ___. The museum is on the left side.', answer: 'left', accept: ['left'], hint: 'Smjer suprotan od "desno"', context: 'Netko vam daje upute.' },
                        { sentence: 'Go ___ ahead for two blocks.', answer: 'straight', accept: ['straight'], hint: 'Ravno — 8 slova', context: 'Upute za hodanje.' },
                    ],
                },
                {
                    type: 'dialogue',
                    instruction: '💬 Popunite nedostajuću repliku u razgovoru.',
                    questions: [
                        { lines: [{ speaker: 'A', text: 'Excuse me, where is Times Square?' }, { speaker: 'B', blank: true }], options: ['Go straight for two blocks, then turn right.', 'I like pizza very much.', 'My hotel is nice.', 'Thank you and goodbye.'], correct: 0, explanation: 'Kad netko pita za smjer, dajete upute s "go straight", "turn left/right".' },
                    ],
                },
                {
                    type: 'role-play',
                    instruction: '🎭 Što biste rekli u ovoj situaciji?',
                    questions: [
                        { icon: '🗺️', situation: 'Izgubili ste se u New Yorku. Vidite prolaznika. Što kažete?', options: ['Excuse me, can you help me?', 'I am very tired.', 'The weather is nice today.', 'What time is it?'], correct: 0, explanation: '"Excuse me, can you help me?" je savršen način da zamolite za pomoć.' },
                    ],
                },
                {
                    type: 'shadowing',
                    instruction: '🗣️ Slušajte pa ponovite!',
                    questions: [
                        { phrase: 'Turn left at the corner.', phonetic: 'TERN LEFT et de KOR-ner' },
                        { phrase: 'Go straight for two blocks.', phonetic: 'GOU STREJT for TU bloks' },
                    ],
                },
                {
                    type: 'minimal-pairs',
                    instruction: '🎧 Koja je riječ izgovorena?',
                    questions: [
                        { words: ['right', 'light'], phonetics: ['/raɪt/', '/laɪt/'], correct: 0, explanation: '"Right" = desno (i ispravno). "Light" = svjetlo. R vs L je teško za mnoge govornike!' },
                        { words: ['walk', 'work'], phonetics: ['/wɔːk/', '/wɜːrk/'], correct: 0, explanation: '"Walk" = hodati. "Work" = raditi. Razlika je u samoglasniku — "o" vs "er".' },
                    ],
                },
                {
                    type: 'memory-match',
                    instruction: '🃏 Spojite engleske i hrvatske smjerove!',
                    pairs: [
                        { en: 'Turn left', hr: 'Skrenite lijevo' },
                        { en: 'Turn right', hr: 'Skrenite desno' },
                        { en: 'Go straight', hr: 'Idite ravno' },
                        { en: 'Next to', hr: 'Pored' },
                        { en: 'Corner', hr: 'Ugao' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L6 — Kupnja i Plaćanje (Shopping)
        // ═══════════════════════════════════════════════════
        {
            id: 'L6',
            title: 'Kupnja i Plaćanje',
            subtitle: 'Kupovina, cijene i plaćanje',
            icon: '🛒',
            locked: true,
            context: 'Ušli ste u dućan na Fifth Avenue u New Yorku. Oko vas je mnoštvo proizvoda i ljubazno osoblje.',
            culturalTip: 'U Americi cijene u dućanu NE uključuju porez (sales tax)! Na kasi ćete platiti 5-10% više nego što piše na cjenovniku. Kartice se primaju svugdje. Napojnica u dućanu nije potrebna.',
            phrases: [
                { id: 'L6P1', en: 'How much does this cost?', hr: 'Koliko ovo košta?', phonetic: 'HAU mač daz DIS kast?', phoneticHr: '"HAU mač daz DIS kast?"', tip: 'Službeni način za pitati cijenu. "How much is this?" je kraća verzija.', difficulty: 2 },
                { id: 'L6P2', en: 'I would like to buy this.', hr: 'Želio bih kupiti ovo.', phonetic: 'aj wud LAJK tu BAJ dis', phoneticHr: '"aj wud LAJK tu BAJ dis"', tip: '"I would like to..." = uljudan način za reći što želite.', difficulty: 2 },
                { id: 'L6P3', en: 'Do you accept cards?', hr: 'Primate li kartice?', phonetic: 'du ju ek-SEPT KAARDZ?', phoneticHr: '"du ju ek-SEPT KAARDZ?"', tip: 'U Americi kartice se primaju gotovo svugdje — čak i na food truckovima.', difficulty: 2 },
                { id: 'L6P4', en: 'Can I pay by card?', hr: 'Mogu li platiti karticom?', phonetic: 'ken aj PEJ baj KAARD?', phoneticHr: '"ken aj PEJ baj KAARD?"', tip: 'Kraća verzija za isto pitanje. Obje su potpuno ispravne.', difficulty: 2 },
                { id: 'L6P5', en: 'That is too expensive.', hr: 'To je preskupo.', phonetic: 'DET iz TUU iks-PEN-siv', phoneticHr: '"DET iz TUU iks-PEN-siv"', tip: 'U SAD-u se ne pregovara o cijenama u dućanima, ali na buvljacima (flea markets) da!', difficulty: 2 },
                { id: 'L6P6', en: 'Do you have a smaller size?', hr: 'Imate li manju veličinu?', phonetic: 'du ju hev e SMAA-ler SAJZ?', phoneticHr: '"du ju hev e SMAA-ler SAJZ?"', tip: 'Američke veličine su drugačije od europskih! S/M/L/XL je univerzalan.', difficulty: 3 },
                { id: 'L6P7', en: 'I am just looking, thank you.', hr: 'Samo gledam, hvala.', phonetic: 'aj em džast LUK-ing, FENK-ju', phoneticHr: '"aj em džast LUK-ing, FENK-ju"', tip: 'Kad vas prodavač pita "Can I help you?" a vi samo razgledavate.', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L6P1', options: ['Koliko ovo košta?', 'Samo gledam.', 'Primate li kartice?', 'To je preskupo.'], correct: 0 },
                        { phraseId: 'L6P7', options: ['Mogu li platiti karticom?', 'Samo gledam, hvala.', 'Koliko ovo košta?', 'Imate li manju veličinu?'], correct: 1 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'How much does this cost?', hr: 'Koliko ovo košta?' },
                        { en: 'Can I pay by card?', hr: 'Mogu li platiti karticom?' },
                        { en: 'That is too expensive.', hr: 'To je preskupo.' },
                        { en: 'I am just looking.', hr: 'Samo gledam.' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Vidite lijepu majicu i želite znati cijenu.', options: ['I am just looking.', 'How much does this cost?', 'That is too expensive.'], correct: 1 },
                        { situation: 'Prodavač vas pita "Can I help you?" ali vi samo razgledavate.', options: ['I am just looking, thank you.', 'I would like to buy this.', 'Do you accept cards?'], correct: 0 },
                        { situation: 'Želite kupiti suvenir ali imate samo karticu.', options: ['That is too expensive.', 'How much does this cost?', 'Can I pay by card?'], correct: 2 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Koliko ovo košta?', answer: 'how much does this cost', accept: ['how much does this cost', 'how much does this cost?', 'how much is this', 'how much is this?'], hint: 'H _ _ m _ _ _ d _ _ _ t _ _ _ c _ _ _?' },
                        { hr: 'Samo gledam.', answer: 'I am just looking', accept: ['I am just looking', 'I am just looking.', 'im just looking'], hint: 'I a _ j _ _ _ l _ _ _ _ _ _' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"I am just looking" znači "Samo gledam."', correct: true, explanation: 'Točno! Ovo koristite kad prodavač pita možete li pomoći, a vi samo razgledavate.' },
                        { statement: '"That is too expensive" znači "To je jako jeftino."', correct: false, explanation: '"Expensive" = SKUPO! "Cheap" = jeftino. SUPROTNA značenja!' },
                        { statement: '"Can I pay by card?" znači "Mogu li platiti karticom?"', correct: true, explanation: 'Točno! "By card" = karticom. "By cash" = gotovinom.' },
                        { statement: '"Do you have a smaller size?" znači "Imate li veću veličinu?"', correct: false, explanation: '"Smaller" = MANJA. "Bigger" ili "larger" = veća. "Small" i "big" su suprotnosti!' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Expensive', options: ['eks-PEN-siv', 'ek-SPEN-ziv', 'iks-PEN-siv', 'EKS-pen-siv'], correct: 0, explanation: '"Expensive" = "eks-PEN-siv". Naglasak na PEN! Ne "EKS" i ne "siv" već "siv" s kratkim "i".' },
                        { word: 'Buy', options: ['BU-i', 'BAJ', 'BI', 'BEJ'], correct: 1, explanation: '"Buy" = "BAJ". Samo jedan slog! "U" i "Y" zajedno se čitaju "AJ". Isto pravilo: "my" = "MAJ", "fly" = "FLAJ".' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'How much this cost?', options: ['How much does this cost?', 'How much is cost?', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'I would like buy this.', options: ['I would like to buy this.', 'I would like buying this.', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L7 — U Vlaku ili Autobusu
        // ═══════════════════════════════════════════════════
        {
            id: 'L7',
            title: 'Prijevoz u Gradu',
            subtitle: 'Metro, autobus, Uber i karte',
            icon: '🚇',
            locked: true,
            context: 'Trebate se voziti metroom (subway) u New Yorku. Trebate kupiti MetroCard ili koristiti kontaktno plaćanje.',
            culturalTip: 'U New Yorku metro se zove "subway". U ostalim gradovima može biti "metro" ili "train". Uber i Lyft su svugdje dostupni. Napojnica za taxi je 15-20%.',
            phrases: [
                { id: 'L7P1', en: 'A round trip ticket to Boston, please.', hr: 'Povratnu kartu za Boston, molim.', phonetic: 'e RAUND trip TI-kit tu BAS-ten, PLIIZ', phoneticHr: '"e RAUND trip TI-kit tu BAS-ten, PLIIZ"', tip: '"Round trip" = povratna, "one way" = jednosmjerna karta. Američki termini!', difficulty: 3 },
                { id: 'L7P2', en: 'Which platform?', hr: 'Koji peron?', phonetic: 'wič PLET-form?', phoneticHr: '"wič PLET-form?"', tip: '"Platform" = peron. Na metrou se kaže i "track".', difficulty: 2 },
                { id: 'L7P3', en: 'When is the next train?', hr: 'Kad je sljedeći vlak?', phonetic: 'WEN iz de NEKST TREJN?', phoneticHr: '"WEN iz de NEKST TREJN?"', tip: '"Next" = sljedeći. Korisno za planiranje vožnje.', difficulty: 2 },
                { id: 'L7P4', en: 'Does this bus go to downtown?', hr: 'Ide li ovaj autobus do centra grada?', phonetic: 'daz dis BAS gou tu DAUN-taun?', phoneticHr: '"daz dis BAS gou tu DAUN-taun?"', tip: '"Downtown" = centar grada u Americi. "Uptown" = gornji dio grada.', difficulty: 3 },
                { id: 'L7P5', en: 'I missed my train.', hr: 'Propustio sam vlak.', phonetic: 'aj MIST maj TREJN', phoneticHr: '"aj MIST maj TREJN"', tip: 'Ako zakasnite, ovo je korisna rečenica da objasnite situaciju na blagajni.', difficulty: 2 },
                { id: 'L7P6', en: 'Is this seat taken?', hr: 'Je li ovo sjedalo zauzeto?', phonetic: 'iz dis SIIT TEJ-ken?', phoneticHr: '"iz dis SIIT TEJ-ken?"', tip: '"Taken" = zauzeto. Američki način pitanja prije nego sjednete.', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L7P1', options: ['Povratnu kartu za Boston.', 'Koji peron?', 'Kad je sljedeći vlak?', 'Je li sjedalo zauzeto?'], correct: 0 },
                        { phraseId: 'L7P3', options: ['Propustio sam vlak.', 'Koji peron?', 'Kad je sljedeći vlak?', 'Ide li autobus do centra?'], correct: 2 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'A round trip ticket', hr: 'Povratna karta' },
                        { en: 'Which platform?', hr: 'Koji peron?' },
                        { en: 'Is this seat taken?', hr: 'Je li sjedalo zauzeto?' },
                        { en: 'I missed my train.', hr: 'Propustio sam vlak.' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Na stanici ste i ne znate s kojeg perona polazi vlak.', options: ['I missed my train.', 'Which platform?', 'Is this seat taken?'], correct: 1 },
                        { situation: 'Vlak je bio u 10:30 ali je sad 10:45.', options: ['When is the next train?', 'I missed my train.', 'A round trip ticket, please.'], correct: 1 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Koji peron?', answer: 'which platform', accept: ['which platform', 'which platform?'], hint: 'W _ _ _ _ p _ _ _ _ _ _ m?' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu.',
                    questions: [
                        { sentence: 'A round ___ ticket to Boston, please.', answer: 'trip', accept: ['trip'], hint: 'Povratna = "round ___"', context: 'Kupujete povratnu kartu na blagajni.' },
                        { sentence: 'Is this seat ___?', answer: 'taken', accept: ['taken'], hint: 'Zauzeto = "t _ _ _ n"', context: 'Želite sjesti u vlaku.' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['the', 'is', 'next', 'when', 'train'], answer: 'when is the next train', accept: ['when is the next train', 'when is the next train?'], context: 'Pitajte kad dolazi sljedeći vlak.' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"A round trip ticket" znači "Povratna karta."', correct: true, explanation: 'Točno! "Round trip" = povratno (tamo i natrag). "One way" = jednosmjerna karta.' },
                        { statement: '"Is this seat taken?" znači "Je li ovo besplatno sjedalo?"', correct: false, explanation: '"Taken" = zauzeto, NE besplatno! "Is this seat taken?" = Je li sjedalo zauzeto? "Is this seat free?" bi bilo za besplatno.' },
                        { statement: '"I missed my train" znači "Propustio sam vlak."', correct: true, explanation: 'Točno! "Missed" = propustio. Nezgodna situacija ali se dogodi — pitajte "When is the next train?"' },
                        { statement: '"Which platform?" znači "Koja platforma?"', correct: true, explanation: 'Točno! "Platform" = peron/platforma. Isto kao u hrvatskom IT svijetu — "platforma".' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Ticket', options: ['TI-ket', 'TI-kit', 'TAJ-ket', 'TIK-et'], correct: 1, explanation: '"Ticket" = "TI-kit". Kratko "i" u oba sloga. Naglasak na TI.' },
                        { word: 'Train', options: ['TREN', 'TREJN', 'TREJIN', 'TRIN'], correct: 1, explanation: '"Train" = "TREJN". "AI" se čita "EJ" (kao u "rain" = "REJN", "main" = "MEJN").' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'A round trip ticket for Boston, please.', options: ['A round trip ticket to Boston, please.', 'A round trip ticket in Boston, please.', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'When is next train?', options: ['When is the next train?', 'When is a next train?', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L8 — Brojevi i Novac
        // ═══════════════════════════════════════════════════
        {
            id: 'L8',
            title: 'Brojevi i Novac',
            subtitle: 'Brojanje, cijene i sitniš',
            icon: '💰',
            locked: true,
            context: 'Razumjeti brojeve i novac je ključ za svaku kupovinu, kartu i restoran u Americi.',
            culturalTip: 'Američka valuta je dolar (dollar, $). Jedan dolar ima 100 centi (cents, ¢). Cijene se izgovaraju: "three fifty" za $3.50. Novčanice: $1, $5, $10, $20, $50, $100.',
            phrases: [
                { id: 'L8P1', en: 'One, two, three, four, five.', hr: 'Jedan, dva, tri, četiri, pet.', phonetic: 'WAN, TUU, FRII, FOOR, FAJV', phoneticHr: '"WAN TUU FRII FOOR FAJV"', tip: 'Prvih pet brojeva — osnova za sve!', difficulty: 1 },
                { id: 'L8P2', en: 'Six, seven, eight, nine, ten.', hr: 'Šest, sedam, osam, devet, deset.', phonetic: 'SIKS, SE-ven, EJT, NAJN, TEN', phoneticHr: '"SIKS SE-ven EJT NAJN TEN"', tip: 'Brojevi 6-10. "Eight" = "EJT" (ne izgovarajte "gh").', difficulty: 1 },
                { id: 'L8P3', en: 'Twenty, thirty, fifty, hundred.', hr: 'Dvadeset, trideset, pedeset, sto.', phonetic: 'TWEN-ti, THER-ti, FIF-ti, HAN-dred', phoneticHr: '"TWEN-ti THER-ti FIF-ti HAN-dred"', tip: 'Veći brojevi. "-ty" na kraju = desetice.', difficulty: 2 },
                { id: 'L8P4', en: 'That is five dollars.', hr: 'To je pet dolara.', phonetic: 'DET iz FAJV DA-lerz', phoneticHr: '"DET iz FAJV DA-lerz"', tip: '"Dollars" = dolari. Znak je $ (ispred broja: $5).', difficulty: 2 },
                { id: 'L8P5', en: 'Can I have change?', hr: 'Mogu li dobiti kusur?', phonetic: 'ken aj hev ČEJNDŽ?', phoneticHr: '"ken aj hev ČEJNDŽ?"', tip: '"Change" = kusur ili sitniš. Također znači "promjena".', difficulty: 2 },
                { id: 'L8P6', en: 'It costs ten fifty.', hr: 'Košta deset dolara i pedeset centi.', phonetic: 'it kasts TEN FIF-ti', phoneticHr: '"it kasts TEN FIF-ti"', tip: 'Naučite govoriti cijene kratko: "ten fifty" za $10.50.', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L8P1', options: ['Jedan, dva, tri, četiri, pet.', 'Šest, sedam, osam, devet, deset.', 'Dvadeset, trideset, pedeset, sto.', 'Pet dolara.'], correct: 0 },
                        { phraseId: 'L8P4', options: ['Mogu li dobiti kusur?', 'To je pet dolara.', 'Košta deset dolara pedeset.', 'Dvadeset, trideset.'], correct: 1 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'Five', hr: 'Pet' },
                        { en: 'Ten', hr: 'Deset' },
                        { en: 'Twenty', hr: 'Dvadeset' },
                        { en: 'Hundred', hr: 'Sto' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Platili ste novčanicom od $20 za kavu od $3.50 i želite kusur.', options: ['That is five dollars.', 'Can I have change?', 'It costs ten fifty.'], correct: 1 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Pet', answer: 'five', accept: ['five'], hint: 'F _ _ _' },
                        { hr: 'Deset', answer: 'ten', accept: ['ten'], hint: 'T _ _' },
                        { hr: 'Dvadeset', answer: 'twenty', accept: ['twenty'], hint: 'T _ _ _ _ y' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"Five" na hrvatskom znači "Pet."', correct: true, explanation: 'Točno! Five = 5 = pet.' },
                        { statement: '"Ten dollars" na hrvatskom znači "Dvadeset dolara."', correct: false, explanation: '"Ten" = DESET, ne dvadeset! "Twenty" = dvadeset. NE miješajte ove brojeve!' },
                        { statement: '"Hundred" na hrvatskom znači "Sto."', correct: true, explanation: 'Točno! "A hundred" ili "one hundred" = 100 = sto.' },
                        { statement: '"Eight" na hrvatskom znači "Osam."', correct: true, explanation: 'Točno! Eight = 8 = osam. Izgovara se "EJT" — ne izgovarajte "GH"!' },
                        { statement: '"Fifty" na hrvatskom znači "Petnaest."', correct: false, explanation: '"Fifty" = PEDESET (50), ne petnaest! "Fifteen" = petnaest (15). "-ty" = desetice, "-teen" = teen brojevi!' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Three', options: ['TRI', 'FRII', 'DRI', 'SRI'], correct: 1, explanation: '"Three" = "FRII". Zvuk "TH" je kao "F" — jezik između zuba! NE kao naše "T" ili "D"!' },
                        { word: 'Eight', options: ['E-ight', 'EJT', 'AJT', 'AJGHT'], correct: 1, explanation: '"Eight" = "EJT". "GH" je POTPUNO TIHO! Ne pokušavajte izgovoriti "gh".' },
                        { word: 'Thirty', options: ['TIR-ti', 'THER-ti', 'TRI-ti', 'SER-ti'], correct: 1, explanation: '"Thirty" = "THER-ti". "TH" = jezik između zuba! I pazi: "thirty" (30) ≠ "thirteen" (13)!' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnim brojem NA ENGLESKOM.',
                    questions: [
                        { sentence: 'That is ___ dollars.', answer: 'five', accept: ['five', '5'], hint: 'Broj 5 na engleskom', context: 'Konobar govori cijenu = $5.' },
                        { sentence: 'I need ___ tickets.', answer: 'two', accept: ['two', '2'], hint: 'Broj 2 na engleskom', context: 'Kupujete karte za dvoje.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'That is five dollar.', options: ['That is five dollars.', 'That is fives dollar.', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'Can I has change?', options: ['Can I have change?', 'Can I had change?', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
                {
                    type: 'image-choose',
                    instruction: '🖼️ Prepoznajte valutu i odaberite ispravan odgovor.',
                    questions: [
                        { image: '💵', prompt: 'Koliko vrijedi ovaj "bill" (novčanica)?', options: ['One dollar', 'Five dollars', 'Depends on the bill', 'One hundred dollars'], correct: 2 },
                        { image: '🪙', prompt: 'Kako se kaže "kovanice" na engleskom?', options: ['Coins', 'Bills', 'Cash', 'Money'], correct: 0 },
                        { image: '💳', prompt: 'Što je ovo?', options: ['Credit card', 'Gift card', 'ID card', 'Business card'], correct: 0 },
                    ],
                },
                {
                    type: 'memory-match',
                    instruction: '🃏 Spojite brojeve i novac — engleski i hrvatski!',
                    pairs: [
                        { en: 'Dollar', hr: 'Dolar' },
                        { en: 'Quarter', hr: '25 centi' },
                        { en: 'Dime', hr: '10 centi' },
                        { en: 'Bill', hr: 'Novčanica' },
                        { en: 'Change', hr: 'Sitniš' },
                        { en: 'Tip', hr: 'Napojnica' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L9 — Vrijeme i Sat
        // ═══════════════════════════════════════════════════
        {
            id: 'L9',
            title: 'Vrijeme i Sat',
            subtitle: 'Koliko je sati? Dani, mjeseci, raspored',
            icon: '🕐',
            locked: true,
            context: 'U Americi se sve vrti oko rasporeda — letovi, muzejski satovi, obroci. Razumjeti vrijeme je ključno!',
            culturalTip: 'Amerikanci UVIJEK koriste 12-satni format: "3 PM" je 15:00. "AM" = ujutro, "PM" = poslijepodne/navečer. Nikad neće reći "15 sati" — samo "3 PM".',
            phrases: [
                { id: 'L9P1', en: 'What time is it?', hr: 'Koliko je sati?', phonetic: 'WAT TAJM iz it?', phoneticHr: '"WAT TAJM iz it?"', tip: 'Osnovno pitanje za vrijeme. Koristite ga svugdje.', difficulty: 1 },
                { id: 'L9P2', en: 'It is three thirty.', hr: 'Tri i pol je. (3:30)', phonetic: 'it iz FRII THER-ti', phoneticHr: '"it iz FRII THER-ti"', tip: 'Amerikanci kažu "three thirty" jednostavno. Ne koriste "half past" toliko.', difficulty: 2 },
                { id: 'L9P3', en: 'Today is Monday.', hr: 'Danas je ponedjeljak.', phonetic: 'tu-DEJ iz MAN-dej', phoneticHr: '"tu-DEJ iz MAN-dej"', tip: 'Dani u tjednu završavaju na "-day". Monday, Tuesday, Wednesday...', difficulty: 2 },
                { id: 'L9P4', en: 'What day is it today?', hr: 'Koji je danas dan?', phonetic: 'WAT DEJ iz it tu-DEJ?', phoneticHr: '"WAT DEJ iz it tu-DEJ?"', tip: 'Korisno kad putujete i izgubite osjećaj za dane!', difficulty: 2 },
                { id: 'L9P5', en: 'The flight leaves at nine fifteen.', hr: 'Let kreće u 9:15.', phonetic: 'de FLAJT liivz et NAJN fif-TIIN', phoneticHr: '"de FLAJT liivz et NAJN fif-TIIN"', tip: '"Leaves at..." = kreće u... "Arrives at..." = stiže u...', difficulty: 3 },
                { id: 'L9P6', en: 'In the morning.', hr: 'Ujutro.', phonetic: 'in de MOOR-ning', phoneticHr: '"in de MOOR-ning"', tip: '"Morning" = jutro, "afternoon" = poslijepodne, "evening" = večer.', difficulty: 1 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L9P1', options: ['Koliko je sati?', 'Danas je ponedjeljak.', 'Ujutro.', 'Let kreće u 9:15.'], correct: 0 },
                        { phraseId: 'L9P2', options: ['Let kreće u 9:15.', 'Tri i pol je.', 'Ujutro.', 'Koji je danas dan?'], correct: 1 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'What time is it?', hr: 'Koliko je sati?' },
                        { en: 'Today is Monday.', hr: 'Danas je ponedjeljak.' },
                        { en: 'In the morning.', hr: 'Ujutro.' },
                        { en: 'Three thirty.', hr: 'Tri i pol.' },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Koliko je sati?', answer: 'what time is it', accept: ['what time is it', 'what time is it?'], hint: 'W _ _ _ t _ _ _ i _ i _?' },
                        { hr: 'Danas je ponedjeljak.', answer: 'today is Monday', accept: ['today is monday', 'today is monday.'], hint: 'T _ _ _ _ i _ M _ _ _ _ _' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"In the morning" znači "Ujutro."', correct: true, explanation: 'Točno! "Morning" = jutro. "In the morning" = ujutro.' },
                        { statement: '"Three thirty" znači "3:13."', correct: false, explanation: '"Three THIRTY" = 3:30 (tri i trideset/pol)! "Three THIRTEEN" bi bilo 3:13. "Thirty" (30) ≠ "Thirteen" (13)!' },
                        { statement: '"PM" znači "poslijepodne/navečer."', correct: true, explanation: 'Točno! AM = prijepodne (ante meridiem), PM = poslijepodne (post meridiem). 3 PM = 15:00.' },
                        { statement: '"The flight leaves at nine" znači "Let kreće u devet."', correct: true, explanation: 'Točno! "Leaves at" = kreće u/polazi u. "Nine" = devet = 9.' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Wednesday', options: ['VED-nes-dej', 'WENZ-dej', 'WED-nes-dej', 'VE-dnes-dej'], correct: 1, explanation: '"Wednesday" = "WENZ-dej"! Slovo "D" u sredini se NE izgovara! Ovo je jedna od najčudnijih riječi u engleskom.' },
                        { word: 'Morning', options: ['MOR-ning', 'MOOR-ning', 'MAR-ning', 'MUR-ning'], correct: 1, explanation: '"Morning" = "MOOR-ning". Dugo "OO" i naglasak na MOR.' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Na aerodromu ste i ne znate koliko je sati.', options: ['What time is it?', 'Today is Monday.', 'The flight leaves at nine.'], correct: 0 },
                        { situation: 'Želite znati koji je dan jer ste zbunjeni od putovanja.', options: ['What time is it?', 'What day is it today?', 'In the morning.'], correct: 1 },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['is', 'time', 'it', 'what'], answer: 'what time is it', accept: ['what time is it', 'what time is it?'], context: 'Pitate za vrijeme.' },
                        { words: ['at', 'fifteen', 'leaves', 'the', 'flight', 'nine'], answer: 'the flight leaves at nine fifteen', accept: ['the flight leaves at nine fifteen', 'the flight leaves at nine fifteen.'], context: 'Govorite o letu.' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L10 — Ljekarna i Hitne Situacije
        // ═══════════════════════════════════════════════════
        {
            id: 'L10',
            title: 'Ljekarna i Hitne Situacije',
            subtitle: 'Zdravlje, lijekovi i pomoć',
            icon: '🏥',
            locked: true,
            context: 'Nitko ne želi imati zdravstveni problem na putovanju, ali je bolje biti spreman. U SAD-u su ljekarne (pharmacy/drugstore) svugdje.',
            culturalTip: 'U SAD-u ljekarna je "pharmacy" ili "drugstore" (CVS, Walgreens). Za hitne slučajeve nazovite 911. VAŽNO: zdravstvena skrb u SAD-u je SKUPA — uvijek imajte putno osiguranje!',
            phrases: [
                { id: 'L10P1', en: 'I need a doctor.', hr: 'Trebam liječnika.', phonetic: 'aj NIID e DAK-ter', phoneticHr: '"aj NIID e DAK-ter"', tip: '"I need..." + što god trebate. Najvažnija konstrukcija za hitne situacije!', difficulty: 2 },
                { id: 'L10P2', en: 'I have a headache.', hr: 'Boli me glava.', phonetic: 'aj hev e HED-ejk', phoneticHr: '"aj hev e HED-ejk"', tip: '"Headache" = glavobolja. "Stomach ache" = bol u trbuhu.', difficulty: 2 },
                { id: 'L10P3', en: 'Where is the pharmacy?', hr: 'Gdje je ljekarna?', phonetic: 'WER iz de FAAR-me-si?', phoneticHr: '"WER iz de FAAR-me-si?"', tip: '"Pharmacy" ili "drugstore" — oboje znači ljekarna u SAD-u.', difficulty: 2 },
                { id: 'L10P4', en: 'I need medicine for a cold.', hr: 'Trebam lijek za prehladu.', phonetic: 'aj NIID MED-i-sin for e KOULD', phoneticHr: '"aj NIID MED-i-sin for e KOULD"', tip: '"Cold" = prehlada. U Americi možete kupiti mnoge lijekove bez recepta.', difficulty: 3 },
                { id: 'L10P5', en: 'Please call 911.', hr: 'Molim nazovite 911.', phonetic: 'PLIIZ kal najn-wan-wan', phoneticHr: '"PLIIZ kal NAJN-WAN-WAN"', tip: '911 je američki broj za SVE hitne službe: policija, vatrogasci, hitna pomoć.', difficulty: 2 },
                { id: 'L10P6', en: 'I am allergic to...', hr: 'Alergičan sam na...', phonetic: 'aj em e-LER-džik tu...', phoneticHr: '"aj em e-LER-džik tu..."', tip: 'Dodajte na kraj: "nuts" (orašasti plodovi), "penicillin", "shellfish" (školjke)...', difficulty: 3 },
                { id: 'L10P7', en: 'It hurts here.', hr: 'Boli ovdje.', phonetic: 'it HERTS HIIR', phoneticHr: '"it HERTS HIIR" (pokažite prstom)', tip: 'Pokažite prstom na bolno mjesto. Jednostavno i učinkovito!', difficulty: 1 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L10P1', options: ['Trebam liječnika.', 'Boli me glava.', 'Gdje je ljekarna?', 'Boli ovdje.'], correct: 0 },
                        { phraseId: 'L10P7', options: ['Alergičan sam na...', 'Trebam lijek.', 'Boli ovdje.', 'Nazovite 911.'], correct: 2 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'I need a doctor.', hr: 'Trebam liječnika.' },
                        { en: 'I have a headache.', hr: 'Boli me glava.' },
                        { en: 'Where is the pharmacy?', hr: 'Gdje je ljekarna?' },
                        { en: 'It hurts here.', hr: 'Boli ovdje.' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Na putovanju vas boli glava i trebate lijek.', options: ['I need medicine for a cold.', 'Where is the pharmacy?', 'Please call 911.'], correct: 1 },
                        { situation: 'Netko je pao i ozlijedio se. Situacija je ozbiljna.', options: ['I have a headache.', 'It hurts here.', 'Please call 911.'], correct: 2 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Trebam liječnika.', answer: 'I need a doctor', accept: ['i need a doctor', 'i need a doctor.'], hint: 'I n _ _ _ a d _ _ _ _ _' },
                        { hr: 'Boli me glava.', answer: 'I have a headache', accept: ['i have a headache', 'i have a headache.'], hint: 'I h _ _ _ a h _ _ _ _ _ _ _' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"Please call 911" znači "Molim nazovite 911."', correct: true, explanation: 'Točno! 911 je američki broj za hitne situacije (policija, vatrogasci, hitna pomoć). U Hrvatskoj je 112!' },
                        { statement: '"I have a headache" znači "Imam temperaturu."', correct: false, explanation: '"Headache" = glavobolja, NE temperatura! "I have a fever" = Imam temperaturu.' },
                        { statement: '"Where is the pharmacy?" znači "Gdje je ljekarna?"', correct: true, explanation: 'Točno! "Pharmacy" ili "drugstore" = ljekarna. CVS i Walgreens su najpoznatiji američki lanci.' },
                        { statement: '"It hurts here" znači "Boli ovdje."', correct: true, explanation: 'Točno! Pokažite prstom gdje boli i recite "It hurts here." Liječnik će razumjeti.' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Doctor', options: ['DOK-tor', 'DAK-ter', 'DOK-ter', 'DUK-ter'], correct: 1, explanation: '"Doctor" = "DAK-ter" u američkom! "O" se izgovara kao otvoreno "A", a "-or" postaje "-er". Ne zvuči kao naše "doktor"!' },
                        { word: 'Headache', options: ['HED-ejk', 'HI-dač', 'HED-ejč', 'HE-da-če'], correct: 0, explanation: '"Headache" = "HED-ejk". "Head" = "HED" + "ache" = "ejk" (NE "ejč" — "che" se čita "ke")!' },
                        { word: 'Medicine', options: ['me-DI-ci-ne', 'ME-di-sin', 'med-I-sin', 'ME-di-kajn'], correct: 1, explanation: '"Medicine" = "ME-di-sin". Tri sloga, naglasak na ME. Krajnje "e" je TIHO!' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'I need ___ for a cold.', answer: 'medicine', accept: ['medicine'], hint: 'Lijek — 8 slova', context: 'U ljekarni tražite lijek.' },
                        { sentence: 'It ___ here.', answer: 'hurts', accept: ['hurts'], hint: 'Boli', context: 'Pokazujete liječniku gdje boli.' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['a', 'need', 'I', 'doctor'], answer: 'I need a doctor', accept: ['I need a doctor', 'I need a doctor.'], context: 'Hitna situacija — trebate liječnika.' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L11 — Vrijeme (Weather) i Small Talk
        // ═══════════════════════════════════════════════════
        {
            id: 'L11',
            title: 'Vrijeme i Small Talk',
            subtitle: 'Razgovor o vremenu i ugodan čavrljanje',
            icon: '☀️',
            locked: true,
            context: 'Amerikanci obožavaju small talk! Komentari o vremenu, sportu ili hrani otvaraju razgovor s bilo kim.',
            culturalTip: 'Amerikanci se često pitaju "How are you?" ali NE očekuju iskren odgovor — to je samo pozdrav. Odgovorite "Good, thanks! And you?" i nastavljate dalje.',
            phrases: [
                { id: 'L11P1', en: 'Nice weather today!', hr: 'Lijepo vrijeme danas!', phonetic: 'NAJS WE-der tu-DEJ!', phoneticHr: '"NAJS WE-der tu-DEJ!"', tip: 'Savršen početak razgovora. Funkcionira svugdje!', difficulty: 1 },
                { id: 'L11P2', en: 'It is very hot today.', hr: 'Danas je baš vruće.', phonetic: 'it iz VE-ri HAT tu-DEJ', phoneticHr: '"it iz VE-ri HAT tu-DEJ"', tip: '"Hot" = vruće. "Cold" = hladno. "Warm" = toplo.', difficulty: 1 },
                { id: 'L11P3', en: 'I am from Croatia.', hr: 'Ja sam iz Hrvatske.', phonetic: 'aj em fram krou-EJ-ša', phoneticHr: '"aj em fram krou-EJ-ša"', tip: 'Kad vas pitaju odakle ste. "Croatia" se izgovara "krou-EJ-ša".', difficulty: 2 },
                { id: 'L11P4', en: 'This is my first time in America.', hr: 'Ovo mi je prvi put u Americi.', phonetic: 'dis iz maj FERST tajm in e-MER-i-ke', phoneticHr: '"dis iz maj FERST tajm in e-MER-i-ke"', tip: 'Lijep način da objasnite da ste novi. Ljudi će biti strpljiviji s vama!', difficulty: 2 },
                { id: 'L11P5', en: 'I like it here very much.', hr: 'Jako mi se sviđa ovdje.', phonetic: 'aj LAJK it HIIR VE-ri mač', phoneticHr: '"aj LAJK it HIIR VE-ri mač"', tip: 'Kompliment za mjesto. Amerikanci to vole čuti!', difficulty: 2 },
                { id: 'L11P6', en: 'Do you live here?', hr: 'Živite li ovdje?', phonetic: 'du ju LIV hiir?', phoneticHr: '"du ju LIV hiir?"', tip: 'Pitanje za nastavak razgovora. Pokazuje interes.', difficulty: 2 },
                { id: 'L11P7', en: 'Have a nice day!', hr: 'Ugodan dan!', phonetic: 'hev e NAJS dej!', phoneticHr: '"hev e NAJS dej!"', tip: 'Amerikanci kažu ovo STALNO — u dućanu, na blagajni, prolaznicima. Koristite slobodno!', difficulty: 1 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L11P1', options: ['Lijepo vrijeme danas!', 'Danas je vruće.', 'Ja sam iz Hrvatske.', 'Ugodan dan!'], correct: 0 },
                        { phraseId: 'L11P3', options: ['Živite li ovdje?', 'Ovo mi je prvi put.', 'Ja sam iz Hrvatske.', 'Lijepo vrijeme!'], correct: 2 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'Nice weather today!', hr: 'Lijepo vrijeme danas!' },
                        { en: 'I am from Croatia.', hr: 'Ja sam iz Hrvatske.' },
                        { en: 'Have a nice day!', hr: 'Ugodan dan!' },
                        { en: 'I like it here.', hr: 'Sviđa mi se ovdje.' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Stojite u redu za kavu i želite započeti razgovor s osobom do sebe.', options: ['I need a doctor.', 'Nice weather today!', 'Where is the exit?'], correct: 1 },
                        { situation: 'Netko vas pita odakle ste.', options: ['I am from Croatia.', 'I like it here.', 'Have a nice day!'], correct: 0 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Ja sam iz Hrvatske.', answer: 'I am from Croatia', accept: ['i am from croatia', 'i am from croatia.', "i'm from croatia"], hint: 'I a _ f _ _ _ C _ _ _ _ _ _' },
                        { hr: 'Lijepo vrijeme danas!', answer: 'nice weather today', accept: ['nice weather today', 'nice weather today!'], hint: 'N _ _ _ w _ _ _ _ _ _ t _ _ _ _!' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"How are you?" je pozdrav, NE stvarno pitanje o zdravlju.', correct: true, explanation: 'Točno! U Americi "How are you?" je oblik pozdrava. Odgovor: "Good, thanks!" ili "Fine, and you?"' },
                        { statement: '"Have a nice day!" znači "Imajte lijep dan!"', correct: true, explanation: 'Točno! Ovo čujete 100 puta dnevno u Americi — u dućanima, restoranima, svugdje!' },
                        { statement: '"I am from Croatia" znači "Putujem u Hrvatsku."', correct: false, explanation: '"I am FROM Croatia" = Ja sam IZ Hrvatske. "I am going TO Croatia" bi bilo "Putujem U Hrvatsku."' },
                        { statement: '"Nice weather" znači "Loše vrijeme."', correct: false, explanation: '"Nice" = lijepo/ugodno. "Bad weather" = loše vrijeme.' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Weather', options: ['VE-der', 'WE-der', 'WI-der', 'VE-ter'], correct: 1, explanation: '"Weather" = "WE-der". Počinje s "W" (zaobljene usne!) i "TH" u sredini se izgovara zvučno kao "D".' },
                        { word: 'Croatia', options: ['KRO-a-šia', 'kro-EJ-ša', 'KRO-eša', 'KREJ-sha'], correct: 1, explanation: '"Croatia" = "kro-EJ-ša". Naglasak na EJ, a "-tia" se čita "ša"!' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'I am ___ Croatia.', answer: 'from', accept: ['from'], hint: 'Prijedlog za podrijetlo — 4 slova', context: 'Govorite nekome odakle ste.' },
                        { sentence: 'Have a nice ___!', answer: 'day', accept: ['day'], hint: 'Dan — 3 slova', context: 'Pozdravljate se na odlasku.' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L12 — Problem sa Sobom / Rezervacijom
        // ═══════════════════════════════════════════════════
        {
            id: 'L12',
            title: 'Problem sa Sobom',
            subtitle: 'Žalbe, popravci i rješavanje problema',
            icon: '🔧',
            locked: true,
            context: 'Ponekad u hotelu nešto ne radi kako treba. Znati pristojno izreći žalbu — neprocjenjivo!',
            culturalTip: 'Amerikanci su direktniji od Europljana ali i dalje cijene pristojnost. Počnite s "Excuse me, I have a problem..." i bit ćete shvaćeni. U SAD-u hoteli obično brzo rješavaju probleme.',
            phrases: [
                { id: 'L12P1', en: 'There is a problem with my room.', hr: 'Imam problem sa sobom.', phonetic: 'DER iz e PRAB-lem wid maj RUUM', phoneticHr: '"DER iz e PRAB-lem wid maj RUUM"', tip: 'Uvod za svaku žalbu na recepciji.', difficulty: 2 },
                { id: 'L12P2', en: 'The shower does not work.', hr: 'Tuš ne radi.', phonetic: 'de ŠAWR daz nat WERK', phoneticHr: '"de ŠAWR daz nat WERK"', tip: '"Does not work" = ne radi. Koristite za bilo što pokvareno.', difficulty: 2 },
                { id: 'L12P3', en: 'The room is too noisy.', hr: 'Soba je preglasna.', phonetic: 'de RUUM iz TUU NOJ-zi', phoneticHr: '"de RUUM iz TUU NOJ-zi"', tip: '"Too noisy" = preglasno. "Too cold" = prehladno. "Too hot" = prevruće.', difficulty: 2 },
                { id: 'L12P4', en: 'Could I change my room?', hr: 'Mogu li promijeniti sobu?', phonetic: 'kud aj ČEJNDŽ maj RUUM?', phoneticHr: '"kud aj ČEJNDŽ maj RUUM?"', tip: '"Could I...?" = mogu li...? Vrlo uljudan način traženja.', difficulty: 3 },
                { id: 'L12P5', en: 'I am sorry to bother you.', hr: 'Oprostite što smetam.', phonetic: 'aj em SA-ri tu BA-der ju', phoneticHr: '"aj em SA-ri tu BA-der ju"', tip: 'Uvod prije žalbe. Pristojno i učinkovito.', difficulty: 3 },
                { id: 'L12P6', en: 'The Wi-Fi is not working.', hr: 'Wi-Fi ne radi.', phonetic: 'de WAJ-faj iz nat WER-king', phoneticHr: '"de WAJ-faj iz nat WER-king"', tip: 'Vrlo čest problem u hotelima!', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L12P1', options: ['Imam problem sa sobom.', 'Tuš ne radi.', 'Soba je preglasna.', 'Wi-Fi ne radi.'], correct: 0 },
                        { phraseId: 'L12P2', options: ['Soba je preglasna.', 'Mogu li promijeniti sobu?', 'Tuš ne radi.', 'Oprostite što smetam.'], correct: 2 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'The shower does not work.', hr: 'Tuš ne radi.' },
                        { en: 'The room is too noisy.', hr: 'Soba je preglasna.' },
                        { en: 'The Wi-Fi is not working.', hr: 'Wi-Fi ne radi.' },
                        { en: 'Could I change my room?', hr: 'Mogu li promijeniti sobu?' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'U sobi je hladno i tuš ne radi. Idete na recepciju.', options: ['Have a nice day!', 'There is a problem with my room.', 'Nice weather today!'], correct: 1 },
                        { situation: 'Soba je pored dizala i čujete buku cijelu noć.', options: ['The room is too noisy.', 'The Wi-Fi is not working.', 'The shower does not work.'], correct: 0 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Tuš ne radi.', answer: 'the shower does not work', accept: ['the shower does not work', 'the shower does not work.', "the shower doesn't work", "the shower doesn't work."], hint: 'T _ _ s _ _ _ _ _ d _ _ _ n _ _ w _ _ _' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"The shower does not work" znači "Tuš ne radi."', correct: true, explanation: 'Točno! "Does not work" = ne radi. Koristite za bilo što pokvareno!' },
                        { statement: '"The room is too noisy" znači "Soba je jako tiha."', correct: false, explanation: '"Noisy" = BUČNO/glasno! "Quiet" = tiho. SUPROTNA značenja! "Too noisy" = PREglasno!' },
                        { statement: '"Could I change my room?" je uljudan zahtjev.', correct: true, explanation: 'Točno! "Could I...?" je najuljudniji način da nešto zatražite — puno bolje od "I want..."!' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Shower', options: ['ŠA-ver', 'ŠAU-er', 'SHO-ver', 'SHA-wer'], correct: 1, explanation: '"Shower" = "ŠAU-er". "OW" se ovdje čita "AU" (kao u "how", "now", "power").' },
                        { word: 'Problem', options: ['pro-BLEM', 'PRAB-lem', 'PRO-blem', 'PROB-lem'], correct: 1, explanation: '"Problem" = "PRAB-lem" u američkom! "O" se čita kao otvoreno "A", naglasak na prvom slogu.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'The shower does not works.', options: ['The shower does not work.', 'The shower do not work.', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'There is problem with my room.', options: ['There is a problem with my room.', 'There is the problem with my room.', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['room', 'change', 'I', 'could', 'my'], answer: 'could I change my room', accept: ['could I change my room', 'could I change my room?'], context: 'Želite drugu sobu.' },
                    ],
                },
                {
                    type: 'memory-match',
                    instruction: '🃏 Spojite hotelske situacije!',
                    pairs: [
                        { en: 'Room service', hr: 'Usluga u sobu' },
                        { en: 'Housekeeping', hr: 'Čišćenje sobe' },
                        { en: 'Wake-up call', hr: 'Poziv za buđenje' },
                        { en: 'Do not disturb', hr: 'Ne uznemiravaj' },
                        { en: 'Front desk', hr: 'Recepcija' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L13 — Na Razgledavanju
        // ═══════════════════════════════════════════════════
        {
            id: 'L13',
            title: 'Na Razgledavanju',
            subtitle: 'Turizam, muzej, fotografije',
            icon: '📸',
            locked: true,
            context: 'New York, Washington D.C., San Francisco... Amerika nudi nebrojene atrakcije! Od Statue of Liberty do Grand Canyona.',
            culturalTip: 'Smithsonian muzeji u Washingtonu su BESPLATNI! U New Yorku Central Park je besplatan. Mnoge nacionalne znamenitosti ne koštaju ništa — plan ahead!',
            phrases: [
                { id: 'L13P1', en: 'Where can I buy tickets?', hr: 'Gdje mogu kupiti karte?', phonetic: 'WER ken aj BAJ TI-kits?', phoneticHr: '"WER ken aj BAJ TI-kits?"', tip: '"Tickets" = karte (za muzej, predstavu, utakmicu...).', difficulty: 2 },
                { id: 'L13P2', en: 'Can you take a photo of us?', hr: 'Možete li nas fotografirati?', phonetic: 'ken ju TEJK e FOU-tou av as?', phoneticHr: '"ken ju TEJK e FOU-tou av as?"', tip: 'Pružite mobitel i pitajte prijazno — Amerikanci rado pomognu i obično se nasmiju!', difficulty: 3 },
                { id: 'L13P3', en: 'What time does it close?', hr: 'U koliko sati se zatvara?', phonetic: 'WAT TAJM daz it KLOUZ?', phoneticHr: '"WAT TAJM daz it KLOUZ?"', tip: '"Close" = zatvara se. "Open" = otvara se.', difficulty: 2 },
                { id: 'L13P4', en: 'Is there a guided tour?', hr: 'Ima li vođena tura?', phonetic: 'iz der e GAJ-did TOOR?', phoneticHr: '"iz der e GAJ-did TOOR?"', tip: '"Guided tour" = vođena tura s vodičem. Često su uključene u cijenu!', difficulty: 3 },
                { id: 'L13P5', en: 'This is amazing!', hr: 'Ovo je nevjerojatno!', phonetic: 'dis iz e-MEJZ-ing!', phoneticHr: '"dis iz e-MEJZ-ing!"', tip: '"Amazing" je omiljena američka riječ! Koristite za sve što vas oduševljava.', difficulty: 1 },
                { id: 'L13P6', en: 'I would like to visit the Statue of Liberty.', hr: 'Htio bih posjetiti Kip slobode.', phonetic: 'aj wud LAJK tu VI-zit de STE-ču av LI-ber-ti', phoneticHr: '"aj wud LAJK tu VI-zit de STE-ču av LI-ber-ti"', tip: 'Kip slobode je na Liberty Islandu — trebate trajekt (ferry) da dođete.', difficulty: 3 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L13P1', options: ['Gdje mogu kupiti karte?', 'U koliko se zatvara?', 'Ovo je nevjerojatno!', 'Ima li vođena tura?'], correct: 0 },
                        { phraseId: 'L13P5', options: ['Htio bih posjetiti Kip slobode.', 'Ovo je nevjerojatno!', 'Možete li nas fotografirati?', 'Gdje mogu kupiti karte?'], correct: 1 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'Where can I buy tickets?', hr: 'Gdje mogu kupiti karte?' },
                        { en: 'What time does it close?', hr: 'U koliko se zatvara?' },
                        { en: 'This is amazing!', hr: 'Ovo je nevjerojatno!' },
                        { en: 'Can you take a photo?', hr: 'Možete li fotografirati?' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Želite posjetiti Empire State Building i trebate ulaznice.', options: ['Is there a guided tour?', 'Where can I buy tickets?', 'This is amazing!'], correct: 1 },
                        { situation: 'Stojite s obitelji ispred Statue of Liberty i želite zajedničku fotografiju.', options: ['Can you take a photo of us?', 'What time does it close?', 'I would like to visit the Statue of Liberty.'], correct: 0 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Ovo je nevjerojatno!', answer: 'this is amazing', accept: ['this is amazing', 'this is amazing!'], hint: 'T _ _ _ i _ a _ _ _ _ _ _!' },
                        { hr: 'Gdje mogu kupiti karte?', answer: 'where can I buy tickets', accept: ['where can i buy tickets', 'where can i buy tickets?'], hint: 'W _ _ _ _ c _ _ I b _ _ t _ _ _ _ _ _?' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"This is amazing!" znači "Ovo je nevjerojatno!"', correct: true, explanation: 'Točno! "Amazing" = nevjerojatno/fantastično. Najpopularnija američka pohvala!' },
                        { statement: '"What time does it close?" znači "U koliko sati se otvara?"', correct: false, explanation: '"Close" = ZATVARA, ne otvara! "Open" = otvara. Suprotna značenja!' },
                        { statement: '"Can you take a photo of us?" je zahtjev za fotografiju.', correct: true, explanation: 'Točno! "Take a photo" = fotografirati. Pružite mobitel i zamolite ljubazno!' },
                        { statement: '"Is there a guided tour?" znači "Ima li vođena tura?"', correct: true, explanation: 'Točno! "Guided" = s vodičem. Muzejske ture su često uključene u cijenu ulaznice.' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Amazing', options: ['a-MA-zing', 'e-MEJZ-ing', 'A-mej-zing', 'a-MAZ-ing'], correct: 1, explanation: '"Amazing" = "e-MEJZ-ing". Naglasak na MEJZ! "A" na početku je kratko "e".' },
                        { word: 'Photo', options: ['FO-to', 'FOU-tou', 'FA-to', 'PO-to'], correct: 1, explanation: '"Photo" = "FOU-tou". "PH" se čita "F", a oba "O" su dugi "OU".' },
                        { word: 'Guided', options: ['GAJ-did', 'GUI-ded', 'GI-ded', 'GVAJ-ded'], correct: 0, explanation: '"Guided" = "GAJ-did". "GUI-" se čita "GAJ" (kao "guy" + "did").' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['tickets', 'can', 'buy', 'where', 'I'], answer: 'where can I buy tickets', accept: ['where can I buy tickets', 'where can I buy tickets?'], context: 'Trebate ulaznice.' },
                        { words: ['a', 'take', 'can', 'you', 'photo'], answer: 'can you take a photo', accept: ['can you take a photo', 'can you take a photo?'], context: 'Molite nekoga da vas slika.' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'What time does it ___?', answer: 'close', accept: ['close'], hint: 'Zatvara — suprotno od "open"', context: 'Želite znati radno vrijeme muzeja.' },
                        { sentence: 'Is there a ___ tour?', answer: 'guided', accept: ['guided'], hint: 'Vođena (s vodičem)', context: 'Pitate za organiziranu turu.' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L14 — Tehnologija i Internet
        // ═══════════════════════════════════════════════════
        {
            id: 'L14',
            title: 'Tehnologija i Internet',
            subtitle: 'Wi-Fi, telefon, punjenje, aplikacije',
            icon: '📱',
            locked: true,
            context: 'U Americi je sve digitalno — Wi-Fi u kafićima, mobilno plaćanje, QR kodovi, aplikacije za sve. Bez telefona ste izgubljeni!',
            culturalTip: 'Besplatan Wi-Fi je svugdje — Starbucks, McDonald\'s, knjižnice, parkovi. Američki utičnice su drugačije (Tip A/B) — trebat će vam adapter! USB punjenje je dostupno na aerodromima i u mnogim kafićima.',
            phrases: [
                { id: 'L14P1', en: 'What is the Wi-Fi password?', hr: 'Koja je lozinka za Wi-Fi?', phonetic: 'WAT iz de WAJ-faj PAS-wurd?', phoneticHr: '"WAT iz de WAJ-faj PAS-wurd?"', tip: 'Pitajte u svakom kafiću i hotelu — obično je na računu ili na ploči.', difficulty: 2 },
                { id: 'L14P2', en: 'Can I charge my phone here?', hr: 'Mogu li ovdje napuniti mobitel?', phonetic: 'ken aj ČAARDŽ maj FOUN hir?', phoneticHr: '"ken aj ČAARDŽ maj FOUN hir?"', tip: '"Charge" = punjenje. "Charger" = punjač. U Americi kažu "cell phone" ili samo "phone".', difficulty: 2 },
                { id: 'L14P3', en: 'Do you have a charger?', hr: 'Imate li punjač?', phonetic: 'du ju hev e ČAAR-džer?', phoneticHr: '"du ju hev e ČAAR-džer?"', tip: 'Korisno u kafiću ili hotelu. USB-C je sad standard.', difficulty: 2 },
                { id: 'L14P4', en: 'I need to download an app.', hr: 'Trebam preuzeti aplikaciju.', phonetic: 'aj niid tu DAUN-loud en EP', phoneticHr: '"aj niid tu DAUN-loud en EP"', tip: '"App" je skraćeno od "application". "Download" = preuzeti/skinuti.', difficulty: 2 },
                { id: 'L14P5', en: 'My phone is not working.', hr: 'Moj telefon ne radi.', phonetic: 'maj FOUN iz NAT WER-king', phoneticHr: '"maj FOUN iz NAT WER-king"', tip: '"Not working" = ne radi. Za bilo koji uređaj — laptop, tablet, TV...', difficulty: 2 },
                { id: 'L14P6', en: 'Can I use your computer?', hr: 'Mogu li koristiti vaše računalo?', phonetic: 'ken aj JUUZ jor kom-PJUU-ter?', phoneticHr: '"ken aj JUUZ jor kom-PJUU-ter?"', tip: 'U knjižnicama su besplatna računala. Hotel business center također.', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite točan prijevod.',
                    questions: [
                        { phraseId: 'L14P1', options: ['Koja je lozinka za Wi-Fi?', 'Mogu li napuniti mobitel?', 'Imate li punjač?', 'Moj telefon ne radi.'], correct: 0 },
                        { phraseId: 'L14P5', options: ['Trebam preuzeti aplikaciju.', 'Moj telefon ne radi.', 'Koja je lozinka?', 'Mogu li koristiti računalo?'], correct: 1 },
                        { phraseId: 'L14P2', options: ['Imate li punjač?', 'Trebam aplikaciju.', 'Mogu li napuniti mobitel ovdje?', 'Moj telefon ne radi.'], correct: 2 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite englesku frazu s hrvatskim prijevodom.',
                    pairs: [
                        { en: 'Wi-Fi password', hr: 'Lozinka za Wi-Fi' },
                        { en: 'Charge my phone', hr: 'Napuniti mobitel' },
                        { en: 'Download an app', hr: 'Preuzeti aplikaciju' },
                        { en: 'Not working', hr: 'Ne radi' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli u ovoj situaciji?',
                    questions: [
                        { situation: 'U kafiću ste i trebate se spojiti na internet.', options: ['My phone is not working.', 'What is the Wi-Fi password?', 'I need to download an app.'], correct: 1 },
                        { situation: 'Baterija je na 5% i vidite utičnicu u kafiću.', options: ['Can I charge my phone here?', 'What is the Wi-Fi password?', 'Do you have a computer?'], correct: 0 },
                        { situation: 'Trebate Uber aplikaciju ali je nemate na mobitelu.', options: ['My phone is not working.', 'Can I use your computer?', 'I need to download an app.'], correct: 2 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Moj telefon ne radi.', answer: 'my phone is not working', accept: ['my phone is not working', 'my phone is not working.', "my phone isn't working"], hint: 'M _ p _ _ _ _ i _ n _ _ w _ _ _ _ _ _' },
                        { hr: 'Imate li punjač?', answer: 'do you have a charger', accept: ['do you have a charger', 'do you have a charger?'], hint: 'D _ y _ _ h _ _ _ a c _ _ _ _ _ _?' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"Download" znači "preuzeti/skinuti."', correct: true, explanation: 'Točno! "Download" = preuzeti. "Upload" = učitati/poslati. Suprotni smjerovi!' },
                        { statement: '"Charger" znači "punjač."', correct: true, explanation: 'Točno! "Charge" = puniti, "charger" = punjač. "My charger" = moj punjač.' },
                        { statement: '"Password" znači "put/staza."', correct: false, explanation: '"Password" = LOZINKA/šifra! "Path" ili "road" = put/staza. "Pass" + "word" = prop-usnica + riječ = lozinka.' },
                        { statement: '"Cell phone" znači "mobitel."', correct: true, explanation: 'Točno! Amerikanci kažu "cell phone" ili samo "phone". Britanci kažu "mobile phone".' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Password', options: ['PAS-vord', 'PAS-wurd', 'PASS-word', 'PA-sword'], correct: 1, explanation: '"Password" = "PAS-wurd". "W" na početku drugog sloga, i "O" se čita kao kratko "U"!' },
                        { word: 'Computer', options: ['KOM-pju-ter', 'kom-PJUU-ter', 'KOM-pu-ter', 'kom-PU-ter'], correct: 1, explanation: '"Computer" = "kom-PJUU-ter". Naglasak na PJUU! Ne na KOM.' },
                        { word: 'Charge', options: ['ČARŽ', 'ČAARDŽ', 'KARŽ', 'ŠAARDŽ'], correct: 1, explanation: '"Charge" = "ČAARDŽ". Počinje kao "Č" ne "K" ili "Š". Dugo "AA" u sredini.' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'What is the Wi-Fi ___?', answer: 'password', accept: ['password'], hint: 'Lozinka/šifra', context: 'Tražite pristup internetu u kafiću.' },
                        { sentence: 'I need to ___ an app.', answer: 'download', accept: ['download'], hint: 'Preuzeti — suprotno od "upload"', context: 'Trebate instalirati aplikaciju.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'Can I charge phone here?', options: ['Can I charge my phone here?', 'Can I charge a phone here?', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'My phone is not work.', options: ['My phone is not working.', 'My phone does not work.', 'Oba odgovora su točna!'], correct: 2 },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['the', 'password', 'what', 'Wi-Fi', 'is'], answer: 'what is the Wi-Fi password', accept: ['what is the Wi-Fi password', 'what is the Wi-Fi password?'], context: 'Pitate za lozinku.' },
                        { words: ['phone', 'charge', 'can', 'my', 'I'], answer: 'can I charge my phone', accept: ['can I charge my phone', 'can I charge my phone?'], context: 'Tražite mjesto za punjenje.' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L15 — Filmovi, Serije i Zabava
        // ═══════════════════════════════════════════════════
        {
            id: 'L15',
            title: 'Filmovi, Serije i Zabava',
            subtitle: 'Kino, Netflix, TV, razgovor o zabavi',
            icon: '🎬',
            locked: true,
            context: 'Amerika je domovina Hollywooda! Filmovi i serije su odličan način za učenje engleskog. Evo fraza za razgovor o zabavi.',
            culturalTip: '💡 SAVJET ZA UČENJE: Gledajte američke filmove/serije NAJPRIJE s hrvatskim titlovima, pa s ENGLESKIM titlovima, pa BEZ titlova. Počnite s dječjim filmovima ili sitcomovima — jednostavniji jezik!',
            phrases: [
                { id: 'L15P1', en: 'What is your favorite movie?', hr: 'Koji ti je najdraži film?', phonetic: 'WAT iz jor FEJV-rit MUU-vi?', phoneticHr: '"WAT iz jor FEJV-rit MUU-vi?"', tip: '"Movie" je američki. Britanci kažu "film". "Favorite" = najdraži.', difficulty: 2 },
                { id: 'L15P2', en: 'I like watching TV shows.', hr: 'Volim gledati TV serije.', phonetic: 'aj LAJK WAČ-ing TII-VII šouz', phoneticHr: '"aj LAJK WAČ-ing TII-VII šouz"', tip: '"TV show" = TV serija. "Watch" = gledati. "Watch out!" = pazi!', difficulty: 2 },
                { id: 'L15P3', en: 'Can we watch something together?', hr: 'Možemo li zajedno nešto pogledati?', phonetic: 'ken wi WAČ SAM-fing tu-GE-der?', phoneticHr: '"ken wi WAČ SAM-fing tu-GE-der?"', tip: '"Something" = nešto. "Together" = zajedno. Lijepa socijalna fraza!', difficulty: 3 },
                { id: 'L15P4', en: 'This movie is really good.', hr: 'Ovaj film je stvarno dobar.', phonetic: 'dis MUU-vi iz RII-li GUD', phoneticHr: '"dis MUU-vi iz RII-li GUD"', tip: '"Really" = stvarno/baš. Pojačava pridjeve: "really good", "really bad", "really interesting".', difficulty: 1 },
                { id: 'L15P5', en: 'I do not understand the actors.', hr: 'Ne razumijem glumce.', phonetic: 'aj dount an-der-STEND de EK-terz', phoneticHr: '"aj DOUNT an-der-STEND de EK-terz"', tip: 'Normalno je! Američki glumci govore brzo. Koristite titlove (subtitles) za pomoć.', difficulty: 2 },
                { id: 'L15P6', en: 'Turn on the subtitles, please.', hr: 'Uključite titlove, molim.', phonetic: 'TERN ON de SAB-tajtelz, PLIIZ', phoneticHr: '"TERN ON de SAB-tajtelz PLIIZ"', tip: '"Subtitles" = titlovi. "Turn on" = uključi. "Turn off" = isključi.', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L15P1', options: ['Koji ti je najdraži film?', 'Volim gledati TV serije.', 'Ne razumijem glumce.', 'Uključite titlove.'], correct: 0 },
                        { phraseId: 'L15P6', options: ['Ovaj film je dobar.', 'Ne razumijem glumce.', 'Uključite titlove, molim.', 'Koji ti je najdraži film?'], correct: 2 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'Movie', hr: 'Film' },
                        { en: 'TV show', hr: 'TV serija' },
                        { en: 'Subtitles', hr: 'Titlovi' },
                        { en: 'Actor', hr: 'Glumac' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Gledate američki film ali ne razumijete dijalog.', options: ['This movie is really good.', 'Turn on the subtitles, please.', 'What is your favorite movie?'], correct: 1 },
                        { situation: 'Netko vas pita što radite u slobodno vrijeme.', options: ['I like watching TV shows.', 'Turn on the subtitles.', 'I do not understand the actors.'], correct: 0 },
                        { situation: 'Upravo ste pogledali sjajan film.', options: ['I do not understand the actors.', 'Turn on the subtitles.', 'This movie is really good.'], correct: 2 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Ovaj film je stvarno dobar.', answer: 'this movie is really good', accept: ['this movie is really good', 'this movie is really good.'], hint: 'T _ _ _ m _ _ _ _ i _ r _ _ _ _ _ g _ _ _' },
                        { hr: 'Titlovi', answer: 'subtitles', accept: ['subtitles'], hint: 'S _ _ t _ _ _ _ s' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"Favorite" znači "najdraži."', correct: true, explanation: 'Točno! "My favorite" = moj najdraži. Koristite za sve: film, hrana, boja...' },
                        { statement: '"Turn on" znači "isključiti."', correct: false, explanation: '"Turn ON" = UKLJUČITI! "Turn OFF" = isključiti. ON/OFF su suprotnosti — kao uključeno/isključeno!' },
                        { statement: '"I do not understand" znači "Ne razumijem."', correct: true, explanation: 'Točno! Ili kraće: "I don\'t understand." Koristite ovo često — nije sramota ne razumjeti!' },
                        { statement: '"Actor" znači "režiser."', correct: false, explanation: '"Actor" = GLUMAC! "Director" = režiser. "Actor" glumi, "director" režira.' },
                        { statement: '"Really" pojačava pridjev — "really good" = "stvarno dobar."', correct: true, explanation: 'Točno! "Really" je pojačivač. "Really good", "really bad", "really nice" — učite ga koristiti!' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Movie', options: ['MO-vi', 'MUU-vi', 'MOO-vi', 'MAV-i'], correct: 1, explanation: '"Movie" = "MUU-vi". Dugo "UU" na početku!' },
                        { word: 'Favorite', options: ['fa-VO-rit', 'FEJV-rit', 'FAV-o-rajt', 'fej-VO-rit'], correct: 1, explanation: '"Favorite" = "FEJV-rit". Samo DVA sloga u američkom! Srednji slog nestaje.' },
                        { word: 'Subtitles', options: ['sub-TI-tles', 'SAB-taj-telz', 'sub-TAJT-less', 'SUB-ti-tles'], correct: 1, explanation: '"Subtitles" = "SAB-taj-telz". "Sub" se čita "SAB", a "titles" = "taj-telz".' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'What is your ___ movie?', answer: 'favorite', accept: ['favorite', 'favourite'], hint: 'Najdraži — 8 slova', context: 'Pitajte nekoga o filmovima.' },
                        { sentence: 'Turn ___ the subtitles, please.', answer: 'on', accept: ['on'], hint: 'Uključiti — 2 slova, suprotno od "off"', context: 'Trebate titlove za film.' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['really', 'is', 'this', 'movie', 'good'], answer: 'this movie is really good', accept: ['this movie is really good', 'this movie is really good.'], context: 'Hvalite film.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'I like watch TV shows.', options: ['I like watching TV shows.', 'I like to watches TV shows.', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'What is your favourit movie?', options: ['What is your favorite movie?', 'What is your favourites movie?', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
                {
                    type: 'image-choose',
                    instruction: '🖼️ Pogledajte sliku i odaberite ispravan engleski izraz.',
                    questions: [
                        { image: '🎬', prompt: 'Što je ovo mjesto?', options: ['Movie theater', 'Library', 'Museum', 'Restaurant'], correct: 0 },
                        { image: '🍿', prompt: 'Što kupite u kinu?', options: ['Popcorn', 'Soda', 'Candy', 'Sve navedeno'], correct: 3 },
                        { image: '📺', prompt: 'Kako kažete "daljinski upravljač"?', options: ['Remote control', 'TV button', 'Channel switch', 'TV commander'], correct: 0 },
                    ],
                },
                {
                    type: 'video-comprehension',
                    instruction: '🎬 Pogledajte kratki video i odgovorite na pitanje.',
                    questions: [
                        { videoId: 'yoEezZD71sc', instruction: 'Pogledajte ovaj kratki video o kupovini karata u kinu.', questionText: 'Kako na engleskom kažete "Jednu kartu, molim"?', options: ['One ticket, please.', 'One card, please.', 'One movie, please.', 'One entry, please.'], correct: 0, explanation: '"Ticket" je karta za kino, bus, vlak, itd. "Card" je kartica (kreditna...).' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L16 — Hrana Detaljnije (Fast Food, Kava, Deserti)
        // ═══════════════════════════════════════════════════
        {
            id: 'L16',
            title: 'Hrana Detaljnije',
            subtitle: 'Fast food, kava, deserti, alergije',
            icon: '🍔',
            locked: true,
            context: 'Amerika je zemlja fast fooda, kava to-go i food truckova. Trebate znati naručiti specifično — veličinu, dodatke, alergije.',
            culturalTip: 'U Starbucksu veličine su: Tall (mali), Grande (srednji), Venti (veliki). Napojnica u fast foodu NIJE obavezna, ali u restoranu jest (15-20%). "To go" = za van. "For here" = za ovdje.',
            phrases: [
                { id: 'L16P1', en: 'I would like a hamburger, please.', hr: 'Želio bih hamburger, molim.', phonetic: 'aj wud LAJK e HEM-ber-ger, PLIIZ', phoneticHr: '"aj wud LAJK e HEM-ber-ger PLIIZ"', tip: '"Hamburger" ili "burger" — osnovno jelo u svakom fast foodu.', difficulty: 1 },
                { id: 'L16P2', en: 'A large coffee with milk, please.', hr: 'Veliku kavu s mlijekom, molim.', phonetic: 'e LAARDŽ KA-fi wid MILK, PLIIZ', phoneticHr: '"e LAARDŽ KA-fi wid MILK PLIIZ"', tip: 'Veličine: small (mala), medium (srednja), large (velika). "With" = s/sa.', difficulty: 2 },
                { id: 'L16P3', en: 'For here or to go?', hr: 'Za ovdje ili za van?', phonetic: 'for HIR or tu GOU?', phoneticHr: '"for HIR or tu GOU?"', tip: 'Ovo vas UVIJEK pitaju! "For here" = za jesti tu. "To go" = za ponijeti.', difficulty: 2 },
                { id: 'L16P4', en: 'I am allergic to nuts.', hr: 'Alergičan sam na orašaste plodove.', phonetic: 'aj em e-LER-džik tu NATS', phoneticHr: '"aj em e-LER-džik tu NATS"', tip: 'Važno za sigurnost! "Allergic to..." + alergija. "Nuts" = orašasti plodovi.', difficulty: 3 },
                { id: 'L16P5', en: 'No ice, please.', hr: 'Bez leda, molim.', phonetic: 'NOU AJS, PLIIZ', phoneticHr: '"NOU AJS PLIIZ"', tip: 'Amerikanci stavljaju MNOGO leda u sve. Recite "no ice" ako ne želite.', difficulty: 1 },
                { id: 'L16P6', en: 'Can I have ketchup?', hr: 'Mogu li dobiti kečap?', phonetic: 'ken aj hev KEČ-ap?', phoneticHr: '"ken aj hev KEČ-ap?"', tip: 'Umaci (condiments): ketchup, mustard (senf), mayo (majoneza).', difficulty: 1 },
                { id: 'L16P7', en: 'What do you recommend?', hr: 'Što preporučujete?', phonetic: 'WAT du ju re-ko-MEND?', phoneticHr: '"WAT du ju re-ko-MEND?"', tip: 'Odličan način da doznate lokalne specijalitete!', difficulty: 3 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L16P3', options: ['Veliku kavu, molim.', 'Za ovdje ili za van?', 'Bez leda, molim.', 'Alergičan sam na orašaste plodove.'], correct: 1 },
                        { phraseId: 'L16P4', options: ['Što preporučujete?', 'Mogu li dobiti kečap?', 'Alergičan sam na orašaste plodove.', 'Bez leda, molim.'], correct: 2 },
                        { phraseId: 'L16P1', options: ['Želio bih hamburger, molim.', 'Veliku kavu s mlijekom.', 'Za ovdje ili za van?', 'Što preporučujete?'], correct: 0 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'For here', hr: 'Za ovdje' },
                        { en: 'To go', hr: 'Za van' },
                        { en: 'No ice', hr: 'Bez leda' },
                        { en: 'With milk', hr: 'S mlijekom' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Blagajnik u McDonald\'su vas pita "For here or to go?" Vi želite za van.', options: ['For here.', 'To go.', 'No ice, please.'], correct: 1 },
                        { situation: 'Imate alergiju na orašaste plodove i naručujete desert.', options: ['I am allergic to nuts.', 'No ice, please.', 'What do you recommend?'], correct: 0 },
                        { situation: 'Prvi put ste u restoranu i ne znate što naručiti.', options: ['Can I have ketchup?', 'No ice, please.', 'What do you recommend?'], correct: 2 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Bez leda, molim.', answer: 'no ice please', accept: ['no ice please', 'no ice, please', 'no ice please.', 'no ice, please.'], hint: 'N _ i _ _ p _ _ _ _ _' },
                        { hr: 'Za van (za ponijeti).', answer: 'to go', accept: ['to go', 'to go.'], hint: 'T _ g _' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"To go" znači "za ponijeti."', correct: true, explanation: 'Točno! "To go" = za van/za ponijeti. Suprotno: "For here" = za jesti tu.' },
                        { statement: '"I am allergic to nuts" znači "Volim orašaste plodove."', correct: false, explanation: '"Allergic" = ALERGIČAN, NE "volim"! Ovo je OPASNA zamjena — može izazvati zdravstveni problem!' },
                        { statement: '"Large" znači "velika veličina."', correct: true, explanation: 'Točno! Small < Medium < Large. Za kavu: "A large coffee, please."' },
                        { statement: '"With milk" znači "bez mlijeka."', correct: false, explanation: '"WITH" = S/SA! "WITHOUT" = bez. "With milk" = s mlijekom, "without milk" = bez mlijeka!' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Allergic', options: ['a-LER-gik', 'e-LER-džik', 'AL-er-gic', 'a-LER-gič'], correct: 1, explanation: '"Allergic" = "e-LER-džik". "-gic" se čita "džik", NE "gik" ili "gič"!' },
                        { word: 'Hamburger', options: ['HAM-bur-ger', 'HEM-ber-ger', 'ham-BUR-ger', 'HEM-bur-già'], correct: 1, explanation: '"Hamburger" = "HEM-ber-ger". "A" se čita "E" u američkom, naglasak na HEM.' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['milk', 'large', 'with', 'please', 'a', 'coffee'], answer: 'a large coffee with milk please', accept: ['a large coffee with milk please', 'a large coffee with milk, please'], context: 'Naručujete kavu.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'I would like hamburger, please.', options: ['I would like a hamburger, please.', 'I would like the hamburger, please.', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L17 — Osjećaji, Mišljenja i Razgovor
        // ═══════════════════════════════════════════════════
        {
            id: 'L17',
            title: 'Osjećaji i Mišljenja',
            subtitle: 'Izražavanje emocija, sviđanja, neslaganja',
            icon: '💬',
            locked: true,
            context: 'Da biste STVARNO komunicirali na engleskom, morate izraziti što mislite i osjećate — ne samo naručivati kavu!',
            culturalTip: 'Amerikanci su vrlo ekspresivni! "I love it!" kažu za sve što im se sviđa. "Awesome!" i "Amazing!" su svakodnevne riječi. Negativno se izražava blaže: "It\'s not really my thing" umjesto "I hate it."',
            phrases: [
                { id: 'L17P1', en: 'I think this is beautiful.', hr: 'Mislim da je ovo lijepo.', phonetic: 'aj FINK dis iz BJUU-ti-ful', phoneticHr: '"aj FINK dis iz BJUU-ti-ful"', tip: '"I think..." = "Mislim da..." Početak svakog mišljenja!', difficulty: 2 },
                { id: 'L17P2', en: 'I am happy.', hr: 'Sretan sam.', phonetic: 'aj em HE-pi', phoneticHr: '"aj em HE-pi"', tip: '"Happy" = sretan. "Sad" = tužan. "Angry" = ljut. "Tired" = umoran.', difficulty: 1 },
                { id: 'L17P3', en: 'I am tired.', hr: 'Umoran sam.', phonetic: 'aj em TAJ-erd', phoneticHr: '"aj em TAJ-erd"', tip: 'Nakon dugog leta ili hodanja — potpuno normalna rečenica!', difficulty: 1 },
                { id: 'L17P4', en: 'I agree with you.', hr: 'Slažem se s tobom.', phonetic: 'aj e-GRII wid juu', phoneticHr: '"aj e-GRII wid juu"', tip: '"Agree" = slažem se. "Disagree" = ne slažem se. Važno za razgovor!', difficulty: 2 },
                { id: 'L17P5', en: 'I do not like this.', hr: 'Ovo mi se ne sviđa.', phonetic: 'aj dount LAJK dis', phoneticHr: '"aj DOUNT LAJK dis"', tip: 'Blaži oblik: "It\'s not really my thing" = Baš nije moje. Amerikanci izbjegavaju direktno "I hate..."', difficulty: 2 },
                { id: 'L17P6', en: 'That is interesting.', hr: 'To je zanimljivo.', phonetic: 'DET iz IN-tris-ting', phoneticHr: '"DET iz IN-tris-ting"', tip: '"Interesting" = zanimljivo. Koristite kad netko priča nešto zanimljivo — ili kad ne znate što reći!', difficulty: 2 },
                { id: 'L17P7', en: 'I feel great today!', hr: 'Osjećam se odlično danas!', phonetic: 'aj FIIL GREJT tu-DEJ!', phoneticHr: '"aj FIIL GREJT tu-DEJ!"', tip: '"Feel" = osjećati se. "Great" = odlično/sjajno. Odgovor na "How are you?"', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L17P2', options: ['Sretan sam.', 'Umoran sam.', 'Ovo mi se ne sviđa.', 'Slažem se.'], correct: 0 },
                        { phraseId: 'L17P3', options: ['Sretan sam.', 'To je zanimljivo.', 'Umoran sam.', 'Osjećam se odlično!'], correct: 2 },
                        { phraseId: 'L17P1', options: ['Mislim da je ovo lijepo.', 'Slažem se s tobom.', 'Osjećam se odlično!', 'Ovo mi se ne sviđa.'], correct: 0 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'Happy', hr: 'Sretan' },
                        { en: 'Tired', hr: 'Umoran' },
                        { en: 'Interesting', hr: 'Zanimljivo' },
                        { en: 'Beautiful', hr: 'Lijepo' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Netko vas pita "How are you?" i osjećate se odlično.', options: ['I am tired.', 'I feel great today!', 'I do not like this.'], correct: 1 },
                        { situation: 'Vidite prekrasan Central Park po prvi put.', options: ['I think this is beautiful.', 'I do not like this.', 'That is interesting.'], correct: 0 },
                        { situation: 'Netko kaže nešto s čime se potpuno slažete.', options: ['I do not like this.', 'That is interesting.', 'I agree with you.'], correct: 2 },
                        { situation: 'Hodali ste 15 km po New Yorku i jedva stojite.', options: ['I feel great today!', 'I am tired.', 'I am happy.'], correct: 1 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Sretan sam.', answer: 'I am happy', accept: ['i am happy', 'i am happy.', "i'm happy"], hint: 'I a _ h _ _ _ _' },
                        { hr: 'Umoran sam.', answer: 'I am tired', accept: ['i am tired', 'i am tired.', "i'm tired"], hint: 'I a _ t _ _ _ _' },
                        { hr: 'To je zanimljivo.', answer: 'that is interesting', accept: ['that is interesting', 'that is interesting.', "that's interesting"], hint: 'T _ _ _ i _ i _ _ _ _ _ _ _ _ _ _' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"I am happy" znači "Sretan sam."', correct: true, explanation: 'Točno! "Happy" = sretan/sretna. Univerzalan osjećaj!' },
                        { statement: '"I agree with you" znači "Ne slažem se s tobom."', correct: false, explanation: '"Agree" = SLAŽEM SE! "Disagree" = ne slažem se. Dodajte "DIS-" za suprotnost!' },
                        { statement: '"Tired" znači "umoran."', correct: true, explanation: 'Točno! "I am tired" = Umoran sam. "I am very tired" = Jako sam umoran.' },
                        { statement: '"I feel great" znači "Osjećam se loše."', correct: false, explanation: '"Great" = ODLIČNO/sjajno! "Bad" = loše. "I feel bad" bi bilo "Osjećam se loše."' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Beautiful', options: ['be-a-UTI-ful', 'BJUU-ti-ful', 'BEL-ti-ful', 'bju-TI-ful'], correct: 1, explanation: '"Beautiful" = "BJUU-ti-ful". Naglasak na BJUU, tri sloga ukupno.' },
                        { word: 'Interesting', options: ['in-te-REST-ing', 'IN-tris-ting', 'IN-te-res-ting', 'in-TRIS-ting'], correct: 1, explanation: '"Interesting" = "IN-tris-ting". U američkom su samo TRI sloga! Srednji slog nestaje.' },
                        { word: 'Agree', options: ['A-gri', 'e-GRII', 'AG-ri', 'a-GRE'], correct: 1, explanation: '"Agree" = "e-GRII". Naglasak na GRII, a "a" na početku je kratko "e".' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'I am agree with you.', options: ['I agree with you.', 'I am agreeing with you.', 'Rečenica je ispravna.'], correct: 0 },
                        { wrong: 'I think this is beauty.', options: ['I think this is beautiful.', 'I think this is beautifully.', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'I ___ this is beautiful.', answer: 'think', accept: ['think'], hint: '"Mislim" — 5 slova, počinje s "th"', context: 'Izražavate mišljenje.' },
                        { sentence: 'I ___ great today!', answer: 'feel', accept: ['feel'], hint: '"Osjećam se" — 4 slova', context: 'Govorite kako se osjećate.' },
                    ],
                },
            ],
        },

        // ═══════════════════════════════════════════════════
        // L18 — Povratak Kući i Oproštaj
        // ═══════════════════════════════════════════════════
        {
            id: 'L18',
            title: 'Povratak Kući',
            subtitle: 'Aerodrom, let, sjećanja i oproštaj',
            icon: '✈️',
            locked: true,
            context: 'Putovanje se bliži kraju. Trebate proći sigurnosnu kontrolu, ukrcati se na let i oprostiti se s novim prijateljima.',
            culturalTip: 'Na aerodromu dolazite 3 sata PRIJE međunarodnog leta. TSA (sigurnosna kontrola) traži: cipele skinuti, laptop iz torbe izvaditi, tekućine u prozirnoj vrećici. "Have a safe flight!" = Sretan let!',
            phrases: [
                { id: 'L18P1', en: 'Where is the check-in counter?', hr: 'Gdje je šalter za prijavu?', phonetic: 'WER iz de ČEK-in KAUN-ter?', phoneticHr: '"WER iz de ČEK-in KAUN-ter?"', tip: '"Check-in counter" = šalter za prijavu na let. Ili koristite self-check-in kiosk.', difficulty: 2 },
                { id: 'L18P2', en: 'I need to go to gate B5.', hr: 'Trebam doći do izlaza B5.', phonetic: 'aj niid tu GOU tu GEJT bii-FAJV', phoneticHr: '"aj niid tu GOU tu GEJT bii-FAJV"', tip: '"Gate" = izlaz za ukrcavanje. Uvijek provjerite koji gate — može se promijeniti!', difficulty: 2 },
                { id: 'L18P3', en: 'Is my flight on time?', hr: 'Je li moj let u redu/na vrijeme?', phonetic: 'iz maj FLAJT on TAJM?', phoneticHr: '"iz maj FLAJT on TAJM?"', tip: '"On time" = na vrijeme. "Delayed" = kasni. "Cancelled" = otkazan.', difficulty: 2 },
                { id: 'L18P4', en: 'Thank you for everything!', hr: 'Hvala za sve!', phonetic: 'FENK-ju for EV-ri-fing!', phoneticHr: '"FENK-ju for EV-ri-fing!"', tip: 'Prekrasan pozdrav za ljude koji su vam pomogli na putovanju.', difficulty: 1 },
                { id: 'L18P5', en: 'I had a wonderful time.', hr: 'Imao sam prekrasno vrijeme.', phonetic: 'aj hed e WAN-der-ful TAJM', phoneticHr: '"aj hed e WAN-der-ful TAJM"', tip: '"I had..." = prošlo vrijeme od "I have". "Wonderful" = prekrasno/divno.', difficulty: 3 },
                { id: 'L18P6', en: 'I will come back soon.', hr: 'Vratit ću se uskoro.', phonetic: 'aj wil KAM BEK SUUN', phoneticHr: '"aj wil KAM BEK SUUN"', tip: '"Will" = budućnost. "Come back" = vratiti se. Lijepo obećanje!', difficulty: 2 },
                { id: 'L18P7', en: 'Can I have a window seat?', hr: 'Mogu li dobiti mjesto do prozora?', phonetic: 'ken aj hev e WIN-dou SIIT?', phoneticHr: '"ken aj hev e WIN-dou SIIT?"', tip: '"Window seat" = mjesto do prozora. "Aisle seat" = mjesto uz prolaz. Pitajte na check-inu!', difficulty: 2 },
            ],
            exercises: [
                {
                    type: 'listen-choose',
                    instruction: '🔊 Slušajte i odaberite.',
                    questions: [
                        { phraseId: 'L18P4', options: ['Hvala za sve!', 'Vratit ću se uskoro.', 'Je li moj let na vrijeme?', 'Gdje je šalter?'], correct: 0 },
                        { phraseId: 'L18P3', options: ['Trebam doći do izlaza B5.', 'Je li moj let na vrijeme?', 'Mogu li dobiti mjesto do prozora?', 'Hvala za sve!'], correct: 1 },
                        { phraseId: 'L18P6', options: ['Imao sam prekrasno vrijeme.', 'Hvala za sve!', 'Vratit ću se uskoro.', 'Gdje je šalter?'], correct: 2 },
                    ],
                },
                {
                    type: 'match-pairs',
                    instruction: '🔗 Spojite parove.',
                    pairs: [
                        { en: 'Check-in counter', hr: 'Šalter za prijavu' },
                        { en: 'On time', hr: 'Na vrijeme' },
                        { en: 'Window seat', hr: 'Mjesto do prozora' },
                        { en: 'Come back', hr: 'Vratiti se' },
                    ],
                },
                {
                    type: 'situation',
                    instruction: '🎭 Što biste rekli?',
                    questions: [
                        { situation: 'Na aerodromu ste i želite se prijaviti na let.', options: ['Where is the check-in counter?', 'I had a wonderful time.', 'Thank you for everything!'], correct: 0 },
                        { situation: 'Opraštate se s prijateljem kojeg ste upoznali na putovanju.', options: ['Is my flight on time?', 'Can I have a window seat?', 'I had a wonderful time. Thank you for everything!'], correct: 2 },
                        { situation: 'Let je u 14:00 i želite znati kasni li.', options: ['Is my flight on time?', 'Where is gate B5?', 'I will come back soon.'], correct: 0 },
                        { situation: 'Na check-inu želite vidjeti oblake iz aviona.', options: ['I need to go to gate B5.', 'Can I have a window seat?', 'Is my flight on time?'], correct: 1 },
                    ],
                },
                {
                    type: 'spell',
                    instruction: '✍️ Napišite engleski prijevod.',
                    questions: [
                        { hr: 'Hvala za sve!', answer: 'thank you for everything', accept: ['thank you for everything', 'thank you for everything!'], hint: 'T _ _ _ _ y _ _ f _ _ e _ _ _ _ _ _ _ _ _!' },
                        { hr: 'Vratit ću se uskoro.', answer: 'I will come back soon', accept: ['i will come back soon', 'i will come back soon.', "i'll come back soon"], hint: 'I w _ _ _ c _ _ _ b _ _ _ s _ _ _' },
                    ],
                },
                {
                    type: 'true-false',
                    instruction: '✅❌ Je li ovaj prijevod TOČAN ili NETOČAN?',
                    questions: [
                        { statement: '"On time" znači "na vrijeme."', correct: true, explanation: 'Točno! "On time" = na vrijeme. "The flight is on time" = let je po rasporedu.' },
                        { statement: '"I will come back soon" znači "Došao sam nedavno."', correct: false, explanation: '"Will come back" = VRATIT ĆU SE (budućnost)! "I came back" bi bilo "Vratio sam se" (prošlost).' },
                        { statement: '"Gate" na aerodromu znači "izlaz za ukrcavanje."', correct: true, explanation: 'Točno! "Gate" = izlaz/vrata za ukrcavanje na avion. "Gate B5" = izlaz B5.' },
                        { statement: '"I had a wonderful time" znači "Imam prekrasno vrijeme."', correct: false, explanation: '"I HAD" = IMAO SAM (prošlost)! "I HAVE" = imam (sadašnjost). "Had" vs "have" — ključna razlika!' },
                        { statement: '"Window seat" znači "mjesto do prozora."', correct: true, explanation: 'Točno! "Window" = prozor, "seat" = sjedalo. "Aisle seat" = mjesto uz prolaz.' },
                    ],
                },
                {
                    type: 'pronunciation-trap',
                    instruction: '🗣️ Kako se ISPRAVNO izgovara?',
                    questions: [
                        { word: 'Flight', options: ['FLAHT', 'FLAJT', 'FLIGT', 'FLIT'], correct: 1, explanation: '"Flight" = "FLAJT". "GH" je TIHO (kao u "right", "night", "eight"). "I" se čita "AJ".' },
                        { word: 'Everything', options: ['e-VRI-ting', 'EV-ri-fing', 'EV-ri-ting', 'ev-ri-ZING'], correct: 1, explanation: '"Everything" = "EV-ri-fing". "TH" na kraju se čita "F" (bezzvučni th)!' },
                        { word: 'Wonderful', options: ['von-DER-ful', 'WAN-der-ful', 'WUND-er-ful', 'WON-der-ful'], correct: 1, explanation: '"Wonderful" = "WAN-der-ful". "O" se čita otvoreno "A", naglasak na WAN.' },
                    ],
                },
                {
                    type: 'reorder',
                    instruction: '🔀 Poredajte riječi u ispravan redoslijed.',
                    questions: [
                        { words: ['for', 'you', 'everything', 'thank'], answer: 'thank you for everything', accept: ['thank you for everything', 'thank you for everything!'], context: 'Zahvaljujete nekome.' },
                        { words: ['back', 'come', 'will', 'soon', 'I'], answer: 'I will come back soon', accept: ['I will come back soon', 'I will come back soon.'], context: 'Obećavate povratak.' },
                    ],
                },
                {
                    type: 'fill-blank',
                    instruction: '📝 Popunite prazninu ispravnom riječju.',
                    questions: [
                        { sentence: 'Is my flight on ___?', answer: 'time', accept: ['time'], hint: 'Vrijeme — 4 slova', context: 'Pitate o rasporedu leta.' },
                        { sentence: 'I had a ___ time.', answer: 'wonderful', accept: ['wonderful', 'great', 'amazing'], hint: 'Prekrasno/divno', context: 'Govorite o putovanju.' },
                        { sentence: 'Can I have a ___ seat?', answer: 'window', accept: ['window'], hint: 'Prozor — 6 slova', context: 'Na check-inu za let.' },
                    ],
                },
                {
                    type: 'error-fix',
                    instruction: '🔍 Pronađite i ispravite grešku.',
                    questions: [
                        { wrong: 'I will come back soon.', options: ['Rečenica je ispravna.', 'I will came back soon.', 'I will comes back soon.'], correct: 0 },
                        { wrong: 'Thank you for all things!', options: ['Thank you for everything!', 'Thank you for all!', 'Rečenica je ispravna.'], correct: 0 },
                    ],
                },
            ],
        },
    ],


    /* ═══════════════════════════════════════════════════
       POSTIGNUĆA (Achievements)
       ═══════════════════════════════════════════════════ */
    achievements: [
        { id: 'A1',  icon: '🌟', name: 'Prva Riječ',           desc: 'Slušali ste prvu englesku frazu.',      xp: 20,  condition: 'firstPhrase' },
        { id: 'A2',  icon: '📚', name: 'Prva Lekcija',         desc: 'Završili ste svoju prvu lekciju.',       xp: 50,  condition: 'firstLesson' },
        { id: 'A3',  icon: '🎯', name: 'Savršen Krug',         desc: 'Sve točno u jednom setu vježbi!',        xp: 100, condition: 'perfectExercise' },
        { id: 'A4',  icon: '🔥', name: 'Streak 3',             desc: 'Vježbali ste 3 dana zaredom.',           xp: 50,  condition: 'streak3' },
        { id: 'A5',  icon: '🔥', name: 'Streak 7',             desc: 'Vježbali ste 7 dana zaredom!',           xp: 100, condition: 'streak7' },
        { id: 'A6',  icon: '🗣️', name: 'Hrabar Govornik',      desc: 'Koristili ste mikrofon 5 puta.',         xp: 30,  condition: 'mic5' },
        { id: 'A7',  icon: '💬', name: '20 Fraza',             desc: 'Naučili ste 20 fraza.',                  xp: 75,  condition: 'phrases20' },
        { id: 'A8',  icon: '🏆', name: 'Poliglot u Nastajanju', desc: 'Završili ste 3 lekcije.',               xp: 200, condition: 'lessons3' },
        { id: 'A9',  icon: '✈️', name: 'Spreman za Let',       desc: 'Prošli ste sve aerodromske fraze.',       xp: 50,  condition: 'lessonL2' },
        { id: 'A10', icon: '🎓', name: 'Marljiv Učenik',       desc: 'Skupili ste 500 XP.',                    xp: 50,  condition: 'xp500' },
        { id: 'A11', icon: '🍽️', name: 'Gastronom',            desc: 'Savladali ste restoranske fraze.',       xp: 75,  condition: 'lessonL4' },
        { id: 'A12', icon: '🗺️', name: 'Navigator',            desc: 'Znate pitati i razumjeti upute.',        xp: 75,  condition: 'lessonL5' },
        { id: 'A13', icon: '💰', name: 'Financijer',           desc: 'Ovladali ste brojevima i novcem.',       xp: 75,  condition: 'lessonL8' },
        { id: 'A14', icon: '🏥', name: 'Pripravan Putnik',     desc: 'Znate se snaći u hitnim situacijama.',   xp: 100, condition: 'lessonL10' },
        { id: 'A15', icon: '🔥', name: 'Streak 14',            desc: 'Vježbali ste 14 dana zaredom!',          xp: 200, condition: 'streak14' },
        { id: 'A16', icon: '💬', name: '50 Fraza',             desc: 'Naučili ste 50 fraza!',                  xp: 150, condition: 'phrases50' },
        { id: 'A17', icon: '🏆', name: 'Polumaratonac',        desc: 'Završili ste 7 lekcija.',                xp: 300, condition: 'lessons7' },
        { id: 'A18', icon: '🏅', name: 'Maratonac',            desc: 'Završili ste 10 lekcija!',               xp: 500, condition: 'lessons10' },
        { id: 'A19', icon: '🎓', name: 'XP Tisuću',            desc: 'Skupili ste 1000 XP!',                   xp: 100, condition: 'xp1000' },
        { id: 'A20', icon: '📱', name: 'Digitalni Putnik',     desc: 'Savladali ste tehnologiju i internet.',  xp: 100, condition: 'lessonL14' },
        { id: 'A21', icon: '🎬', name: 'Filmski Kritičar',     desc: 'Znate razgovarati o filmovima!',         xp: 100, condition: 'lessonL15' },
        { id: 'A22', icon: '🍔', name: 'Fast Food Stručnjak',  desc: 'Znate naručiti u fast foodu!',           xp: 100, condition: 'lessonL16' },
        { id: 'A23', icon: '💬', name: 'Ekspresivan Govornik', desc: 'Možete izraziti osjećaje i mišljenja!',  xp: 100, condition: 'lessonL17' },
        { id: 'A24', icon: '🏠', name: 'Sretan Povratak',      desc: 'Znate se snalaziti na povratnom letu!',  xp: 100, condition: 'lessonL18' },
        { id: 'A25', icon: '💬', name: '75 Fraza',             desc: 'Naučili ste 75 fraza!',                  xp: 200, condition: 'phrases75' },
        { id: 'A26', icon: '🏆', name: 'Ultramaratonac',       desc: 'Završili ste 15 lekcija!',               xp: 750, condition: 'lessons15' },
        { id: 'A27', icon: '🌍', name: 'Svjetski Putnik',      desc: 'Završili ste svih 18 lekcija!',          xp: 1500, condition: 'lessons18' },
        // Marketplace & Drill achievements
        { id: 'A28', icon: '🪙', name: 'Prva Kupnja',          desc: 'Kupili ste prvi modul u trgovini.',       xp: 30,  condition: 'firstPurchase' },
        { id: 'A29', icon: '🛒', name: 'Kolekcionar',          desc: 'Kupili ste 6 modula!',                    xp: 150, condition: 'purchases6' },
        { id: 'A30', icon: '💎', name: 'Bogataš',              desc: 'Kupili ste svih 12 modula!',              xp: 500, condition: 'purchases12' },
        { id: 'A31', icon: '🎯', name: 'Drill Majstor',        desc: 'Savršen rezultat (100%) na jednom drilu!', xp: 100, condition: 'perfectDrill' },
        { id: 'A32', icon: '🏅', name: 'Drill Šampion',        desc: 'Savršen rezultat na 6 drilova!',          xp: 300, condition: 'perfectDrills6' },
        // Memory & cognitive
        { id: 'A33', icon: '🃏', name: 'Kartaš',               desc: 'Završili ste prvu memory-match vježbu.',  xp: 40,  condition: 'firstMemoryMatch' },
        { id: 'A34', icon: '🧠', name: 'Kognitivni Atleta',    desc: 'Završili ste 5 memory-match vježbi.',     xp: 200, condition: 'memoryMatch5' },
        // Speed & dedication
        { id: 'A35', icon: '⚡', name: 'Brzi Prst',            desc: 'Odgovorili ste 50 pitanja točno.',        xp: 100, condition: 'answers50' },
        { id: 'A36', icon: '💪', name: 'Neustrašivi',          desc: 'Odgovorili ste 200 pitanja točno.',       xp: 300, condition: 'answers200' },
        { id: 'A37', icon: '🔥', name: 'Streak 30',            desc: 'Vježbali ste 30 dana zaredom!',           xp: 500, condition: 'streak30' },
        { id: 'A38', icon: '🎖️', name: 'XP 2500',             desc: 'Skupili ste 2500 XP!',                    xp: 200, condition: 'xp2500' },
        { id: 'A39', icon: '👑', name: 'XP 5000',              desc: 'Skupili ste 5000 XP — Legenda!',          xp: 500, condition: 'xp5000' },
    ],


    /* ═══════════════════════════════════════════════════
       RAZINE (Levels)
       ═══════════════════════════════════════════════════ */
    levels: [
        { level: 1,  xpRequired: 0,    title: 'Početnik' },
        { level: 2,  xpRequired: 100,  title: 'Učenik' },
        { level: 3,  xpRequired: 250,  title: 'Istraživač' },
        { level: 4,  xpRequired: 500,  title: 'Putnik' },
        { level: 5,  xpRequired: 800,  title: 'Razgovorni' },
        { level: 6,  xpRequired: 1200, title: 'Samouvjeren' },
        { level: 7,  xpRequired: 1800, title: 'Tečan Govornik' },
        { level: 8,  xpRequired: 2500, title: 'Majstor' },
        { level: 9,  xpRequired: 3500, title: 'Stručnjak' },
        { level: 10, xpRequired: 5000, title: 'Legenda' },
    ],


    /* ═══════════════════════════════════════════════════
       KULTURNI SAVJETI (rotiraju se na dashboardu)
       ═══════════════════════════════════════════════════ */
    tips: [
        'Amerikanci uvijek kažu "please" i "thank you". Ali i puno "awesome!", "sure!", "you bet!" — sve su to pozitivne fraze.',
        'U redu (line) se ne gura. Amerikanci kažu "stand in line", ne "queue". Budite strpljivi i čekajte svoj red.',
        '"How are you?" nije pravo pitanje — to je pozdrav! Odgovorite "Good, thanks!" ili "I\'m fine, thank you!" i nastavite dalje.',
        '"Awesome" je omiljena američka riječ. Znači "super" i čujete je desetak puta dnevno. Slobodno je koristite!',
        'U restoranu napojnica (tip) je OBAVEZNA — 15-20% iznosa računa. Konobari žive od napojnica! To je američka kultura.',
        'Amerikanci vole small talk — razgovor o vremenu, sportu, hrani. "Nice weather today!" je savršen razgovorni otvarač.',
        'Ako ne razumijete nekoga, recite "Sorry, could you say that again?" — nitko se neće uvrijediti.',
        '"Sorry" je korisna riječ, ali Amerikanci je ne koriste toliko kao Britanci. Više kažu "Excuse me" za privlačenje pažnje.',
        'U New Yorku koristite MetroCard ili kontaktno plaćanje za subway. Jedna vožnja je $2.90 (2025.).',
        'U SAD-u kažite "restroom" ili "bathroom" — ne "toilet". "Where is the restroom?" je pravilno pitanje.',
        'Amerikanci piju kavu — PUNO kave. "Coffee to go" ili "coffee for here" su fraze koje ćete koristiti svaki dan.',
        'U fast food restoranima naručujete na šalteru (counter). Nema konobara. Kažite narudžbu i platite odmah.',
        'Ako se izgubite, upitajte nekoga "Excuse me, can you help me?" Većina Amerikanaca će rado pomoći — i to s osmijehom.',
        'U SAD-u se vozi DESNOM stranom ceste, kao u Hrvatskoj. Ali prometni znakovi su na engleskom!',
        'Smithsonian muzeji u Washingtonu D.C. su potpuno besplatni! 19 muzeja i zoo — sve free.',
        'Američki doručak: jaja (eggs), slanina (bacon), palačinke (pancakes) i kava. "Brunch" = kasni doručak vikendom.',
        '"Have a nice day!" čujete na svakom koraku — u dućanu, banci, restoranu. Amerikanci to ozbiljno misle!',
        'Temperatura u SAD-u se mjeri u Fahrenheitu, ne Celzijusu! 72°F ≈ 22°C (ugodna sobna temperatura).',
        'Američke utičnice imaju dva ravna pinova. Trebat će vam adapter ako imate europski punjač!',
        'Kupnja suvenira: svaki turistički grad ima "gift shop". Pitajte "Do you have anything from New York?" ili koji god grad.',
        '🎬 KAKO UČITI IZ FILMOVA — Faza 1: Gledajte s HRVATSKIM titlovima. Fokusirajte se na priču. Pokušajte prepoznati riječi koje već znate.',
        '🎬 KAKO UČITI IZ FILMOVA — Faza 2: Gledajte ISTE filmove s ENGLESKIM titlovima. Čitajte i slušajte istovremeno. Pauzajte kad ne razumijete.',
        '🎬 KAKO UČITI IZ FILMOVA — Faza 3: Pokušajte gledati BEZ titlova. Ne morate razumjeti sve — hvatajte ključne riječi i kontekst.',
        '🎬 POČNITE S OVIM: Dječji filmovi (Finding Nemo, Toy Story), pa sitcomi (Friends, The Office) — jednostavan, svakodnevni jezik.',
        '🎬 TRIK ZA SLUŠANJE: Ponavljajte fraze NAGLAS odmah nakon glumaca. To se zove "shadowing" i drastično poboljšava izgovor.',
        '🎬 NE PREVODITE u glavi! Pokušajte OSJETITI značenje iz konteksta, slika i emocija — kao dijete kad uči govoriti.',
        '🗣️ IZGOVOR SAVJET: Engleski "W" nije naše "V"! Zaoblite usne kao da pijete kroz slamku. Vježbajte: "Water", "Where", "What".',
        '🗣️ IZGOVOR SAVJET: Engleski "TH" — stavite jezik IZMEĐU zuba i pušite zrak. Vježba: "Thank", "Three", "This".',
        '🗣️ IZGOVOR SAVJET: Američki "R" je blaži od hrvatskog. Jezik se NE dodiruje nepce. Kažite "car" bez vibriranja jezika.',
        '📺 KORISNE YOUTUBE KANALE za početnike: "English with Lucy", "Rachel\'s English", "English Addict with Mr Duncan".',
    ],


    /* ═══════════════════════════════════════════════════
       VODIČ ZA GLEDANJE (Watching Guide)
       ═══════════════════════════════════════════════════ */
    watchingGuide: {
        title: 'Kako naučiti engleski gledajući filmove i serije',
        intro: 'Gledanje američkih filmova i serija je NAJBOLJI način da naučite engleski nakon što savladate osnove. Evo provjerene metode u 4 faze.',
        phases: [
            {
                title: 'Faza 1: Hrvatski titlovi',
                icon: '🇭🇷',
                description: 'Gledajte filmove koje VOLITE s HRVATSKIM titlovima. Fokusirajte se na priču. Pokušajte prepoznati engleske riječi koje ste naučili u lekcijama. Ovo gradi "osjećaj" za ritam i melodiju engleskog.',
                tips: ['Počnite s filmovima koje ste već gledali', 'Dječji filmovi su SJAJNI — jednostavan jezik', 'Ne stresljajte se ako ne razumijete — uživajte!'],
                recommended: ['Finding Nemo (2003)', 'Toy Story (1995)', 'The Lion King (1994)', 'Shrek (2001)'],
            },
            {
                title: 'Faza 2: Engleski titlovi',
                icon: '🇺🇸',
                description: 'Gledajte ISTE filmove ponovno, ali sad s ENGLESKIM titlovima. Čitajte i slušajte istovremeno. Pauzajte kad nađete frazu koju ne razumijete — zapišite je! Ovo povezuje pisani i govorni engleski.',
                tips: ['Pauzajte i pregledajte nove riječi', 'Zapisujte fraze, ne pojedinačne riječi', 'Gledajte po 20-30 minuta, ne cijeli film odjednom'],
                recommended: ['Friends (sitcom, jednostavan)', 'The Office US (humor, svakodnevni jezik)', 'Modern Family (obiteljski, jasan govor)'],
            },
            {
                title: 'Faza 3: Bez titlova',
                icon: '🎯',
                description: 'Pokušajte gledati BEZ titlova. Ne morate razumjeti sve — cilj je prepoznati ključne riječi i shvatiti kontekst iz situacije. Ako ste frustrirani, uključite titlove i nastavite!',
                tips: ['Fokusirajte se na KONTEKST — tko govori, kako se osjeća, što radi', 'Ne prevodite u glavi — pokušajte "osjetiti" značenje', '50% razumijevanja je USPJEH za početnike!'],
                recommended: ['Serije prilagodite svom interesu', 'Dokumentarci su dobri jer imaju jasan govor', 'Podcasti na engleskom za vježbu slušanja'],
            },
            {
                title: 'Faza 4: Shadowing (Ponavljanje)',
                icon: '🗣️',
                description: 'Najmoćnija tehnika: PONAVLJAJTE naglas fraze odmah nakon glumaca. To se zove "shadowing". Imitirajte ton, ritam, naglasak. Ovo dramatično poboljšava izgovor i samopouzdanje!',
                tips: ['Izaberite omiljenu scenu i ponavljajte je 5-10 puta', 'Snimite sebe i usporedite s originalom', 'Fokusirajte se na RITAM, ne na perfektni izgovor'],
                recommended: ['Bilo koja scena iz filmova koje volite', 'TED Talks na engleskom (jasno i polako)', 'YouTube videi za učenje engleskog'],
            },
        ],
    },
};
