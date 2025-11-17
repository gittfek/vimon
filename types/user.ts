export interface AppUser {
  id: number;
  name: string | null;
  email: string;
  role: "member" | "admin" | string; // lägg till mer om du vill
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}