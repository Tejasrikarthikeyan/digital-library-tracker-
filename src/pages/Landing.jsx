import { ArrowRight, BookOpen, CreditCard, LibraryBig, Sparkles } from 'lucide-react';

export default function Landing({ onLogin, onRegister }) {
    return <main className="auth-page landing-page">
        <section className="auth-visual">
            <div className="auth-glow auth-glow-one" />
            <div className="auth-glow auth-glow-two" />
            <div className="auth-brand"><span className="auth-brand-mark"><BookOpen size={21} /></span><strong>Digital Library</strong></div>
            <div className="landing-illustration"><div className="illustration-ring ring-one" /><div className="illustration-ring ring-two" /><div className="book-stack"><div className="book book-back"><span>READ</span></div><div className="book book-middle"><span>LEARN</span></div><div className="book book-front"><BookOpen size={42} /><span>EXPLORE</span></div></div><div className="floating-icon floating-card"><CreditCard size={22} /></div><div className="floating-icon floating-library"><LibraryBig size={22} /></div></div>
            <div className="visual-copy"><p className="eyebrow light-eyebrow"><Sparkles size={13} /> Student library portal</p><h2>Your campus library,<br /><em>always with you.</em></h2><p>Keep your reading, card, and fines beautifully organized in one quiet space.</p></div>
        </section>
        <section className="auth-form-panel landing-panel"><div className="auth-mobile-brand"><BookOpen size={20} /> Digital Library</div><div className="landing-copy"><p className="eyebrow">K.S.R. College of Engineering</p><h1>Digital Library<br /><span>Card & Fine Tracker</span></h1><p>Manage your library card, books and fines digitally.</p></div><div className="landing-actions"><button className="primary-button auth-submit" onClick={onLogin}>Login <ArrowRight size={17} /></button><button className="secondary-button auth-submit" onClick={onRegister}>Create an account</button></div><p className="auth-footnote">Frontend demo portal <span>•</span> Your data stays on this device</p></section>
    </main>;
}
