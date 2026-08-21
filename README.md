# ShowTime Hub

Color System & Global Layout Theme :Refactor the global theme to a modern theater/cinema aesthetic.

- Color Palette:

  * Primary Red: Deep velvet red (#990000) and bright crimson (#E50914) for key CTAs.

  * Accent Yellow: Marquee gold/amber (#FFC72C) for highlights, badges, and ratings.

  * Neutral Base: Warm off-white/cream (#FAF7F2) for backgrounds, clean white (#FFFFFF) for cards, and dark charcoal (#1A1A1A) for typography.

- Global Header: Include the logo 'Ticker Xchanger', search bar with category filters (Movies, Concerts, Local Passes, Theater), a 'List a Ticket' button, and user profile avatar.

- Micro-interactions: Subtle ticker marquee ribbon beneath the navbar showing real-time deals and urgent ticket drops. Homepage Hero & Event Feed :Build the homepage for Ticker Xchanger with React and Tailwind CSS.

- Hero Section: High-impact headline 'Buy, Sell & Exchange Passes in Seconds' with quick-search inputs (Location, Date, Event Type). Add floating, subtle illustrated stickers (vintage ticket stubs, subtle popcorn icon) with smooth floating CSS animations.

- Featured Section: Grid of event cards styled like realistic vintage-modern ticket stubs with perforated edges.

- Card Data: Event poster image, Title, Venue, Date/Time, Price, 'B2C Official' or 'C2C Verified Seller' badge, and a dynamic 'Seats Remaining' counter.

- Filter Tabs: All, Trending Movies, Live Concerts, Local Fairs, Stand-up Comedy. C2C Ticket Listing Modal :Create an interactive 'Sell / Exchange Ticket' modal with step-by-step navigation.

- Step 1 (Event Details): Search bar to auto-fill event name, venue, date, and seat number.

- Step 2 (Ticket Verification): File upload area for digital pass/PDF with automatic OCR preview mock, barcode blur for security, and original price vs resale price input.

- Step 3 (Payout & Pricing): Calculator showing Buyer Price, Commission Fee breakdown, and Seller Payout amount.

- Style: Theater card look with glowing amber borders on active input fields and clear trust/guarantee badges. Ticket Detail & Fast Checkout Page :Design the Ticket Details and Checkout page.

- Left Column: Event details, venue map placeholder, seller rating badge, and anti-scalping buyer protection guarantee card.

- Right Column: Purchase summary styled as a physical perforated ticket stub with QR code placeholder, pricing breakdown, coupon code input field, and one-time payment button ('Instant Secure Checkout').

- Confirmation State: Trigger a celebratory micro-animation (confetti + ticket stamp sound effect simulation) upon successful booking. 1. Buyer Protection Badges (Microcopy & Tags)

Direct & Punchy:

🛡️ 100% Legit Pass — Scan-tested or your money back.

🎟️ PassShield™ Protected — 100% refund guarantee if entry fails.

🔒 Zero-Risk Entry — Verified authentic, always.

✨ Real Fans Only — ID & barcode double-checked.

Cinema/Theater Flavor:

🍿 Front-Row Guarantee — Verified seats, guaranteed entry.

🎟️ Golden Stub Verified — Direct-scanned before you buy.

🎬 No Plot Twists — Valid pass guaranteed, or full refund on the spot.

2. Fair-Price & Anti-Scalping Guarantees (Badges & Callout Copy)

Badges:

🏷️ FairPass Certified — Capped resale, zero gouging.

⚖️ Fan-First Pricing — Sold at face value or lower.

🚫 No Scalper Zone — Fair prices for true fans.

Card & Checkout Callout Blocks:

"Real Fans, Fair Prices"

Every pass on Ticker Xchanger is price-capped to keep experiences accessible. No artificial markups, no hidden extortion.

"The Golden Rule of Resale"

Never pay double for a sold-out show. Sellers are restricted to fair caps, keeping tickets in the hands of fans who actually want to go.

3. Lovable-Ready Badge Integration Prompt

Add trust and fair-pricing micro-badges across all ticket card components and the checkout summary:

- Badge 1 (Trust): Gold/Amber pill badge with a shield icon reading '100% PassShield™ Verified'. On hover, show tooltip: 'Scanned for authenticity. 100% refund if your pass fails at the gate.'

- Badge 2 (Pricing): Crimson/Red outline pill badge reading 'FairPass Certified · Anti-Scalp Capped'.

- Place these badges directly beneath the event title on ticket cards and beside the 'Instant Secure Checkout' button.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://show-ticket-shine.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d945f5a4-99ab-43cb-a155-9004c07e458b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
