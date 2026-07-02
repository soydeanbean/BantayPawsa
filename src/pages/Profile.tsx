import { motion } from 'framer-motion';
import { User, PawPrint, FileText, Shield, Award, LogOut, Settings, ChevronRight, Mail } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { ProfileSkeleton } from '@/components/ui/LoadingSkeleton';
import { useAuthStore } from '@/store/useAuthStore';
import { signInWithGoogle, signOutUser } from '@/firebase/services';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, profile, loading } = useAuthStore();
  const navigate = useNavigate();

  if (loading) return <ProfileSkeleton />;

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-icon-box"><User /></div>
        <div className="auth-text">
          <h2>Welcome to BantayPawsa</h2>
          <p>Sign in to register pets, submit reports, and be part of the community.</p>
        </div>
        <Button onClick={signInWithGoogle} variant="google" size="lg">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }} className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className="p-6" hover={false} style={{ textAlign: 'center' }}>
          <div className="profile-avatar-wrapper">
            <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=10b981&color=fff`}
              alt={user.displayName || ''} className="profile-avatar" />
            {profile?.volunteerBadge && (
              <div className="profile-badge-icon"><Award /></div>
            )}
          </div>
          <h2 className="profile-name">{user.displayName}</h2>
          <p className="profile-email"><Mail size={16} />{user.email}</p>
          {profile?.volunteerBadge && (
            <div className="volunteer-badge"><Award />Volunteer Badge</div>
          )}
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="profile-stats">
        {[
          { label: 'Registered Pets', value: profile?.registeredPets?.length || 0, icon: PawPrint, color: 'text-emerald' },
          { label: 'Reports Submitted', value: profile?.submittedReports?.length || 0, icon: FileText, color: 'text-blue' },
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-4" hover={false} style={{ textAlign: 'center' }}>
            <stat.icon className={stat.color} style={{ width: '24px', height: '24px', margin: '0 auto 8px' }} />
            <p style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>{stat.value}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>{stat.label}</p>
          </GlassCard>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="menu-list">
          <div className="menu-item" onClick={() => navigate('/pets')}>
            <div className="menu-item-left"><PawPrint style={{ color: 'var(--primary-light)' }} /><span>My Pets</span></div>
            <ChevronRight className="chevron" />
          </div>
          <div className="menu-item" onClick={() => navigate('/community')}>
            <div className="menu-item-left"><Shield style={{ color: '#60a5fa' }} /><span>Community</span></div>
            <ChevronRight className="chevron" />
          </div>
          <div className="menu-item" onClick={() => {}}>
            <div className="menu-item-left"><Settings style={{ color: 'var(--text-dim)' }} /><span>Settings</span></div>
            <ChevronRight className="chevron" />
          </div>
          <div className="menu-item" onClick={signOutUser}>
            <div className="menu-item-left"><LogOut style={{ color: 'var(--rose)' }} /><span style={{ color: 'var(--rose)' }}>Sign Out</span></div>
            <ChevronRight style={{ color: 'rgba(244,63,94,0.5)', width: '20px', height: '20px' }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}