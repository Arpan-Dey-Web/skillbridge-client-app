# LearnHub 🎓

**"Connect with Expert Tutors, Learn Anything"**

---

## Project Overview

LearnHub is a full-stack web application that connects learners with expert tutors. Students can browse tutor profiles, view availability, and book sessions instantly. Tutors can manage their profiles, set availability, and track their teaching sessions. Admins oversee the platform and manage users.

---

## Roles & Permissions

| Role        | Description                         | Key Permissions                                                  |
| ----------- | ----------------------------------- | ---------------------------------------------------------------- |
| **Student** | Learners who book tutoring sessions | Browse tutors, book sessions, leave reviews, manage profile      |
| **Tutor**   | Experts who offer tutoring services | Create profile, set availability, view bookings, manage subjects |
| **Admin**   | Platform moderators                 | Manage all users, view analytics, moderate content               |

> 💡 **Note**: Users select their role during registration.Admin accounts should be seeded in the database.

---

## ⚠️ Mandatory Requirements

> [!CAUTION]
> **MANDATORY - READ CAREFULLY**
>
> The following **FIVE requirements are MANDATORY**:
>
> 1. **Homepage** - 4 meaningful sections + Navbar + Footer
> 2. **UI/UX** - Clean, responsive design with consistent colors & spacing
> 3. **Commits** - 30 meaningful commits (15 frontend + 15 backend)
> 4. **Error Handling** - Validation, error messages, loading states
> 5. **Admin Credentials** - Provide working admin email & password
>
> ❌ **Failure to complete any of these = 0 MARKS**

---

## 🛠️ Tech Stack

### Frontend

| Technology   | Purpose                        |
| ------------ | ------------------------------ |
| Next.js      | App Router, SSR/SSG            |
| TypeScript   | Type safety                    |
| Tailwind CSS | Styling (or any CSS framework) |

### Backend

| Technology        | Purpose  |
| ----------------- | -------- |
| Node.js + Express | REST API |
| Postgres + Prisma | Database |

### Deployment

| Service       | Purpose                       |
| ------------- | ----------------------------- |
| Vercel/Render | Frontend & Backend deployment |

---

## Features

### Public Features

- Browse and search tutors by subject, rating, and price // i implemented from froentend not backend
- Filter tutors by category // implemented from frontend
- View detailed tutor profiles with reviews // done
- Landing page with featured tutors // here i have implemented 6 tutor only showed

### Student Features

- Register and login as student // done
- Book tutoring sessions //done
- View upcoming and past bookings // i have implemented all in one page completed and upcoming sessions
- Leave reviews after sessions //done
- Manage profile

### Tutor Features

- Register and login as tutor //done
- Create and update tutor profile //done
- Set availability slots //done
- View teaching sessions //done
- See ratings and reviews

### Admin Features

- View all users (students and tutors) //done
- Manage user status (ban/unban)
- View all bookings //done
- Manage categories

---

## Pages & Routes

> ⚠️ **Note**: These routes are examples. You may add, edit, or remove routes based on your implementation needs.

### Public Routes

| Route         | Page          | Description                   |
| ------------- | ------------- | ----------------------------- |
| `/`           | Home          | Hero, search, featured tutors |
| `/tutors`     | Browse Tutors | List with filters             |
| `/tutors/:id` | Tutor Profile | Details, reviews, book        |
| `/login`      | Login         | Login form                    |
| `/register`   | Register      | Registration form             |

### Student Routes (Private)

| Route                 | Page        | Description        |
| --------------------- | ----------- | ------------------ |
| `/dashboard`          | Dashboard   | Overview, bookings |
| `/dashboard/bookings` | My Bookings | Booking history    |
| `/dashboard/profile`  | Profile     | Edit info          |

### Tutor Routes (Private)

| Route                 | Page         | Description     |
| --------------------- | ------------ | --------------- |
| `/tutor/dashboard`    | Dashboard    | Sessions, stats |
| `/tutor/availability` | Availability | Set time slots  |
| `/tutor/profile`      | Profile      | Edit tutor info |

### Admin Routes (Private)

| Route               | Page       | Description       |
| ------------------- | ---------- | ----------------- |
| `/admin`            | Dashboard  | Statistics        |
| `/admin/users`      | Users      | Manage users      |
| `/admin/bookings`   | Bookings   | All bookings      |
| `/admin/categories` | Categories | Manage categories |

---

## Database Tables

Design your own schema for the following tables:

- **Users** - Store user information and authentication details
- **TutorProfiles** - Tutor-specific information (linked to Users)
- **Categories** - Subject categories for tutoring
- **Bookings** - Session bookings between students and tutors
- **Reviews** - Student reviews for tutors

> 💡 _Think about what fields each table needs based on the features above._

---

## API Endpoints

> ⚠️ **Note**: These endpoints are examples. You may add, edit, or remove endpoints based on your implementation needs.

### Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |
| GET    | `/api/auth/me`       | Get current user  |

### Tutors (Public)

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| GET    | `/api/tutors`     | Get all tutors with filters |
| GET    | `/api/tutors/:id` | Get tutor details           |
| GET    | `/api/categories` | Get all categories          |

### Bookings

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/bookings`     | Create new booking  |
| GET    | `/api/bookings`     | Get user's bookings |
| GET    | `/api/bookings/:id` | Get booking details |

### Tutor Management

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| PUT    | `/api/tutor/profile`      | Update tutor profile |
| PUT    | `/api/tutor/availability` | Update availability  |

### Reviews

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | `/api/reviews` | Create review |

### Admin

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/admin/users`     | Get all users      |
| PATCH  | `/api/admin/users/:id` | Update user status |

---

## Flow Diagrams

### 👨‍🎓 Student Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Browse Tutors │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ View Profile │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Book Session │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    Attend    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Leave Review │
                              └──────────────┘
```

### 👨‍🏫 Tutor Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Create Profile│
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    Set       │
                              │ Availability │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │View Sessions │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Mark Complete │
                              └──────────────┘
```

### 📊 Booking Status

```
                              ┌──────────────┐
                              │  CONFIRMED   │
                              │   (instant)  │
                              └──────────────┘
                               /            \
                              /              \
                       (tutor)          (student)
                        marks            cancels
                            /                \
                           ▼                  ▼
                   ┌──────────────┐   ┌──────────────┐
                   │  COMPLETED   │   │  CANCELLED   │
                   └──────────────┘   └──────────────┘
```

---

## Submission

📋 **See [README.md](./README.md) for submission guidelines, timeline, and marks.**

text : #2D3748
background: #FFFFFF
primary: #10B981
secondary: #D8B4FE
accent: #ECFDF5

## Still Have To Do !!!

1. রেটিং ও রিভিউ:
ইমপ্রুভমেন্ট: টিউটর যেন তার রিভিউগুলোতে "Reply" দিতে পারে এমন ফিচার যোগ করলে প্ল্যাটফর্মটি আরও ইন্টারঅ্যাক্টিভ হবে।

2. Email Notifications: বুকিং যখন স্টুডেন্ট রিকোয়েস্ট করবে, তখন টিউটরকে ইমেইল পাঠানো এবং টিউটর যখন 'Approve' করবে, তখন মিটিং লিঙ্কসহ স্টুডেন্টকে ইমেইল পাঠানো (Nodemailer বা Resend ব্যবহার করে)। এটি একটি রিয়েল-লাইফ প্রজেক্টের জন্য অত্যন্ত জরুরি।


# Admin bookings button need improvement

১. Session Logs (The Audit Trail)
এটি মূলত একটি Read-only History। যখন কোনো বুকিং নিয়ে বিতর্ক তৈরি হয় (যেমন: টিউটর জয়েন করেনি বা স্টুডেন্ট পেমেন্ট নিয়ে কমপ্লেন করেছে), তখন অ্যাডমিন এখান থেকে সব টেকনিক্যাল ডাটা দেখতে পায়।
Timeline: বুকিংটি কখন তৈরি হয়েছে, কখন পেমেন্ট হয়েছে এবং কখন স্ট্যাটাস চেঞ্জ হয়েছে তার একটি টাইমলাইন।
Meeting Info: মিটিংয়ের লিংকটি জেনারেট হয়েছে কি না এবং কোনো পাসকোড ছিল কি না।
Participants Details: স্টুডেন্ট এবং টিউটরের আইডি এবং তাদের কন্টাক্ট ইনফো।
System Notes: কোনো অটোমেটেড অ্যাকশন (যেমন: "Session automatically marked as completed after 24 hours")।

২. Manage (The Action Center)
এটি অ্যাডমিনকে ওই নির্দিষ্ট বুকিংয়ের ওপর Full Power দেয়। এখানে ক্লিক করলে একটি Sheet বা Modal ওপেন হতে পারে যেখানে নিচের কাজগুলো করা যাবে:
Change Status: আপনি চাইলে ম্যানুয়ালি কোনো বুকিংকে COMPLETED থেকে CANCELLED বা REFUNDED এ চেঞ্জ করতে পারবেন।
Refund Trigger: যদি সেশনটি খারাপ হয় বা টিউটর না আসে, অ্যাডমিন এখান থেকে রিফান্ড প্রসেস শুরু করতে পারবে।
Update Meeting Link: যদি আগের লিংকটি কাজ না করে, অ্যাডমিন নতুন একটি meetLink আপডেট করে দিতে পারবে।
Admin Note: ওই বুকিং সম্পর্কে কোনো ইন্টারনাল নোট লিখে রাখা (যা ইউজাররা দেখবে না)।

```

```






```
r ekbr bolen bhaiya
color?
detail show krote paren
or validation

session cencel korte paren
or teacher change korte paren

time change korte paren
je teacher er problem ace so time change kore student ke janay dilen
dekhen ja valo hoy


mange button na rakhlei hoy




rounded besi hoye gece
card er
pointer dekhi na apnk
mouse pointer


table er rounded besi hoye gece
ager page er
user er
rouded same den sob gular
otherwise thik ace
rakhte paren


r ekbr login koren to
logout kore
jii
wait
google page a website name skillbridge dekhaitece
ji


thik ace
live link dian




ok bhai
bolen
bhai re bhai
link peye


set profile keno?
jii korte paren
eksathe combine koren


na eita thik ace
overall good
thik ace

slider use korte paren
jii
thik ace
na lagbe na
image add korte paren
bg te
thik ace


useMemo use koren
useMemo use koren thik hoye jabe
wait apnk ekta jinis dei


review show korate paren
tastimony
ji
top student
why student come here
what you offer


agulai enough
jii
r kicu lagbe na
jii
comment type?
pera ace email a


karon kw jdi valid email diye  login na kore thle tar email kibhabe paben?
thle
ascha thle overall thik ace
agulai implement koren
r lagbe na


agula kore submit den
oita dekhen age
nah


change kroen
koren
primary ta use korte paren
eto color na kroe
kore
ascha thle thik ace


overall nice
great work


time thakle alada korian
mara khaben code check korte gele

```