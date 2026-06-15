# CredFlow Clone — Project Scope

## What it is
A B2B receivables management SaaS for Indian SMEs built with MERN stack.

## Modules
1. Auth — JWT-based register/login, company setup, role-based access
2. Customers — Full CRUD, GST tracking, outstanding balance
3. Invoices — Create/send/track, dynamic line items, GST, status flow
4. Payments — Record partial/full payments against invoices
5. Reminders — Automated email reminders via node-cron + Nodemailer
6. Reports — Ageing report, cash flow forecast

## Tech Stack
- Frontend: React, React Router v6, Axios, Recharts, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Email: Nodemailer (Gmail SMTP)
- Scheduler: node-cron
- Deploy: Vercel (frontend) + Render (backend) + MongoDB Atlas

## Timeline
28 days — see DAY_PLAN.md