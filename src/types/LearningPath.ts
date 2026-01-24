export interface KurikulumDto {
  text: string;
  description: string;
  images: string[];
}

export interface PopulatedFasePembelajaranDto {
  title: string;
  description: string;
  kurikulum: [KurikulumDto];
}

export interface PopulatedFasePembelajaranDto {
  title: string;
  description: string;
  kurikulum: [KurikulumDto];
}

export interface WhyListDto {
  text: string;
  description: string;
}

export interface PopulatedJadwalBiayasDto {
  _id: string;
  class_start: string;
  class_end: string;
  name: string;
  isEarlyBirdDiscount: boolean;
  earlyBirdPrice: number;
  normalPrice: number;
}

export interface SubModulesDto {
  _id: string;
  subModules: string;
}

export interface ModulesDto {
  subModules: [SubModulesDto];
}

export interface FaqDto {
  _id: string;
  question: string;
  answered: string;
}

export interface LearningPathDto {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  text_button: string;
  why_image: string;
  why_lists: [WhyListDto];
  populatedFasePembelajaran: [PopulatedFasePembelajaranDto];
  populatedJadwalBiayas: [PopulatedJadwalBiayasDto];
  populatedFaq: [FaqDto];
  modules: [ModulesDto];
}
