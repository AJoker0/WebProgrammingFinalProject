# Paradise Hotel

Paradise Hotel is a React frontend for a hotel booking platform. It connects to the provided backend API and gives guests and administrators a clean, responsive interface for browsing hotels, checking room availability, making reservations, and managing hotel data.

## What this app does

- Guest registration and login
- Room search by dates, guest count, hotel name, city, rating, parking, and wellness filters
- Reservation creation and cancellation
- Personal reservations area for signed-in users
- Admin dashboard with summary cards and reporting views
- Admin reservations table
- Admin locations CRUD interface
- Public Home and About pages

## Tech stack

- React
- React Router
- Axios
- Material UI
- Local storage for auth token persistence

## Project structure

```text
ParadiseHotelFrontend/
├─ public/
├─ src/
│  ├─ api/
│  ├─ components/
│  ├─ context/
│  ├─ layout/
│  ├─ pages/
│  ├─ App.js
│  └─ index.js
└─ package.json
```

## How to run it locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the frontend

```bash
npm start
```

The app will run in development mode on:

```text
http://localhost:3000
```

If you are running the backend locally as well, start it from the backend folder with:

```bash
npm install
npm run dev
```

## Environment notes

This frontend expects the backend API to be available and the auth token to be sent as a Bearer token for protected endpoints.

If you need to adjust the backend URL, check the Axios configuration in `src/api/axiosConfig.js`.

## Screenshots

Add your screenshots here before submission.

### Home page

![Home page screenshot](./screenshots/home-page.png)

### Login page

![Login page screenshot](./screenshots/login-page.png)

### Room search results

![Room search screenshot](./screenshots/room-search.png)

### My Reservations

![Reservations screenshot](./screenshots/reservations.png)

### Admin dashboard

![Admin dashboard screenshot](./screenshots/admin-dashboard.png)

### Admin locations

![Admin locations screenshot](./screenshots/admin-locations.png)

## Implementation notes

- Protected routes are handled on the client side.
- Authentication state is stored in context and persisted in local storage.
- The frontend follows the backend DTOs without changing the API contract.
- Forms include validation and user-friendly error handling for common API responses.

## Submission checklist

- Git repository URL
- Frontend source code
- Working setup instructions
- Word document with project description and run steps

## Optional next step

If you want, you can also add a short `About` section in the app itself that explains the fictional hotel brand and the course context.
