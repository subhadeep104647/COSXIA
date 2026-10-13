DEBUGXIA - FIXED FILES

What was fixed without changing the existing UI:
1. Restored src/icons/Logo.jsx and src/icons/Logo1.jsx.
2. Removed unused imports pointing to missing pages (these imports were not used in the UI).
3. Added react-icons and react-router-dom to package.json dependencies.

IMPORTANT:
The uploaded project did not contain react-icons in node_modules, so install dependencies after replacing the files:

    cd E:\Nova\DEBUGXIA
    npm install
    npm run dev

If Vite is already running, stop it with Ctrl+C before npm install, then run npm run dev again.

No UI classes/layout/design were changed.
