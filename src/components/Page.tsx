import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[70vh] pt-28"
    >
      {children}
    </motion.main>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Stagger className="mx-auto max-w-6xl px-6 pb-12">
      <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        {eyebrow}
      </motion.p>
      <motion.h1 variants={item} className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">
        {title}
      </motion.h1>
      {text && (
        <motion.p variants={item} className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {text}
        </motion.p>
      )}
    </Stagger>
  );
}
