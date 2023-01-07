export interface OptionInSlide {
  id: number;
  option: string;
  amount: number;
}

export interface Slide {
  id: number;
  title: string;
  type: string;
  index: number;
  paragraph?: string;
  pollSlides: OptionInSlide[];
}

export interface Presentation {
  presentation: {
    id: string;
    name: string;
    inviteCode: string;
  };
  slides: Slide[];
}
