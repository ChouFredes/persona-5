import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type PageFrameProps = PropsWithChildren<{
  title: string;
  subtitle: string;
}>;

export function PageFrame({ title, subtitle, children }: PageFrameProps) {
  return (
    <motion.section
      className="page-frame"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
    >
      <p className="section-kicker">{subtitle}</p>
      <h2>{title}</h2>
      <div className="content-panel">{children}</div>
    </motion.section>
  );
}
