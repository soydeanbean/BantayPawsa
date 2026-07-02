import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`skeleton ${className}`}
      style={style}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton style={{ height: '200px', width: '100%' }} />
      <div className="grid-2">
        <Skeleton style={{ height: '96px' }} />
        <Skeleton style={{ height: '96px' }} />
        <Skeleton style={{ height: '96px' }} />
        <Skeleton style={{ height: '96px' }} />
      </div>
      <Skeleton style={{ height: '128px' }} />
      <Skeleton style={{ height: '128px' }} />
    </div>
  );
}

export function PetCardSkeleton() {
  return (
    <div className="glass-card" style={{ padding: '16px' }}>
      <div className="space-y-4">
        <Skeleton style={{ height: '180px', width: '100%', borderRadius: '12px' }} />
        <Skeleton style={{ height: '24px', width: '75%' }} />
        <Skeleton style={{ height: '16px', width: '50%' }} />
        <Skeleton style={{ height: '16px', width: '66%' }} />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6" style={{ textAlign: 'center' }}>
      <div className="flex flex-col items-center" style={{ gap: '16px' }}>
        <Skeleton style={{ width: '96px', height: '96px', borderRadius: '16px' }} />
        <Skeleton style={{ height: '24px', width: '192px' }} />
        <Skeleton style={{ height: '16px', width: '128px' }} />
      </div>
      <Skeleton style={{ height: '128px', width: '100%' }} />
      <Skeleton style={{ height: '96px', width: '100%' }} />
    </div>
  );
}