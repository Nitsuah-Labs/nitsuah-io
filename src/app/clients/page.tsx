import { redirect } from "next/navigation";

export default function Page() {
  // Redirect legacy /clients to the projects clients page
  redirect("/projects/clients");
}
