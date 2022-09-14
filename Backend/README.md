# Airline-Reservation-System-Backend-API

## Deployment Guide

### 1. Instal Dependencies
```
npm i
```

### 2. Set Environment Variables


API_JWT_PRIVATE_KEY <br />
API_DB <br />
API_PORT <br />
API_REQUIRES_AUTH <br />
API_MAX_USERS <br />
API_TOKEN_EXPIRY <br />
API_EMAIL <br />
API_MAIL_PASSWORD <br />
API_CLIENT_URL <br />


#### Example (For windows)
```
set API_JWT_PRIVATE_KEY=abc12345
set API_DB=mongodb://localhost/airline
set API_PORT=5000
set API_REQUIRES_AUTH=true
set API_MAX_USERS=1000
```

### 3. Run (in development mode)
```
npm run dev
```

### 4. Run (in production mode)
```
npm run start
``