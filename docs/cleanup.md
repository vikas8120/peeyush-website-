# Structure cleanup

## Analysis

Before cleanup, SHA-256 hashes were recorded for every original project file outside installed dependencies. The analysis also checked HTML asset references, backend imports, package scripts, configuration loading, and archive metadata headers.

- `__MACOSX/` contained 115 AppleDouble metadata files. Every file had a `._` filename and an AppleDouble header. It was an archive metadata mirror, not a second application.
- Six `.DS_Store` files contained Finder metadata. `frontend/images/` contained only one of these files and had no application assets.
- `frontend/style.css` and `frontend/css/style.css` have different contents. Likewise, `frontend/script.js` and `frontend/js/script.js` are different files. Matching filenames do not make them duplicates.
- The main page uses `frontend/style.css` and `frontend/script.js`, along with files under `css/`, `js/`, `data/`, and `assets/`. UI source and asset paths are preserved.
- `frontend/assets/logo.png` and `frontend/assets/logo_transparent_white.png` are byte-identical. Both are retained to honor the request to leave UI files untouched.
- `backend/models/Create Account` was a text capture of registration controls, not an imported model. It is preserved as `docs/archive/create-account-notes.txt`.
- `log.txt` described an older SQLite startup, whereas the current application uses MongoDB. It is preserved as `docs/archive/legacy-startup-log.txt`.
- Root and backend `node_modules/` directories belong to separate npm packages. They are not redundant application folders.
- Root `.env.local` and `backend/.env` are preserved. The current backend loads the latter through the npm scripts.

## Cleanup

- Removed the archive metadata mirror and Finder metadata files.
- Removed the empty, metadata-only `frontend/images/` directory.
- Moved historical notes and the legacy startup log to `docs/archive/` without changing their contents.
- Added a project README, ignore rules, and an uploads directory placeholder.
- Preserved all frontend HTML, CSS, JavaScript, images, and other assets without editing their contents or relative paths.
- Preserved backend JavaScript, both package manifests, both lockfiles, and local configuration.

The project remains in `Gunjan Digital Studio/` inside the workspace. The user requested that the working project and running process remain untouched, so its location and npm package layout were preserved.

## Verification

- All 93 frontend source and asset files match their original SHA-256 hashes.
- All 120 original non-metadata project files are preserved byte-for-byte, including the two archived text files.
- All 59 backend `require()` references resolve from their existing locations.
- The archive metadata mirror, six Finder metadata files, and metadata-only images folder are gone.
- No running server was stopped or restarted. Backend behavior was not exercised against the database or external services.
