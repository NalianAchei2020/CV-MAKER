export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin'; // ✅ Ensure role is strictly "user" or "admin"
}
