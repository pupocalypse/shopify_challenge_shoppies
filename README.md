### Summer 2021 Web Dev Internship Application

An app for submission per the Front-End Web Dev Internship challenge, a site to allow a user to search for and nominate five movies from the OMDB API. Uses React and Sass. Deployed on GitHub Pages.

_This challenge was originally submitted for the Winter 2021 internship, and the functionality is largely similar with some modifications._

#### Some features/functionality that were improved for this submission:

- Migrated to React Hooks (including useState, useEffect, and useCallback)
- Nominations column is sticky in tablet and desktop view
- Included a scroll-to-top button
- Added an animated CSS loader for the search bar for more visual indication of the search update process
- The cheeky movie suggestion message printed on the Banner component is updated to ensure it doesn't print something that hasn't in fact already been nominated

#### Some concepts I wish to improve upon with the opportunity for some guidance:

- Cleaner handling of setting multiple state variables at once without causing several re-renders
- Cleaner tree structure amidst complex functionality (eg. the top-level App component is responsible for most of the functionality, leaving the file at just over 200 lines of code)
- Better handling of a 'loading' status variable (eg. it would be ideal to set this to false once the results have not only been retrieved, but fully rendered too)
