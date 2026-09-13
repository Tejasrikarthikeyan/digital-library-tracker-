import { Bell, Menu, Search, UserRound } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LibraryCard from './components/LibraryCard';
import MyBooks from './components/MyBooks';
import BookSearch from './components/BookSearch';
import FineTracker from './components/FineTracker';
import BorrowHistory from './components/BorrowHistory';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import { getBooks } from './services/libraryService';
import { student } from './data/libraryData';

const pageNames = { dashboard: 'Dashboard', card: 'Library Card', books: 'My Books', search: 'Search Books', fines: 'Fine Tracker', history: 'Borrow History' };
const DEMO_USER = { name: student.name, studentId: student.studentId, email: 'student@library.com', department: student.department, year: student.year, password: '123456' };

export default function App() {
    const [authScreen, setAuthScreen] = useState(() => localStorage.getItem('libraryAuth') === 'true' ? 'app' : 'landing');
    const [notice, setNotice] = useState('');
    const [activeView, setActiveView] = useState('dashboard');
    const [libraryBooks, setLibraryBooks] = useState(() => getBooks());
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [quickSearch, setQuickSearch] = useState('');
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const navigate = (view) => { setActiveView(view); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const updateBook = (bookId, changes) => setLibraryBooks((currentBooks) => currentBooks.map((book) => book.id === bookId ? { ...book, ...changes } : book));
    const markReturned = (bookId) => updateBook(bookId, { status: 'Returned', availability: 'Available', returnDate: '13 Sep 2026', overdueDays: 0, fine: 0 });
    const openSearch = () => { setSearchQuery(quickSearch); navigate('search'); };
    const showLogin = () => { setNotice(''); setAuthScreen('login'); };
    const handleRegister = (form) => {
        if (!form.name || !form.studentId || !form.email || !form.password || !form.confirmPassword) return 'Please complete every required field.';
        if (form.password.length < 6) return 'Password must be at least 6 characters.';
        if (form.password !== form.confirmPassword) return 'Passwords do not match.';
        localStorage.setItem('libraryUser', JSON.stringify({ ...form, password: form.password }));
        setNotice('Account created successfully. Please log in.');
        setAuthScreen('login');
        return '';
    };
    const handleLogin = (email, password) => {
        if (!email || !password) return 'Enter your email and password.';
        const savedUser = JSON.parse(localStorage.getItem('libraryUser') || 'null');
        const matchesDemo = email === DEMO_USER.email && password === DEMO_USER.password;
        const matchesSavedUser = savedUser && email === savedUser.email && password === savedUser.password;
        if (!matchesDemo && !matchesSavedUser) return 'Incorrect email or password. Try the demo credentials below.';
        localStorage.setItem('libraryAuth', 'true');
        setNotice('');
        setAuthScreen('app');
        setActiveView('dashboard');
        return '';
    };
    const logout = () => { localStorage.removeItem('libraryAuth'); setAuthScreen('login'); setActiveView('dashboard'); setSidebarOpen(false); };

    if (authScreen === 'landing') return <Landing onLogin={showLogin} onRegister={() => setAuthScreen('register')} />;
    if (authScreen === 'login') return <Login onSubmit={handleLogin} onRegister={() => { setNotice(''); setAuthScreen('register'); }} onBack={() => setAuthScreen('landing')} notice={notice} />;
    if (authScreen === 'register') return <Register onSubmit={handleRegister} onLogin={showLogin} onBack={() => setAuthScreen('landing')} />;

    const renderPage = () => {
        const props = { books: libraryBooks, onNavigate: navigate, onMarkReturned: markReturned };
        if (activeView === 'card') return <LibraryCard onNavigate={navigate} />;
        if (activeView === 'books') return <MyBooks books={libraryBooks} onMarkReturned={markReturned} />;
        if (activeView === 'search') return <BookSearch books={libraryBooks} query={searchQuery} onQueryChange={setSearchQuery} onNavigate={navigate} onUpdateBook={updateBook} />;
        if (activeView === 'fines') return <FineTracker books={libraryBooks} onMarkReturned={markReturned} />;
        if (activeView === 'history') return <BorrowHistory books={libraryBooks} onNavigate={navigate} />;
        return <Dashboard {...props} />;
    };

    return <div className="app-shell"><Sidebar activeView={activeView} onNavigate={navigate} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={logout} /><main className="main-area"><header className="topbar"><button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumb"><span>Library Portal</span><b>/</b><strong>{pageNames[activeView]}</strong></div><div className="topbar-actions"><form className="header-search" onSubmit={(event) => { event.preventDefault(); openSearch(); }}><Search size={17} /><input value={quickSearch} onChange={(event) => setQuickSearch(event.target.value)} placeholder="Quick search" aria-label="Quick search" /><kbd>⌘ K</kbd></form><div className="header-popover-wrap"><button className="notification-button" onClick={() => { setNotificationsOpen((open) => !open); setProfileOpen(false); }} aria-label="Notifications"><Bell size={18} /><i /></button>{notificationsOpen && <div className="header-popover notification-popover"><strong>Notifications</strong><span>2 overdue books need your attention.</span><button onClick={() => navigate('fines')}>Review fines</button></div>}</div><div className="header-popover-wrap"><button className="header-avatar" onClick={() => { setProfileOpen((open) => !open); setNotificationsOpen(false); }} aria-label="Open profile"><UserRound size={15} /></button>{profileOpen && <div className="header-popover profile-popover"><strong>{student.name}</strong><span>CSE <i /> {student.year} Year</span><button onClick={logout}>Log out</button></div>}</div></div></header><div className="page-wrap">{renderPage()}</div><footer className="site-footer">Digital Library Portal <span>•</span> K.S.R. College of Engineering <span>•</span> 2026</footer></main></div>;
}
