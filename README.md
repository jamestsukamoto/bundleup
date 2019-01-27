# BundleUp
#### The Weather App for Motorcycle Commuters
<p>Powered by Google and Dark Sky APIs</p>

***

## Change Log:

### Phase 1 - MVP: 
- [x] Create basic webpage that accepts origin & destination coordinates
- [x] Ping Maps API with given coordinates 
- [x] Implement function to extrapolate missing/delete extraneous coordinates
- [x] Implement function to retrieve weather at each coordinate 
- [x] Implement funciton to determine conclusion of rain/no rain based on all weather
- [x] Test MVP functionality

### Phase 2:  

- [x] Implements CSS Modules
- [x] Create user-friendly address input bar (Google Autocomplete API)
- [x] Create more attractive "forecast" display for rain/no rain
- [x] Implement footer
- [] Implement form validation
- [x] Address security vulnerabilities with Helmet
- [x] Implement request rate-limiting middleware
- [x] Implement pre-submission prompt
- [x] Implement conditional-rendering for colors of 'steps' in the Journey Summary
- [] Implement proper loading UX
- [x] Implement proper error handling of sync & non-sync code

- [] Implement geolocation
- [x] Implement mobile-first responsive design
- [x] Upload staic files (loading gif, etc) to S3/Cloudfront

- [x] Deploy to AWS

### Phase 3:
- [] Implement Redis Cache to store results
- [] Implement server-side rendering
