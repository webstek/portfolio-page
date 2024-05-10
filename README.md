# portfolio-page
My portfolio website, built with three.js.


## Editing
For editing, use npm to install threejs and vite from a terminal in the project directory.
```
npm install --save three     # three.js
npm install --save-dev vite  # vite
```
View the website for development purposes with vite by simply calling `npx vite` from a terminal. The production build of the site can be previewed using the npm script `local-test`. 
```
npm run local-test
```

## Hosting
The site is hosted on CloudFlare, running the `build` script every time a change is pushed to the main branch.