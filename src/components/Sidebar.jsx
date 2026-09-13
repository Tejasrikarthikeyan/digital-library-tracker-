import { BookOpen, CreditCard, History, LayoutDashboard, Search, WalletCards, X } from 'lucide-react';
import { student } from '../data/libraryData';

const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'card', label: 'Library Card', icon: CreditCard },
    { id: 'books', label: 'My Books', icon: BookOpen },
    { id: 'search', label: 'Search Books', icon: Search },
    { id: 'fines', label: 'Fine Tracker', icon: WalletCards },
    { id: 'history', label: 'Borrow History', icon: History },
];

export default function Sidebar({ activeView, onNavigate, isOpen, onClose, onLogout }) {
    return (
        <>
            <div className={`sidebar-backdrop ${isOpen ? 'is-visible' : ''}`} onClick={onClose} />
            <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
                <div className="brand-row">
                    <div className="brand-mark"><BookOpen size={21} strokeWidth={2.5} /></div>
                    <div className="brand-copy"><strong>Digital Library</strong><span>Student portal</span></div>
                    <button className="icon-button close-sidebar" onClick={onClose} aria-label="Close menu"><X size={19} /></button>
                </div>
                <div className="sidebar-label">Workspace</div>
                <nav className="sidebar-nav" aria-label="Main navigation">
                    {navigation.map(({ id, label, icon: Icon }) => (
                        <button key={id} className={`nav-item ${activeView === id ? 'active' : ''}`} onClick={() => onNavigate(id)}>
                            <Icon size={18} strokeWidth={2.2} /><span>{label}</span>
                            {id === 'fines' && <span className="nav-alert">₹340</span>}
                        </button>
                    ))}
                </nav>
                <div className="sidebar-spacer" />
                <div className="sidebar-footer">
                    <div className="profile-avatar">TK</div>
                    <div><strong>{student.name}</strong><span>{student.department === 'Computer Science and Engineering' ? 'CSE' : student.department} <i /> {student.year} Year</span></div>
                    <button className="sidebar-logout" onClick={onLogout} aria-label="Log out">↗</button>
                </div>
            </aside>
        </>
    );
}
