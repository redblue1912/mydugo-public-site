# MyDugo public website

A static, mobile-friendly information website. It does not sign users in or collect medical data. It is separate from the Flutter donor app and the existing admin deployment.

## Preview locally

From the repository root:

```powershell
python -m http.server 8080 --bind 127.0.0.1 --directory public-site
```

Open `http://127.0.0.1:8080/`.

## Release maintenance and outstanding items

1. The app showcase uses three screenshots rendered from actual Flutter widgets with local demo data. The donor capture uses its full preparation page; the hospital and volunteer captures combine existing feature widgets in demo page layouts. They are not captures of signed-in production accounts or live inventory. Keep the on-page demo-data disclosure when replacing them.
   The five images in the “Why it matters” cards are AI-generated editorial illustrations. They are labeled on the page and do not document chapter activity.
2. Publish and link an approved MyDugo **app** privacy policy before describing this preview as a full public launch. `privacy.html` covers only this public website, and the current app policy remains pending.
3. For each Android update, build with the same private release signing key. Verify the APK version, size, signature, and SHA-256 checksum; publish it as a GitHub Release asset; download it again to verify its hash. Only then update the hero and download section. Never copy the keystore or `key.properties` into this public repository.
4. Recheck the chapter’s address and phone number against the [official Philippine Red Cross blood-service listing](https://redcross.org.ph/give-blood/) before sharing widely.

The current public Android preview is [version 1.1.0 (build 8)](https://github.com/redblue1912/mydugo-public-site/releases/tag/v1.1.0-build8), built October 8, 2026. Its APK is 63,298,671 bytes, with SHA-256 `6882ec3f58514b9373946655736d45e1ed76cedf9c958a655ddc61168fa2ff04`. Earlier test APKs were signed with Android's debug key and cannot be updated in place with this new release signature.

## App screen captures

From the full private repository, regenerate the three public image files with:

```powershell
flutter test test/public_site_capture_test.dart --no-pub --dart-define=EXPORT_PUBLIC_SCREENS=true
```

The test uses the actual `AppointmentPreparationPage`, `HospitalInventoryAvailability`, `VolunteerImpactCard`, and `VolunteerDestination` Flutter widgets. Its demo values are hard-coded locally and never query Firebase or Supabase. Review the rendered images before copying them to the public repository. The public website labels them as widget previews with demo data.

## Deploy to Render

The live site is [mydugo-public-site.onrender.com](https://mydugo-public-site.onrender.com). Render publishes the separate public repository [`redblue1912/mydugo-public-site`](https://github.com/redblue1912/mydugo-public-site), which contains only the website files at its root. The full app repository stays private and the admin-side Vercel project stays separate.

1. Copy only the reviewed contents of `public-site/` into the separate public-site repository. Review the staged file list before committing; do not copy `.env` files, APKs, app source, or private data.
2. Push the public-site repository's `main` branch. In the Render Static Site service, deploy that commit if it does not start automatically. Its build command is `true` and its publish directory is `./`.
3. Check the live homepage, `/privacy.html`, stylesheet, logo, phone-width layout, browser console, and Android download URL. Confirm the live metadata matches the published APK asset.

The Philippine Red Cross descriptions link to official resources. The supplied MyDugo logo and Manrope font are copied from this repository into `assets/`; the Manrope license is included there.

## Editorial image credits

The three local photographs are generic illustrations of humanitarian work, not photographs of the Albay–Legaspi City Chapter. The owner confirmed authorization for MyDugo to describe its chapter association; the site does not reuse an unprovided Red Cross emblem.

- `assets/donation-center.jpg`: [Rahul Sapra / Pexels](https://www.pexels.com/photo/man-lying-on-a-gurney-12820069/).
- `assets/community-aid.jpg`: [Julia M Cameron / Pexels](https://www.pexels.com/photo/volunteers-preparing-donations-6995212/).
- `assets/volunteers.jpg`: [Gustavo Fring / Pexels](https://www.pexels.com/photo/volunteers-packing-up-goods-7156179/).

Pexels marks these photos free to use under its [photo license](https://www.pexels.com/license/). Their credits and illustrative status also appear beside the images on the page. Blood-transfusion context links to the [World Health Organization](https://www.who.int/health-topics/blood-transfusion-safety/); the [Philippine Red Cross](https://redcross.org.ph/about-us/) is the source for its services and principles.

## Checks

Run `python -m unittest scripts.test_public_site -v` from the repository root for the page's navigation, image provenance, and release-state contracts. Run `node --check public-site/site.js` for script syntax, then check layout, keyboard interactions, and console output in a browser at desktop and phone widths.
