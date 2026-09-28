import { permanentRedirect } from "next/navigation";

export default function Page() {
  // Permanently (308) redirect legacy /clients to the projects clients page
  permanentRedirect("/projects/clients");
}
