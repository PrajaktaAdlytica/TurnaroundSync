# Hostinger static deployment

This React/Vite site runs as static HTML, CSS and JavaScript on regular Hostinger PHP/HTML hosting. PHP and Node.js are not needed at runtime. A regular hosting website slot is required; a purchased domain alone is insufficient. Exhausting Node.js web-app slots does not necessarily exhaust ordinary website slots.

## Branches
- `main`: editable source, assets, brand kit, QA captures and documentation.
- `hostinger`: compiled website with index.html and .htaccess at the root. Select THIS branch in Hostinger.
- GitHub Actions builds main, runs four packaging tests and updates hostinger after each push. Check the Actions tab for success before deploying.

## Connect GitHub
1. hPanel → Websites → Add/Create website → Custom PHP/HTML website (not Node.js/Web App). Choose your purchased domain.
2. Open its Dashboard → Advanced → Git → Connect with GitHub. Grant access to this repository and select `PrajaktaAdlytica/TurnaroundSync`.
3. Select branch `hostinger`, target/deploy directory `public_html`, then Deploy. Back up any existing website before replacing it. The finished location must be public_html/index.html.
4. Enable auto-deployment if offered. Future main pushes build hostinger; Hostinger deploys the built branch. No npm/build/start command is needed on Hostinger.
5. If your hPanel has the older Git interface: use the repository HTTPS URL for public repos, branch hostinger, and leave its installation-path field blank to target public_html. Its first deployment directory must be empty. Private repos need the Hostinger public SSH key added as a GitHub deploy key and the SSH repository URL. Its Auto Deployment screen supplies a webhook to add in GitHub repository Settings → Webhooks (push events). Do not publish webhook secrets.
6. Follow hPanel's domain connection status. If DNS is already pointing to this hosting account, no DNS changes are needed. Otherwise use the nameservers/records shown by Hostinger; preserve existing email DNS. Activate/check SSL, then test HTTPS.
7. Open and refresh `/products/ramp-desk`, `/platform`, `/shadow-trial`, and `/demo/`. The included .htaccess provides the SPA route fallback.

## ZIP alternative
Upload the supplied `turnaroundsync-hostinger.zip` through File Manager into the site's public_html and extract it there. index.html, assets/, images/, brand/ and .htaccess belong directly inside public_html, not a nested dist/client folder. Show hidden files to confirm .htaccess. Remove the uploaded ZIP after extraction. Back up previous content first.

To regenerate the ZIP: run npm ci and npm run build; zip the CONTENTS of dist/client including .htaccess. Do not upload node_modules, src, worker or dist/server.

## Limits of this release
Forms and sign-in are concept previews, not connected services. Trial/contact information is not delivered to an inbox. Aviation data is synthetic and review actions are local. The Apache/LiteSpeed .htaccess must be verified on the actual hosting account; local Vite testing does not execute Apache rules. Hostinger connection, domain DNS and live SSL have not been performed from this workspace.

Official documentation checked 2026-10-28:
- https://www.hostinger.com/support/1583214-how-to-add-a-website-in-hostinger/
- https://docs.hostinger.com/websites/git
- https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/
- https://www.hostinger.com/support/1869114-how-to-upload-backups-with-file-manager-in-hostinger/
