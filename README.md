# Agnos-link-real-time-form
Agnos Assignment real-time patient input form and staff view system and responsive

## Overview
This is a real-time patient registration system developed for the Agnos Candidate Assignment.  
It consists of two interfaces:
- **Patient Form**: A clean, responsive form where patients can enter their personal information.
- **Staff View**: A real-time dashboard where staff can monitor patient input instantly.

The two pages are synchronized using **Pusher** so that every keystroke or change in the patient form appears immediately in the staff view.

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Real-time: Pusher (Channels)
- Deployment: Vercel

## Features
- All required fields from the assignment (First Name, Last Name, DOB, Gender, Phone, Email, Address, etc.)
- Optional fields: Middle Name, Nationality, Religion, Emergency Contact (with toggle)
- Form validation (required fields + basic format checking)
- Real-time synchronization (every change appears instantly)
- Status indicators: **Actively Filling**, **Idle**, **Submitted**
- Fully responsive (mobile + desktop)
- Clean medical UI with white/teal/blue theme

## Live Demo
**Live URL**:  https://agnos-link-real-time-form-git-main-myomin24680s-projects.vercel.app/
- Patient Form: `/patient`  
- Staff View: `/staff`

## Setup Instructions (Local)

1. Clone the repository
   ```bash
   git clone https://github.com/MyoMin24680/Agnos-link-real-time-form.git
   cd Agnos-link-real-time-form
   
2. Install
npx create-next-app@latest agnos-link --js --tailwind --eslint --app --yes --no-src-dir
cd agnos-link
npm install pusher pusher-js

3.create .env.local file and add Pusher keys
NEXT_PUBLIC_PUSHER_KEY=*********
NEXT_PUBLIC_PUSHER_CLUSTER=your-cluster-here

PUSHER_APP_ID=app-id
PUSHER_SECRET=secret
PUSHER_CLUSTER=cluster-here
		
5.Run the development server
 npm run dev

6. Open browser
   
   http://localhost:3000	
   Patient: http://localhost:3000/patient
   Staff: http://localhost:3000/staff


Development Planning Documation

Main Project structure

	agnos-link/                                  
			app/api/broadcast/route.js         *Pusher trigger*

			app/patient/page.jsx                *Patient form page*
			
			app/staff/page.jsx                  *Staff real-time view*

			/page.jsx                            *Home page*

	
	.env.local                                *Pusher Key*
	README.MD

Design Decisions (UI/UX)

Used Tailwind CSS with mobile-first approach
Medical-friendly color palette (teal + blue + white/gray) for calm and trustworthy feeling
Large, clear input fields and buttons for easy use on mobile
Status indicators with color
Rounded cards and shadows for modern, clean medical look


Component Architecture

PatientPage: Main form with state management, validation, and real-time broadcasting
StaffPage: Real-time listener using Pusher, displays all fields dynamically
API Route (/api/broadcast): Server-side trigger to send data to Pusher
No extra components


Real-Time Synchronization Flow

Patient types in any input → handleChange triggers
Data is sent to /api/broadcast (with debounce to avoid flooding)
API route triggers Pusher event (patient-channel → form-update)
Staff page listens to the same channel and updates state instantly using useEffect
UI re-renders automatically showing live changes

   
