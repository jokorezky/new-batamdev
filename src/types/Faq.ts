export interface PopulatedFaqDto {
  _id: string;
  question: string;
  answered: string;
}
export interface FaqDto {
  populatedFaq: [PopulatedFaqDto];
}
