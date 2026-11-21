export type PhotoAspectRatio = "16:9" | "3:2" | "4:5" | "1:1";

export interface Photograph {
  /**
   * Permanent catalog identifier (e.g. "001", "002").
   */
  id: string;

  /**
   * Title of the photograph.
   */
  title: string;

  /**
   * Location where the photo was taken (e.g. "Shinjuku, Tokyo").
   */
  location?: string;

  /**
   * Date or year (e.g. "2026").
   */
  date: string;

  /**
   * Film stock or camera type (e.g. "35mm", "Medium Format", "Digital").
   */
  camera?: string;

  /**
   * Image source URL.
   */
  src: string;

  /**
   * Accessible alt text describing the photograph.
   */
  alt: string;

  /**
   * Native aspect ratio.
   */
  aspectRatio: PhotoAspectRatio;

  /**
   * Approximate width and height for layout and Next Image sizing.
   */
  width: number;
  height: number;

  /**
   * Optional collection / series tag (e.g. "After Hours", "Between Places").
   */
  series?: string;
}

export type PhotoSpread =
  | {
      type: "full";
      photo: Photograph;
    }
  | {
      type: "diptych";
      photos: [Photograph, Photograph];
    }
  | {
      type: "solo";
      photo: Photograph;
      align: "left" | "right";
    };
