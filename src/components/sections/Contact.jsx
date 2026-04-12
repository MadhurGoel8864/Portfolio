import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin, ArrowRight } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { PERSONAL, SOCIAL } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const LINKS = [
  { icon: Mail,     label: 'Email',    value: PERSONAL.email,              href: `mailto:${PERSONAL.email}`, color: COLORS.gold,          desc: 'Best way to reach me'    },
  { icon: Github,   label: 'GitHub',   value: 'github.com/MadhurGoel8864', href: SOCIAL.github,              color: COLORS.socialGithub,  desc: 'Check out my projects'  },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/madhur-goel-mg', href: SOCIAL.linkedin,       color: COLORS.socialLinkedin, desc: 'Connect professionally'  },
];

function FormField({ name, label, type = 'text', placeholder, required, as, rows }) {
  const sharedStyle = {
    background:  'var(--border-subtle)',
    border:      '1px solid var(--border-medium)',
    color:       'var(--text-primary)',
  };
  const cls = `w-full px-4 py-2.5 rounded-xl text-sm placeholder:opacity-40
    focus:outline-none focus:ring-1
    transition-all duration-200`;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</label>
      {as === 'textarea'
        ? <textarea name={name} rows={rows} required={required} placeholder={placeholder} className={`${cls} resize-none`} style={sharedStyle} />
        : <input   name={name} type={type} required={required} placeholder={placeholder} className={cls}                  style={sharedStyle} />
      }
    </div>
  );
}

export function Contact() {
  const handleSubmit = e => {
    e.preventDefault();
    const data    = new FormData(e.target);
    const subject = encodeURIComponent(data.get('subject') || 'Hello from your portfolio');
    const body    = encodeURIComponent(`Name: ${data.get('name')}\n\n${data.get('message')}`);
    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
  };

  return (
    <SectionWrapper id="contact">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full blur-[100px] opacity-10"
          style={{ background: `radial-gradient(circle, ${COLORS.gold}, ${COLORS.goldMuted})` }} />
      </div>

      <SectionTitle
        label="Get In Touch"
        title="Let's Build Something"
        subtitle="Open to exciting roles, collaborations, or just a great conversation about tech."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 xl:gap-16 items-start">

        {/* Left: links */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Say Hello</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Whether you have a project idea, a job opportunity, want to collaborate on open source,
              or just want to geek out about tech — my inbox is always open.
            </p>
          </div>

          <div className="space-y-3">
            {LINKS.map(({ icon: Icon, label, value, href, color, desc }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200"
                style={{ background: 'var(--border-subtle)', border: '1px solid var(--border-medium)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}35`;
                  e.currentTarget.style.background  = `${color}06`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-medium)';
                  e.currentTarget.style.background  = 'var(--border-subtle)';
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</div>
                  <div className="text-sm font-medium truncate transition-colors transition-colors"
                    style={{ color: 'var(--text-secondary)' }}>
                    {value}
                  </div>
                </div>
                <ArrowRight size={14} className="flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                  style={{ color: 'var(--text-muted)' }} />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <MapPin size={12} style={{ color: 'var(--gold-dim)' }} />
            {PERSONAL.location} ·
            {PERSONAL.availableForWork
              ? <span className="text-emerald-500 font-medium ml-1">Open to remote roles</span>
              : ' Not currently available'
            }
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl p-6 sm:p-8"
            style={{
              background:     'var(--bg-surface)',
              border:         '1px solid var(--border-medium)',
              backdropFilter: 'blur(20px)',
              boxShadow:      '0 24px 64px rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${withAlpha(COLORS.gold, 0.25)}, transparent)` }} />
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>// new_message</span>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, ${withAlpha(COLORS.gold, 0.25)}, transparent)` }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField name="name"    label="Name"    placeholder="Jane Doe"         required />
                <FormField name="subject" label="Subject" placeholder="Project idea..."  />
              </div>
              <FormField name="email"   label="Email"   type="email" placeholder="jane@example.com" />
              <FormField name="message" label="Message" as="textarea" placeholder="Hi, I'd like to discuss..." required rows={5} />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-shine w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                  font-semibold text-sm cursor-pointer"
                style={{
                  background: 'var(--gold)',
                  color:      COLORS.bgBase,
                  boxShadow:  `0 4px 20px ${withAlpha(COLORS.gold, 0.2)}`,
                }}
              >
                <Send size={15} />
                Send Message
                <ArrowRight size={14} />
              </motion.button>

              <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                Opens your email client with the message pre-filled.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
