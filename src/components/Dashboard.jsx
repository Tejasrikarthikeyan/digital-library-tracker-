import { ArrowUpRight, BookOpen, CalendarDays, Clock3, IndianRupee, LibraryBig, TrendingUp } from 'lucide-react';
import { activities, calculateFine, student } from '../data/libraryData';

const formatMoney = (value) => `₹${value}`;

export default function Dashboard({ books, onNavigate }) {
    const borrowed = books.filter((book) => book.status === 'Overdue');
    const overdue = books.filter((book) => book.status === 'Overdue');
    const returned = books.filter((book) => book.status === 'Returned');
    const totalFine = books.reduce((sum, book) => sum + calculateFine(book.overdueDays || 0), 0);
    const stats = [
        { label: 'Total Books', value: books.length, icon: LibraryBig, className: 'navy' },
        { label: 'Borrowed Books', value: borrowed.length, icon: BookOpen, className: 'teal' },
        { label: 'Returned Books', value: returned.length, icon: TrendingUp, className: 'green' },
        { label: 'Overdue Books', value: overdue.length, icon: Clock3, className: 'orange' },
        { label: 'Total Fine', value: formatMoney(totalFine), icon: IndianRupee, className: 'rose' },
    ];

    return <div className="page-content">
        <section className="welcome-row">
            <div><p className="eyebrow">Sunday, 13 September 2026</p><h1>Good Morning, {student.name.split(' ')[0]} <span>👋</span></h1><p className="lead">Here&apos;s your library activity at a glance.</p></div>
            <button className="date-chip"><CalendarDays size={16} /> September 2026</button>
        </section>
        <section className="stats-grid">
            {stats.map(({ label, value, icon: Icon, className }) => <div className="stat-card" key={label}>
                <div className={`stat-icon ${className}`}><Icon size={18} /></div><div><span>{label}</span><strong>{value}</strong></div><ArrowUpRight className="stat-arrow" size={16} />
            </div>)}
        </section>
        <div className="dashboard-grid">
            <section className="panel borrowed-panel"><div className="panel-heading"><div><p className="eyebrow">Your reading queue</p><h2>Currently Borrowed</h2></div><button className="text-button" onClick={() => onNavigate('books')}>View all <ArrowUpRight size={15} /></button></div>
                <div className="borrowed-list">{borrowed.map((book) => <div className="borrowed-book" key={book.id}><div className="book-cover"><BookOpen size={21} /><span>{book.title.slice(0, 2).toUpperCase()}</span></div><div className="book-info"><strong>{book.title}</strong><span>{book.author}</span><small>Due Date: {book.dueDate}</small></div><div className="book-status"><span className="badge overdue">{book.status}</span><strong>{formatMoney(book.overdueDays * 5)}</strong><small>current fine</small></div></div>)}</div>
            </section>
            <section className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">What&apos;s new</p><h2>Recent Activity</h2></div></div><div className="activity-list">{activities.map((item) => <div className="activity-item" key={item.text}><div className={`activity-dot ${item.tone}`} /><div><strong>{item.text}</strong><small>{item.date}</small></div></div>)}</div></section>
        </div>
        <section className="panel overview-panel"><div className="panel-heading"><div><p className="eyebrow">Your collection</p><h2>Library Overview</h2></div><span className="overview-total">{books.length} total titles</span></div><div className="overview-grid"><OverviewItem label="Available Books" value={books.filter((book) => book.availability === 'Available').length} total={books.length} color="blue" /><OverviewItem label="Borrowed Books" value={borrowed.length} total={books.length} color="teal" /><OverviewItem label="Overdue Books" value={overdue.length} total={books.length} color="orange" /></div></section>
    </div>;
}

function OverviewItem({ label, value, total, color }) {
    return <div className="overview-item"><div className="overview-label"><span>{label}</span><strong>{value}</strong></div><div className="progress-track"><div className={`progress-value ${color}`} style={{ width: `${(value / total) * 100}%` }} /></div><small>{Math.round((value / total) * 100)}% of your activity</small></div>;
}
