export const student = {
    name: 'Tejasri Karthikeyan',
    department: 'Computer Science and Engineering',
    year: 'IV',
    studentId: 'CSE2026XXX',
    libraryCardNumber: 'LIB2026001',
};

export const books = [
    {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        category: 'Programming',
        availability: 'Borrowed',
        status: 'Overdue',
        borrowDate: '01 Aug 2026',
        dueDate: '14 Aug 2026',
        returnDate: '—',
        overdueDays: 31,
        fine: 155,
    },
    {
        id: 2,
        title: 'Python Crash Course',
        author: 'Eric Matthes',
        category: 'Programming',
        availability: 'Borrowed',
        status: 'Overdue',
        borrowDate: '01 Aug 2026',
        dueDate: '08 Aug 2026',
        returnDate: '',
        overdueDays: 37,
        fine: 185,
    },
    {
        id: 3,
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        category: 'Computer Science',
        availability: 'Available',
        status: 'Active',
        borrowDate: '',
        dueDate: '',
        returnDate: '',
        overdueDays: 0,
        fine: 0,
    },
    {
        id: 4,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        category: 'Fiction',
        availability: 'Available',
        status: 'Returned',
        borrowDate: '20 Jul 2026',
        dueDate: '03 Aug 2026',
        returnDate: '02 Aug 2026',
        overdueDays: 0,
        fine: 0,
    },
    {
        id: 5,
        title: 'Database System Concepts',
        author: 'Abraham Silberschatz',
        category: 'Database',
        availability: 'Borrowed',
        status: 'Active',
        borrowDate: '05 Aug 2026',
        dueDate: '19 Aug 2026',
        returnDate: '',
        overdueDays: 0,
        fine: 0,
    },
];

export const borrowHistory = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', borrowDate: '01 Aug 2026', returnDate: '', status: 'Overdue', fine: 155 },
    { id: 2, title: 'Python Crash Course', author: 'Eric Matthes', borrowDate: '01 Aug 2026', returnDate: '', status: 'Overdue', fine: 185 },
    { id: 3, title: 'The Alchemist', author: 'Paulo Coelho', borrowDate: '20 Jul 2026', returnDate: '02 Aug 2026', status: 'Returned', fine: 0 },
];

export const activities = [
    { type: 'borrowed', text: 'Book borrowed — Clean Code', date: 'Today', tone: 'blue' },
    { type: 'returned', text: 'Book returned — The Alchemist', date: 'Yesterday', tone: 'green' },
    { type: 'fine', text: 'Fine generated — ₹340', date: '12 Aug 2026', tone: 'orange' },
];

export function calculateFine(overdueDays) {
    return overdueDays * 5;
}

export function calculateOverdueDays(dueDate, today = new Date()) {
    if (!dueDate) return 0;
    const parsedDueDate = new Date(dueDate);
    const difference = Math.floor((today - parsedDueDate) / 86400000);
    return Math.max(0, difference);
}
