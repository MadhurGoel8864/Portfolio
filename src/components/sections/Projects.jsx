import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Star } from 'lucide-react';
import { SectionWrapper, itemVariants } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { Badge } from '../ui/Badge';
import { GlowCard } from '../ui/GlowCard';
import { PROJECTS } from '../../constants/global';
import { COLORS, withAlpha } from '../../constants/theme';

const CATEGORIES = ['All', ...new Set(PROJECTS.map(p => p.category))];

function FeaturedProject({ project, reverse }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--bg-surface)',
        border:     `1px solid ${project.accentColor}25`,
        boxShadow:  hovered ? `0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px ${project.accentColor}25` : 'none',
      }}
    >
      {/* Hover tint overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${project.accentColor}10, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}>

        {/* Preview panel */}
        <div
          className="lg:w-1/2 relative overflow-hidden flex items-center justify-center"
          style={{ minHeight: '220px', background: `linear-gradient(135deg, ${project.accentColor}12, var(--bg-elevated))` }}
        >
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="absolute inset-0 opacity-15 blur-3xl"
            style={{ background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent)` }} />

          <motion.div
            className="relative z-10 w-[80%] max-w-xs rounded-xl overflow-hidden shadow-2xl"
            animate={{ y: hovered ? -6 : 0, scale: hovered ? 1.03 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ border: `1px solid ${project.accentColor}30`, background: 'var(--bg-base)' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="w-2 h-2 rounded-full bg-red-400/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <div className="w-2 h-2 rounded-full bg-green-400/60" />
              <div className="flex-1 mx-3 h-4 rounded-md flex items-center px-2" style={{ background: 'var(--border-subtle)' }}>
                <span className="font-mono text-[9px] truncate" style={{ color: 'var(--text-muted)' }}>{project.liveLink}</span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="h-3 rounded-md w-3/4" style={{ background: `${project.accentColor}30` }} />
              <div className="h-2 rounded-md w-full" style={{ background: 'var(--border-subtle)' }} />
              <div className="h-2 rounded-md w-5/6" style={{ background: 'var(--border-subtle)' }} />
              <div className="mt-3 flex gap-2">
                <div className="h-6 w-16 rounded-lg" style={{ background: `${project.accentColor}40` }} />
                <div className="h-6 w-12 rounded-lg" style={{ background: 'var(--border-subtle)' }} />
              </div>
            </div>
          </motion.div>

          <div className="absolute top-4 left-4 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{project.year}</div>
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{ background: `${project.accentColor}12`, color: project.accentColor, border: `1px solid ${project.accentColor}25` }}>
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-amber-500">
                <Star size={10} fill="currentColor" /> Featured
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.map(t => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>
          <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: project.accentColor }}>
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
    <GlowCard className="group cursor-default">
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
        {/* Color top band */}
        <div className="h-1 w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}60)` }} />

        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md mb-2 inline-block"
                style={{ background: `${project.accentColor}10`, color: project.accentColor, border: `1px solid ${project.accentColor}20` }}>
                {project.category}
              </span>
              <h3 className="font-bold text-base leading-snug" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
            </div>
            <span className="font-mono text-xs ml-3 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{project.year}</span>
          </div>

          <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map(t => <Badge key={t}>{t}</Badge>)}
            {project.techStack.length > 4 && <Badge>+{project.techStack.length - 4}</Badge>}
          </div>

          <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-75 transition-opacity"
                style={{ color: project.accentColor }}>
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

      <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
            style={filter === cat ? {
              background: 'var(--gold)',
              color:      COLORS.bgBase,
              boxShadow:  `0 0 20px ${withAlpha(COLORS.gold, 0.25)}`,
              border:     '1px solid transparent',
            } : {
              background: 'var(--border-subtle)',
              border:     '1px solid var(--border-medium)',
              color:      'var(--text-secondary)',
            }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {regular.map(project => <ProjectCard key={project.id} project={project} />)}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
