// Every routable page in src/app and how the screenshot suite treats it.
// `id` names the PNG (docs/screenshots/<id>.png). Where a page shows a feature
// from promo/spots.json the id is that feature's id, so the board links it.
// `mobile: true` also gets a 390x844 shot (<id>-mobile.png).
//
// Not captured (see docs/screenshots/README.md):
//   /blogs, /clients  308 redirects to /projects/blogs and /projects/clients
//   /logout           disconnects the wallet and redirects to / after 1 s
//   /3d               the Spline scene needs the network; the fixture blocks it and hides canvases,
//                     so the capture would show the fallback text (capture the live scene by hand)
const BLOG_SLUG = "portfolio-netlify-docker";

const pages = [
  { id: "featured-projects-landing-page", path: "/", mobile: true },
  { id: "about-page", path: "/about", mobile: true },
  { id: "professional-resume", path: "/resume", mobile: true },
  { id: "project-gallery", path: "/projects", mobile: true },
  { id: "blog-platform", path: "/projects/blogs", mobile: true },
  { id: "blog-post", path: `/projects/blogs/${BLOG_SLUG}`, mobile: true },
  { id: "client-projects", path: "/projects/clients", mobile: true },
  { id: "labs", path: "/labs", mobile: true },
  { id: "crypto", path: "/crypto", mobile: true },
  { id: "profile", path: "/profile" },
  { id: "labs-domains", path: "/labs/domains" },
  { id: "labs-mint", path: "/labs/mint" },
  { id: "labs-register", path: "/labs/register" },
  { id: "labs-ai", path: "/labs/ai" },
  { id: "labs-dao", path: "/labs/dao" },
  { id: "labs-lookup", path: "/labs/lookup" },
  { id: "labs-stake", path: "/labs/stake" },
  { id: "labs-token", path: "/labs/token" },
];

module.exports = { pages, BLOG_SLUG };
