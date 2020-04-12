# PotterAPI

### Prerequisites
1. Installed [NodeJS](https://nodejs.org/en/)

### Installation

1. Open terminal and run following commands
```
git clone https://github.com/skarbala/PotterAPI.git
cd PotterAPI
npm install
```

2. Run the API using
```
npm start
```

#### ✅ You should see following message
 > Harry Potter App listening on port 3000!

## Documentation

#### Base url
All routes needs to be send to base url `http://localhost:3000`

#### Response type
Default response format is `application/json`

### Spells service
#### Authentication
No authentication needed
#### Available endpoints
``` GET /spells ``` 					returns list spells

``` GET /spells/{id} ``` 			returns specific spell. 

``` DELETE /spells/{id} ``` 	deletes spell

```POST /spells```	adds new spell
