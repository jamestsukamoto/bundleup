## Todo list:

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
[x] Create user-friendly address input bar
  - Investigate Google Maps address autofill 
[] Implement Redis Cache 
[] Create/find good animated loading gif
[] Create more attractive "forecast" display for rain/no rain
[] Implement request rate-limiting middleware
[] Implement responsive design/usability
[] Consider & optimize UX choices
[] Upload necessary files (loading git, etc) to S3/Cloudfront
[] Implement proper error handling of sync & non-sync code

[] Build in better error handling
[] Deploy

### Stretch:
[] Implement server-side rendering
[] Implement more advanced data retrieval such as temperature, precipitation percentage, etc.

### Data from Server: 
- Current high temp
- Current low temp
- Start address
- End address
- Temp & Summary for each step
