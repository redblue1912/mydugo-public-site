# MyDugo public website

A static, mobile-friendly information website. It does not sign users in or collect medical data. It is separate from the Flutter donor app and the existing admin deployment.

## Preview locally

From the repository root:

```powershell
python -m http.server 8080 --bind 127.0.0.1 --directory public-site
```

Open `http://127.0.0.1:8080/`.

## Before publishing

1. The "Inside MyDugo" section has four HTML/CSS phone illustrations of confirmed app flows. Each is labeled as an illustrative interface, not an app screenshot. If owner-approved screenshots become available, replace the illustrations with accurate captions.
2. Publish and link an approved MyDugo **app** privacy policy. `privacy.html` currently covers only this public website and says the app policy is pending.
3. Build the intended Android **release** APK. Verify its version and build number, date, byte size, and SHA-256 checksum. Upload that exact APK to a public HTTPS URL and confirm the URL downloads the same file. Update the hero and download section in `index.html` only after this check: change the hero link if needed, replace the disabled download button with a direct APK link, and add verified metadata next to it. Until then, keep “Download coming soon.”
4. Recheck the chapter’s address and phone number against the [official Philippine Red Cross blood-service listing](https://redcross.org.ph/give-blood/) before sharing widely.

The current repository contains local release APKs, but no verified public HTTPS APK URL. This site intentionally does not link to a local APK or show unverified release metadata.

## Deploy to Render

The live site is [mydugo-public-site.onrender.com](https://mydugo-public-site.onrender.com). Render publishes the separate public repository [`redblue1912/mydugo-public-site`](https://github.com/redblue1912/mydugo-public-site), which contains only the website files at its root. The full app repository stays private and the admin-side Vercel project stays separate.

1. Copy only the reviewed contents of `public-site/` into the separate public-site repository. Review the staged file list before committing; do not copy `.env` files, APKs, app source, or private data.
2. Push the public-site repository's `main` branch. In the Render Static Site service, deploy that commit if it does not start automatically. Its build command is `true` and its publish directory is `./`.
3. Check the live homepage, `/privacy.html`, stylesheet, logo, phone-width layout, and browser console. Keep the Android download in its clearly labeled coming-soon state until an approved APK is hosted at a verified HTTPS address.

The Philippine Red Cross descriptions link to official resources. The supplied MyDugo logo and Manrope font are copied from this repository into `assets/`; the Manrope license is included there.

## Editorial image credits

The two local photographs are generic illustrations of humanitarian work, not photographs of the Albay–Legaspi City Chapter. The owner confirmed authorization for MyDugo to describe its chapter association; the site does not reuse an unprovided Red Cross emblem.

- `assets/donation-center.jpg`: [Rahul Sapra / Pexels](https://www.pexels.com/photo/man-lying-on-a-gurney-12820069/).
- `assets/volunteers.jpg`: [Gustavo Fring / Pexels](https://www.pexels.com/photo/volunteers-packing-up-goods-7156179/).

Pexels marks these photos free to use under its [photo license](https://www.pexels.com/license/). Their credits and illustrative status also appear beside the images on the page. Blood-transfusion context links to the [World Health Organization](https://www.who.int/health-topics/blood-transfusion-safety/); the [Philippine Red Cross](https://redcross.org.ph/about-us/) is the source for its services and principles.

## Checks

Run `python -m unittest scripts.test_public_site -v` from the repository root for the page's navigation, image provenance, and release-state contracts. Run `node --check public-site/site.js` for script syntax, then check layout, keyboard interactions, and console output in a browser at desktop and phone widths.
