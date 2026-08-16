# Andrew Heeney — Film | Content | Production

Portfolio website for Andrew Heeney, videographer — **Ireland's Fastest Turnaround**.
Dark cinematic two-page static site: no build step, no dependencies, just upload and go.

## Files

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, showreel, projects, services, about, Instagram, contact |
| `projects.html` | All projects with category filters |
| `404.html` | Not-found page (GitHub Pages picks this up automatically) |
| `styles.css` | Shared stylesheet |
| `logo.png`, `favicon.png`, `apple-touch-icon.png`, `og-image.jpg` | Brand assets |
| `about.jpg` | About-me photo |
| `hyde-and-seek.mp4`, `stephen-wilson-loop.mp4`, `warewolf-ad.mp4`, `warewolf-poster.jpg` | Local video assets |
| `robots.txt`, `sitemap.xml` | Search engine files |

## Deploy on GitHub Pages

1. Create a repository (e.g. `andrew-heeney-website`) and push all files to the root of the `main` branch.
2. Repository **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.
4. Custom domain: in **Settings → Pages → Custom domain** enter `www.andrewheeneymedia.com`, then at your domain registrar add a `CNAME` record pointing `www` to `<username>.github.io`. Enable **Enforce HTTPS** once it verifies.

## IMPORTANT — after deploying

The SEO tags assume the final domain is `https://www.andrewheeneymedia.com/`. If the site ends up at a
different address, find-and-replace `https://www.andrewheeneymedia.com/` in:

- `index.html` (canonical, og:url, og:image, JSON-LD)
- `projects.html` (canonical, og:url, og:image, JSON-LD)
- `robots.txt` and `sitemap.xml`

Then:

1. **Google Search Console** — add the site (Domain property), submit `sitemap.xml`.
2. **Bing Webmaster Tools** — import from Search Console (one click).
3. **Google Business Profile** — create one for "Andrew Heeney — Videographer" (Dublin, service-area business). This is the single biggest local-SEO lever for "videographer Dublin/Ireland" searches.
4. Test rich results: https://search.google.com/test/rich-results
5. Test social cards: https://www.opengraph.xyz — should show the black/logo OG image.

## Still placeholder

- Showreel (the "Watch showreel" buttons currently play the Hyde & Seek reel)
- "Trusted by" client names in the marquee
- LinkedIn / YouTube / TikTok footer links (currently generic)

## Contact form

Wired to Formspree endpoint `https://formspree.io/f/xgawlzol` → emails aheeney7@gmail.com.
Submit once after deploying and confirm the first-submission email from Formspree.
