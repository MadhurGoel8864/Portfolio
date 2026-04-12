import { motion } from 'framer-motion';
import { Mail, MapPin, GraduationCap, Download, ExternalLink } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { GlowCard } from '../ui/GlowCard';
import { Button } from '../ui/Button';
import { PERSONAL, EDUCATION, SOCIAL, STATS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const TIMELINE = [
  { year: "2019", event: "Started CS degree at State University" },
  { year: "2022", event: "First internship — ML Research Lab" },
  { year: "2022", event: "Built first production SaaS app" },
  { year: "2023", event: "Graduated with 3.9 GPA" },
  { year: "2023", event: "Joined TechCorp as SWE II" },
  { year: "2024", event: "500+ GitHub stars, LeetCode Knight" },
];

export function About() {
  return (
    <SectionWrapper id="about" alt>
      <SectionTitle
        label="About Me"
        title="The Person Behind the Code"
        subtitle="A developer who cares about quality, UX, and the craft of building things that last."
      />

      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">

        {/* Left */}
        <div className="flex flex-col gap-8">
          <motion.div variants={itemVariants}>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {PERSONAL.bio}
            </p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-2.5">
                <MapPin size={14} style={{ color: 'var(--gold)' }} className="flex-shrink-0" />
                {PERSONAL.location} · Open to remote
              </span>
              <span className="flex items-center gap-2.5">
                <Mail size={14} style={{ color: 'var(--gold)' }} className="flex-shrink-0" />
                {PERSONAL.email}
              </span>
              <span className="flex items-center gap-2.5">
                <GraduationCap size={14} style={{ color: 'var(--gold)' }} className="flex-shrink-0" />
                {EDUCATION[0].degree} · {EDUCATION[0].school} · {EDUCATION[0].gpa} GPA
              </span>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            <h3 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
              // journey
            </h3>
            <div className="relative pl-4 space-y-4" style={{ borderLeft: '1px solid var(--border-medium)' }}>
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="relative"
                >
                  <div
                    className="absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full"
                    style={{
                      background:  i === TIMELINE.length - 1 ? 'var(--gold)' : 'var(--bg-elevated)',
                      border:      `2px solid ${i === TIMELINE.length - 1 ? 'var(--gold)' : 'var(--border-medium)'}`,
                    }}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--gold)' }}>{t.year}</span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t.event}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-3">
            <Button variant="primary" href={SOCIAL.resumeLink} download>
              <Download size={14} /> Download Resume
            </Button>
            <Button variant="outline" href={SOCIAL.linkedin}>
              <ExternalLink size={14} /> LinkedIn
            </Button>
          </motion.div>
        </div>

        {/* Right: stat cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 content-start">
          {STATS.map((stat, i) => (
            <GlowCard key={stat.label} className="p-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300 }}
              >
                <div className="text-4xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </motion.div>
            </GlowCard>
          ))}

          <GlowCard className="col-span-2 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ background: withAlpha(COLORS.gold, 0.08), border: `1px solid ${withAlpha(COLORS.gold, 0.2)}` }}>
              <GraduationCap size={18} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{EDUCATION[0].degree}</div>
              <div className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                {EDUCATION[0].school} · {EDUCATION[0].duration}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {EDUCATION[0].highlights.map(h => (
                  <span key={h}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                    style={{ color: 'var(--text-muted)', background: 'var(--border-subtle)', border: '1px solid var(--border-medium)' }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
