## Change Log:

### MVP: 
[x] Create basic webpage that accepts origin & destination coordinates
[x] Ping Maps API with given coordinates 
[x] Implement function to extrapolate missing/delete extraneous coordinates
[x] Implement function to get weather at each coordinate 
[x] Implement funciton to determine conclusion of rain/no rain based on all weather
[x] Implement basic 'loading' spinner while API requests are going through
[x] Test MVP functionality
[] Write tests for core functionality

### Phase 2:  
[x] Implements CSS Modules
[x] Create user-friendly address input bar
[x] Create more attractive "forecast" display for rain/no rain
[x] Implement footer
[] Implement form validation
[] Implement pre-submission prompt
[] Implement request rate-limiting middleware
[] Implement conditional-rendering for colors in Journey Summary
[] Create/find good animated loading gif
[] Implement proper error handling of sync & non-sync code

[] Implement responsive design/usability
[] Consider & optimize UX choices
[x] Upload staic files (loading gif, etc) to S3/Cloudfront

[] Build in better error handling
[] Deploy

### Phase 3:
[] Implement Redis Cache to store results
[] Implement server-side rendering
[] Implement more advanced data retrieval such as temperature, precipitation percentage, etc.

### Data from Server: 
- Current high temp
- Current low temp
- Start address
- End address
- Temp & Summary for each step
