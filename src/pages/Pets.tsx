import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PawPrint, Plus, Search, Syringe, Mars, Venus } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { PetCardSkeleton } from '@/components/ui/LoadingSkeleton';
import { mockPets } from '@/utils/mockData';
import type { Pet } from '@/types';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Pets() {
  const [pets] = useState<Pet[]>(mockPets);
  const [search, setSearch] = useState('');
  const [loading] = useState(false);

  const filtered = pets.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.petId.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="pet-grid">
        {[1, 2, 3].map(i => <PetCardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Registered Pets</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginTop: '4px' }}>{pets.length} pets in the community</p>
        </div>
        <Link to="/register">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fab"
          >
            <Plus />
          </motion.div>
        </Link>
      </div>

      {/* Search */}
      <div className="search-bar">
        <Search />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Pet Grid */}
      <motion.div variants={container} initial="hidden" animate="visible" className="pet-grid">
        {filtered.map((pet) => (
          <motion.div key={pet.id} variants={item}>
            <Link to={`/pets/${pet.id}`} style={{ textDecoration: 'none' }}>
              <GlassCard className="pet-card">
                <div className="pet-card-image">
                  <img src={pet.photoURL} alt={pet.name} />
                </div>
                <div className="pet-card-body">
                  <div className="pet-card-header">
                    <h3 className="pet-card-name">{pet.name}</h3>
                    <span className="badge badge-id">{pet.petId}</span>
                  </div>
                  <p className="pet-card-breed">{pet.breed} • {pet.age}</p>
                  <div className="pet-card-meta">
                    <span className="flex items-center gap-1">
                      {pet.gender === 'Male' ? <Mars style={{ color: '#60a5fa' }} /> : <Venus style={{ color: '#fb7185' }} />}
                      {pet.gender}
                    </span>
                    <span className="flex items-center gap-1">
                      <Syringe style={{ color: pet.vaccinated ? 'var(--primary-light)' : '#fbbf24' }} />
                      {pet.vaccinated ? 'Vaccinated' : 'Not vaccinated'}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <PawPrint />
          <p>No pets found</p>
        </div>
      )}
    </div>
  );
}