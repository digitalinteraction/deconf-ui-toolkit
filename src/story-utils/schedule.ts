import { Session, Speaker } from '@/types';

export function createSpeaker(id: string, name: string, role: string): Speaker {
  return {
    id: id,
    name: name,
    role: { en: role },
    bio: {
      en: ` Just my luck, no ice. You really think you can fly that thing? Eventually, you do plan to have dinosaurs on your dinosaur tour, right? You really think you can fly that thing? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.`
    },
    headshot: '/headshot.svg'
  };
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function createSponsors(n: number) {
  const s = [];
  for (let i = 0; i < n; i++) {
    s.push({
      title: `Corp ${alphabet[i % alphabet.length]}`,
      image: '/openlab.svg',
      href: 'https://openlab.ncl.ac.uk'
    });
  }
  return s;
}

export function defaultSessionTypes() {
  return [
    {
      id: 'plenary',
      iconGroup: 'fab',
      iconName: 'youtube',
      layout: 'plenary',
      title: { en: 'Plenary' }
    },
    {
      id: 'workshop',
      iconGroup: 'fas',
      iconName: 'users',
      layout: 'workshop',
      title: { en: 'Workshop' }
    }
  ];
}

export function defaultSpeakers() {
  return [
    createSpeaker('1', 'Geoff Testington', 'Chief Financial Officer'),
    createSpeaker('2', 'Felicity Wainwright', 'Chief Technical Officer'),
    createSpeaker('3', 'David Edge', 'Internal Interactions Designer'),
    createSpeaker('4', 'Lorena Bernal', 'Chief Metrics Specialist'),
    createSpeaker('5', 'Katlyn Swift', 'Lead Implementation Coordinator'),
    createSpeaker('6', 'Sid Hills', 'Product Data Associate'),
    createSpeaker('7', 'Noah Senior', 'Principal Identity Planner'),
    createSpeaker('8', 'Dolcie Wallace', 'Dynamic Interactions Analyst'),
    createSpeaker('9', 'Farrell Rocha', 'Human Paradigm Liason')
  ];
}

export function createSession(
  id: string,
  title: string,
  type: string,
  speakers: string[]
): Partial<Session> {
  return {
    id: id,
    type: type,
    title: {
      en: title
    },
    content: {
      en: `We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore! Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.`
    },
    hostLanguages: ['EN', 'FR'],
    isRecorded: true,
    speakers: speakers
  };
}
