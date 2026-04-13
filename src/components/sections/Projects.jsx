import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Star, Layers } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { Badge } from '../ui/Badge';
import { GlowCard } from '../ui/GlowCard';
import { PROJECTS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const CATEGORIES = ['All', ...new Set(PROJECTS.map(p => p.category))];

function FeaturedProject({ project, reverse }) {
  const [hovered, setHovered] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);

  const codeLines = [
    `> initializing ${project.title.split('—')[0].trim().toLowerCase().replace(/\s/g, '_')}`,
    `> loading dependencies...`,
    `> build successful ✓`,
    `> deploying to production`,
  ];

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden transition-all duration-400"
      style={{
        background: 'var(--bg-surface)',
        border:     `1px solid ${hovered ? withAlpha(COLORS.gold, 0.35) : withAlpha(COLORS.gold, 0.12)}`,
        boxShadow:  hovered
          ? `0 24px 72px rgba(0,0,0,0.30), 0 0 0 1px ${withAlpha(COLORS.gold, 0.20)}, 0 0 60px ${withAlpha(COLORS.gold, 0.07)}`
          : '0 4px 24px rgba(0,0,0,0.12)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all 0.35s ease',
      }}
    >
      {/* Gold top beam */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}>

        {/* Preview panel */}
        <div
          className="lg:w-1/2 relative overflow-hidden flex items-center justify-center"
          style={{ minHeight: '240px', background: `linear-gradient(135deg, ${withAlpha(COLORS.gold, 0.10)}, var(--bg-elevated))` }}
        >
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute inset-0 opacity-20 blur-3xl"
            style={{ background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent)` }} />

          <motion.div
            className="relative z-10 w-[82%] max-w-xs rounded-xl overflow-hidden shadow-2xl"
            animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.04 : 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            style={{ border: `1px solid ${withAlpha(COLORS.gold, 0.25)}`, background: 'var(--bg-deeper)' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: `1px solid ${withAlpha(COLORS.gold, 0.10)}` }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <div className="flex-1 mx-3 h-4 rounded-md flex items-center px-2" style={{ background: 'var(--border-subtle)' }}>
                <span className="font-mono text-[9px] truncate" style={{ color: 'var(--text-muted)' }}>
                  {project.liveLink || 'github.com/' + project.githubLink.split('/').slice(-2).join('/')}
                </span>
              </div>
            </div>

            {/* Code terminal lines */}
            <div className="p-4 font-mono text-[10px] space-y-1.5" style={{ color: 'var(--text-muted)' }}>
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.4, x: 0 }}
                  transition={{ delay: hovered ? i * 0.12 : 0, duration: 0.3 }}
                  style={{ color: i === 2 ? COLORS.success : i === 0 ? COLORS.gold : 'var(--text-muted)' }}
                >
                  {line}
                </motion.div>
              ))}
              <div className="flex gap-2 mt-3">
                <div className="h-6 px-3 rounded-md flex items-center text-[9px] font-bold"
                  style={{ background: withAlpha(COLORS.gold, 0.25), color: 'var(--gold)' }}>
                  Live
                </div>
                <div className="h-6 px-3 rounded-md flex items-center text-[9px]"
                  style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                  Source
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute top-4 left-4 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{project.year}</div>
          <div
            className="absolute top-4 right-4 flex items-center gap-1 text-xs font-medium"
            style={{ color: 'var(--gold)' }}
          >
            <Layers size={11} /> {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                <Star size={10} fill="currentColor" /> Featured
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.map(t => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>
          <div className="flex items-center gap-4 pt-4" style={{ borderTop: `1px solid ${withAlpha(COLORS.gold, 0.10)}` }}>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2"
                style={{ color: 'var(--gold)' }}>
                Live Demo <ArrowUpRight size={14} />
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm transition-colors ml-auto hover:opacity-75"
                style={{ color: 'var(--text-muted)' }}>
                <Github size={14} /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
  return (
    <GlowCard className="group cursor-default h-full">
      <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="h-full">
        {/* Color top band with shimmer */}
        <div
          className="h-[2px] w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${project.accentColor}80, ${project.accentColor}, ${project.accentColor}80)` }}
        />

        <div className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-md mb-2 inline-block"
                style={{ background: withAlpha(COLORS.gold, 0.08), color: 'var(--gold)', border: `1px solid ${withAlpha(COLORS.gold, 0.18)}` }}
              >
                {project.category}
              </span>
              <h3 className="font-bold text-base leading-snug" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
            </div>
            <span className="font-mono text-xs ml-3 flex-shrink-0 mt-1" style={{ color: 'var(--text-muted)' }}>{project.year}</span>
          </div>

          <p className="text-sm leading-relaxed mb-4 flex-1 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map(t => <Badge key={t}>{t}</Badge>)}
            {project.techStack.length > 4 && <Badge>+{project.techStack.length - 4}</Badge>}
          </div>

          <div className="flex items-center gap-4 pt-3" style={{ borderTop: `1px solid ${withAlpha(COLORS.gold, 0.08)}` }}>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-75 transition-opacity"
                style={{ color: 'var(--gold)' }}>
                <ExternalLink size={12} /> Live Demo
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs ml-auto transition-colors hover:opacity-75"
                style={{ color: 'var(--text-muted)' }}>
                <Github size={12} /> Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </GlowCard>
  );
}

export function Projects() {
  const [filter, setFilter] = useState('All');
  const featured = PROJECTS.filter(p => p.featured);
  const regular  = PROJECTS.filter(p => !p.featured && (filter === 'All' || p.category === filter));

  return (
    <SectionWrapper id="projects" alt>
      <SectionTitle
        label="Work"
        title="Selected Projects"
        subtitle="Things I've built — from AI platforms to developer tools and real-time apps."
      />

      <motion.div variants={itemVariants} className="space-y-6 mb-14">
        {featured.map((project, i) => (
          <FeaturedProject key={project.id} project={project} reverse={i % 2 !== 0} />
        ))}
      </motion.div>

      {/* Filter pills */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
            style={filter === cat ? {
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldMuted})`,
              color:      COLORS.bgBase,
              boxShadow:  `0 0 24px ${withAlpha(COLORS.gold, 0.30)}`,
              border:     '1px solid transparent',
            } : {
              background: 'transparent',
              border:     '1px solid var(--border-medium)',
              color:      'var(--text-muted)',
            }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {regular.map(project => <ProjectCard key={project.id} project={project} />)}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
