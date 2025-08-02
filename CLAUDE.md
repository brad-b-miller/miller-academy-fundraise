# Miller Academy Fundraiser Codebase

## Overview
This is a fundraising website for Miller Academy, a family homeschool. The site sells handcrafted items created by three daughters (Chloe, Phoebe, and Lydia) to fund educational activities like music lessons, science experiments, and field trips.

## Technology Stack
- **Framework**: Next.js 15.3.5 with React 19 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom CSS
- **Deployment**: Cloudflare Workers via OpenNext
- **Development**: Turbopack

## Project Structure

### Key Files
- `src/app/page.tsx`: Main application component containing all functionality
- `src/app/layout.tsx`: Root layout with metadata and font configuration
- `src/app/globals.css`: Global styles including Tailwind and custom CSS
- `next.config.ts`: Next.js configuration for Cloudflare deployment
- `wrangler.jsonc`: Cloudflare Workers configuration
- `open-next.config.ts`: OpenNext deployment configuration

### Features
1. **Product Showcase**: Display of 4 handcrafted products with images and descriptions
2. **Shopping Cart**: Interactive quantity selection and order calculation
3. **Order Form**: Customer contact information collection
4. **Payment Integration**: Venmo and Zelle QR codes for payment
5. **FAQ Section**: Information about the homeschool and educational philosophy
6. **Image Lightbox**: Full-screen product image viewing
7. **Responsive Design**: Mobile-friendly layout with artistic styling

### Products
- Lydia's Laughs (Comic book) - $5
- Handmade Bookmarks (Set of 6) - $10
- Note Cards (Set of 12) - $10
- Large Fabric Grocery Tote - $25

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy

# Preview production build
npm run preview
```

## State Management
The application uses React hooks for state:
- `showPurchaseModal`: Controls purchase form visibility
- `showPaymentModal`: Controls payment modal visibility
- `showImageModal`: Controls image lightbox
- `productQuantities`: Tracks quantity for each product
- `formData`: Stores customer order information

## API Integration
Orders are submitted to: `https://n8n.teammiller.org/webhook/59b489ff-d54d-4a08-8de9-63d7f017ec55`

## Styling Approach
- Tailwind CSS utilities for responsive design
- Custom CSS for artistic elements (blackboard effect, floral dividers)
- Multiple Google Fonts for varied typography:
  - Geist & Geist Mono (primary)
  - Dancing Script (decorative)
  - Playfair Display (headers)
  - Delius & Fredericka the Great (handwritten style)

## Deployment
The project is configured for Cloudflare Workers deployment using OpenNext. The `wrangler.jsonc` file contains the necessary configuration for deployment.

## Important Notes
- All functionality is contained in a single page component (`src/app/page.tsx`)
- Images are optimized using Next.js Image component
- The site is fully responsive and mobile-friendly
- Payment is handled externally via QR codes (no direct payment processing)