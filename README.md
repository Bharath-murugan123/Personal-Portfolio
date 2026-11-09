# Bharath Murugan — Personal Portfolio

A responsive, single-page personal portfolio for Bharath Murugan, built with **HTML5, CSS3 and vanilla JavaScript**. It is a static site: no build step, backend, database or framework is required.

## Features

- Responsive layout for desktop, tablet and mobile
- Sticky navigation with mobile menu and active-section highlighting
- Light/dark theme toggle saved in `localStorage`
- Scroll reveal effects using `IntersectionObserver`
- Reduced-motion preference support
- Project, skills, experience, education and certification sections
- Contact form with client-side validation and a `mailto:` handoff
- Back-to-top control

## Technology stack

- HTML5
- CSS3 (Grid, Flexbox, custom properties and media queries)
- Vanilla JavaScript (DOM APIs, `IntersectionObserver`, `localStorage`)
- Google Fonts: DM Sans, Manrope and DM Mono (loaded online; system fallbacks are provided)

## Folder structure

```text
Personal-Portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
├── screenshots/
│   └── README.md
└── assets/
    ├── icons/
    └── images/
```

## Run locally

1. Extract the project ZIP.
2. Open the `Personal-Portfolio` folder.
3. Double-click `index.html` to open it in a modern browser.
4. For local development, you may also use VS Code's Live Server extension. No package installation or build command is needed.

The Google Fonts will load when internet access is available. The site itself does not require an internet connection to render its local HTML, CSS and JavaScript.

## Personalize the portfolio

- Update text, project details and links in `index.html`.
- Adjust colors, spacing and responsive breakpoints in `style.css` (`:root` variables are near the top).
- Update interactions in `script.js`.
- Add your own approved project screenshots to `assets/images/` and reference them from the relevant project card.
- Add portfolio screenshots to `screenshots/`.
- If your email or phone number changes, update the contact links and the `mailto:` recipient in `index.html` and `script.js`.

### Content accuracy notes

Personal, academic, internship, skill and certification information was taken from the supplied resume and project brief. The resume lists the academic HSC score as 89.1% in Education and 89.16% in Achievements; the portfolio preserves both source entries in their respective contexts. The Space Invader repository was listed in the brief, but its implementation details could not be independently inspected during preparation, so no language, framework or feature claims are made for it. The Real-Time Stock Tracker is included because it appears in the resume.

The contact form validates the fields in the browser and opens the visitor's default email application with a prefilled draft. It does **not** send email automatically, store submissions, or connect to a backend. A backend or form service would be needed for direct message delivery.

## Deploy to Netlify

### Option A — deploy by drag and drop

1. Sign in to [Netlify](https://www.netlify.com/).
2. Choose **Add new site** / **Deploy manually** (wording may vary).
3. Drag the extracted `Personal-Portfolio` folder into the deployment area.
4. Netlify publishes the static site. The folder's root contains `index.html`, so no build command or publish-directory adjustment is required.

### Option B — deploy from GitHub

1. Sign in to [GitHub](https://github.com/) and create a new repository, for example `bharath-personal-portfolio`.
2. Upload the contents of this `Personal-Portfolio` folder to the repository root, or push them using Git:

   ```bash
   git init
   git add .
   git commit -m "Add personal portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/bharath-personal-portfolio.git
   git push -u origin main
   ```

3. In Netlify, choose **Add new site** → **Import an existing project** and connect GitHub.
4. Select the portfolio repository.
5. Leave the build command empty and set the publish directory to `.` (the repository root), if Netlify asks.
6. Deploy. Netlify will provide a public URL.

### Update after deployment

Edit the relevant files locally, then commit and push the changes to the connected GitHub repository. Netlify automatically creates a new deployment. For a drag-and-drop deployment, upload the updated folder again.

## GitHub profile

[github.com/Bharath-murugan123](https://github.com/Bharath-murugan123)
