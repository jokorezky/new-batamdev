export interface CreateStudentEnrollmentInput {
  fullName: string;
  email: string;
  province: string;
  city: string;
  jadwalBiaya: string;
  birthDate: Date;
  gender: string;
  phone: string;
  address: string;
  learningProgram?: string;
}
