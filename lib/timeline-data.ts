export type Phase = 1 | 2 | 3 | 4;

export interface TimelinePhoto {
  src: string;
  alt: string;
  caption: string;
  sensitive?: boolean;
}

export interface KeyFact {
  symbol: "✕" | "⚠" | "⚖" | "◆" | "▶" | "⚔" | "✓" | "💀" | "⚕";
  text: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  month?: string;
  title: string;
  subtitle: string;
  phase: Phase;
  photos: TimelinePhoto[];
  keyFacts: KeyFact[];
  context: string[];
  eyewitnessQuote: {
    text: string;
    attribution: string;
    source?: string;
  };
  whyThisMatters: string;
  relatedEvents: { id: string; label: string }[];
}

export const phaseInfo: Record<
  Phase,
  { name: string; years: string; color: string; description: string }
> = {
  1: {
    name: "The Seeds of Hatred",
    years: "1918-1933",
    color: "#3b4c5c",
    description:
      "Economic collapse, political instability, and the rise of extremism",
  },
  2: {
    name: "The Persecution",
    years: "1933-1939",
    color: "#8b1a1a",
    description:
      "Systematic oppression, legal discrimination, and state-sponsored violence",
  },
  3: {
    name: "The Genocide",
    years: "1939-1945",
    color: "#4a1515",
    description:
      "The Final Solution and the systematic murder of six million Jews",
  },
  4: {
    name: "Liberation & Justice",
    years: "1944-1946",
    color: "#4a5568",
    description:
      "The end of the genocide, the liberation of the camps, and the pursuit of justice",
  },
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: "armistice-1918",
    year: 1918,
    month: "November",
    title: "The Armistice",
    subtitle: "Germany surrenders, ending World War I",
    phase: 1,
    photos: [
      {
        src: "/events/armistice-1.jpg",
        alt: "Marshal Foch and Allied officials standing outside the railway carriage where the Armistice was signed",
        caption:
          "The signing of the Armistice in a railway carriage at Compiègne, France",
      },
      {
        src: "/events/armistice-2.jpg",
        alt: "Exhausted German soldiers marching home through city streets, civilians watching",
        caption: "Defeated German soldiers return to a nation in chaos",
      },
      {
        src: "/events/armistice-3.jpg",
        alt: "Revolutionary sailors and workers with red flags in Berlin streets",
        caption:
          "Revolutionary unrest grips Berlin in the final days of the war",
      },
      {
        src: "/events/armistice-4.jpg",
        alt: "Crowds celebrating in London, Paris and other Allied cities",
        caption:
          "Allied nations celebrate the end of the Great War while Germany faces humiliation",
      },
      {
        src: "/events/armistice-5.jpg",
        alt: "Wounded German veterans in a military hospital",
        caption:
          "Millions returned home physically and psychologically scarred",
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "2 million German soldiers killed in the war" },
      {
        symbol: "⚠",
        text: "Kaiser Wilhelm II abdicates and flees to Netherlands",
      },
      {
        symbol: "◆",
        text: '"Stab-in-the-back" myth begins circulating among nationalists',
      },
    ],
    context: [
      "On November 11, 1918, Germany signed the Armistice that ended World War I. The nation was exhausted, starving from the Allied blockade, and facing revolution in the streets. The Kaiser had fled, and the new Weimar Republic was born amid chaos.",
      'For many Germans, the sudden end of the war felt like betrayal. They had been told they were winning. This dissonance would give birth to the "stab-in-the-back" myth—the poisonous lie that Germany had not lost militarily but had been betrayed by Jews, socialists, and politicians.',
      "This myth, promoted by military leaders seeking to avoid blame, would become a cornerstone of Nazi propaganda and fuel the fires of antisemitism for years to come.",
    ],
    eyewitnessQuote: {
      text: "We had not been defeated in the field. We were stabbed in the back by the criminals who now rule Germany.",
      attribution: "General Erich Ludendorff",
    },
    whyThisMatters:
      "National trauma and conspiracy theories laid the groundwork for extremism. When societies seek scapegoats for collective failure, minorities become targets.",
    relatedEvents: [{ id: "versailles-1919", label: "Treaty of Versailles" }],
  },
  {
    id: "versailles-1919",
    year: 1919,
    month: "June",
    title: "Treaty of Versailles",
    subtitle: "Germany humiliated by punitive peace terms",
    phase: 1,
    photos: [
      {
        src: "/events/versailles-1.jpg",
        alt: "Signing of the Treaty of Versailles in the Hall of Mirrors",
        caption:
          "The Treaty is signed in the Hall of Mirrors, where the German Empire was proclaimed in 1871",
      },
      {
        src: "/events/versailles-2.jpg",
        alt: "German delegation at Versailles",
        caption:
          "The German delegation was excluded from negotiations and forced to accept all terms",
      },
      {
        src: "/events/versailles-3.jpg",
        alt: "Protests in Berlin against the Treaty",
        caption: 'Germans protest against the "Diktat" of Versailles',
      },
    ],
    keyFacts: [
      {
        symbol: "⚖",
        text: "Article 231: Germany accepts sole guilt for the war",
      },
      { symbol: "✕", text: "132 billion gold marks in reparations demanded" },
      { symbol: "⚠", text: "Germany loses 13% of territory and all colonies" },
    ],
    context: [
      "The Treaty of Versailles was designed to punish Germany and prevent future aggression. Germany lost significant territory, was forbidden to have an effective military, and was saddled with crushing reparations payments.",
      'Most damaging was Article 231—the "War Guilt Clause"—which forced Germany to accept complete responsibility for the war. This humiliation united Germans across the political spectrum in resentment.',
      "The treaty created the conditions for economic disaster and political extremism. As economist John Maynard Keynes warned, the punitive terms would lead to another war within a generation. He was right.",
    ],
    eyewitnessQuote: {
      text: "This is not a peace. It is an armistice for twenty years.",
      attribution: "Marshal Ferdinand Foch",
    },
    whyThisMatters:
      "Humiliating defeated nations breeds resentment that demagogues can exploit. Punitive peace rarely leads to lasting stability.",
    relatedEvents: [
      { id: "armistice-1918", label: "The Armistice" },
      { id: "hyperinflation-1923", label: "Hyperinflation Crisis" },
    ],
  },
  {
    id: "hyperinflation-1923",
    year: 1923,
    title: "Hyperinflation Crisis",
    subtitle: "The German economy collapses",
    phase: 1,
    photos: [
      {
        src: "/events/hyperinflation-1.jpg",
        alt: "Woman using worthless banknotes as fuel",
        caption:
          "Currency became so worthless it was cheaper to burn than firewood",
      },
      {
        src: "/events/hyperinflation-2.jpg",
        alt: "Children playing with stacks of worthless currency",
        caption: "Children play with stacks of worthless banknotes",
      },
      {
        src: "/events/hyperinflation-3.jpg",
        alt: "Long breadlines in German cities",
        caption: "Germans queue for hours for basic necessities",
      },
    ],
    keyFacts: [
      {
        symbol: "◆",
        text: "One US dollar = 4.2 trillion marks by November 1923",
      },
      { symbol: "✕", text: "Life savings became worthless overnight" },
      { symbol: "⚠", text: "Workers paid twice daily as prices rose hourly" },
    ],
    context: [
      "By November 1923, the German mark had become virtually worthless. A loaf of bread cost billions of marks. People carried money in wheelbarrows. Life savings evaporated. The middle class was destroyed.",
      "The crisis had multiple causes: war debt, reparations, and the French occupation of the industrial Ruhr region. But desperate people needed someone to blame.",
      "Antisemitic propaganda portrayed Jews as profiteers and speculators, exploiting German suffering. This economic catastrophe radicalized millions who would later support extreme solutions.",
    ],
    eyewitnessQuote: {
      text: "We carried our wages home in laundry baskets. By the time we reached the shops, the money was worth half what it had been when we left the factory.",
      attribution: "Anonymous factory worker",
    },
    whyThisMatters:
      "Economic collapse destroys faith in democratic institutions. When people lose everything, they become receptive to radical ideologies promising restoration.",
    relatedEvents: [
      { id: "versailles-1919", label: "Treaty of Versailles" },
      { id: "beer-hall-putsch-1923", label: "Beer Hall Putsch" },
    ],
  },
  {
    id: "beer-hall-putsch-1923",
    year: 1923,
    month: "November",
    title: "Beer Hall Putsch",
    subtitle: "Hitler's failed coup attempt in Munich",
    phase: 1,
    photos: [
      {
        src: "/events/putsch-1.jpg",
        alt: "The Bürgerbräukeller in Munich",
        caption:
          "The Bürgerbräukeller where Hitler launched his attempted coup",
      },
      {
        src: "/events/putsch-2.jpg",
        alt: "Nazi marchers during the putsch",
        caption: "Nazi marchers advance toward the Feldherrnhalle",
      },
      {
        src: "/events/putsch-3.jpg",
        alt: "Hitler at his trial",
        caption: "Hitler used his trial as a propaganda platform",
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "16 Nazis and 4 police officers killed" },
      {
        symbol: "⚖",
        text: "Hitler sentenced to only 5 years (served 9 months)",
      },
      { symbol: "▶", text: "Hitler writes Mein Kampf in prison" },
    ],
    context: [
      "On November 8, 1923, Adolf Hitler and the Nazi Party attempted to seize power in Munich as the first step toward overthrowing the Weimar Republic. The putsch failed, and Hitler was arrested.",
      "The lenient treatment Hitler received revealed the sympathies of the German judiciary. Rather than being deported (he was Austrian) or given a harsh sentence, he received minimal prison time and was allowed to write his manifesto.",
      'In Mein Kampf, Hitler laid out his ideology: extreme nationalism, racial antisemitism, the need for "living space" (Lebensraum) in the East, and the destruction of democracy. Few took it seriously. They would learn.',
    ],
    eyewitnessQuote: {
      text: "You may pronounce us guilty a thousand times over, but the goddess of the eternal court of history will smile and tear to tatters the verdict of this court.",
      attribution: "Adolf Hitler",
    },
    whyThisMatters:
      "When violent extremists face no real consequences, they are emboldened. Weak institutions and sympathetic courts enabled Hitler's later rise.",
    relatedEvents: [
      { id: "hyperinflation-1923", label: "Hyperinflation Crisis" },
      { id: "hitler-chancellor-1933", label: "Hitler Becomes Chancellor" },
    ],
  },
  {
    id: "wall-street-crash-1929",
    year: 1929,
    month: "October",
    title: "Wall Street Crash",
    subtitle: "Global depression devastates Germany",
    phase: 1,
    photos: [
      {
        src: "/events/depression-1.jpg",
        alt: "Crowds gather outside the New York Stock Exchange",
        caption: "Panic on Wall Street as markets collapse",
      },
      {
        src: "/events/depression-2.jpg",
        alt: "Unemployed workers in Germany",
        caption: "Millions of Germans lost their jobs as the Depression hit",
      },
      {
        src: "/events/depression-3.jpg",
        alt: "Nazi rally during the Depression",
        caption: "Nazi Party membership surged during the economic crisis",
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "6 million Germans unemployed by 1932" },
      { symbol: "⚠", text: "US loans recalled, German economy collapses" },
      { symbol: "▶", text: "Nazi vote share rises from 2.6% to 37%" },
    ],
    context: [
      "The Wall Street Crash of October 1929 triggered a global depression. Germany, dependent on American loans since 1924, was hit particularly hard. As American banks recalled their loans, the German economy collapsed.",
      "By 1932, over six million Germans were unemployed—nearly one-third of the workforce. Soup kitchens and breadlines became common sights. Democratic parties seemed helpless.",
      'The Nazi Party exploited the crisis masterfully. They promised jobs, restored national pride, and identified enemies: Jews, communists, and the democratic "November criminals." Desperate voters turned to them in droves.',
    ],
    eyewitnessQuote: {
      text: "Democracy has failed. The parliamentary system is rotten. We need a strong hand to save Germany.",
      attribution: "Anonymous German businessman",
    },
    whyThisMatters:
      "Economic crises make democracies vulnerable. When mainstream parties cannot solve problems, voters turn to extremists who promise simple solutions.",
    relatedEvents: [
      { id: "hitler-chancellor-1933", label: "Hitler Becomes Chancellor" },
    ],
  },
  {
    id: "hitler-chancellor-1933",
    year: 1933,
    month: "January",
    title: "Hitler Becomes Chancellor",
    subtitle: "Democracy hands power to a dictator",
    phase: 2,
    photos: [
      {
        src: "/events/chancellor-1.jpg",
        alt: "Hitler appointed Chancellor",
        caption: "Hitler greets supporters from the Reich Chancellery window",
      },
      {
        src: "/events/chancellor-2.jpg",
        alt: "Nazi torchlight parade through Berlin",
        caption:
          "SA troops march through the Brandenburg Gate celebrating Hitler's appointment",
      },
      {
        src: "/events/chancellor-3.jpg",
        alt: "Hindenburg and Hitler",
        caption:
          "President Hindenburg appointed Hitler Chancellor, believing he could be controlled",
      },
    ],
    keyFacts: [
      { symbol: "⚖", text: "Hitler legally appointed by President Hindenburg" },
      { symbol: "⚠", text: "Conservatives believed they could control him" },
      { symbol: "▶", text: "Within 18 months, all other parties banned" },
    ],
    context: [
      "On January 30, 1933, Adolf Hitler was appointed Chancellor of Germany through legal, democratic processes. President Hindenburg and conservative politicians believed they could use Hitler to destroy the left while controlling him.",
      "They were catastrophically wrong. Within weeks, Hitler began dismantling democracy. The Reichstag fire gave him the pretext to suspend civil liberties. The Enabling Act gave him dictatorial powers.",
      "This moment reveals a crucial lesson: democracies can vote themselves out of existence. Hitler did not seize power in a coup—he was handed power by those who thought they could use him for their own ends.",
    ],
    eyewitnessQuote: {
      text: "Within two months we have pushed them into a corner so that they had to agree to this appointment. We have boxed Hitler in.",
      attribution: "Franz von Papen, Vice Chancellor",
    },
    whyThisMatters:
      'Democracies can be destroyed from within through legal means. Never assume extremists can be "managed" or that they will moderate once in power.',
    relatedEvents: [
      { id: "reichstag-fire-1933", label: "Reichstag Fire" },
      { id: "enabling-act-1933", label: "Enabling Act" },
    ],
  },
  {
    id: "reichstag-fire-1933",
    year: 1933,
    month: "February",
    title: "Reichstag Fire",
    subtitle: "Parliament burns, democracy dies",
    phase: 2,
    photos: [
      {
        src: "/events/reichstag-1.jpg",
        alt: "The Reichstag building in flames",
        caption:
          "The German Parliament building burns on the night of February 27",
      },
      {
        src: "/events/reichstag-2.jpg",
        alt: "The gutted interior of the Reichstag",
        caption: "The destroyed interior of the Reichstag chamber",
      },
      {
        src: "/events/reichstag-3.jpg",
        alt: "Newspaper announcing emergency powers",
        caption:
          'Emergency decree suspends civil liberties "for the protection of the people"',
      },
    ],
    keyFacts: [
      { symbol: "⚠", text: "Blamed on Communist plot without evidence" },
      { symbol: "⚖", text: "Emergency decree suspends all civil liberties" },
      { symbol: "✕", text: "4,000 Communists arrested within days" },
    ],
    context: [
      "On February 27, 1933, the Reichstag building was set ablaze. A young Dutch communist, Marinus van der Lubbe, was arrested at the scene. The Nazis immediately blamed a Communist conspiracy.",
      'The next day, Hitler convinced President Hindenburg to sign the "Decree for the Protection of People and State." This emergency measure suspended freedom of speech, assembly, press, and privacy. It was never repealed.',
      "Whether the Nazis themselves set the fire remains debated by historians. What is certain is that they exploited it brilliantly to destroy their opposition and establish a police state virtually overnight.",
    ],
    eyewitnessQuote: {
      text: "This is a God-given signal! If this fire turns out to be the work of Communists, there is nothing that shall stop us from crushing out this murder pest with an iron fist.",
      attribution: "Adolf Hitler",
    },
    whyThisMatters:
      'Crises—real or manufactured—are used by authoritarians to justify "emergency" measures that become permanent. Fear is the tool of tyrants.',
    relatedEvents: [
      { id: "hitler-chancellor-1933", label: "Hitler Becomes Chancellor" },
      { id: "enabling-act-1933", label: "Enabling Act" },
    ],
  },
  {
    id: "enabling-act-1933",
    year: 1933,
    month: "March",
    title: "The Enabling Act",
    subtitle: "Parliament votes away its own power",
    phase: 2,
    photos: [
      {
        src: "/events/Act-1.jpg",
        alt: "Reichstag session for the Enabling Act vote",
        caption:
          "The Reichstag meets at the Kroll Opera House to vote on the Enabling Act",
      },
      {
        src: "/events/act-2.jpg",
        alt: "SA troops surrounding the Opera House",
        caption:
          "SA and SS troops surrounded the building, intimidating legislators",
      },
      {
        src: "/events/act-3.jpg",
        alt: "Otto Wels, SPD leader",
        caption:
          "Otto Wels delivered the last free speech in the German parliament",
      },
    ],
    keyFacts: [
      { symbol: "⚖", text: "Passed 444-94, with only SPD voting against" },
      { symbol: "⚠", text: "Communist deputies already arrested or in hiding" },
      { symbol: "▶", text: "Hitler can now rule by decree without parliament" },
    ],
    context: [
      "On March 23, 1933, the Reichstag voted to pass the Enabling Act, which gave Hitler the power to enact laws without parliamentary approval. The democratic republic had legally abolished itself.",
      "The vote took place in an atmosphere of terror. SA troops surrounded the building. Communist deputies had been arrested after the Reichstag fire. Only the Social Democrats voted against, knowing they were signing their own political death warrants.",
      'Otto Wels, leader of the Social Democrats, delivered the final free speech in the German parliament: "You can take our lives and our freedom, but you cannot take our honor." Within months, his party was banned and he was in exile.',
    ],
    eyewitnessQuote: {
      text: "Freedom and life can be taken from us. But not our honor. No Enabling Act gives you the power to destroy ideas that are eternal and indestructible.",
      attribution: "Otto Wels",
    },
    whyThisMatters:
      "Legislatures can vote away democracy. When fear and opportunism override principle, even democratically elected bodies can enable dictatorship.",
    relatedEvents: [
      { id: "reichstag-fire-1933", label: "Reichstag Fire" },
      { id: "book-burning-1933", label: "Book Burnings" },
    ],
  },
  {
    id: "book-burning-1933",
    year: 1933,
    month: "May",
    title: "The Book Burnings",
    subtitle: '"Where they burn books, they will ultimately burn people also"',
    phase: 2,
    photos: [
      {
        src: "/events/bookburning-1.jpg",
        alt: "Books burning in Berlin's Opernplatz",
        caption:
          'Students and SA troops burn "un-German" books in Berlin\'s Opernplatz',
      },
      {
        src: "/events/bookburning-2.jpg",
        alt: "Crowds watching book burning",
        caption:
          'Thousands gathered to watch as books by Jewish and "degenerate" authors were destroyed',
      },
      {
        src: "/events/bookburning-3.jpg",
        alt: "Students carrying books to the fire",
        caption:
          "University students led the burnings, demonstrating how education can be corrupted",
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "25,000 books burned in Berlin alone" },
      {
        symbol: "⚠",
        text: "Works by Einstein, Freud, Mann, and others destroyed",
      },
      { symbol: "◆", text: "Led by university students, not soldiers" },
    ],
    context: [
      'On May 10, 1933, university students across Germany burned books deemed "un-German." Works by Jewish authors, political opponents, and anyone considered ideologically impure were thrown into the flames.',
      "The burnings were not ordered from above—they were organized by students, showing how quickly young people could be radicalized. Professors watched approvingly. The intellectual elite collaborated.",
      'The poet Heinrich Heine had written a century earlier: "Where they burn books, they will ultimately burn people also." His words would prove tragically prophetic. His own books were among those burned.',
    ],
    eyewitnessQuote: {
      text: "The era of extreme Jewish intellectualism is now at an end. The German student has the right to clean up libraries of the un-German spirit.",
      attribution: "Joseph Goebbels",
    },
    whyThisMatters:
      "The destruction of culture precedes the destruction of people. When societies begin banning ideas, they are on a dangerous path.",
    relatedEvents: [
      { id: "enabling-act-1933", label: "Enabling Act" },
      { id: "nuremberg-laws-1935", label: "Nuremberg Laws" },
    ],
  },
  {
    id: "nuremberg-laws-1935",
    year: 1935,
    month: "September",
    title: "Nuremberg Laws",
    subtitle: "Jews stripped of citizenship",
    phase: 2,
    photos: [
      {
        src: "/events/nuremberg-1.jpg",
        alt: "Nuremberg Rally where laws were announced",
        caption:
          "The laws were announced at the annual Nuremberg Nazi Party Rally",
      },
      {
        src: "/events/nuremberg-2.jpg",
        alt: "Nazi racial classification chart",
        caption:
          'Charts like this classified people by "blood quantum" to determine who was Jewish',
      },
      {
        src: "/events/nuremberg-3.jpg",
        alt: "Signs excluding Jews from public spaces",
        caption: '"Jews Not Welcome" signs appeared throughout Germany',
      },
    ],
    keyFacts: [
      { symbol: "⚖", text: "Jews legally defined and stripped of citizenship" },
      { symbol: "⚠", text: "Marriage between Jews and non-Jews forbidden" },
      { symbol: "◆", text: "Sexual relations between groups became a crime" },
    ],
    context: [
      'The Nuremberg Laws of September 1935 codified Nazi racial ideology into law. Jews were stripped of German citizenship and forbidden from marrying or having sexual relations with "Aryans."',
      'The laws required complex racial classifications. Who was a Jew? Who was a "Mischling" (mixed blood)? Bureaucrats created elaborate charts tracing ancestry back generations. The machinery of discrimination required paperwork.',
      "These laws served as a model for racial segregation elsewhere and showed how discrimination could be systematized through legal means. They made persecution orderly, rational, bureaucratic.",
    ],
    eyewitnessQuote: {
      text: "With one stroke of the pen, I ceased to be German. I had been born in Germany, my father died for Germany in the war, but now I was legally nothing.",
      attribution: "Victor Klemperer",
    },
    whyThisMatters:
      "Legal discrimination normalizes persecution. When the state codifies hatred into law, it signals that violence is acceptable and removes legal protections for minorities.",
    relatedEvents: [
      { id: "book-burning-1933", label: "Book Burnings" },
      { id: "kristallnacht-1938", label: "Kristallnacht" },
    ],
  },
  {
    id: "kristallnacht-1938",
    year: 1938,
    month: "November",
    title: "Kristallnacht",
    subtitle: "The Night of Broken Glass",
    phase: 2,
    photos: [
      {
        src: "/events/kristallnacht-1.jpg",
        alt: "Flames engulf a synagogue while firefighters stand by, protecting only neighboring buildings",
        caption:
          "Over 1,400 synagogues were burned across Germany and Austria - firefighters only protected adjacent properties",
      },
      {
        src: "/events/kristallnacht-2.jpg",
        alt: "Streets covered with shattered glass from destroyed storefronts, debris everywhere",
        caption:
          "The broken glass that gave the pogrom its name littered the streets of every German city",
      },
      {
        src: "/events/kristallnacht-3.jpg",
        alt: "Interior of a destroyed Jewish-owned shop with merchandise scattered and smashed",
        caption:
          "Jewish-owned businesses were systematically looted and destroyed",
      },
      {
        src: "/events/kristallnacht-4.jpg",
        alt: "Jewish men being marched through streets by SA troops while civilians watch",
        caption:
          "30,000 Jewish men were arrested and sent to concentration camps",
      },
      {
        src: "/events/kristallnacht-5.jpg",
        alt: "Firefighters standing idle while a synagogue burns, under orders not to intervene",
        caption:
          "Firefighters were ordered to let Jewish buildings burn - only protecting Aryan property",
      },
    ],
    keyFacts: [
      {
        symbol: "✕",
        text: "At least 91 Jews murdered; true number likely higher",
      },
      { symbol: "✕", text: "30,000 Jewish men sent to concentration camps" },
      {
        symbol: "⚖",
        text: "Jews fined 1 billion marks for the damage done TO them",
      },
    ],
    context: [
      "On November 9-10, 1938, Nazi-organized mobs rampaged through Germany and Austria, attacking Jews, destroying synagogues, and looting Jewish businesses. The broken glass that littered the streets gave the pogrom its name.",
      'The violence was presented as a "spontaneous" reaction to the assassination of a German diplomat by a Jewish teenager. In reality, it was carefully orchestrated by Nazi leadership to test public reaction to open violence.',
      "In a cruel twist, the Jewish community was fined one billion Reichsmarks to pay for the damage. Jews were also banned from owning businesses or attending German schools. The noose was tightening.",
    ],
    eyewitnessQuote: {
      text: "I saw the synagogue on fire, and people standing around, watching, laughing. Firefighters were there—but they were only protecting the neighboring buildings. Not ours.",
      attribution: "Anonymous survivor",
    },
    whyThisMatters:
      "State-organized violence tests what populations will tolerate. When bystanders do nothing, perpetrators are emboldened to escalate.",
    relatedEvents: [
      { id: "nuremberg-laws-1935", label: "Nuremberg Laws" },
      { id: "war-begins-1939", label: "World War II Begins" },
    ],
  },
  {
    id: "war-begins-1939",
    year: 1939,
    month: "September",
    title: "World War II Begins",
    subtitle: "Germany invades Poland",
    phase: 3,
    photos: [
      {
        src: "/events/ww2begins-1.jpg",
        alt: "German troops crossing into Poland",
        caption: "German forces cross into Poland on September 1, 1939",
      },
      {
        src: "/events/ww2begins-2.jpg",
        alt: "Warsaw under bombardment",
        caption: "Warsaw is devastated by German air raids",
      },
      {
        src: "/events/ww2begins-3.jpg",
        alt: "Polish Jews under German occupation",
        caption: "Poland's 3.3 million Jews fall under Nazi control",
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "Poland falls in five weeks" },
      { symbol: "⚠", text: "3.3 million Polish Jews now under Nazi rule" },
      { symbol: "▶", text: "Britain and France declare war on Germany" },
    ],
    context: [
      "On September 1, 1939, Germany invaded Poland, triggering World War II. Poland fell within five weeks. For Europe's Jews, this was catastrophic: over three million Polish Jews now fell under Nazi control.",
      "The conquest of Poland represented a fundamental escalation. Here, far from German scrutiny, the Nazis would begin experimenting with mass murder on a scale previously unimaginable.",
      "Einsatzgruppen—mobile killing squads—followed the German army into Poland, executing thousands of Polish intellectuals, priests, and Jews. These were the first steps toward genocide.",
    ],
    eyewitnessQuote: {
      text: "I have no intention of conducting this war in a knightly fashion. I shall destroy the enemy. I shall use any means at my disposal.",
      attribution: "Adolf Hitler",
    },
    whyThisMatters:
      "War provides cover for atrocities. The chaos, secrecy, and brutalization of warfare enabled the Holocaust in ways peacetime persecution could not.",
    relatedEvents: [
      { id: "kristallnacht-1938", label: "Kristallnacht" },
      { id: "ghettos-1940", label: "Creation of Ghettos" },
    ],
  },
  {
    id: "ghettos-1940",
    year: 1940,
    title: "Creation of Ghettos",
    subtitle: "Jews imprisoned in sealed districts",
    phase: 3,
    photos: [
      {
        src: "/events/ghetto-1.jpg",
        alt: "Wall surrounding Warsaw Ghetto",
        caption:
          "The Warsaw Ghetto was sealed by a 10-foot wall topped with barbed wire",
      },
      {
        src: "/events/ghetto-2.jpg",
        alt: "Overcrowded conditions in the ghetto",
        caption: "Over 400,000 people were crammed into 1.3 square miles",
      },
      {
        src: "/events/ghetto-3.jpg",
        alt: "Starving children in the ghetto",
        caption: "Starvation was a deliberate Nazi policy",
      },
      {
        src: "/events/ghetto-4.jpg",
        alt: "Bodies in the streets of the ghetto",
        caption: "Death from starvation and disease became commonplace",
        sensitive: true,
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "Warsaw Ghetto: 400,000 Jews in 1.3 square miles" },
      { symbol: "◆", text: "Average food ration: 184 calories per day" },
      { symbol: "✕", text: "Tens of thousands died before deportations began" },
    ],
    context: [
      "Beginning in 1940, the Nazis established ghettos throughout occupied Eastern Europe. Jews were forced from their homes and concentrated into small, sealed districts under brutal conditions.",
      "The Warsaw Ghetto, the largest, held over 400,000 Jews in an area of 1.3 square miles. The official food ration provided less than 200 calories per day. Disease was rampant. Tens of thousands died of starvation.",
      "The ghettos served multiple purposes: they isolated Jews from the general population, concentrated them for eventual deportation, and demonstrated that the Nazis could eliminate Jews gradually through deliberate deprivation.",
    ],
    eyewitnessQuote: {
      text: "The streets are full of corpses. There is no wood for coffins. The bodies are wrapped in paper. Every day a wagon goes around to collect the bodies.",
      attribution: "Emanuel Ringelblum",
    },
    whyThisMatters:
      "Gradual dehumanization prepares populations for mass murder. By the time the death camps opened, millions had already been reduced to a state of helplessness.",
    relatedEvents: [
      { id: "war-begins-1939", label: "World War II Begins" },
      { id: "operation-barbarossa-1941", label: "Operation Barbarossa" },
    ],
  },
  {
    id: "operation-barbarossa-1941",
    year: 1941,
    month: "June",
    title: "Operation Barbarossa",
    subtitle: "Germany invades the Soviet Union",
    phase: 3,
    photos: [
      {
        src: "/events/barbarossa-1.jpg",
        alt: "German tanks advancing into the Soviet Union",
        caption: "Three million German troops invade the Soviet Union",
      },
      {
        src: "/events/barbarossa-2.jpg",
        alt: "Einsatzgruppen execution",
        caption:
          "Einsatzgruppen murder Jews in mass shootings across the occupied East",
        sensitive: true,
      },
      {
        src: "/events/barbarossa-3.jpg",
        alt: "Ravine at Babi Yar",
        caption:
          "Babi Yar: 33,771 Jews murdered in two days at this ravine near Kyiv",
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "1.5 million Jews murdered by Einsatzgruppen" },
      { symbol: "✕", text: "Babi Yar: 33,771 killed in 48 hours" },
      {
        symbol: "⚠",
        text: 'Mass shootings deemed "inefficient"—new methods sought',
      },
    ],
    context: [
      'On June 22, 1941, Germany launched Operation Barbarossa—the invasion of the Soviet Union. Following the army came the Einsatzgruppen: mobile killing units tasked with murdering Jews, communists, and other "enemies."',
      "The Einsatzgruppen operated with brutal efficiency. At Babi Yar, outside Kyiv, 33,771 Jews were shot over two days in September 1941. Similar massacres occurred throughout the occupied territories.",
      "By the end of 1941, the Einsatzgruppen had murdered approximately 1.5 million Jews through mass shootings. But Nazi leadership was dissatisfied—the process was too slow, too visible, and psychologically damaging to the killers. They sought more efficient methods.",
    ],
    eyewitnessQuote: {
      text: "I saw a column of people walking toward the ravine. I heard shots. I understood everything. I took my mother's hand and said goodbye.",
      attribution: "Dina Pronicheva",
    },
    whyThisMatters:
      "Industrial efficiency was applied to murder. The progression from discriminatory laws to mass shootings to death camps shows how genocide develops incrementally.",
    relatedEvents: [
      { id: "ghettos-1940", label: "Creation of Ghettos" },
      { id: "wannsee-conference-1942", label: "Wannsee Conference" },
    ],
  },
  {
    id: "wannsee-conference-1942",
    year: 1942,
    month: "January",
    title: "Wannsee Conference",
    subtitle: "Bureaucrats plan the Final Solution",
    phase: 3,
    photos: [
      {
        src: "/events/wannsee-1.jpg",
        alt: "The villa at Wannsee",
        caption: "This elegant lakeside villa was the site of the conference",
      },
      {
        src: "/events/wannsee-2.jpg",
        alt: "Some of the conference participants",
        caption:
          "Fifteen high-ranking Nazi officials attended the 90-minute meeting",
      },
      {
        src: "/events/wannsee-3.jpg",
        alt: "Copy of the Wannsee Protocol",
        caption: "The sole surviving copy of the conference minutes",
      },
    ],
    keyFacts: [
      { symbol: "◆", text: "Meeting lasted only 90 minutes" },
      { symbol: "⚖", text: "11 million European Jews targeted for murder" },
      { symbol: "▶", text: "Death camps begin full operation" },
    ],
    context: [
      "On January 20, 1942, fifteen senior Nazi officials met at a villa in Wannsee, a suburb of Berlin. Over lunch and cognac, they coordinated the logistics of murdering 11 million European Jews.",
      "The Wannsee Conference did not decide on genocide—that decision had already been made. The purpose was coordination: how to identify Jews, how to transport them, how to murder them efficiently, what to do with their property.",
      'The meeting lasted ninety minutes. The minutes refer to Jews being "evacuated" to the "East" for "labor." The euphemisms masked the reality: the construction of death camps at Treblinka, Sobibor, Belzec, and others was already underway.',
    ],
    eyewitnessQuote: {
      text: "The discussion was calm and businesslike. There was cognac. Nobody raised any objections to the proposal.",
      attribution: "Adolf Eichmann",
    },
    whyThisMatters:
      "Genocide requires bureaucracy. The Holocaust was not the work of madmen—it was planned by educated professionals over lunch, using paperwork and logistics.",
    relatedEvents: [
      { id: "operation-barbarossa-1941", label: "Operation Barbarossa" },
      { id: "death-camps-1942", label: "Death Camps" },
    ],
  },
  {
    id: "death-camps-1942",
    year: 1942,
    title: "The Death Camps",
    subtitle: "Industrial murder begins",
    phase: 3,
    photos: [
      {
        src: "/events/deathcamps-1.jpg",
        alt: "Gate at Auschwitz-Birkenau",
        caption:
          "The entrance to Auschwitz-Birkenau, the largest killing center",
      },
      {
        src: "/events/deathcamps-2.jpg",
        alt: "Selection at Auschwitz",
        caption:
          "SS doctors selected who would be killed immediately and who would be worked to death",
      },
      {
        src: "/events/deathcamps-3.jpg",
        alt: "Hungarian Jews arriving at Auschwitz",
        caption: "437,000 Hungarian Jews were deported to Auschwitz in 1944",
      },
      {
        src: "/events/deathcamps-4.jpg",
        alt: "Crematorium at Auschwitz",
        caption: "The crematoria operated around the clock",
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "Auschwitz: Over 1.1 million murdered" },
      { symbol: "✕", text: "Treblinka: 870,000 murdered in 17 months" },
      { symbol: "✕", text: "Total: 6 million Jews murdered in the Holocaust" },
    ],
    context: [
      "The death camps represented the culmination of Nazi antisemitism: industrialized, systematic murder. At Auschwitz-Birkenau alone, over 1.1 million people were killed, the vast majority Jews.",
      'The camps were designed for efficiency. Victims were transported by train, told they were being "resettled," and gassed within hours of arrival. Their bodies were burned; their ashes used as fertilizer. Nothing was wasted.',
      "The scale is incomprehensible: six million Jews murdered. One-third of all Jews in the world. Entire communities erased. Languages, cultures, and families destroyed forever.",
    ],
    eyewitnessQuote: {
      text: "Do you know what it means to survive selection? It means that everyone around you is gone. Your mother, your father, your sister. And you were chosen to live. Why you? Why were you chosen?",
      attribution: "Elie Wiesel",
    },
    whyThisMatters:
      "The Holocaust was the endpoint of a process that began with words, continued with laws, and ended in gas chambers. The path was not inevitable—it was chosen at each step.",
    relatedEvents: [
      { id: "wannsee-conference-1942", label: "Wannsee Conference" },
      { id: "liberation-1945", label: "Liberation" },
    ],
  },
  {
    id: "liberation-1945",
    year: 1945,
    title: "Liberation",
    subtitle: "The camps are opened",
    phase: 3,
    photos: [
      {
        src: "/events/liberation-1.jpg",
        alt: "Soviet troops at Auschwitz",
        caption: "Soviet forces liberate Auschwitz on January 27, 1945",
      },
      {
        src: "/events/liberation-2.jpg",
        alt: "Survivors at liberation",
        caption: "Survivors behind the barbed wire at Buchenwald",
      },
      {
        src: "/events/liberation-3.jpg",
        alt: "Conditions at Bergen-Belsen",
        caption:
          "British troops discovered thousands of unburied corpses at Bergen-Belsen",
        sensitive: true,
      },
      {
        src: "/events/liberation-4.jpg",
        alt: "General Eisenhower at Ohrdruf",
        caption:
          'General Eisenhower ordered troops to witness the camps: "Get it on record...lest there be a forgetter."',
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "6 million Jews murdered" },
      {
        symbol: "✕",
        text: "5 million others (Roma, disabled, POWs, political prisoners)",
      },
      {
        symbol: "⚠",
        text: "Many survivors died in weeks after liberation from illness",
      },
    ],
    context: [
      "Between January and May 1945, Allied forces liberated the Nazi concentration and death camps. What they found defied comprehension: mountains of corpses, skeletal survivors, and the evidence of systematic industrial murder.",
      'General Eisenhower ordered as many American soldiers as possible to see the camps. "Get it all on record," he said. "Get the films. Get the witnesses. Lest there develop a tendency to charge these allegations merely to propaganda."',
      "For the survivors, liberation was not an end but a beginning. Most had lost their entire families. Many were too sick to survive. Those who lived faced the impossible task of rebuilding their lives from nothing.",
    ],
    eyewitnessQuote: {
      text: "We were free. But what does freedom mean when you have no family, no home, no country? We were ghosts, wandering among the living.",
      attribution: "Primo Levi",
    },
    whyThisMatters:
      "The Holocaust was not ancient history. Survivors are still living. The lessons are urgent. The warning signs are recognizable. We must never forget—and we must never allow it to happen again.",
    relatedEvents: [{ id: "death-camps-1942", label: "Death Camps" }],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 4: LIBERATION & JUSTICE (1944-1946)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "d-day-1944",
    year: 1944,
    month: "June",
    title: "Operation Overlord",
    subtitle: "156,000 Allied troops storm Normandy beaches",
    phase: 4,
    photos: [
      {
        src: "/events/dday-1.jpg",
        alt: "Landing craft approaching Omaha Beach through smoke and chaos",
        caption: "The largest amphibious invasion in history begins",
      },
      {
        src: "/events/dday-2.jpg",
        alt: "American soldiers taking cover behind beach obstacles under fire",
        caption: "Soldiers shelter behind German defenses on Omaha Beach",
      },
      {
        src: "/events/dday-3.jpg",
        alt: "Wounded soldiers being evacuated from the beach",
        caption: "Medics work to evacuate the wounded under fire",
      },
      {
        src: "/events/dday-5.jpg",
        alt: "Omaha Beach after first wave with bodies and equipment",
        caption: "The human cost of liberation visible on Omaha Beach",
        sensitive: true,
      },
      {
        src: "/events/dday-4.jpg",
        alt: "American troops moving inland through French countryside",
        caption: "After securing the beaches, troops push into occupied France",
      },
    ],
    keyFacts: [
      {
        symbol: "⚔",
        text: "156,000 Allied troops land on five Normandy beaches",
      },
      { symbol: "✕", text: "4,414 confirmed Allied deaths on first day" },
      {
        symbol: "⚔",
        text: "Omaha Beach suffered heaviest casualties: 2,400 men",
      },
      { symbol: "▶", text: "Beginning of the end for Nazi Germany" },
    ],
    context: [
      "On June 6, 1944, Allied forces launched the largest amphibious invasion in history. The mission: liberate Europe from Nazi occupation and reach concentration camps before all evidence could be destroyed and remaining prisoners killed.",
      "Omaha Beach, assigned to American forces, became a killing ground. German defenses were stronger than expected. Men drowned under equipment weight. Bodies piled on the sand. Yet they pushed forward.",
      "These soldiers knew concentration camps existed, though not yet the full scale of the Holocaust. They fought to stop fascism. Many never saw liberation day.",
    ],
    eyewitnessQuote: {
      text: "You are about to embark upon the Great Crusade, toward which we have striven these many months. The eyes of the world are upon you... I have full confidence in your courage, devotion to duty and skill in battle. We will accept nothing less than full Victory!",
      attribution: "General Dwight D. Eisenhower",
    },
    whyThisMatters:
      "Liberation was not automatic or inevitable. It was fought for, bled for, died for. Without D-Day, camps would have operated until the last prisoner was murdered. These soldiers' sacrifice made justice possible.",
    relatedEvents: [
      { id: "bergen-belsen-1945", label: "Liberation of Bergen-Belsen" },
      { id: "germany-surrenders-1945", label: "Germany Surrenders" },
    ],
  },

  {
    id: "auschwitz-liberation-1945",
    year: 1945,
    month: "January",
    title: "The Soviets Reach Auschwitz",
    subtitle:
      "Soviet troops find 7,000 survivors and evidence of 1.1 million murdered",
    phase: 4,
    photos: [
      {
        src: "/events/auschwitz-liberation-1.jpg",
        alt: "Soviet soldiers entering the gates of Auschwitz-Birkenau",
        caption: "Soviet troops of the 60th Army liberate Auschwitz",
      },
      {
        src: "/events/auschwitz-liberation-2.jpg",
        alt: "Emaciated survivors standing behind barbed wire",
        caption: "Survivors, barely alive, await liberation",
      },
      {
        src: "/events/auschwitz-liberation-3.jpg",
        alt: "Warehouses filled with victims belongings - shoes, suitcases",
        caption:
          "Evidence of industrial-scale murder: warehouses of victims' belongings",
      },
      {
        src: "/events/auschwitz-liberation-4.jpg",
        alt: "Child survivors showing their tattooed numbers",
        caption:
          "Children survivors display the numbers tattooed on their arms",
      },
      {
        src: "/events/auschwitz-liberation-5.jpg",
        alt: "The infamous railway entrance to Auschwitz-Birkenau",
        caption: "The gates of hell: Auschwitz-Birkenau railway entrance",
      },
    ],
    keyFacts: [
      { symbol: "✓", text: "Soviet troops of 60th Army liberate the camp" },
      {
        symbol: "✕",
        text: "7,000 prisoners found alive (most too weak to celebrate)",
      },
      { symbol: "✕", text: "600 corpses discovered unburied" },
      {
        symbol: "⚠",
        text: "Evidence found: 370,000 men's suits, 837,000 women's coats, 7 tons human hair",
      },
    ],
    context: [
      "As Soviet forces approached, SS had frantically destroyed evidence and evacuated 60,000 prisoners on death marches westward. Most died en route.",
      "Those too sick to move were left behind to die. SS expected they would be dead before liberators arrived. They were wrong.",
      "Soviet troops found warehouses packed with victims' belongings. Mountains of shoes. Tons of human hair (sold to German companies for textiles). The industrial scale of murder became undeniable.",
    ],
    eyewitnessQuote: {
      text: "We knew something terrible had happened, but nothing could have prepared us. The smell... you could smell it from kilometers away. And then we saw them - living skeletons. How do you describe hell to someone who has never been there?",
      attribution: "Soviet soldier, 60th Army",
    },
    whyThisMatters:
      "Auschwitz became the symbol of the Holocaust. The Nazis tried to hide the evidence, but failed. January 27 is now International Holocaust Remembrance Day.",
    relatedEvents: [
      { id: "bergen-belsen-1945", label: "Liberation of Bergen-Belsen" },
      { id: "death-camps-1942", label: "Death Camps" },
    ],
  },

  {
    id: "bergen-belsen-1945",
    year: 1945,
    month: "April",
    title: "Hell on Earth",
    subtitle:
      "British forces find 60,000 prisoners, 13,000 unburied corpses, and Anne Frank's final resting place",
    phase: 4,
    photos: [
      {
        src: "/events/belsen-1.jpg",
        alt: "British soldiers entering Bergen-Belsen concentration camp",
        caption: "British 11th Armoured Division enters Bergen-Belsen",
      },
      {
        src: "/events/belsen-2.jpg",
        alt: "Mass graves at Bergen-Belsen",
        caption: "The scale of death was incomprehensible to liberators",
        sensitive: true,
      },
      {
        src: "/events/belsen-3.jpg",
        alt: "Survivors receiving medical treatment from British nurses",
        caption: "Medical teams worked desperately to save survivors",
      },
      {
        src: "/events/belsen-4.jpg",
        alt: "Bulldozer moving bodies into mass graves",
        caption: "Bodies had to be buried quickly to prevent epidemic",
        sensitive: true,
      },
      {
        src: "/events/belsen-5.jpg",
        alt: "Bergen-Belsen Memorial site today",
        caption: "Bergen-Belsen Memorial: Where Anne Frank is buried",
      },
    ],
    keyFacts: [
      { symbol: "✕", text: "60,000 prisoners found alive (barely)" },
      {
        symbol: "✕",
        text: "13,000 unburied corpses scattered throughout camp",
      },
      {
        symbol: "✕",
        text: "Anne Frank died here in March 1945, weeks before liberation",
      },
      {
        symbol: "⚕",
        text: "Typhus epidemic - 14,000 more died AFTER liberation despite medical care",
      },
    ],
    context: [
      "By April 1945, Bergen-Belsen had become a dumping ground for evacuated prisoners from other camps. Originally designed for 10,000, it held 60,000 in unimaginable conditions.",
      "No food. No water. No sanitation. Disease rampant. Bodies everywhere - the living too weak to bury the dead.",
      "British troops were completely unprepared. Many vomited. Some cried. All were changed forever.",
    ],
    eyewitnessQuote: {
      text: "I don't think I can ever forget the sights and sounds and smells. The living looked like the dead. They could barely move, barely speak. And the dead... mountains of bodies. How do human beings do this to each other?",
      attribution: "Lieutenant Derrick Sington",
    },
    whyThisMatters:
      'General Eisenhower ordered everything documented: "Get it all on record now - get the films - get the witnesses - because somewhere down the road of history some bastard will get up and say that this never happened." He was right. That\'s why documentation matters.',
    relatedEvents: [
      { id: "auschwitz-liberation-1945", label: "Liberation of Auschwitz" },
      { id: "germany-surrenders-1945", label: "Germany Surrenders" },
    ],
  },

  {
    id: "germany-surrenders-1945",
    year: 1945,
    month: "May",
    title: "Victory in Europe Day",
    subtitle:
      "Nazi Germany defeated. The full scale of the Holocaust is revealed.",
    phase: 4,
    photos: [
      {
        src: "/events/victory-1.jpg",
        alt: "German military officials signing unconditional surrender",
        caption: "Germany signs the instrument of unconditional surrender",
      },
      {
        src: "/events/victory-2.jpg",
        alt: "Massive crowds celebrating VE Day in London",
        caption: "Celebrations in London - but for survivors, grief remained",
      },
      {
        src: "/events/victory-3.jpg",
        alt: "Soviet soldiers raising flag over the Reichstag in Berlin",
        caption: "The iconic image of Soviet victory over Nazi Germany",
      },
      {
        src: "/events/victory-4.jpg",
        alt: "Liberated prisoners celebrating the end of the war",
        caption: "Survivors celebrate - those who lived to see this day",
      },
      {
        src: "/events/victory-5.jpg",
        alt: "Empty concentration camp with gates open",
        caption: "The gates stand open - the nightmare is over",
      },
    ],
    keyFacts: [
      { symbol: "✓", text: "Germany signs unconditional surrender" },
      { symbol: "✕", text: "Hitler committed suicide 8 days earlier" },
      { symbol: "⚖", text: "War in Europe ends after 2,174 days" },
      {
        symbol: "✕",
        text: "Full scale of Holocaust emerges: 6 million Jews, 5 million others",
      },
    ],
    context: [
      "As Allied forces swept across Germany, they liberated camp after camp. Dachau. Buchenwald. Mauthausen. Each one revealed new horrors.",
      "The world had known something terrible was happening. But the scale, the systematic nature, the industrial efficiency of the genocide - this shocked even hardened soldiers and journalists.",
      "Footage and photographs were sent worldwide. People could not believe it. Some still do not.",
    ],
    eyewitnessQuote: {
      text: "The things I saw beggar description... The visual evidence and the verbal testimony of starvation, cruelty and bestiality were so overpowering... I made the visit deliberately, in order to be in a position to give first-hand evidence of these things if ever, in the future, there develops a tendency to charge these allegations merely to propaganda.",
      attribution: "General Dwight D. Eisenhower",
    },
    whyThisMatters:
      "Victory over Nazi Germany was not just military triumph. It was moral imperative. Evil was stopped. But 11 million people were already dead. The question became: How do we ensure this never happens again?",
    relatedEvents: [
      { id: "d-day-1944", label: "D-Day" },
      { id: "nuremberg-trials-1945", label: "Nuremberg Trials" },
    ],
  },

  {
    id: "nuremberg-trials-1945",
    year: 1945,
    month: "November",
    title: "Justice, Imperfect But Essential",
    subtitle:
      "22 Nazi leaders face trial. 12 sentenced to death. Thousands escape punishment.",
    phase: 4,
    photos: [
      {
        src: "/events/judnuremberg-1.jpg",
        alt: "Nazi defendants in the dock at Nuremberg - Göring, Hess, and others",
        caption: "The architects of genocide face judgment",
      },
      {
        src: "/events/judnuremberg-2.jpg",
        alt: "Prosecutors presenting evidence at Nuremberg",
        caption: "Justice Robert Jackson presents the case for humanity",
      },
      {
        src: "/events/judnuremberg-3.jpg",
        alt: "Film footage being shown in court as evidence",
        caption:
          "Concentration camp footage shown as evidence - defendants forced to watch",
      },
      {
        src: "/events/judnuremberg-4.jpg",
        alt: "Defendants reacting to concentration camp footage",
        caption: "Even the perpetrators could not face what they had done",
      },
      {
        src: "/events/judnuremberg-5.jpg",
        alt: "The execution chamber at Nuremberg Prison",
        caption: "Where 10 Nazi leaders were executed on October 16, 1946",
      },
    ],
    keyFacts: [
      {
        symbol: "⚖",
        text: "22 high-ranking Nazis tried for crimes against humanity (NEW legal concept)",
      },
      { symbol: "⚖", text: "12 sentenced to death by hanging" },
      { symbol: "⚖", text: "3 acquitted, 7 received prison sentences" },
      { symbol: "⚖", text: '"Following orders" ruled NOT a valid defense' },
    ],
    context: [
      "For the first time in history, leaders were held personally accountable for genocide and war crimes. The trials established crucial legal principles:",
      'Genocide is a crime against humanity. Government officials cannot hide behind "just following orders." Individuals are responsible for their actions, even in wartime. Aggressive war itself is a crime.',
      "But justice was incomplete. Thousands of Nazis escaped: fled to South America, were protected during Cold War, or lived normal lives unpunished.",
    ],
    eyewitnessQuote: {
      text: "The wrongs which we seek to condemn and punish have been so calculated, so malignant, and so devastating, that civilization cannot tolerate their being ignored, because it cannot survive their being repeated.",
      attribution: "Justice Robert Jackson",
    },
    whyThisMatters:
      "Nuremberg created the foundation for: Universal Declaration of Human Rights (1948), Geneva Conventions (1949), International Criminal Court (2002). The principle: Even in war, some acts are unforgivable. Even leaders can be held accountable.",
    relatedEvents: [
      { id: "d-day-1944", label: "D-Day" },
      { id: "germany-surrenders-1945", label: "Germany Surrenders" },
    ],
  },
];

export function getPhaseForYear(year: number): Phase {
  if (year < 1933) return 1;
  if (year < 1939) return 2;
  if (year < 1944) return 3;
  return 4;
}

export function getPhaseColor(phase: Phase): string {
  return phaseInfo[phase].color;
}
