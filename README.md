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
3. For each Android update, run `flutter pub get` in a fresh worktree so Android's plugin registrant is generated, then build with the same private release signing key. Smoke-test that the installed APK reaches the first app screen beyond the native splash. Verify its version, size, signature, and SHA-256 checksum; publish it as a GitHub Release asset; download it again to verify its hash. Only then update the hero and download section. Never copy the keystore or `key.properties` into this public repository.
4. Recheck the chapter’s address and phone number against the [official Philippine Red Cross blood-service listing](https://redcross.org.ph/give-blood/) before sharing widely.

The current public Android preview is [version 1.1.0 (build 18)](https://github.com/redblue1912/mydugo-public-site/releases/tag/v1.1.0-build18), published October 23, 2026. Its APK is 63,709,247 bytes, with SHA-256 `24e7568a23be1f88ec7a2511c216c16d19a357a90516b5293dfec857859f1676`. This build adds chapter-reviewed conventional and apheresis donation paths and a two-week earliest apheresis review date that chapter staff must confirm. Earlier test APKs were signed with Android's debug key and cannot be updated in place with this release signature.

Build 9 is the full MyDugo app. In **Find Blood Help**, donors, hospitals and volunteers can open **Albay–Legazpi chapter contact** for the real published PRC address and number. Dialer, address map search and source-page links are included; call to confirm current services, hours and the entrance. The chapter contact remains accessible if the live directory is unavailable or empty. It is not a standalone locator or a fictional-facility demo, and no draft facility was marked verified or published.

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

The homepage hero uses `assets/red-cross-building-concept.png`, a generated building concept with a red cross emblem. It does not show the Albay–Legaspi City Chapter's actual building. The two other local photographs are illustrative editorial images, not photographs of chapter activity. The owner confirmed authorization for MyDugo to describe its chapter association and requested the red cross building concept.

- `assets/community-aid.jpg`: [Julia M Cameron / Pexels](https://www.pexels.com/photo/volunteers-preparing-donations-6995212/).
- `assets/volunteers.jpg`: [Gustavo Fring / Pexels](https://www.pexels.com/photo/volunteers-packing-up-goods-7156179/).

Pexels marks these photos free to use under its [photo license](https://www.pexels.com/license/). Their credits and illustrative status also appear beside the images on the page. Blood-transfusion context links to the [World Health Organization](https://www.who.int/health-topics/blood-transfusion-safety/); the [Philippine Red Cross](https://redcross.org.ph/about-us/) is the source for its services and principles.

## Checks

Run `python -m unittest scripts.test_public_site -v` from the repository root for the page's navigation, image provenance, and release-state contracts. Run `node --check public-site/site.js` for script syntax, then check layout, keyboard interactions, and console output in a browser at desktop and phone widths.

Build 10 adds saved System/Light/Dark appearance, readable role screens, and private Help & Support conversations with chapter staff. The support database and admin/API have been deployed. Authenticated multi-role acceptance and real device email/push delivery remain separate checks.
