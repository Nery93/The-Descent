export type CampType = 'death' | 'concentration' | 'transit' | 'labor';

export interface Camp {
  id: string;
  name: string;
  type: CampType;
  coordinates: [number, number]; // [longitude, latitude]
  location: string;
  country: string;
  deaths: number;
  operationalDates: string;
  liberatedBy?: string;
  liberationDate?: string;
  description: string;
  relatedEventId?: string;
}

export const campTypeInfo: Record<CampType, { label: string; color: string; description: string }> = {
  death: {
    label: 'Death Camps',
    color: '#dc2626',
    description: 'Extermination camps built solely for mass murder',
  },
  concentration: {
    label: 'Concentration Camps',
    color: '#f97316',
    description: 'Major camps for imprisonment, forced labor, and murder',
  },
  transit: {
    label: 'Transit Camps',
    color: '#fbbf24',
    description: 'Holding camps before deportation to death camps',
  },
  labor: {
    label: 'Labor Camps',
    color: '#78716c',
    description: 'Forced labor camps with high mortality rates',
  },
};

export const camps: Camp[] = [
  // Death Camps (Vernichtungslager)
  {
    id: 'auschwitz',
    name: 'Auschwitz-Birkenau',
    type: 'death',
    coordinates: [19.1783, 50.0347],
    location: 'Oświęcim',
    country: 'Poland',
    deaths: 1100000,
    operationalDates: '1940-1945',
    liberatedBy: 'Soviet 60th Army',
    liberationDate: 'January 27, 1945',
    description: 'The largest Nazi death camp. Over 1.1 million people murdered, approximately 90% of them Jews. Site of industrial-scale genocide using gas chambers.',
    relatedEventId: 'auschwitz-liberation-1945',
  },
  {
    id: 'treblinka',
    name: 'Treblinka',
    type: 'death',
    coordinates: [22.0433, 52.6314],
    location: 'Treblinka',
    country: 'Poland',
    deaths: 900000,
    operationalDates: '1942-1943',
    description: 'Second deadliest camp. Almost all arrivals were gassed within hours. Destroyed by Nazis to hide evidence after prisoner uprising.',
  },
  {
    id: 'belzec',
    name: 'Bełżec',
    type: 'death',
    coordinates: [23.4564, 50.3717],
    location: 'Bełżec',
    country: 'Poland',
    deaths: 600000,
    operationalDates: '1942-1943',
    description: 'First Operation Reinhard camp. Only 7 known survivors. Completely dismantled by Nazis to destroy evidence.',
  },
  {
    id: 'sobibor',
    name: 'Sobibór',
    type: 'death',
    coordinates: [23.5953, 51.4469],
    location: 'Sobibór',
    country: 'Poland',
    deaths: 250000,
    operationalDates: '1942-1943',
    description: 'Site of the only successful mass escape. 300 prisoners broke out in October 1943, leading to camp closure.',
  },
  {
    id: 'chelmno',
    name: 'Chełmno',
    type: 'death',
    coordinates: [18.7156, 52.1525],
    location: 'Chełmno nad Nerem',
    country: 'Poland',
    deaths: 320000,
    operationalDates: '1941-1945',
    description: 'First Nazi extermination camp. Used mobile gas vans. Only 4 known survivors.',
  },
  {
    id: 'majdanek',
    name: 'Majdanek',
    type: 'death',
    coordinates: [22.6006, 51.2231],
    location: 'Lublin',
    country: 'Poland',
    deaths: 78000,
    operationalDates: '1941-1944',
    liberatedBy: 'Soviet forces',
    liberationDate: 'July 23, 1944',
    description: 'First major camp liberated by Allies. Evidence largely intact as Nazis fled too quickly to destroy it.',
  },

  // Major Concentration Camps
  {
    id: 'dachau',
    name: 'Dachau',
    type: 'concentration',
    coordinates: [11.4683, 48.2700],
    location: 'Dachau',
    country: 'Germany',
    deaths: 41500,
    operationalDates: '1933-1945',
    liberatedBy: 'U.S. 42nd & 45th Infantry',
    liberationDate: 'April 29, 1945',
    description: 'First Nazi concentration camp. Model for all subsequent camps. Medical experiments conducted on prisoners.',
    relatedEventId: 'dachau-1933',
  },
  {
    id: 'buchenwald',
    name: 'Buchenwald',
    type: 'concentration',
    coordinates: [11.2500, 51.0217],
    location: 'Weimar',
    country: 'Germany',
    deaths: 56000,
    operationalDates: '1937-1945',
    liberatedBy: 'U.S. 6th Armored Division',
    liberationDate: 'April 11, 1945',
    description: 'One of the largest camps in Germany. Prisoners organized underground resistance. Elie Wiesel was imprisoned here.',
  },
  {
    id: 'bergen-belsen',
    name: 'Bergen-Belsen',
    type: 'concentration',
    coordinates: [9.9075, 52.7583],
    location: 'Lower Saxony',
    country: 'Germany',
    deaths: 70000,
    operationalDates: '1940-1945',
    liberatedBy: 'British 11th Armoured Division',
    liberationDate: 'April 15, 1945',
    description: 'Where Anne Frank died. 14,000 more died after liberation despite medical care due to disease and starvation.',
    relatedEventId: 'bergen-belsen-1945',
  },
  {
    id: 'sachsenhausen',
    name: 'Sachsenhausen',
    type: 'concentration',
    coordinates: [13.2667, 52.7667],
    location: 'Oranienburg',
    country: 'Germany',
    deaths: 30000,
    operationalDates: '1936-1945',
    liberatedBy: 'Soviet/Polish forces',
    liberationDate: 'April 22, 1945',
    description: 'Near Berlin. Served as training center for SS concentration camp officers. Used for experiments.',
  },
  {
    id: 'ravensbruck',
    name: 'Ravensbrück',
    type: 'concentration',
    coordinates: [13.1700, 53.1900],
    location: 'Fürstenberg',
    country: 'Germany',
    deaths: 30000,
    operationalDates: '1939-1945',
    liberatedBy: 'Soviet forces',
    liberationDate: 'April 30, 1945',
    description: 'Largest camp for women. Medical experiments performed on female prisoners. Over 130,000 women imprisoned.',
  },
  {
    id: 'mauthausen',
    name: 'Mauthausen',
    type: 'concentration',
    coordinates: [14.5000, 48.2567],
    location: 'Upper Austria',
    country: 'Austria',
    deaths: 90000,
    operationalDates: '1938-1945',
    liberatedBy: 'U.S. 11th Armored Division',
    liberationDate: 'May 5, 1945',
    description: 'Only camp classified "Grade III" (harshest). Infamous "Stairs of Death" at quarry. Spanish Republicans among victims.',
  },
  {
    id: 'neuengamme',
    name: 'Neuengamme',
    type: 'concentration',
    coordinates: [10.2317, 53.4283],
    location: 'Hamburg',
    country: 'Germany',
    deaths: 42900,
    operationalDates: '1938-1945',
    liberatedBy: 'British forces',
    liberationDate: 'May 4, 1945',
    description: 'Largest camp in Northwest Germany. Over 80 subcamps. Many prisoners died in evacuations.',
  },
  {
    id: 'flossenburg',
    name: 'Flossenbürg',
    type: 'concentration',
    coordinates: [12.3500, 49.7333],
    location: 'Bavaria',
    country: 'Germany',
    deaths: 30000,
    operationalDates: '1938-1945',
    liberatedBy: 'U.S. 90th & 97th Infantry',
    liberationDate: 'April 23, 1945',
    description: 'Dietrich Bonhoeffer executed here. Quarry labor camp with brutal conditions.',
  },
  {
    id: 'stutthof',
    name: 'Stutthof',
    type: 'concentration',
    coordinates: [19.1550, 54.3283],
    location: 'Sztutowo',
    country: 'Poland',
    deaths: 65000,
    operationalDates: '1939-1945',
    liberatedBy: 'Soviet forces',
    liberationDate: 'May 9, 1945',
    description: 'First camp outside Germany. Last camp liberated. Gas chamber built in 1944.',
  },
  {
    id: 'gross-rosen',
    name: 'Groß-Rosen',
    type: 'concentration',
    coordinates: [16.2783, 50.9983],
    location: 'Rogoźnica',
    country: 'Poland',
    deaths: 40000,
    operationalDates: '1940-1945',
    liberatedBy: 'Soviet forces',
    liberationDate: 'February 13, 1945',
    description: 'Over 100 subcamps. Granite quarry. Many prisoners evacuated on death marches.',
  },
  {
    id: 'natzweiler',
    name: 'Natzweiler-Struthof',
    type: 'concentration',
    coordinates: [7.2533, 48.4533],
    location: 'Alsace',
    country: 'France',
    deaths: 22000,
    operationalDates: '1941-1944',
    liberatedBy: 'U.S. forces',
    liberationDate: 'November 23, 1944',
    description: 'Only concentration camp on French territory. Used for medical experiments. Gas chamber built for experiments.',
  },

  // Transit Camps
  {
    id: 'theresienstadt',
    name: 'Theresienstadt (Terezín)',
    type: 'transit',
    coordinates: [14.1500, 50.5100],
    location: 'Terezín',
    country: 'Czechoslovakia',
    deaths: 33000,
    operationalDates: '1941-1945',
    liberatedBy: 'Soviet forces',
    liberationDate: 'May 8, 1945',
    description: 'Nazi propaganda camp shown to Red Cross. 140,000 Jews held here; 90,000 deported to death camps. Rich cultural life organized by prisoners.',
  },
  {
    id: 'westerbork',
    name: 'Westerbork',
    type: 'transit',
    coordinates: [6.6083, 52.9167],
    location: 'Drenthe',
    country: 'Netherlands',
    deaths: 750,
    operationalDates: '1939-1945',
    liberatedBy: 'Canadian forces',
    liberationDate: 'April 12, 1945',
    description: 'Main Dutch transit camp. Anne Frank and family deported from here. 107,000 Jews sent to death camps.',
  },
  {
    id: 'drancy',
    name: 'Drancy',
    type: 'transit',
    coordinates: [2.4500, 48.9167],
    location: 'Paris',
    country: 'France',
    deaths: 3000,
    operationalDates: '1941-1944',
    liberatedBy: 'Free French forces',
    liberationDate: 'August 18, 1944',
    description: 'Main French transit camp. 65,000 Jews deported to death camps. Located in Parisian suburb.',
  },
  {
    id: 'mechelen',
    name: 'Mechelen (Dossin)',
    type: 'transit',
    coordinates: [4.4833, 51.0333],
    location: 'Mechelen',
    country: 'Belgium',
    deaths: 300,
    operationalDates: '1942-1944',
    liberatedBy: 'British forces',
    liberationDate: 'September 4, 1944',
    description: 'Main Belgian transit camp. 25,000 Jews and 350 Roma deported. Only 1,200 survived the war.',
  },
  {
    id: 'fossoli',
    name: 'Fossoli',
    type: 'transit',
    coordinates: [10.8333, 44.7333],
    location: 'Carpi',
    country: 'Italy',
    deaths: 500,
    operationalDates: '1942-1944',
    description: 'Main Italian transit camp. Primo Levi deported from here. 5,000 Jews sent to Auschwitz.',
  },

  // Select Labor Camps
  {
    id: 'monowitz',
    name: 'Monowitz (Auschwitz III)',
    type: 'labor',
    coordinates: [19.2817, 50.0333],
    location: 'Oświęcim',
    country: 'Poland',
    deaths: 10000,
    operationalDates: '1942-1945',
    description: 'IG Farben synthetic rubber plant. Worked prisoners to death. Part of Auschwitz complex.',
  },
  {
    id: 'dora-mittelbau',
    name: 'Dora-Mittelbau',
    type: 'labor',
    coordinates: [10.7833, 51.5333],
    location: 'Nordhausen',
    country: 'Germany',
    deaths: 20000,
    operationalDates: '1943-1945',
    liberatedBy: 'U.S. forces',
    liberationDate: 'April 11, 1945',
    description: 'Underground V-2 rocket factory. Prisoners worked in tunnels in horrific conditions.',
  },
  {
    id: 'plaszow',
    name: 'Płaszów',
    type: 'labor',
    coordinates: [19.9667, 50.0167],
    location: 'Kraków',
    country: 'Poland',
    deaths: 9000,
    operationalDates: '1942-1945',
    description: 'Depicted in Schindler\'s List. Commandant Amon Göth executed prisoners for sport.',
  },
  {
    id: 'janowska',
    name: 'Janowska',
    type: 'labor',
    coordinates: [24.0000, 49.8333],
    location: 'Lviv',
    country: 'Ukraine',
    deaths: 40000,
    operationalDates: '1941-1943',
    description: 'Combined labor and extermination camp. Mass executions in nearby ravine.',
  },
];

export function getCampsByType(type: CampType): Camp[] {
  return camps.filter(camp => camp.type === type);
}

export function getCampMarkerSize(deaths: number): number {
  if (deaths >= 100000) return 22;
  if (deaths >= 10000) return 14;
  return 8;
}

export function formatDeaths(deaths: number): string {
  if (deaths >= 1000000) {
    return `${(deaths / 1000000).toFixed(1)}M`;
  }
  if (deaths >= 1000) {
    return `${Math.round(deaths / 1000)}K`;
  }
  return deaths.toLocaleString();
}

export function getTotalDeaths(filteredCamps: Camp[]): number {
  return filteredCamps.reduce((sum, camp) => sum + camp.deaths, 0);
}

export function getMostDeadlyCamp(filteredCamps: Camp[]): Camp | null {
  if (filteredCamps.length === 0) return null;
  return filteredCamps.reduce((max, camp) => camp.deaths > max.deaths ? camp : max, filteredCamps[0]);
}
