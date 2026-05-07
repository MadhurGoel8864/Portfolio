import { Link } from 'react-scroll';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL, SOCIAL, NAV_LINKS } from '../../constants/global';

export function Footer() {
  return (
    <footer style={{ background: 'var(--bg-deeper, #111009)', borderTop: '1px solid var(--border)', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 5vw 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, marginBottom: 48 }} className="footer-grid-responsive">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: 'linear-gradient(135deg, var(--gold), var(--gold-muted))', color: '#0e0d0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, fontFamily: 'var(--syne)' }}>M</div>
              <span style={{ fontFamily: 'var(--syne)', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{PERSONAL.firstName}</span>
            </div>
            <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 20 }}>
              {PERSONAL.title}.<br />Building things that matter.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { Icon: Github, href: SOCIAL.github, label: 'GitHub profile' },       // FIX #25
                { Icon: Linkedin, href: SOCIAL.linkedin, label: 'LinkedIn profile' }, // FIX #25
                { Icon: Mail, href: `mailto:${PERSONAL.email}`, label: 'Send email' },// FIX #25
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                  style={{ width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', border: '1px solid var(--border)', background: 'transparent', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.background = 'var(--gold-dim)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 20 }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link to={link.href} smooth duration={600} offset={-72} style={{ cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 20 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
                { label: 'Location', value: PERSONAL.location },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 3 }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, color: 'var(--text-2)', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; }}>{value}</a>
                  ) : (
                    <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, color: 'var(--text-2)' }}>{value}</span>
                  )}
                </div>
              ))}
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 3 }}>Status</div>
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, color: '#3ddc84' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ddc84', animation: 'pulse 2s infinite', display: 'inline-block' }} />
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,169,81,0.5), transparent)', marginBottom: 32 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }} className="footer-bottom-responsive">
          <span>© {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.</span>
          <span>terminal aesthetic · Built with React</span>
        </div>
      </div>
    </footer>
  );
}
