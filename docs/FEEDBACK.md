# FEEDBACK for nitsuah.io

Please provide your feedback on the nitsuah-io project. Your insights are valuable and will help improve the project.

Things I noticed when browsing:

1. There were problems on the homepage:  

homebar - can probably hide profile/logout for now, redirect to a funny 404 page for things like this i guess.

- when the spline component loads, it pushes the footer too far. we should always try and render it in fullscreen. so we may need to decrease the size of the spline canvas until it's fully loaded but also a smaller total maximum size. figure out the best practice given that the spline is the interactive navigation element central to my website. 
- the footer can just overlap the bottom portion of the spline if needed.

2. Aboutme page has a good "May take some time to load, thanks for your patience!" maybe we can add a spinner to something on a delay (so it dissapears after a set time regardless to help indicate that the spline component is still loading - the load is longer on this page, but does happen on the homepage too sometimes). come up with a best practice approach. maybe a modal/esq spinner in the middle that spins for x seconds or until the spine loads, whichever is first.

- this page too has the footer overlap issue when the spline loads. try and keep it one page height always. if possible.

1. For crypto and projects page. lets be consistent. the footer overlap issue should be addressed in the same way as the homepage and about me page. but primarily we have different types of displays and "cards" lets strive to be consistent. i like the new model but use some of the details and examples and elements we already have (ie: the icons and hyper links to my existing projects and the intended layout in a grid style). but employ best practices so it renders properly on mobile and desktop. 
 - tl;dr - combine the two and we'll probably have a winner. but use best practices to ensure it renders properly on all screen sizes. and that may mean defaulting to cards or icons or including both at different experiencing sizes.


## LABS 

Ok labs is a hot mess. mostly my fault. lets focus on the look and feel improvements and ensuring standardization across the page set (buttons, cards, etc. just be really consistent with the design language). but here is some general feedback to explain importance and usage.

Overall improvements:

- Standardize buttons and cards across the site. ensure consistent padding, margin, hover states, font sizes, etc.
- Ensure responsive design for all components (mobile, tablet, desktop).
- Improve accessibility (ARIA labels, keyboard navigation, color contrast).
- Optimize load times (lazy load images, minimize bundle size).
- Ensure all links open in new tabs where appropriate (external links).
- Add tooltips to buttons/icons for better UX.
- Ensure consistent font usage and sizes across all pages.
- Improve spacing and alignment for better visual hierarchy.
- Add loading indicators for actions that take time (e.g., fetching data).
- Ensure error handling and user feedback for failed actions (e.g., failed transactions
- Add animations/transitions for interactive elements to enhance user experience.

### https://nitsuah.io/labs 

Buttons:

- NETWORK - may only support ETH testnet (but maybe polygon testnet - last was on mumbai? so may need a redeploy on latest network tbh) - ensure the network switcher works properly and is intuitive. so this tells the user what network they are on and allows them to switch if needed from the site ui if wallet supports it.
- FUNDS - Polygon logo - FAUCET just a link to the polygon faucet page for test matic. but switches based on the network selected.

SITES:

- REGISTER - takes to the register page for the dapp.
- MINT - a LANDPLOT nft minting page (may be disabled for now until we do a new mint)
- DOMAINS - register a new ENS SUBDOMAIN

Will provide more detailed feedback on each of these pages separately. but overall just ensure consistent design language and best practices across all pages. Right now with the connect wallet issues they dont even load properly.

#### Register

