import { ADMIN_EMAIL1, ADMIN_EMAIL2 } from "@/constants/comment";

const isAdminEmail = (email?: string | null) =>
  email && (email === ADMIN_EMAIL1 || email === ADMIN_EMAIL2);

export default isAdminEmail;
