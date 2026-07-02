import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PawPrint, QrCode, FileText, Heart, ChevronRight, MapPin, Clock } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { DashboardSkeleton } from '@/components/ui/LoadingSkeleton';
import { mockStats, mockReports, mockStories } from '@/utils/mockData';
import type { CommunityStats, Report } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' as const } }
};

const quickActions = [
  { to: '/register', icon: PawPrint, label: 'Register Pet', color: 'qa-emerald', desc: 'Get a QR tag' },
  { to: '/scanner', icon: QrCode, label: 'Scan QR', color: 'qa-blue', desc: 'Identify a pet' },
  { to: '/report', icon: FileText, label: 'Report Animal', color: 'qa-amber', desc: 'Help strays' },
];

export default function Home() {
  const [stats] = useState<CommunityStats>(mockStats);
  const [reports] = useState<Report[]>(mockReports.slice(0, 3));
  const [loading] = useState(false);

  if (loading) return <DashboardSkeleton />;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Welcome Card */}
      <motion.div variants={itemVariants}>
        <GlassCard className="welcome-card" hover={false}>
          <div className="welcome-glow" />
          <div className="welcome-content p-6 lg:p-8">
            <div className="welcome-header">
              <div className="welcome-icon"><PawPrint /></div>
              <div>
                <h1 className="welcome-title">BantayPawsa</h1>
                <p className="welcome-tagline">Bantay Aso at Pusa — Protecting every paw.</p>
              </div>
            </div>
            <p className="welcome-text">
              Together, we can reunite lost pets with their families and build a safer community for every dog and cat.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div className="quick-actions">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to} className={`quick-action-card ${action.color}`}>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                <action.icon />
              </motion.div>
              <h3>{action.label}</h3>
              <p>{action.desc}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6" hover={false}>
          <h2 className="section-title mb-4">Community Impact</h2>
          <div className="grid-4">
            {[
              { label: 'Registered Pets', value: stats.totalPets, icon: PawPrint, color: 'text-emerald' },
              { label: 'Reports Submitted', value: stats.totalReports, icon: FileText, color: 'text-blue' },
              { label: 'Successful Rescues', value: stats.totalRescues, icon: Heart, color: 'text-rose' },
              { label: 'Active Volunteers', value: stats.activeVolunteers, icon: MapPin, color: 'text-amber' },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <stat.icon className={stat.color} />
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="stat-value"
                >
                  {stat.value.toLocaleString()}
                </motion.p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Recent Reports */}
      <motion.div variants={itemVariants}>
        <div className="section-header">
          <h2 className="section-title">Recent Reports</h2>
          <Link to="/report" className="section-link">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-4">
          {reports.map((report) => (
            <GlassCard key={report.id} className="report-card">
              <div className="report-card-img">
                <img src={report.photoURL} alt="" />
              </div>
              <div className="report-card-body">
                <p className="report-card-desc truncate">{report.description}</p>
                <div className="report-card-meta">
                  <span><MapPin size={14} /> {report.location.address}</span>
                  <span><Clock size={14} /> {Math.floor((Date.now() - report.createdAt) / 86400000)}d ago</span>
                </div>
              </div>
              <span className={`badge ${report.status === 'resolved' ? 'badge-resolved' : 'badge-pending'}`}>
                {report.status}
              </span>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Rescue Stories Preview */}
      <motion.div variants={itemVariants}>
        <div className="section-header">
          <h2 className="section-title">Rescue Stories</h2>
          <Link to="/community" className="section-link">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid-2">
          {mockStories.slice(0, 2).map((story) => (
            <GlassCard key={story.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Heart size={20} className="text-rose" />
                <h3 className="text-lg font-semibold text-white">{story.title}</h3>
              </div>
              <p className="text-muted text-sm line-clamp-3">{story.description}</p>
              <div className="flex items-center gap-2 mt-3 text-rose text-sm">
                <Heart size={16} />
                <span>{story.likes} likes</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}