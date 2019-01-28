# BundleUp
#### The Weather App for Motorcycle Commuters
<p>Powered by Google and Dark Sky APIs</p>

***

## Change Log:

### Phase 1 - MVP: 
#### Done: 
- [x] Create React environment & server from scratch
- [x] Create basic webpage that accepts origin & destination coordinates
- [x] Request coordinate list from Maps API with given coordinates
- [x] Implement server function to extrapolate missing/delete extraneous coordinates
- [x] Implement server function to retrieve weather at each coordinate 
- [x] Implement server funciton to determine conclusion of rain/no rain based on all weather
- [x] Return data to client
- [x] Implement bare-bones, text-only client rendering of retrieved content
- [x] Implement basic error handling
- [x] Build for production & deploy MVP on AWS

#### To Do:

***

### Phase 2:  
#### Done:
- [x] Create user-friendly address input bar (Google Autocomplete API)
- [x] Address basic security vulnerabilities with Helmet
- [x] Rate-limit client requests in Express
- [x] Prevent API request with empty inputs
- [x] Refactor server processing functions to reduce time complexity 
  - _(Implementation of Linked List versus Array reduced server processing from ~850ms to ~20ms)
- [x] Forward requests through NGINX reverse proxy on AWS
- [x] Implements CSS Modules for locally-scoped styles
- [x] Implement footer with attributions & link to repo for contributions
- [x] Create graphical "forecast" display for weather summary
- [x] Prompt users to input addresses to get started upon first visit
- [x] Implement conditional-rendering for color nuggets of 'steps' in the Journey Summary
- [x] Implement proper error handling of sync & non-sync code
- [x] Implement mobile-first responsive design
- [x] Upload staic files (loading gif, etc) to S3/Cloudfront for faster load times

#### To Do: 
- [ ] Create more error handling with more accurate error reporting
- [ ] Implement proper loading UX upon request
- [ ] Implement browser geolocation
- [ ] Dynamically adjust theme colors based on time of day, average temp, and forecast
- [ ] Improve UX when handling errors
- [ ] Review code & adjust for modularity and best-practices for scalability & maintainability

***

### Phase 3:
#### Done: 

#### To Do: 
- [ ] Store results of 3rd party API calls for future session filtering
- [ ] Render initial "dumb" page on server for faster first contentful paint
- [ ] Lightly animate various component mounting for a subtle, yet slick UX

***

### Phase 4: 
#### Done: 

#### To Do: 
- [ ] Allow for user login to save home & work locations for fast access
- [ ] Refactor in React Native for iOS & Android