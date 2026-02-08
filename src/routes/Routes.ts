export const studentRoutes = [
    {
        title: "Student Dashboard",
        items: [
            { title: "Home", url: "/" },
            { title: "Dashboard", url: "/dashboard" },
            { title: "My Bookings", url: "/dashboard/bookings" },
            { title: "Profile", url: "/dashboard/profile" },
        ],
    },
];

export const tutorRoutes = [
    {
        title: "Tutor Dashboard",
        items: [
            { title: "Home", url: "/" },
            { title: "Dashboard", url: "/dashboard/tutor" }, 
            { title: "Availability", url: "/dashboard/tutor/availability" },
            { title: "Profile", url: "/dashboard/tutor/profile" },
        ],
    },
];

export const adminRoutes = [
    {
        title: "Admin Management",
        items: [
            { title: "Home", url: "/" },
            { title: "Dashboard", url: "/dashboard/admin" }, 
            { title: "Users", url: "/dashboard/admin/users" },
            { title: "Bookings", url: "/dashboard/admin/bookings" },
            { title: "Categories", url: "/dashboard/admin/categories" },
        ],
    },
];