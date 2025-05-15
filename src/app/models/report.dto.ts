export interface ReportDto {
  id?: number;
  title: string;
  description: string;
  departmentId: number;
  userKeycloakId: string; // <-- this is what your backend likely uses now
  createdAt: string;
}



