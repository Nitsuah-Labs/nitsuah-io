# Phase 3 Validation Checklist

**Status:** Ready for Testing  
**Date:** October 28, 2025  
**Branch:** phase-3

## ✅ Pre-Flight Checks (Completed)

- [x] All files formatted with Prettier
- [x] TypeScript compilation: Zero errors
- [x] Production build successful: 24 pages generated
- [x] All tests passing: 3/3 suites
- [x] Design system applied to all labs pages
- [x] Fixed layout implemented across all main pages

## 🧪 Browser Testing Checklist

### Homepage Testing
- [ ] **Fixed Header/Footer**
  - [ ] Header stays visible when scrolling
  - [ ] Footer stays visible at bottom
  - [ ] Spline component renders behind header/footer (z-index correct)
  
- [ ] **Spline Loading**
  - [ ] Loading spinner appears immediately
  - [ ] Spinner disappears after Spline loads or 10s timeout
  - [ ] Spline interactive navigation works
  
- [ ] **Responsive Design**
  - [ ] Desktop (>1024px): Proper layout
  - [ ] Tablet (768-1024px): Adapts correctly
  - [ ] Mobile (<768px): Stacks properly

### About Page Testing
- [ ] Same header/footer tests as homepage
- [ ] Spline loading spinner works
- [ ] Content readable with fixed header

### Projects Page Testing
- [ ] Fixed header/footer persistent
- [ ] Content scrollable between fixed elements
- [ ] Project grid responsive (2-6 columns based on screen size)
- [ ] All project icons/links work
- [ ] Tooltips display correctly

### Crypto Page Testing
- [ ] Fixed header/footer persistent
- [ ] Content scrollable
- [ ] Grid layout responsive
- [ ] All badge/NFT links work

### Labs Pages Testing

#### Register Page
- [ ] **Wallet Connection**
  - [ ] "Setup Wallet" section displays with Coinbase/MetaMask buttons
  - [ ] Connect wallet component works
  - [ ] Network switcher detects current network
  - [ ] Can switch to Mumbai testnet
  
- [ ] **Design System**
  - [ ] All buttons use `.labs-btn` classes
  - [ ] Card layouts render properly
  - [ ] Hover states work
  - [ ] Mobile: Buttons go full-width

#### Mint Page
- [ ] Connect wallet section
- [ ] Account displays when connected
- [ ] MintNFT component renders
- [ ] Network switcher works
- [ ] Card layouts consistent

#### Domains Page
- [ ] Connect wallet flow works
- [ ] Network switching to Mumbai
- [ ] Domain input field works
- [ ] Mint button styled correctly
- [ ] PolygonScan/OpenSea links work
- [ ] Recent mints display (if any exist)

#### Placeholder Pages (Lookup, Stake, Token, DAO, AI)
- [ ] Connect wallet card displays
- [ ] "Under development" message shows when connected
- [ ] Consistent styling with other pages
- [ ] No console errors

## 📱 Mobile Testing

### Responsive Breakpoints
- [ ] **< 768px (Mobile)**
  - [ ] Header navigation collapses properly
  - [ ] Buttons full-width
  - [ ] Cards stack vertically
  - [ ] Touch targets adequate (44px minimum)
  
- [ ] **768-1024px (Tablet)**
  - [ ] 2-3 column grids
  - [ ] Buttons appropriate size
  - [ ] Cards maintain padding
  
- [ ] **> 1024px (Desktop)**
  - [ ] 3-6 column grids
  - [ ] Full navigation visible
  - [ ] Optimal spacing

### Touch Interactions
- [ ] All buttons tappable
- [ ] No hover-only states block functionality
- [ ] Spline works on touch devices
- [ ] Forms usable with touch keyboard

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals (if any)

### Screen Reader Testing
- [ ] Page structure clear (headings hierarchy)
- [ ] All buttons have accessible labels
- [ ] Form inputs have labels
- [ ] Error messages announced
- [ ] Loading states announced

### Visual Accessibility
- [ ] Color contrast ≥ 4.5:1 (WCAG AA)
- [ ] Text scalable to 200% without breaking
- [ ] No information conveyed by color alone
- [ ] Focus indicators visible

## 🔍 Functional Testing

### Web3 Features
- [ ] **MetaMask Connection**
  - [ ] Connect wallet button works
  - [ ] Account displays after connection
  - [ ] Network detection accurate
  - [ ] Disconnect works
  
- [ ] **WalletConnect (if enabled)**
  - [ ] QR code displays
  - [ ] Mobile wallet connection works
  
- [ ] **Network Switching**
  - [ ] Switch to Mumbai from UI
  - [ ] Network display updates
  - [ ] Contracts load on correct network

### Performance
- [ ] Lighthouse score ≥ 90 (Performance)
- [ ] Lighthouse score ≥ 90 (Accessibility)
- [ ] Initial load < 3s
- [ ] No console errors
- [ ] No console warnings (except known ones)

## 🐛 Known Issues / Expected Behavior

### Expected Warnings
- `<img>` vs `<Image />` warnings in register page (intentional for icons)
- Mumbai testnet deprecated notice (expected, still functional)

### Known Limitations
- Mumbai testnet: Deprecated but contracts still work
- Spline loading: May take 5-10s on slow connections
- Wallet connection: Requires browser extension

## 📋 Testing Commands

```bash
# Start dev server
npm run dev

# Run in different terminal - check for errors
npm run typecheck

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run start
```

## 🎯 Success Criteria

**Phase 3 is complete when:**
- ✅ All design system applied consistently
- ✅ Fixed layout works across all pages
- ✅ No TypeScript errors
- ✅ All tests pass
- ✅ Production build succeeds
- [ ] Manual browser testing confirms functionality
- [ ] Mobile responsive design verified
- [ ] Basic accessibility checks pass

## 🚀 Next Steps After Validation

1. **If tests pass:** Merge to main and deploy
2. **If issues found:** Document in GitHub Issues
3. **Future improvements:**
   - Add E2E tests with Playwright
   - Implement remaining labs features (lookup, stake, token)
   - Add analytics and monitoring
   - Review Dependabot PRs

---

**Notes:**
- Run tests in Chrome, Firefox, Safari if possible
- Test with MetaMask installed
- Test both connected and disconnected wallet states
- Check browser console for errors during testing
