// Assessment Questions
const questions = [
    { id: 1, cat: "G", en: "I prefer ministering by myself rather than in a group.", tl: "Mas gusto kong maglingkod nang mag-isa kaysa sa isang grupo." },
    { id: 2, cat: "F", en: "People often say I am impulsive and direct.", tl: "Madalas sabihin ng mga tao na ako ay pabigla-bigla at prangka." },
    { id: 3, cat: "A", en: "My financial resources are above average.", tl: "Ang aking pinansyal na mapagkukunan ay higit sa karaniwan." },
    { id: 4, cat: "D", en: "I like to counsel people on a short-term basis.", tl: "Gusto kong magpayo sa mga tao sa maikling panahon." },
    { id: 5, cat: "G", en: "I am a task-oriented person.", tl: "Ako ay isang taong nakatuon sa gawain." },
    { id: 6, cat: "B", en: "I love directing other people's work.", tl: "Mahal ko ang pagdidirekta sa trabaho ng ibang tao." },
    { id: 7, cat: "E", en: "It's natural for me to show kindness to people.", tl: "Likas sa akin ang magpakita ng kabaitan sa mga tao." },
    { id: 8, cat: "C", en: "People learn easily from me.", tl: "Madaling matuto ang mga tao mula sa akin." },
    { id: 9, cat: "F", en: "I can be very persuasive.", tl: "Maaari akong maging napaka-mapanghikayat." },
    { id: 10, cat: "A", en: "More than 10 percent of my income goes for Christian causes.", tl: "Higit sa 10 porsiyento ng aking kita ay napupunta sa mga gawaing Kristiyano." },
    { id: 11, cat: "D", en: "People often follow my advice.", tl: "Madalas sundin ng mga tao ang aking payo." },
    { id: 12, cat: "C", en: "I normally use several books in lesson preparation.", tl: "Karaniwan akong gumagamit ng ilang mga libro sa paghahanda ng aralin." },
    { id: 13, cat: "B", en: "I like to recruit and lead people.", tl: "Gusto kong mag-recruit at mamuno ng mga tao." },
    { id: 14, cat: "E", en: "One-on-one relationships are important to me.", tl: "Ang one-on-one na relasyon ay mahalaga sa akin." },
    { id: 15, cat: "G", en: "I possess a variety of talents and abilities.", tl: "Nagtataglay ako ng iba't ibang mga talento at kakayahan." },
    { id: 16, cat: "F", en: "I want to measure everything by God's Word.", tl: "Gusto kong sukatin ang lahat sa pamamagitan ng Salita ng Diyos." },
    { id: 17, cat: "A", en: "Material possessions don't mean much to me.", tl: "Ang mga materyal na pag-aari ay hindi gaanong mahalaga sa akin." },
    { id: 18, cat: "D", en: "Discouraged people are encouraged by my words.", tl: "Ang mga taong pinanghihinaan ng loob ay nabibigyang-lakas ng aking mga salita." },
    { id: 19, cat: "C", en: "Being accurate and truthful are important to me.", tl: "Ang pagiging tumpak at tapat ay mahalaga sa akin." },
    { id: 20, cat: "G", en: "I love the challenge of accomplishing an organization goal.", tl: "Gusto ko ang hamon ng pagkamit ng isang layunin ng organisasyon." },
    { id: 21, cat: "D", en: "Other people's spiritual welfare genuinely concerns me.", tl: "Ang espirituwal na kapakanan ng ibang tao ay tunay na mahalaga sa akin." },
    { id: 22, cat: "F", en: "I usually make quick decisions.", tl: "Karaniwan akong gumagawa ng mabilis na desisyon." },
    { id: 23, cat: "E", en: "I look for ways to help the unfortunate and downtrodden.", tl: "Naghahanap ako ng mga paraan upang matulungan ang mga kapus-palad." },
    { id: 24, cat: "C", en: "Criticism doesn't bother me.", tl: "Hindi ako naaabala ng mga kritismo." },
    { id: 25, cat: "G", en: "I often volunteer my time and talents to worthwhile causes.", tl: "Madalas kong ibigay ang aking oras at talento para sa mga makabuluhang layunin." },
    { id: 26, cat: "B", en: "I am usually self-confident.", tl: "Karaniwan akong may tiwala sa sarili." },
    { id: 27, cat: "E", en: "I don't expect repayment for favors I do for others.", tl: "Hindi ako umaasa ng kabayaran para sa mga pabor na ginagawa ko sa iba." },
    { id: 28, cat: "B", en: "I enjoy being responsible for the success of the group.", tl: "Nasisiyahan akong maging responsable para sa tagumpay ng grupo." },
    { id: 29, cat: "F", en: "When a question about truth comes up, I am normally right.", tl: "Kapag may lumabas na tanong tungkol sa katotohanan, karaniwan akong tama." },
    { id: 30, cat: "B", en: "Deadlines challenge me, and I usually meet them on time.", tl: "Hinahamon ako ng mga deadline, at karaniwan ko itong natatapos sa oras." },
    { id: 31, cat: "D", en: "People in pain are comforted by my presence.", tl: "Ang mga taong nasasaktan ay naaaliw sa aking presensya." }
];

// Gift Descriptions Database
const database = {
    A: {
        en: { 
            title: "Giving", 
            text: "You contribute material resources with liberality and cheerfulness, often sacrificially. You motivate others to give and don't shun pressure or publicity in your generosity.",
            scripture: "Romans 12:13 – 'Share with God's people who are in need. Practice hospitality.'"
        },
        tl: { 
            title: "Pagbibigay", 
            text: "Nag-aambag ka ng mga materyal na mapagkukunan nang may pagkukusa at kagalakan, madalas na sakripisyal. Hinihikayat mo ang iba na magbigay at hindi umaatras sa pressure o publisidad sa iyong kagandahang-loob.",
            scripture: "Roma 12:13 – 'Tumulong kayo sa mga pangangailangan ng mga banal. Magsanay kayo sa pagkamapagpatuloy.'"
        }
    },
    B: {
        en: { 
            title: "Administration", 
            text: "You lead and communicate so people work harmoniously to reach goals. You enjoy leadership, endure adverse reactions, and excel at setting guidelines, schedules, and policies while delegating effectively.",
            scripture: "Romans 12:14 – 'Bless those who persecute you; bless and do not curse.'"
        },
        tl: { 
            title: "Pangangasiwa", 
            text: "Namumuno at nakikipag-usap ka upang ang mga tao ay magtrabaho nang maayos para maabot ang mga layunin. Nasisiyahan ka sa pamumuno, tiis ang mga masasamang reaksyon, at mahusay sa pagtatakda ng mga alituntunin, iskedyul, at patakaran habang epektibong nagdedelega.",
            scripture: "Roma 12:14 – 'Pagpalain ninyo ang mga umuusig sa inyo; pagpalain at huwag sumpain.'"
        }
    },
    C: {
        en: { 
            title: "Teaching", 
            text: "You communicate truth with clarity and obvious results. You believe your gift is foundational, work systematically, and maintain accuracy in all you present.",
            scripture: "Romans 12:11 – 'Never be lacking in zeal, but keep your spiritual fervor, serving the Lord.'"
        },
        tl: { 
            title: "Pagtuturo", 
            text: "Ipinapahayag mo ang katotohanan nang may kaliwanagan at malinaw na resulta. Naniniwala ka na ang iyong kaloob ay pundamental, nagtatrabaho nang may sistema, at pinapanatili ang katumpakan sa lahat ng iyong inihahain.",
            scripture: "Roma 12:11 – 'Huwag magkulang sa kasigasigan; magningas sa espiritu; maglingkod sa Panginoon.'"
        }
    },
    D: {
        en: { 
            title: "Exhortation", 
            text: "You minister by giving comfort, consolation, and encouragement so people feel helped and healed. You view problems as challenges and are drawn to those seeking spiritual growth.",
            scripture: "Romans 12:12 – 'Be joyful in hope, patient in affliction, faithful in prayer.'"
        },
        tl: { 
            title: "Panghihikayat", 
            text: "Naglilingkod ka sa pamamagitan ng pagbibigay ng aliwan, konsolasyon, at pag-asa upang ang mga tao ay makaramdam ng tulong at pagaling. Tinitingnan mo ang mga problema bilang mga hamon at nahihikayat sa mga naghahanap ng espirituwal na paglago.",
            scripture: "Roma 12:12 – 'Magalak kayo sa pag-asa, magtiyaga sa kapighatian, manatiling dalangin.'"
        }
    },
    E: {
        en: { 
            title: "Mercy", 
            text: "You feel deep compassion for those suffering and perform deeds to reflect God's love. Naturally drawn to hurting people, you are sensitive, giving, loving, and desire healing for others.",
            scripture: "Romans 12:15-16 – 'Rejoice with those who rejoice; mourn with those who mourn. Live in harmony with one another.'"
        },
        tl: { 
            title: "Pagkawanggawa", 
            text: "Nakadarama ka ng malalim na habag para sa mga naghihirap at gumagawa ng mga gawaing nagpapakita ng pag-ibig ng Diyos. Likas na nahihikayat sa mga nasasaktang tao, ikaw ay maaalahanin, mapagbigay, mapagmahal, at hangad ang pagaling para sa iba.",
            scripture: "Roma 12:15-16 – 'Makigalak sa mga nagagalak; makiiyak sa mga umiiyak. Magkasundo kayo.'"
        }
    },
    F: {
        en: { 
            title: "Prophecy", 
            text: "Your goal is to bring people face to face with God. You discern and reveal motives and actions, have strong convictions, and are impulsive, direct, and persuasive.",
            scripture: "Romans 12:9 – 'Love must be sincere. Hate what is evil; cling to what is good.'"
        },
        tl: { 
            title: "Pagpapahayag", 
            text: "Ang iyong layunin ay dalhin ang mga tao sa harap ng Diyos. Nauunawaan at inihahayag mo ang mga motibo at kilos, may malalakas na paninindigan, at ikaw ay pabigla-bigla, prangka, at mapanghikayat.",
            scripture: "Roma 12:9 – 'Maging tunay ang inyong pag-ibig; kapootan ang masama; kumapit sa mabuti.'"
        }
    },
    G: {
        en: { 
            title: "Serving", 
            text: "You identify and meet the needs of others using personal resources. You see needs and enjoy responding, work best short-term and alone, and possess endurance with a tendency to do too much.",
            scripture: "Romans 12:10 – 'Be devoted to one another in love. Honor one another above yourselves.'"
        },
        tl: { 
            title: "Paglilingkod", 
            text: "Natutukoy at natutugunan mo ang mga pangangailangan ng iba gamit ang personal na mapagkukunan. Nakikita mo ang mga pangangailangan at nasisiyahan sa pagtugon, nagtatrabaho nang maayos sa maikling panahon at mag-isa, at nagtataglay ng tibay ng loob na may tendensyang magtrabaho nang labis.",
            scripture: "Roma 12:10 – 'Magmahalan kayo bilang magkakapatid. Magbigay ng karangalan sa isa't isa.'"
        }
    }
};