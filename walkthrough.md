# Walkthrough: Unified Project Estimator & Case Study Mobile Reordering

The case study showcase layouts, screenshot gallery overlay, and homepage description typography have been optimized for mobile viewports to align with responsive UX goals.

## Key Changes

### 1. Reduced Heading & Description Typography on Mobile (Homepage)
- **Have a Question Heading & Subtitle**: Shrunk the `"Have a question?"` heading in [QuestionsSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/QuestionsSection.tsx) on mobile from `text-4xl` to `text-3xl` (`md:text-7xl` on desktop). The sub-heading description has also been scaled down from `text-sm` to `text-xs` on mobile (`md:text-2xl` on desktop).
- **In Development Sub-heading**: Changed the font size and family for the text under the "In Development" heading in [LabsSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/LabsSection.tsx) to `text-xs sm:text-base` on mobile viewports (`md:text-xl` and `font-unbounded` on desktop), keeping the typographic scale perfectly in sync with the other sections on mobile.
- **Case Studies Sub-heading**: Adjusted the paragraph size under the "Case Studies" heading in [WorkSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/WorkSection.tsx) to `text-sm sm:text-base md:text-xl` on mobile viewports.

### 2. Mobile Card Backgrounds & Animation for Muslim Atlas Features
- **Premium Translucent Glass Cards**: Upgraded the mobile-only container background for the Muslim Atlas feature bullets in `LabsSection.tsx` to `bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md shadow-md`. On desktop (`md+`), it returns to standard clean, transparent, borderless list items.
- **Immediate Bullet Loading on Mobile**: Configured the bullets, tech stack tags, and repository link button in [LabsSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/LabsSection.tsx) to animate immediately on component mount/in-view when on mobile viewports. Tying the animation to screen-size checks ensures mobile users do not have to wait for the typing feed to finish to see the main bullet cards.

### 3. Compact Typography & Navigation Updates on Quote Page
- **Return Link Text**: Changed the link label at the top of the page in [page.tsx](file:///c:/Development/yq-digital-portfolio-main/app/quote/page.tsx) from `"← Return to dashboard"` to `"← Return to home"`.
- **Heading Description Sizing**: Reduced the font sizing for paragraph description texts directly underneath headings on mobile viewports:
  - Main heading description shrunk to `text-xs` on mobile (`text-sm` on desktop) with smaller margin `mt-2`.
  - Individual Spec Question headings (Steps 1, 2, 3, and 4) and the Project Brief Details form header description text shrunk from `text-xs` to `text-[11px]` on mobile viewports (`text-sm` on desktop).

### 4. Mobile-Specific Component Reordering (lgBreakpoint)
- **Hiding Info Badges**: Completely removed the standard grey `"Interactive Demo Workspace"` tooltip/indicator button on mobile viewports.
- **Top Selector Placement**: Moved the dropdown platform selector to the top of the device mockup on mobile. Users can now easily switch between platforms at the very beginning of the section.
- **In-Context Action Buttons**: Relocated the `"Launch Site"` and `"View Gallery"` buttons to render directly below the project description text within the details card. This puts the actions immediately in view of the project brief.
- **Layout Splitting**: Partitioned the layout into a `block lg:hidden` container (mobile flow) and a `hidden lg:block` container (desktop layout grid). Both share the same active project state variables (`activeProjectId`, `activeGallery`, etc.) ensuring flawless responsive synchronization.

### 5. High-Readability Mobile Dropdown Stacking
- **High z-index & Opaque Background**: Set the mobile selector dropdown wrapper container to `z-40` when open, and changed the options list container background to a solid, fully opaque `bg-zinc-950` with an outer border. This guarantees it layers cleanly over the laptop preview card underneath without any transparency overlap, making the dropdown options 100% readable.

### 6. Mockup Performance & Screenshot Fitting on Mobile
- **Mock Browser Window Chrome**: Added a mock browser header bar (featuring red/yellow/green OS window dots, and a centered domain URL address field) at the top of the mobile screenshot viewer layout, simulating macOS Safari.
- **Clean MacBook Status Bar**: Replaced the bottom bar with an ultra-compact status bar (height of just `14px`) to maximize the visible height of the screenshot preview. Displays a tiny system indicator dot on the left, and a digital clock time display (`17:59`) on the right to preserve the cohesive desktop mockup style.
- **Full-Bleed Height Zoom**: Removed the light Safari window bottom edge div and the `"macBook"` text. The screenshot is rendered inside the laptop mockup using `object-cover object-top`, zooming the image just enough to fill the entire remaining vertical space. The bottom of the preview image now sits directly against the bottom black MacBook status bar (`h-3.5 bg-zinc-950`), leaving no gaps or bars.
- **Mockup Performance**: On mobile viewports (widths < 640px), the interactive `iframe` has been replaced with a high-resolution static screenshot image (`<img />`) styled inside the laptop bezel mockup.
- **Seamless Loading fallbacks**: Predefined local screenshot asset fallbacks are automatically passed to ensure instant rendering.
- **Iframe Touch-Safety Fallback**: If no screenshot is available, the scaled iframe is rendered with `pointer-events-none select-none` to prevent scroll hijacking.

### 7. Interactive Gallery Controls (Tap-to-Toggle-UI)
- **Tap to Hide/Show UI**: Added support for toggleable controls inside the gallery screen capture overlay.
  - Tapping or clicking on the active screenshot image fades out all interface elements (the top close button/slide index indicator, and the previous/next navigation arrows) to support distraction-free full-screen viewing.
  - Tapping the screenshot again fades all UI controls back in immediately.
- **Auto-Reset on Open**: The controls automatically reset to visible (`showUI = true`) every time the gallery is opened.

### 8. Gallery Pagination Arrows Enabled on Mobile
- **Always-Visible Arrows**: Enabled the previous/next navigation arrows inside [GalleryOverlay.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/GalleryOverlay.tsx) on mobile viewports.
- **Responsive Sizing**: Styled the mobile arrows with tight padding (`p-2.5` instead of `p-4`), smaller icon graphics (`size={20}`), and positioned them closer to the screen edges (`left-3` and `right-3`). This allows users to easily tap and browse through the gallery screenshots of each case study without obstructing the view.

### 9. Web Design Quote Button Enablement
- **Get a Quote Button**: Restricted the `"Get a Quote"` button to only show on the **Bespoke Web Design** service card (on both desktop grid and mobile stack swipe views) linking to `/quote`.

### 10. Qualified Feature List Format
- **Colon-Prefixed Features**: Prepend `"Can include: "` to the front of the typewriter stream on both service cards to clarify they represent optional additions.

### 11. Mobile Spacing Tweaks on Services Section
- **Increased Top Gap**: Increased the `margin-top` of the swipeable stack to `mt-20` on mobile viewports and positioned the `"swipe to explore"` indicator higher (`-top-12`) to separate it cleanly from the `"Built for Growth."` heading in [ServicesSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/ServicesSection.tsx).
- **Reduced Bottom Gap**: Shrunk the space between the bottom of the card stack/indicators and the next section by changing the stack indicator `margin-top` to `mt-8` and reducing the section's padding to `pt-16 pb-8` on mobile viewports.

### 12. Landing Page Section Order Swap
- **Swapped Sections 2 & 3**: Swapped the render order of `BackgroundSection` and `WorkSection` in [BelowTheFold.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/BelowTheFold.tsx) so that the Case Studies showcase now renders directly after Services, and "About the Developer" follows Case Studies.
- **Section Prefixes Updated**:
  - Changed the Work section prefix in [WorkSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/WorkSection.tsx) from `03 // Selected Work` to `02 // Selected Work`.
  - Changed the Background section prefix in [BackgroundSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/BackgroundSection.tsx) from `02 // About the Developer` to `03 // About the Developer`.

### 13. Navbar Link Order Swap
- **Swapped Links**: Swapped the order of "About" and "Portfolio" in both [Navbar.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/Navbar.tsx) (desktop layout) and [MobileFlyoutMenu.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/MobileFlyoutMenu.tsx) (mobile menu) so that they mirror the updated layout order of the homepage sections.

### 14. Spacing Adjustments on Questions Section
- **Reduced Gaps on Mobile**:
  - Changed the `margin-bottom` class of the `"Have a question?"` heading in [QuestionsSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/QuestionsSection.tsx) on mobile viewports from `mb-4 sm:mb-8` to `mb-2 sm:mb-8` (and reduced heading padding-bottom to `pb-1`).
  - Reduced the `margin-bottom` class of the description paragraph on mobile viewports from `mb-16` to `mb-8 sm:mb-16`, pulling the contact card/email button closer to the text details.

### 15. Responsive Copy Splits
- **Case Studies Subheading Copy**: Split the description text under the "Case Studies" heading in [WorkSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/WorkSection.tsx) so mobile users see: *"Explore showcase mockups and detailed galleries of our custom-engineered web platforms."* (Since mobile displays static mockups and screenshots instead of active live iframes). Desktop users continue to see the original *"Explore live previews of our custom-engineered web platforms in real-time."* text.

### 16. Vertical Transition Gap Reductions
- **In Development & Questions Transition**:
  - Removed bottom padding on mobile for `LabsSection` in [LabsSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/LabsSection.tsx) by updating its padding classes from `py-16 md:py-24` to `pt-16 pb-0 md:py-24`.
  - Shrunk top padding on mobile for `QuestionsSection` in [QuestionsSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/QuestionsSection.tsx) by changing its padding classes from `py-28 md:py-40` to `pt-12 pb-28 md:py-40`. This seamlessly tightens the vertical transition gap between the two sections on mobile.

### 17. Floating Navbar Offset Tuning
- **Reduced Top Margin**: Tuned the absolute position of the floating header container in [Navbar.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/Navbar.tsx) from `top-3 md:top-6` to `top-2 md:top-4`. This places the floating navbar slightly closer to the upper screen boundary, maximizing vertical viewport space.

### 18. Desktop Workspace Iframe Fix
- **Viewport-Based Layout Mode**: Fixed a bug where the desktop device preview in [InteractiveWorkspace.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/InteractiveWorkspace.tsx) erroneously showed static screenshot placeholders instead of the active `iframe` previews. Replaced local container client width checks (`bezelWidth < 640`, which can resolve to `0` initially due to Next.js CSS layout deferrals like `contentVisibility: 'auto'`) with direct window width checks (`window.innerWidth < 768`) bound to a resize hook.

### 19. Security Enhancements
- **Email Contact Form Sanitization**: Implemented a robust HTML character escaping helper (`escapeHtml`) in the contact server action [sendEmail.ts](file:///c:/Development/yq-digital-portfolio-main/app/actions/sendEmail.ts). This escapes characters (`&`, `<`, `>`, `"`, `'`) for all intake fields (Name, Email, Business, Goal, and Details) before generating the Resend email template, preventing HTML or script injection attacks in notification emails.

### 20. Global Ambient Background Gradients
- **GlobalDecorations Component**: Extracted the cursor-following interactive ambient light orbs and background gradients from `HeroSection` into a reusable client component: [GlobalDecorations.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/GlobalDecorations.tsx). 
- **Fixed Viewport Positioning**: Changed positioning of the decorations wrapper container from `absolute` to `fixed` so that the ambient glow and cursor-following micro-interactions follow the user throughout the scroll depth of the entire site, rather than being clipped to the landing fold.
- **Root Layout Mounting**: Rendered the `<GlobalDecorations />` component statically inside the root HTML body in [layout.tsx](file:///c:/Development/yq-digital-portfolio-main/app/layout.tsx). Tying DOM-dependent values to React lifecycle hooks makes the component fully server-safe during SSR rendering.
- **Local Cleanup**: Cleaned up Hero-specific imports and local calls in [HeroSection.tsx](file:///c:/Development/yq-digital-portfolio-main/src/components/HeroSection.tsx) while preserving the hero-specific scroll down indicator badge.

### 21. Build Validation
- Verified all code compiled cleanly using `npx tsc --noEmit`.
