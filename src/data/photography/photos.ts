import type { PhotoSpread, Photograph } from "@/types/photography";

/**
 * Editorial Photography Archive — Curation & Spreads
 *
 * Authored using the photobook spread rhythm:
 * - full: panoramic or landscape photograph spanning the entire ~880px width
 * - diptych: two complementary portrait (4:5) or square (1:1) photographs side by side
 * - solo: an offset photograph (3:2) with generous negative space opposite
 */
export const photoSpreads: PhotoSpread[] = [
  {
    type: "full",
    photo: {
      id: "001",
      title: "After Hours",
      location: "Shinjuku, Tokyo",
      date: "2026",
      camera: "35mm",
      aspectRatio: "16:9",
      src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
      alt: "Panoramic Tokyo skyline illuminated against deep midnight blue with Tokyo Tower glowing amber",
      width: 1600,
      height: 900,
      series: "After Hours",
    },
  },
  {
    type: "diptych",
    photos: [
      {
        id: "002",
        title: "Neon Canopy",
        location: "Kabukicho, Tokyo",
        date: "2026",
        camera: "35mm",
        aspectRatio: "4:5",
        src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=85",
        alt: "Rain-slicked city pavement reflecting vertical neon signs and quiet umbrella silhouettes",
        width: 1000,
        height: 1250,
        series: "After Hours",
      },
      {
        id: "003",
        title: "Underground Passage",
        location: "Shibuya, Tokyo",
        date: "2026",
        camera: "35mm",
        aspectRatio: "4:5",
        src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1000&q=85",
        alt: "Atmospheric descending subterranean walkway illuminated by cool fluorescent lighting",
        width: 1000,
        height: 1250,
        series: "Between Places",
      },
    ],
  },
  {
    type: "solo",
    align: "right",
    photo: {
      id: "004",
      title: "Morning Counter",
      location: "Gion, Kyoto",
      date: "2026",
      camera: "35mm",
      aspectRatio: "3:2",
      src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85",
      alt: "Warm morning raking light across weathered wooden counter and quiet alleyway lanterns",
      width: 1400,
      height: 933,
      series: "Quiet Corners",
    },
  },
  {
    type: "full",
    photo: {
      id: "005",
      title: "Crossing in Mist",
      location: "Chicago River, Illinois",
      date: "2026",
      camera: "Medium Format",
      aspectRatio: "16:9",
      src: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85",
      alt: "Fog-shrouded steel bascule bridge arching over dark river waters at twilight",
      width: 1600,
      height: 900,
      series: "Between Places",
    },
  },
  {
    type: "diptych",
    photos: [
      {
        id: "006",
        title: "Facade Rhythm",
        location: "Canary Wharf, London",
        date: "2026",
        camera: "35mm",
        aspectRatio: "4:5",
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
        alt: "Geometric grid of tinted skyscraper glass panels catching low evening sky gradient",
        width: 1000,
        height: 1250,
        series: "Quiet Corners",
      },
      {
        id: "007",
        title: "Brutalist Shadow",
        location: "Barbican Estate, London",
        date: "2026",
        camera: "35mm",
        aspectRatio: "4:5",
        src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85",
        alt: "Angular bush-hammered concrete columns framing high-contrast architectural shadow",
        width: 1000,
        height: 1250,
        series: "Quiet Corners",
      },
    ],
  },
  {
    type: "solo",
    align: "left",
    photo: {
      id: "008",
      title: "Late Transit",
      location: "Yamanote Line, Tokyo",
      date: "2026",
      camera: "35mm",
      aspectRatio: "3:2",
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85",
      alt: "Quiet evening reflection on interior train window as city lights streak past in the dark",
      width: 1400,
      height: 933,
      series: "Between Places",
    },
  },
  {
    type: "diptych",
    photos: [
      {
        id: "009",
        title: "Rain on Glass",
        location: "Roppongi, Tokyo",
        date: "2026",
        camera: "35mm",
        aspectRatio: "1:1",
        src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=85",
        alt: "Fine raindrops beading on dark glass pane refracting out-of-focus city bokeh",
        width: 1000,
        height: 1000,
        series: "After Hours",
      },
      {
        id: "010",
        title: "Amber Puddle",
        location: "Ginza, Tokyo",
        date: "2026",
        camera: "35mm",
        aspectRatio: "1:1",
        src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85",
        alt: "Rain puddle on dark asphalt surface reflecting warm incandescent street light",
        width: 1000,
        height: 1000,
        series: "After Hours",
      },
    ],
  },
  {
    type: "full",
    photo: {
      id: "011",
      title: "Sleeping City",
      location: "Lower Manhattan, New York",
      date: "2026",
      camera: "Medium Format",
      aspectRatio: "16:9",
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=85",
      alt: "Wide elevated view of empty downtown street canyons sleeping beneath deep night sky",
      width: 1600,
      height: 900,
      series: "After Hours",
    },
  },
];

/**
 * Flattens all photographs across spreads into an indexed array for lightbox navigation.
 */
export const allPhotographs: Photograph[] = photoSpreads.flatMap((spread) => {
  if (spread.type === "full" || spread.type === "solo") {
    return [spread.photo];
  }
  return spread.photos;
});
