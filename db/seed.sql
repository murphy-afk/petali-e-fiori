-- Petali e Fiori: seed data
-- Source: content of the current petaliefiori.it website, see ROADMAP.md section 3
-- Import order: db/schema.sql first, then this file, then db/seed_gallery.sql
-- Re running this file replaces all content tables.
-- contact_messages is left untouched so real messages survive a re seed.

USE `petali_e_fiori`;

SET NAMES utf8mb4;

DELETE FROM `settings`;
DELETE FROM `pages`;
DELETE FROM `services`;
DELETE FROM `bouquets`;
DELETE FROM `decorations`;
DELETE FROM `price_examples`;
DELETE FROM `partners`;

-- ------------------------------------------------------------------ settings
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('brand_name', 'Petali e Fiori'),
('brand_legal', 'Petaliefiori'),
('tagline', 'Per il vostro Sogno d''Amore, scegliete chi possa realizzare i Vostri sogni.'),
('claim', 'Insomma il nostro obiettivo è realizzare i Vostri Sogni!'),
('home_intro_1', 'Noi possiamo realizzare il Bouquet e l''allestimento che avete sempre immaginato: possiamo mostrarvi in anticipo come saranno inserite le decorazioni nel luogo dell''Evento.'),
('home_intro_2', 'Da noi troverete un Flower Designer che progetterà e realizzerà su misura il Vostro Evento, rendendolo veramente unico.'),
('home_intro_3', 'I preventivi sono gratuiti, così come il progetto virtuale da noi sviluppato su di un''immagine del luogo ove si svolgerà l''Evento.'),
('flower_designer', 'Valeria Sciandra'),
('flower_designer_role', 'Flower Designer diplomata'),
('address_street', 'Via Arzaga 24'),
('address_city', 'Milano'),
('address_zip', '20146'),
('metro', 'MM1 fermata Primaticcio'),
('phone_landline', '02 23167849'),
('phone_mobile', '331 8603337'),
('email', 'info@petaliefiori.it'),
('vat_number', '07036590961'),
('copyright', 'Copyright Petaliefiori 2011'),
('partner_name', 'Autonoleggio Bellani'),
('partner_url', 'http://www.autonoleggiobellani.com'),
('contact_hint', 'Potete darci qualche indicazione di cosa preferite: la tipologia di fiori, il tipo di addobbo, se desiderate la camminata o meno e soprattutto se desiderate il nostro Progetto Virtuale Gratuito!'),
('price_note', 'I nostri prezzi comprendono il trasporto e l''installazione delle decorazioni nel luogo dell''Evento, la consegna del Bouquet della Sposa, delle Bottoniere e del Retromacchina Sposi la mattina del Matrimonio.'),
('quote_title', 'Preventivo gratuito e Progetto Virtuale gratuito'),
('quote_text', 'Contattateci per avere il Vostro preventivo gratuito. Insieme ad esso avrete il Vostro Progetto Virtuale, anch''esso completamente gratuito e sviluppato su un''immagine del luogo ove si svolgerà l''Evento.'),
('cta_quote', 'Richiedi il preventivo gratuito'),
('cta_gallery', 'Guarda la gallery'),
('cta_contact', 'Contattaci'),
('footer_note', 'Allestimenti floreali per matrimoni, eventi e meeting a Milano.'),
('google_site_verification_1', '7GrY3FGPGaQRK8JQDHcq3jXtlT0RcMyvjqepg1iPbPI'),
('google_site_verification_2', 'vgxgW3HqR_vmj40lh-XyGcUbC6iulsK7uVbq_ZVpB24');

-- -------------------------------------------------------------------- pages
INSERT INTO `pages`
  (`slug`, `meta_title`, `meta_description`, `intro`, `body`, `hero_image`, `published`)
VALUES
('chi-siamo',
 'Chi siamo | Petali e Fiori, Flower Designer a Milano',
 'Valeria Sciandra, Flower Designer diplomata, e il suo staff progettano e realizzano matrimoni ed eventi su misura, partendo sempre dal Vostro budget.',
 'Petali e fiori è uno staff di professionisti che collaborano di volta in volta per progettare, ideare e realizzare il Matrimonio o l''Evento dei Vostri sogni.',
 'Valeria Sciandra, la nostra Flower Designer Diplomata, sarà in grado di creare le composizioni Floreali più adatte al Vostro Evento: insieme a Voi vi proporrà esattamente quello che desideravate e sognavate per il vostro matrimonio. Tutto questo partendo sempre e comunque dal Vostro budget.

## Due modi di lavorare con voi

Petali e fiori può proporvi il tipo di assistenza che Voi preferite. La Nostra Flower Designer può studiare insieme a Voi ogni dettaglio e, punto per punto, seguirVi nelle Vostre scelte per l''Addobbo.

Oppure, se non avete molto tempo a Vostra disposizione, la competenza del nostro staff sarà al Vostro servizio per realizzare un Evento da favola: secondo i Vostri desideri e partendo da una Vostra idea, ma sviluppando l''ideazione dell''Addobbo Floreale in totale autonomia. Vi presenteremo vari Progetti Virtuali fino a quello che più Vi rappresenta ed entusiasma: una volta approvato il Progetto prescelto si darà seguito alla sua realizzazione.

## Il Progetto Virtuale

I Nostri Progetti Virtuali sono sviluppati su un''immagine del Luogo del Vostro Evento; questi progetti sono sviluppati dalla nostra Flower Designer e poi presentati grazie alla computer grafica.

## I nostri Partners

Petali e fiori si avvale della collaborazione di alcuni Partners: Autonoleggio Bellani, www.autonoleggiobellani.com.

## Il nostro obiettivo

Insomma il nostro obiettivo è realizzare i Vostri Sogni!',
 'chi-siamo/candela-rotonda-2.jpg', 1),

('dove-siamo',
 'Dove siamo | Petali e Fiori in Via Arzaga 24 a Milano',
 'Il nostro punto vendita è in Via Arzaga 24, 20146 Milano, a due passi dalla MM1 fermata Primaticcio. Tel. 02 23167849 e 331 8603337.',
 'Il nostro punto vendita è in: Via Arzaga 24, Milano, MM1 fermata Primaticcio.',
 'Siamo in Via Arzaga 24, a due passi dalla fermata Primaticcio della linea M1.

Per qualsiasi informazione potete chiamarci al 02 23167849 oppure al 331 8603337, o scriverci a info@petaliefiori.it.',
 'dove-siamo/piantina.gif', 1),

('preventivi',
 'Preventivi | Prezzi degli allestimenti floreali | Petali e Fiori',
 'Esempi reali di preventivi: Bouquet da 90 euro, allestimenti da 299 a 1398 euro. Preventivo e Progetto Virtuale gratuiti, prezzi comprensivi di trasporto e installazione.',
 'L''eleganza non deve essere necessariamente per pochi; e i nostri preventivi ve lo dimostrano. Le Decorazioni Floreali che desiderate per le Vostre nozze possono essere più economiche di quanto pensiate!',
 '## Che cosa influenza il prezzo

In ogni allestimento i fattori che vanno a incidere principalmente sui costi sono tre: il periodo del Matrimonio, la tipologia di fiori scelta e la loro quantità. Se ci si sposa intorno a San Valentino è meglio non scegliere come fiore principale le rose rosse, perché in quel momento il loro costo è molto elevato. Inoltre esistono fiori che sono sempre più cari di altri, come certe tipologie di orchidee.

## Anche solo Bouquet e Bottoniera

Da noi è possibile ordinare anche solamente il Bouquet e la Bottoniera per lo Sposo; in questo caso il prezzo si aggira intorno ai 159 euro, consegna ovviamente inclusa, ma anche meno se il Bouquet è piccolo o con fiori economici.

## Cosa è compreso nel prezzo

I nostri prezzi si intendono comprensivi del trasporto e dell''installazione delle Decorazioni Floreali nel luogo dell''Evento, della consegna del Bouquet della Sposa e delle Bottoniere e del Retromacchina Sposi la mattina stessa del Matrimonio.

## Il preventivo gratuito

Contattateci oggi per avere il Vostro preventivo Gratuito! Insieme ad esso avrete il Vostro Progetto Virtuale, anch''esso completamente gratuito e sviluppato su un''immagine del luogo ove si svolgerà l''Evento. Potrete cambiare in corso d''opera la tipologia di fiori, il colore, o la quantità delle decorazioni floreali commissionate, avendo così un''idea precisa di quale sarà l''effettivo esito delle Vostre scelte.',
 'chiesa/3-saronno-camminata-avalanche-aspidistra-e-tulle.jpg', 1),

('progetti-virtuali',
 'Progetti Virtuali | Il tuo allestimento prima di realizzarlo | Petali e Fiori',
 'Il Progetto Virtuale è gratuito: sviluppiamo la decorazione floreale su una foto del luogo dell''Evento così potete vedere il risultato e valutarne il costo.',
 'Vi mostriamo in anticipo come saranno inserite le decorazioni nel luogo dell''Evento.',
 '## Come nasce il Progetto Virtuale

Il Progetto Virtuale è gratuito ed è sviluppato su un''immagine del Luogo del Vostro Evento: una foto della Chiesa, della Sala del Comune o del ristorante dove si svolgerà la cerimonia. La nostra Flower Designer costruisce la decorazione e la presenta grazie alla computer grafica.

## Un progetto che si adatta a voi

Questo Progetto potrà comodamente essere modificato per meglio rispondere alle Vostre esigenze: potrete decidere di variare il numero di composizioni floreali da realizzare, o la tipologia e il colore dei fiori da usare, valutando visivamente e con facilità il risultato delle Vostre scelte.

## Tenete sotto controllo il budget

In questo modo valutate anche il costo: potete scegliere dove aumentare e dove diminuire il numero delle decorazioni, tenendo sempre il controllo del budget. Potrete scegliere ogni dettaglio del Vostro progetto, i colori, le forme, le tipologie di fiori e di verdi da usare, realizzando così il matrimonio che avete sempre sognato.

## Anche per meeting e ricevimenti

Il servizio vale anche per gli allestimenti per meeting e ricevimenti: la Vostra azienda potrà visualizzare in anticipo il risultato finale all''interno del luogo in cui si svolgerà l''Evento e richiedere modifiche al progetto.',
 'chiesa/1-saronno-progetto-in-rosa-e-viola-mezzelune.jpg', 1),

('contatti',
 'Contatti | Petali e Fiori, Via Arzaga 24 Milano',
 'Scriveteci per un preventivo gratuito: info@petaliefiori.it, tel. 02 23167849 e 331 8603337. Indicate data e luogo del Matrimonio e riceverete anche il Progetto Virtuale gratuito.',
 'Raccontateci il Vostro Evento: data, luogo e quello che desiderate. Rispondiamo con un preventivo gratuito e con il Progetto Virtuale.',
 'Potete darci qualche indicazione di cosa preferite: la tipologia di fiori, il tipo di addobbo, se desiderate la camminata o meno e soprattutto se desiderate il nostro Progetto Virtuale Gratuito!',
 'contatti/contatti.jpg', 1);

-- ----------------------------------------------------------------- services
INSERT INTO `services`
  (`slug`, `name`, `summary`, `body`, `hero_image`, `hero_images`, `menu_group`, `sort_order`, `published`)
VALUES
('chiesa', 'Chiesa',
 'Ogni Chiesa ha uno stile architettonico che la decorazione floreale deve rispettare, con un progetto virtuale costruito sulle foto del luogo.',
 '## Un momento sacro

Il matrimonio in Chiesa è il sogno di molte coppie. Il momento del sì è un momento Sacro, e la scelta del Luogo ove pronunciare la Promessa d''Amore è molto importante per gli Sposi.

## Lo stile della Chiesa

Ogni Chiesa ha un suo preciso stile architettonico, che andrà assolutamente rispettato nel momento della scelta delle Decorazioni Floreali. Se la Chiesa è di tipo rinascimentale sarà bene scegliere una decorazione che armonizzi con l''atmosfera classica e raccolta della stessa, in stile decorativo romantico. In caso di costruzioni moderne è invece meglio orientarsi verso uno stile più contemporaneo per le Decorazioni Floreali, come una decorazione a blocchi o con andamento lineare.

## Armonia con il luogo e con l''abito

Queste decisioni vanno prese in fase progettuale, poiché le Decorazioni Floreali devono essere armoniche rispetto all''aspetto della Chiesa nel suo complesso, oltre che tra loro stesse e con il Bouquet della Sposa. Il Bouquet stesso deve anche essere coordinato all''abito della Sposa.

## Il Progetto Virtuale

In fase progettuale noi svilupperemo un progetto virtuale delle Vostre Decorazioni Floreali sulle fotografie del Luogo dove si svolgerà l''evento. Questo Progetto Virtuale potrà comodamente essere modificato per meglio rispondere alle Vostre esigenze: potrete decidere di variare il numero di composizioni floreali da realizzare, o la tipologia e il colore dei fiori da usare, valutando visivamente e con facilità il risultato delle Vostre scelte. Questo Vi consentirà anche di effettuare una valutazione consapevole rispetto al costo delle composizioni, ed eventualmente di scegliere dove andare a aumentarne il numero e dove andare a diminuirlo.

## Un matrimonio su misura

Il Vostro matrimonio merita una progettazione accurata e personalizzata; la possibilità che noi Vi offriamo di sceglierne ogni dettaglio Vi renderà partecipi di tutte le fasi della sua preparazione e questo lo renderà veramente unico e irripetibile.',
 'chiesa/2-saronno-pogetto-in-bianco-e-verde.jpg', NULL, 'matrimonio', 1, 1),

('comune', 'Comune',
 'Anche la Sala dei matrimoni del Comune si addobba come una Chiesa, con un Progetto Virtuale sviluppato sulla foto della Sala.',
 'Oggi moltissime coppie decidono di Sposarsi esclusivamente in Comune. Sposarsi in Comune non vuol dire necessariamente rinunciare a farlo in una cornice scenografica di gusto, con una splendida e indimenticabile Decorazione Floreale.

## Un Matrimonio pieno di fiori

Non è necessario abbandonare il Vostro lato romantico; la nostra progettazione floreale potrà aiutarvi a realizzare il Vostro sogno di un Matrimonio pieno di fiori e colori, anche nel contesto del Comune più minimalista.

## La sala dei matrimoni

In ogni Comune c''è una Sala dedicata ai matrimoni e questa può venire addobbata esattamente come succede per le Chiese; con fiori, nastri, tulle e tutto ciò che gli Sposi desiderino per rendere unico ed inimitabile il loro Matrimonio.

## Il Progetto Virtuale

Noi possiamo realizzare, esattamente come accade per i matrimoni celebrati in Chiesa, un Progetto Virtuale della scenografia floreale del Vostro Matrimonio, sviluppato su una foto della Sala ove vi sposerete. In questo modo sarà facile per Voi valutare l''impatto della scelta dei fiori, dei colori e delle tipologie delle Decorazioni nel Luogo dell''Evento, ed eventualmente decidere di variare il Progetto. I Progetti Virtuali hanno appunto la caratteristica di facilitarVi nella scelta di ciò che sia a Voi più confacente, non solo per forme e colori ma anche rispetto al costo.',
 'comune/1-comune-di-melegnano-progetto-bianco-rosa-sfere.jpg', NULL, 'matrimonio', 2, 1),

('bouquet', 'Bouquet',
 'Il centro della Decorazione Floreale: bouquet decorativi e formali studiati insieme alla Sposa, da 90 euro fino a 300 euro.',
 '## Il cuore della Decorazione Floreale

Il Bouquet è il sogno segreto di ogni donna: tutte le Spose sognano di averne uno creato con i loro fiori preferiti. È il vero centro della Decorazione Floreale; spesso le Spose decidono che tipo di fiori e di Bouquet vogliono prima ancora di sapere come sarà l''abito.

## Colori, forme e carattere

La meraviglia dei fiori e dei colori, la loro magia, rende incantevole l''abito più sontuoso, dona un dettaglio estroso e personale al Matrimonio più tradizionale. I colori e le forme dei fiori vanno accostati con cura, tenendo conto dello Stile della cerimonia e soprattutto del carattere e della volontà della Sposa. In questo i Nostri Bouquet sono davvero unici; essendo studiati insieme alle Spose rendono realtà ciò che Voi avete sempre sognato per il Vostro matrimonio.

## Bouquet e abito

Per decidere quale Bouquet sia più adatto bisogna tenere conto della tipologia e della forma dell''abito della Sposa; un abito molto vaporoso in stile romantico si addice tendenzialmente di più a un Bouquet in stile Decorativo e cascante, piuttosto che ad un Bouquet in stile Formale. Ogni situazione esige un particolare tipo di Bouquet; l''ideale sarebbe che esso armonizzi alla perfezione sia con l''abito che con la scenografia floreale, la quale deve essere in armonia con il luogo dove si svolge l''Evento.

## Come si porta il Bouquet

Il Bouquet si porta nella mano sinistra; la mano destra deve essere appoggiata al braccio del padre della Sposa, o di chi la accompagna. Il Bouquet non va tenuto in braccio, ma impugnato con delicatezza tenendolo con la mano sinistra e, se è di tipo decorativo, il lato ricadente va tenuto sulla sinistra dell''abito.

## Prezzi dei Bouquet

I Nostri Bouquet Decorativi partono da un prezzo di 90 euro per arrivare ad un massimo di 300 euro, mentre i Bouquet Formali partono da 90 euro per arrivare ad un massimo di 250 euro. Naturalmente il costo è influenzato dalla scelta della tipologia di fiori; ad esempio se si sceglie di utilizzare delle orchidee il prezzo tenderà ad essere alto, rispetto ad un utilizzo di una rosa comune.',
 'chiesa/10-bouquet-appoggiato-altare.jpg',
 '[{"src":"chiesa/10-bouquet-appoggiato-altare.jpg","alt":"Dettaglio del Bouquet Tiziano appoggiato sull''altare"}]',
 'matrimonio', 3, 1),

('decorazioni-varie', 'Decorazioni Varie',
 'Dodici tipologie di Decorazioni Floreali, dalla più classica alla più moderna, per Chiesa, Comune, ristorante e casa degli Sposi.',
 '## Le scelte del Matrimonio

Per ogni Matrimonio bisogna fare delle scelte: scegliere che tipo di fiore usare, quali colori e quali forme siano più adatte alla cerimonia, cosa sia più rappresentativo dei desideri degli Sposi.

## Dove si addobbano

Vi mostriamo alcune tipologie di Decorazioni Floreali, come esempio delle molte possibili forme che possiamo realizzare: abbastanza tipica è la scelta di addobbare con i fiori anche la casa della Sposa e dello Sposo, in vista delle foto con l''abito e con gli invitati, oltre alla Chiesa o al Comune. Spesso si usa decorare la porta o le scale da cui la Sposa uscirà, salutata dai parenti e dagli amici. Le Decorazioni Floreali qui proposte sono perfette per questo tipo di necessità; possono essere ideali anche nelle case dei genitori degli Sposi.

## In armonia con il Bouquet

Non è necessario che le Decorazioni siano identiche a quelle scelte per la Chiesa, purché riprendano gli stessi fiori usati nel Bouquet della Sposa.',
 'decorazioni/decorativa.jpg',
 '[{"src":"decorazioni/decorativa.jpg","alt":"Composizione floreale decorativa"},{"src":"decorazioni/mezzaluna.jpg","alt":"Decorazione floreale a mezzaluna"},{"src":"decorazioni/valorizzazione-fiore.jpg","alt":"Composizione che valorizza il fiore singolo"},{"src":"decorazioni/lineare-a-s.jpg","alt":"Decorazione floreale dal profilo lineare a S"}]',
 'matrimonio', 4, 1),

('retromacchina', 'Retromacchina',
 'Il fiore sul lunotto della macchina degli Sposi, con gli stessi fiori della Chiesa e del Bouquet, riutilizzabile anche sul tavolo del ristorante.',
 '## Sul lunotto degli Sposi

Il retromacchina è la tipica Decorazione Floreale che viene posizionata nel lunotto posteriore della macchina degli Sposi, sulla cappelliera. Si compone degli stessi fiori presenti in Chiesa e nel Bouquet, e va studiato nella forma e nella dimensione a seconda delle dimensioni della macchina scelta dagli Sposi.

## Anche al ristorante

E'' possibile realizzare retromacchina di tutti i tipi e colori, seguendo i desideri degli Sposi. Frequentemente il retromacchina viene utilizzato anche come Decorazione al ristorante, posizionato sulla tavola degli Sposi: se si intende farne anche quest''uso bisogna progettare in anticipo una forma e una scelta di fiori che a tavola non disturbino, ad esempio non si possono usare i gigli più comuni, perché hanno un odore molto forte.

## Altre possibilità

Oggi ci sono anche altre possibilità di Decorazione Floreale della vettura: esistono spugne contenitive predisposte per essere fissate sulla carrozzeria dell''auto, sagomate in diverse forme come cuore o fedi incrociate, che si abbinano molto bene al classico retromacchina. Per contenere i costi si può pensare di utilizzare in alternativa dei nastri di tulle per decorare la parte anteriore della macchina.',
 'retromacchina/retromacchina.jpg',
 '[{"src":"retromacchina/retromacchina.jpg","alt":"Retromacchina con fiori gialli e arancioni"},{"src":"chiesa/e-sposi-lancio-riso-bouquet-decorazioni-esterne.jpg","alt":"Sposi durante il lancio del riso con bouquet e decorazioni esterne"},{"src":"chiesa/g-sposi-esterno-bouquet-rose-akito.jpg","alt":"Sposi in uscita dalla chiesa con bouquet di rose Akito"},{"src":"chiesa/i-sposa-con-bouquet.jpg","alt":"Sposa con bouquet Manet"}]',
 'matrimonio', 5, 1),

('bottoniere', 'Bottoniere',
 'Il fiore per l''occhiello dello Sposo, realizzato con i fiori del Bouquet, e per tradizione anche per Testimoni e genitori.',
 '## Sull''occhiello dello Sposo

La Bottoniera è il fiore che si posiziona sull''occhiello dello Sposo, poco sotto l''altezza del fazzoletto. Spesso si preferisce metterla in alternativa ad esso, ma non è una regola fissa.

## Come si compone

E'' un dettaglio irrinunciabile nel giorno delle Vostre Nozze; nelle fotografie risalterà piacevolmente, dandovi una nota di colore e di classe. Solitamente per la composizione della Bottoniera si usa il fiore principale presente nel Bouquet della Sposa; se ne usa uno composto con alcuni verdi e qualche fiore secondario come un rametto di gipsophyla, il velo da Sposa.

## Testimoni e genitori

Anche i Testimoni degli Sposi e i genitori di entrambi, per tradizione, hanno una Bottoniera; sarà più piccola di quella dello Sposo, e può essere fatta con un fiore diverso, purché tra quelli presenti nel Bouquet della Sposa.',
 NULL, NULL, 'matrimonio', 6, 1),

('centrotavola', 'Centrotavola',
 'Ciò che gli invitati hanno di fronte per tutto il Banchetto: equilibrato, armonico e sempre in sintonia con il Bouquet della Sposa.',
 '## Il fulcro del Banchetto

Il centrotavola è ciò che gli invitati avranno di fronte per tutto il Banchetto di Nozze. Per questo motivo la sua composizione floreale deve essere particolarmente equilibrata ed armonica.

## In sintonia con il Bouquet

Il fiore principale deve sempre rimandare al Bouquet della Sposa; se la Sposa ha scelto un fiore molto costoso, si può optare per qualcosa che ne ricordi forma e colore. Sono particolarmente belli ed armoniosi i centrotavola composti come piccoli pezzetti di natura sul tavolo; questo effetto è dato da un sapiente accostamento dei fiori e dei verdi, fino ad ottenere l''effetto di grazia voluto. Fondamentale in ogni caso è che essi risultino eleganti e adatti al contesto e ai colori della tovaglia e del ristorante.

## Le candele

Molti desiderano una candela nel proprio centrotavola; è l''ideale nel caso il Banchetto di Nozze si tenga la sera, la magia romantica delle candele non verrà facilmente dimenticata dai vostri invitati. Per contenere i costi si possono abbinare centrotavola, con o senza candele, a candele rotonde decorate con verdi e petali o piccoli fiori da posizionare romanticamente anche sulla tavola.

## Un esempio di prezzo

Un allestimento in un ristorante, con decorazioni dei tavoli, centrotavola e candele, più due grossi vasi di bambù con aspidistra e fiori, è costato 649 euro; eliminando queste due decorazioni floreali il prezzo sarebbe stato di 499 euro, installazione e consegna incluse.',
 'centrotavola/composizionefoto.jpg', NULL, 'matrimonio', 7, 1),

('meeting', 'Allestimenti per Meeting',
 'Addobbi floreali per meeting aziendali, eventi culturali, alberghi e ristoranti, coerenti con lo stile dell''Organizzazione.',
 '## Uno stile su misura

Naturalmente anche per gli Addobbi Floreali necessari ad un meeting aziendale, o a un Evento culturale, è necessario studiare una soluzione ad hoc. Va ricercato un effetto scenografico che sia adeguato all''occasione e coerente con lo Stile adottato dall''Organizzazione nel suo complesso.

## Alberghi e ristoranti

Le stesse considerazioni vanno fatte per la progettazione da svilupparsi in un dato Albergo o Ristorante; i nostri Flower Designer terranno conto dell''ambientazione, dello stile del luogo, dei colori presenti, dell''arredamento e del tipo di Evento che vi si svolgerà.

## Un esempio reale

Un allestimento floreale realizzato in occasione di un Evento presso un locale di Milano, comprensivo delle Decorazioni da tavolo con centrotavola e candele con verdi, dell''addobbo dei due vasi di bambù presenti nel locale e della consegna e installazione in loco la mattina dell''Evento, ha avuto un costo di 649 euro.

## Il Progetto Virtuale

Se la Vostra azienda lo desidera, i Progetti Vi saranno presentati prima della loro realizzazione grazie alla computer grafica; potrete agevolmente visualizzare quale sarà il risultato finale all''interno del luogo in cui si svolgerà l''Evento e richiedere eventuali modifiche, valutando anche in anticipo l''impatto economico delle scelte da Voi effettuate.

## Fiori artificiali e secchi

Offriamo inoltre un altro interessante servizio: ci occupiamo di rivedere e sistemare eventuali Decorazioni con fiori artificiali o simili già presenti presso il Vostro spazio. Vi consente di avere un notevole risparmio economico e, spesso, un grande risultato estetico e di rappresentanza. In caso Vi occorra un restauro di Vostri addobbi artificiali o in fiori secchi saremo lieti di valutare quale sarebbe la scelta migliore per il Vostro caso specifico e fornirVi gratuitamente un preventivo di quanto Vi costerebbe l''intervento.',
 'meeting/sala-tavoli-1.jpg', NULL, 'servizio', 8, 1);

-- ----------------------------------------------------------------- bouquets
INSERT INTO `bouquets`
  (`name`, `slug`, `style`, `description`, `price_min`, `price_max`, `image`, `sort_order`, `published`)
VALUES
('Bouquet Renoir', 'renoir', 'decorativo',
 'Classico Bouquet decorativo, composto su bridy con una coda di fiori ricadente in avanti. Il suo disegno è romantico e vaporoso, il che lo rende ideale nell''abbinamento ad abiti da Sposa tradizionali, anche con il velo.',
 90, 300, 'home/bouquet-renoir.jpg', 1, 1),

('Bouquet Manet', 'manet', 'decorativo',
 'Bouquet decorativo, caratterizzato dal tipico andamento morbido e spontaneo di fiori e verdi sapientemente composti su bridy. È il Bouquet ideale per abiti vaporosi e tradizionali, anche con il velo, ha una forte personalità. Nell''abbinamento alle rose Cherry Brandy si sposa bene con ambientazioni campestri.',
 90, 300, 'home/bouquet-manet.jpg', 2, 1),

('Bouquet Degas', 'degas', 'decorativo',
 'Bouquet decorativo, caratterizzato dal tipico disegno spontaneo di fiori e verdi composti su bridy, e dalla tipica coda di fiori ricadente in avanti, con in più la caratteristica di avere in sé un certo contrasto di colore. Bouquet ideale per abiti tradizionali con una spiccata personalità, ha un effetto romantico ma di carattere.',
 90, 300, 'bouquet/bouquet-degas.jpg', 3, 1),

('Bouquet Klee', 'klee', 'decorativo',
 'Bouquet in stile vegetativo, caratterizzato dalla presenza di molti verdi e più di un fiore, ha uno stile contemporaneo pur avendo un disegno romantico che si abbina bene ad abiti di taglio particolare e moderno. Risulta gradevole anche su abiti più vaporosi e tradizionali.',
 90, 300, 'bouquet/bouquet-klee.jpg', 4, 1),

('Bouquet Raffaello', 'raffaello', 'formale',
 'È una via di mezzo tra formale e decorativo: un Bouquet tipicamente formale ma con in più un segno grafico a cucitura dato dal beargrass, che ne compone anche la leggera coda ricadente in avanti. È un Bouquet essenziale ma di spiccata personalità, molto moderno e spiritoso, si abbina bene sia ad abiti classici che a tagli moderni e leggeri.',
 90, 250, 'home/raffaello-1-dettaglio.jpg', 5, 1),

('Bouquet Magritte', 'magritte', 'borsetta',
 'È un Bouquet borsetta: non ha un gambo da impugnare, ma c''è un nastro di seta che va infilato al braccio sinistro della Sposa. Il risultato è molto giovane e simpatico, il Bouquet diventa un accessorio dell''abito. Perfetto e molto indicato per abiti moderni ed essenziali, ha una forte personalità.',
 90, 250, 'bouquet/bouquet-magritte-rose.jpg', 6, 1),

('Bouquet Tiziano', 'tiziano', 'formale',
 'Bouquet formale che ha un dettaglio particolare e romantico nelle perle decorative infilate nel beargrass. Si abbina benissimo sia ad abiti da Sposa tradizionali che a vestiti lineari e di taglio contemporaneo. Le perle decorative saranno dello stesso colore del fiore, come nelle rose Akito dell''esempio.',
 90, 250, 'chi-siamo/bouquet-tiziano-akito.jpg', 7, 1),

('Bouquet Caravaggio', 'caravaggio', 'formale',
 'Classico Bouquet formale, in stile moderno è solitamente composto da rose e chiuso da foglie di aspidistra. È perfetto sia sugli abiti da Sposa classici e vaporosi, sia abbinato ad abiti moderni aderenti o corti.',
 90, 250, 'bouquet/bouquet-caravaggio-vendela-1.jpg', 8, 1);

-- --------------------------------------------------------------- decorations
INSERT INTO `decorations`
  (`name`, `slug`, `description`, `best_for`, `image`, `sort_order`, `published`)
VALUES
('Decorativa', 'decorativa',
 'È la più classica delle Decorazioni Floreali; si utilizza molto in Chiesa e Comune, ma anche al ristorante o dove viene tenuto il banchetto di nozze. Si possono naturalmente usare diverse tipologie di fiori, con diversi effetti di colore. Una decorazione di quelle in foto è molto grande, misura più di 140 cm di altezza per 50 cm di larghezza, e quindi generalmente è posizionata a terra.',
 'Chiesa, Comune, ristorante, banchetto di nozze', 'decorazioni/decorativa.jpg', 1, 1),

('Passiva', 'passiva',
 'Decorazione Floreale che ricade in avanti e, spesso, indietro. È l''ideale da utilizzare su balaustre, scale, colonne o simili. Naturalmente si possono utilizzare diverse tipologie di verdi e di fiori. Si presta bene sia in Chiesa che nelle case degli Sposi.',
 'Balaustre, scale, colonne, Chiesa e case degli Sposi', 'decorazioni/passiva.jpg', 2, 1),

('Triangolo asimmetrico', 'triangolo-asimmetrico',
 'Decorazione che può essere usata sia a terra, se di grandi dimensioni, o su un rialzo come un tavolo. Ha una forma moderna ed è ideale da usare in allestimenti per meeting o ricevimenti, ad esempio posizionandola in qualche punto focale vicino al tavolo del buffet, oppure è perfetta a casa degli Sposi o dei loro genitori.',
 'Meeting, ricevimenti, buffet, casa degli Sposi', 'decorazioni/triangolo-asimmetrico.jpg', 3, 1),

('Triangolo simmetrico', 'triangolo-simmetrico',
 'Decorazione solitamente messa a terra, date le sue grandi dimensioni, ma può essere posizionata su un rialzo se piccola. Generalmente si usa in Chiesa: consente di avere un certo risparmio economico perché è una decorazione monofacciale, il che significa che da un lato non vi sono fiori. Per questo motivo va comunque appoggiata a qualcosa, un muro o una colonna.',
 'Chiesa, meeting, ricevimenti, casa degli Sposi', 'decorazioni/triangolo-simmetrico.jpg', 4, 1),

('Ventaglio', 'ventaglio',
 'Generalmente si usa in Chiesa, consente di avere un certo risparmio perché è una decorazione monofacciale, da un lato non vi sono fiori. Per questo motivo va sempre appoggiata a qualcosa, ad esempio un muro o una colonna. È tipicamente posizionata sotto il leggio o alle pareti laterali. Può prestarsi bene anche in casa o al ristorante dietro al tavolo del buffet, messa su un rialzo apposito come sfondo.',
 'Chiesa sotto il leggio e alle pareti, ristorante', 'decorazioni/ventaglio.jpg', 5, 1),

('Ovale', 'ovale',
 'Decorazione Floreale monofacciale generalmente usata in Chiesa; come il Ventaglio, va sempre appoggiata a qualcosa, un muro o una colonna. È posizionata solitamente sotto il leggio o alle pareti. Può prestarsi bene anche in casa o al ristorante posizionata in qualche punto focale.',
 'Chiesa, casa e ristorante in un punto focale', 'decorazioni/ovale.jpg', 6, 1),

('A blocchi', 'a-blocchi',
 'Decorazione floreale molto moderna, con una forma attiva e vivace. È una tipologia particolare, risulta perfetta in ambientazioni contemporanee: è senz''altro la scelta giusta se ci si sposa in una Chiesa moderna o in un Comune minimalista. La sua forma moderna la rende naturalmente ideale da usare in allestimenti per meeting o ricevimenti, ad esempio posizionandola sul tavolo del buffet.',
 'Chiese moderne, Comuni minimalisti, meeting e buffet', 'decorazioni/a-blocchi.jpg', 7, 1),

('Valorizzazione del fiore', 'valorizzazione-fiore',
 'Decorazione moderna, che parte dalla forma del fiore scelto per definire che tipo di andamento avrà la stessa. In questo caso l''utilizzo degli Allium ha fatto sì che la decorazione si sviluppasse molto in altezza. Il risultato è sempre e comunque una forma particolare, perfetta per un matrimonio con uno stile contemporaneo. Si presta molto bene per decorare la casa della Sposa o dello Sposo.',
 'Matrimoni contemporanei, casa della Sposa e dello Sposo', 'decorazioni/valorizzazione-fiore.jpg', 8, 1),

('Lineare a S', 'lineare-a-s',
 'Decorazione Floreale moderna, che dalla forma del fiore scelto arriva a definire una S. È una decorazione molto scenografica di natura e di solito si usa sopra l''Altare o comunque dove viene officiato il Matrimonio. Altrimenti si può usare in simmetria su due balaustre ai lati dell''Altare.',
 'Sopra l''Altare o in simmetria sulle balaustre', 'decorazioni/lineare-a-s.jpg', 9, 1),

('Mezzaluna', 'mezzaluna',
 'Decorazione floreale a forma di mezzaluna, molto particolare e romantica, di solito si usa sopra l''Altare o dove comunque viene officiato il Matrimonio. È molto usata anche nelle decorazioni dei tavoli da buffet o nelle case degli Sposi.',
 'Altare, tavoli da buffet, case degli Sposi', 'decorazioni/mezzaluna.jpg', 10, 1),

('Decorazione a L', 'decorazione-a-l',
 'Decorazione floreale contemporanea, che dalla forma del fiore scelto definisce una L. È una decorazione moderna e attiva, tipicamente usata per tavoli da buffet o al ristorante.',
 'Tavoli da buffet e ristorante', 'decorazioni/decorazione-a-l.jpg', 11, 1),

('Naturalistica', 'naturalistica',
 'Decorazione moderna, la cui particolarità è ricreare una porzione di ambiente naturale tramite la composizione artistica di verdi e di elementi artificiali, in questo caso gli uccellini e il nido. È una tipologia perfetta per i ristoranti e in generale per un''ambientazione campestre. Si usa anche per ricreare altri tipi di ambienti naturali; molto belle sono le decorazioni che riproducono fondali marini, con tanto di pesci e polipi. Questo genere di decorazione è molto simpatica e originale anche nelle case degli Sposi.',
 'Ristoranti, ambientazioni campestre, case degli Sposi', 'decorazioni/naturalistica.jpg', 12, 1),

('Spontanea', 'spontanea',
 NULL,
 NULL, 'decorazioni/spontanea.jpg', 13, 1);

-- ------------------------------------------------------------ price examples
INSERT INTO `price_examples`
  (`title`, `season`, `description`, `items`, `price`, `price_note`, `image`, `sort_order`, `published`)
VALUES
('Matrimonio elegante ma economico a giugno', 'Giugno',
 'Un allestimento completo ma contenuto, con decorazioni piccole da interni.',
 '["Bouquet Sposa", "Retromacchina Sposi", "Due decorazioni laterali piccole da interni", "Tre Bottoniere"]',
 299, NULL, 'home/bouquet-manet.jpg', 1, 1),

('Allestimento base in Chiesa', NULL,
 'Bouquet, retrosposi grande per la Chiesa, due composizioni di medie dimensioni per l''altare e tre Bottoniere.',
 '["Bouquet Sposa", "Retrosposi grande per la Chiesa", "Due composizioni per l''Altare di medie dimensioni", "Tre Bottoniere"]',
 435, NULL, 'preventivi/bouquet.jpg', 2, 1),

('Allestimento in primavera', 'Primavera',
 'Bouquet, retromacchina, due decorazioni grandi da Chiesa di circa 100 per 60 cm e cinque Bottoniere.',
 '["Bouquet Sposa", "Retromacchina Sposi", "Due decorazioni da Chiesa grandi, circa 100 per 60 cm", "Cinque Bottoniere"]',
 499, NULL, 'home/bouquet-renoir.jpg', 3, 1),

('Allestimento con camminata in verdi e tulle', NULL,
 'Con la camminata fino all''ingresso e i mazzetti su entrambe le file di panche.',
 '["Bouquet Sposa", "Due composizioni per altare di medie dimensioni", "Retromacchina Sposi", "Cinque file di panche con verdi, 5 per 2 per 10 mazzetti", "Camminata fino all''ingresso in fiocchi di tulle, 10 fiocchi", "Bottoniere per Sposo e testimoni"]',
 599, NULL, 'chiesa/3-saronno-camminata-avalanche-aspidistra-e-tulle.jpg', 4, 1),

('Solo Bouquet della Sposa e Bottoniera dello Sposo', NULL,
 'È possibile ordinare anche solamente il Bouquet e la Bottoniera per lo Sposo.',
 '["Bouquet Sposa", "Bottoniera per lo Sposo", "Consegna inclusa"]',
 159, 'Circa 159 euro, meno se il Bouquet è piccolo o con fiori economici.', 'bouquet/bouquetdecorativo.jpg', 5, 1),

('Chiesa di Saronno, allestimento completo', NULL,
 'Rose Avalanche, gigli orientali e foglie di aspidistra, con Bouquet Tiziano in rose Akito e Bouquet da lancio.',
 '["Bouquet della Sposa, Bouquet Tiziano in rose Akito di circa 130 euro", "Decorazione passiva da altare", "Due decorazioni asimmetriche grandi sui tavolini in fondo alla Chiesa", "Mazzetti decorativi delle panche, 8, più 22 fiocchi in tulle fino all''ingresso", "Retrosposi di gigli e rose, grande, circa 140 cm", "Bouquet da lancio medio formale in rose Akito di circa 65 euro", "Due decorazioni floreali dell''esterno all''ingresso della Chiesa", "Retromacchina Sposi", "Fiori per l''acconciatura della Sposa", "Bottoniere Sposo e testimoni, totale 5"]',
 1398, NULL, 'chiesa/9-saronno-veduta-dallalto.jpg', 6, 1),

('Chiesa di Saronno, versione con meno decorazioni', NULL,
 'Lo stesso allestimento con meno decorazioni, per contenere il budget.',
 '["Bouquet della Sposa", "Una decorazione passiva da altare", "Retromacchina Sposi", "Retrosposi alto con i gigli", "Decorazione di 6 panche solo in tulle"]',
 499, NULL, 'chiesa/7-saronno-retrosposi-gigli-rose-avalanche.jpg', 7, 1),

('Banchetto in ristorante', NULL,
 'Decorazioni dei tavoli con centrotavola e candele, più due grossi vasi di bambù con aspidistra e fiori.',
 '["Centrotavola e candele per i tavoli", "Due grossi vasi di bambù con aspidistra e fiori", "Installazione e consegna incluse"]',
 649, '499 euro senza le due decorazioni dei vasi di bambù, installazione e consegna incluse.', 'centrotavola/composizionefoto.jpg', 8, 1),

('Evento presso un locale di Milano', NULL,
 'Allestimento per un Evento aziendale o culturale, con decorazioni da tavolo e vasi di bambù.',
 '["Decorazioni da tavolo con centrotavola e candele con verdi", "Addobbo dei due vasi di bambù presenti nel locale", "Consegna e installazione in loco la mattina dell''Evento"]',
 649, NULL, 'meeting/sala-tavoli-1.jpg', 9, 1);

-- ----------------------------------------------------------------- partners
INSERT INTO `partners` (`name`, `url`, `description`, `sort_order`, `published`) VALUES
('Autonoleggio Bellani', 'http://www.autonoleggiobellani.com',
 'Autonoleggio con cui collaboriamo per i matrimoni e gli eventi.', 1, 1);
