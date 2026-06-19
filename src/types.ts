export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
}

export interface LoveReason {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface Prediction {
  text: string;
  type: 'compliment' | 'promise' | 'activity';
}
