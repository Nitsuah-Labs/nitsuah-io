# TODO

## Data Backend

- [ ] projects/clients - SaaS Dashboard - this should be a dashboard based upon the other demo apps and tools so it should be more of a "data" focused dashboard with charts, stats, user management, settings, etc. similar to the other SaaS apps we have but more fleshed out. It could even use those other sites as "connectors" to pull in data from them to show in the dashboard (vs they may have "simple" dashboards but this one is more of a "meta" dashboard that pulls in data from them all to show in one place across "many" apps, come up with a strategy for that and eventually once we start to hook up everything we'll build the data platform ontop of that too). so tl;dr eventually once we build some sort of backend or hook stuff up to data sources we'll build this dashboard app to visualize that data from all of our demos. think on this. maybe we should do a mini-db or whatever netlify has for data storage options or support (ie local postgres, sqlite, etc) and use that as a data source for this dashboard app, but have that be the backbone for all of the other apps that we start to build out? so once we figure out the backend we can build this out more as a "meta" dashboard for all of our apps, but also maybe a "query" interface so we can run "safe" SELECT queries against our data for more custom reports and stuff. think on this more for v2 of clients where we kick this up to the next step but his is a dependency first. so yeah lets discover which data platform we want, but for now hook into /lib/data and create a SQL query window of sorts to interact with our "data". we'll use static data like that for now until we find the right db.
- [ ] `SCREENSHOT-REQUIREMENTS.md` - go back through and identify which projects need new/better screenshots and create a list of those with details on what is needed (ie: resolution, content, etc) so we can create or capture those as needed for better visual appeal across the site.

## /docs

_For feature requests see `FEEDBACK.md`_
_For security status see `SECURITY_FIXES.md`_
_For phase items see `PHASE*.md`_
_For Tech debt objectives see `TECH_DEBT.md`_
