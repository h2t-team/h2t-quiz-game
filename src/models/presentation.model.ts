export interface OptionInSlide {
  id: number;
  option: string;
  amount: number;
}

export interface Slide {
  id: number;
  title: string;
  index: number;
  pollSlides: OptionInSlide[];
}

export interface Presentation {
  presentation: {
    id: string;
    name: string;
  };
  slides: Slide[]
}
