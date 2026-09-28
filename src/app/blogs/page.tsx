import { permanentRedirect } from "next/navigation";

export default function Page() {
  // Permanently (308) redirect legacy /blogs to the projects blogs page
  permanentRedirect("/projects/blogs");
}
