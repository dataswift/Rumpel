# v1.3 (2017-02-07)

### Features
* Support for Notables sharing on Twitter
* Incorporated Twitter's tweets in the Social Feed
* Automatic app refreshes after periods of inactivity
* Added support for direct links to any Rumpel page (support for direct links allows page to be refreshed w/o redirecting the user back to the dashboard)

### Updates/improvements
* Improved User Interface on Notables
* Improved location data acquisition experience
* Improved meta tags for more detailed rendering on search engines and social media
* Added ability to filter Social Feed by source
* Added ability to "choose a date" for location data

### Bug Fixes
* Fixed left-side menu bar to correctly highlight active page
* Corrected bulleted lists rendering in Notables
* Many more small fixes

### DEPRECATIONS
* As a result of direct links implementation, the general authentication route "/users/authenticate" is being deprecated.
Please link directly to the required resource providing access token as a query parameter, when possible.
Current version will support the old behaviour via internal redirects. However, support will be phased out in the future releases.
* Related to the change above, it is no longer possible to pass access token as a path parameter such as "/users/authenticate/{{accessToken}}".
Please use query parameter "token" instead.


# v1.2 (2016-12-22)

### Features
* Adds the choice to share forever, or for 1/7/14/30 days
* Added informative verification messages for selected Notables actions

### Updates
* Improved notable sharing efficiency, no need to wait up to 30 minutes for notable to be posted on MarketSquare or Facebook
* Streamlined notables setup process
* Optimised code re-use among HAT data services
* Added custom modal implementation for better extensibility
* Rumpel now ensures creation of notables and profile data tables upon first login

### Bug Fixes
* Other UI tweaks
* Minor bug fixes


# v1.1 Notables (2016-11-17)

### Features

* Notables service - brand new interface components to support interaction with Notables. View, create, edit and share your notables within the HAT ecosystem and third party platforms
* Fully reworked data mashups interface
* Step-by-step introduction guide to the main Rumpel features
* Adds notifications centre for the important HATDeX team messages and social activity reports

### Updates

* Interface updates to social, photos and locations views with the ability to filter and sort data
* Location aware weather forecast
* Updates the data debit confirmation flow
* Improves data caching, uses PouchDB for photos
* General bugfixes and UI tweaks
* Compartmentalises codebase using Angular's NgModule, changes folder structure accordingly

# v1.0 Public beta (2016-07-17)

### Features

* Convenient all-in-one-place dashboard to manage the most recent personal HAT data
* Individual and unique data views for social posts, calendar data and photos
* Data Mashup View used for mixing data points from different data verticals
* HAT profile page creation tool
* HAT data debit management
* Support for HAT authentication process, token validation
* Integration with MarketSquare data offers API
* Integration with MarketSquare data plugs API
* Integration with weather API
* Static asset management, placeholders for future data categories
