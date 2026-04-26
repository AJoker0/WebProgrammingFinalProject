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

<img width="1245" height="765" alt="{EEA5AA0D-9E5C-48DE-94E3-598F33C8C5D7}" src="https://github.com/user-attachments/assets/b2a4157f-81ac-436b-9531-5519538131cf" />


### Login page


<img width="1246" height="767" alt="{E1D592FF-813C-4229-A08B-D453DEE639AA}" src="https://github.com/user-attachments/assets/9c2fe98c-202d-47cb-8f07-304d62171689" />

<img width="1244" height="761" alt="{417F2D85-1000-498C-81EC-BA4D66661D98}" src="https://github.com/user-attachments/assets/e315d26c-88e9-49c6-ba9a-1ac5c905dfe4" />


### Room search results

<img width="1251" height="758" alt="{8D7FF8B3-F228-47E1-96D0-848B9BE40872}" src="https://github.com/user-attachments/assets/f9314de3-d8da-43b6-bc45-e6d099ddd558" />


### My Reservations

<img width="1246" height="769" alt="{4AAD0F9D-D85F-4485-9C5F-8B831E01C62F}" src="https://github.com/user-attachments/assets/9b6d1bae-0f28-4629-9b45-99456ebde214" />

<img width="363" height="222" alt="{F84869C1-3944-431B-9073-11C1703EEAA1}" src="https://github.com/user-attachments/assets/f5d590af-1fc0-4558-b2f8-01581ba4fda9" />


### Admin dashboard
<img width="1244" height="761" alt="{88046C49-61C0-4DAF-BFEC-A0A1044C7674}" src="https://github.com/user-attachments/assets/83142ec2-44a9-401a-b8fc-c59bf963100d" />


### Admin locations

<img width="1244" height="763" alt="{CEBACE1A-48E0-45FD-A7BA-D76C24973BE7}" src="https://github.com/user-attachments/assets/87e39966-0107-40f6-8211-410e9393fe19" />


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
