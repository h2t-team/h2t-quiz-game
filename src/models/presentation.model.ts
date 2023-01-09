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
  groupId: string | null;
}

export interface PresentationInfo {
  id: string;
  name: string;
  inviteCode: string;
  groupId: string | null;
  'group.name': string | null;
}

export interface Presentation {
  presentation: PresentationInfo;
  slides: Slide[];
}
