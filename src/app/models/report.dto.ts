export interface ReportDto {
  id?: number;
  title: string;
  description: string;
  departmentId: number;
  userId: string | null;
  // userKeycloakId: string; // <-- this is what your backend likely uses now
  createdAt: string;
}



