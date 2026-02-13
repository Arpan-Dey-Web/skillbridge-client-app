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

- Browse and search tutors by subject, rating, and price   // i implemented from froentend not backend 
- Filter tutors by category   // implemented from frontend 
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

১. Public Features (সবার জন্য উন্মুক্ত ফিচার)
সার্চ ও ফিল্টারিং: আপনি এটি ফ্রন্টএন্ড থেকে করেছেন।

ইমপ্রুভমেন্ট: টিউটর সংখ্যা যখন বাড়বে (ধরা যাক ১০০+), তখন ফ্রন্টএন্ড ফিল্টারিং ব্রাউজারকে স্লো করে দেবে। আপনার উচিত Backend Query (Prisma/SQL) ব্যবহার করে where ক্লজ দিয়ে সার্চ এবং ক্যাটাগরি ফিল্টার করা। এতে শুধু প্রয়োজনীয় ডাটা নেটওয়ার্ক দিয়ে আসবে।

**ল্যান্ডিং পেজ: ৬ জন টিউটর দেখাচ্ছেন।** Done
**ইমপ্রুভমেন্ট: এই ৬ জন যেন "Top Rated" হয় সেই লজিক ব্যাকএন্ডে লিখুন (orderBy: { averageRating: 'desc' })।** Done

২. Student Features (ছাত্রদের জন্য ফিচার)
**বুকিং ম্যানেজমেন্ট: আপনি সব বুকিং এক পেজে রেখেছেন।**
**ইমপ্রুভমেন্ট: ইউজার এক্সপেরিয়েন্স (UX) এর জন্য "Upcoming" এবং "Past" সেশনগুলোকে আলাদা Tabs (shadcn/ui Tabs) এ ভাগ করুন। এতে স্টুডেন্ট কনফিউজড হবে না।** Done

প্রোফাইল ম্যানেজমেন্ট: এটি এখনও বাকি।
**করণীয়: স্টুডেন্ট যেন তার নাম, ছবি এবং পাসওয়ার্ড পরিবর্তন করতে পারে এমন একটি সেটিংস পেজ তৈরি করুন।** Done


৩. Tutor Features (শিক্ষকদের জন্য ফিচার)
সেশন ভিউ: আপনি সেশনগুলো দেখতে পাচ্ছেন।
ইমপ্রুভমেন্ট: টিউটরের জন্য একটি Earnings Dashboard বা একটি ছোট গ্রাফ (Recharts ব্যবহার করে) যোগ করতে পারেন যা দেখাবে সে সপ্তাহে বা মাসে কত টাকা আয় করেছে।

রেটিং ও রিভিউ:
ইমপ্রুভমেন্ট: টিউটর যেন তার রিভিউগুলোতে "Reply" দিতে পারে এমন ফিচার যোগ করলে প্ল্যাটফর্মটি আরও ইন্টারঅ্যাক্টিভ হবে।

৪. Admin Features (অ্যাডমিন ফিচার)
ইউজার স্ট্যাটাস (Ban/Unban): এটি বাকি আছে।
**করণীয়: আপনার ইউজার টেবিলের অ্যাকশন মেনুতে একটি PATCH রিকোয়েস্ট যোগ করুন যা ডাটাবেসের status কলামকে ACTIVE থেকে BANNED এ পরিবর্তন করবে।** Done

ক্যাটাগরি ম্যানেজমেন্ট: এটি বাকি আছে।
**করণীয়: অ্যাডমিনের জন্য একটি ক্রাড (CRUD) ইন্টারফেস তৈরি করুন যেখানে সে নতুন ক্যাটাগরি (যেমন: Python, Graphics Design) যোগ করতে পারবে বা পুরনো ক্যাটাগরি এডিট করতে পারবে।** Done

৫. প্রফেশনাল ইমপ্রুভমেন্টের জন্য টেকনিক্যাল সাজেশন (Detailed)
১. Pagination (প্যাজিনেশন): আপনার ইউজার ডিরেক্টরি এবং টিউটর লিস্টে প্যাজিনেশন যোগ করুন। ডাটাবেস থেকে সব ডাটা একসাথে না এনে ১০টি করে ডাটা ফেচ করার লজিক ব্যাকএন্ডে লিখুন (take: 10, skip: offset)।

২. Email Notifications: বুকিং যখন স্টুডেন্ট রিকোয়েস্ট করবে, তখন টিউটরকে ইমেইল পাঠানো এবং টিউটর যখন 'Approve' করবে, তখন মিটিং লিঙ্কসহ স্টুডেন্টকে ইমেইল পাঠানো (Nodemailer বা Resend ব্যবহার করে)। এটি একটি রিয়েল-লাইফ প্রজেক্টের জন্য অত্যন্ত জরুরি।

৩. Real-time Status: সেশন চলাকালীন বা সেশন শেষ হওয়ার পর স্ট্যাটাস অটোমেটিক COMPLETED হওয়ার লজিক (Cron Jobs ব্যবহার করে)।

৪. Image Upload: ইউজারদের প্রোফাইল ছবি আপলোড করার জন্য Cloudinary বা Uploadthing ইন্টিগ্রেট করুন, কারণ বর্তমানে আপনি হয়তো শুধু লিঙ্কের ওপর নির্ভর করছেন।

৫. Security: অ্যাডমিন রুটগুলোতে সার্ভার-সাইড প্রোটেকশন নিশ্চিত করুন (Role-based access control)। আপনার ইতিমধ্যে session?.user?.role চেক আছে, তবে সেটি যেন ডাটাবেস থেকে আসা রিয়েল ডাটার সাথে ভেরিফাইড থাকে।

সামগ্রিক মূল্যায়ন: আপনার প্রজেক্টের কোর লজিকগুলো (Booking, Availability, Profile View) দারুণভাবে কাজ করছে। এখন শুধু ইউজার ম্যানেজমেন্ট এবং ডাটা হ্যান্ডলিংয়ের (Backend search/filtering/pagination) দিকে নজর দিলে এটি একটি কমপ্লিট প্রোডাকশন-রেডি প্ল্যাটফর্ম হয়ে উঠবে।

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
