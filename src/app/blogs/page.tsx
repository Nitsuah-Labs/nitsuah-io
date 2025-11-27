import { redirect } from "next/navigation";

export default function Page() {
  // Redirect legacy /blogs to the projects blogs page
  redirect("/projects/blogs");
}
