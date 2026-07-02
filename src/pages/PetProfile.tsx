import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, PawPrint, Phone, MapPin, Shield, QrCode, Download } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { PetCardSkeleton } from '@/components/ui/LoadingSkeleton';
import { getPetById } from '@/firebase/services';
import { mockPets } from '@/utils/mockData';
import type { Pet } from '@/types';

export default function PetProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const loadPet = async () => {
      try {
        if (id) {
          const found = await getPetById(id);
          if (found) { setPet(found); setLoading(false); return; }
        }
      } catch {}
      const mockPet = mockPets.find(p => p.id === id);
      setPet(mockPet || null);
      setLoading(false);
    };
    loadPet();
  }, [id]);

  if (loading) return <PetCardSkeleton />;
  if (!pet) {
    return (
      <div className="empty-state">
        <PawPrint />
        <p>Pet not found</p>
        <Button onClick={() => navigate('/pets')} variant="ghost" style={{ marginTop: '16px' }}>Back to Pets</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }} className="space-y-6">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <GlassCard className="overflow-hidden" hover={false}>
          <div style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '2/1', overflow: 'hidden' }}>
              <img src={pet.photoURL} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '360px' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.7))' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>{pet.name}</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>{pet.breed} • {pet.age}</p>
              </div>
              <span className="badge badge-id" style={{ fontSize: '13px', padding: '8px 14px' }}>{pet.petId}</span>
            </div>
          </div>

          <div style={{ padding: '24px' }} className="space-y-6">
            <div className="info-grid">
              <div className="info-box"><p className="info-box-label">Gender</p><p className="info-box-value">{pet.gender}</p></div>
              <div className="info-box"><p className="info-box-label">Color</p><p className="info-box-value">{pet.color}</p></div>
              <div className="info-box"><p className="info-box-label">Vaccinated</p><p className="info-box-value" style={{ color: pet.vaccinated ? 'var(--primary-light)' : '#fbbf24' }}>{pet.vaccinated ? 'Yes' : 'No'}</p></div>
              <div className="info-box"><p className="info-box-label">Registered</p><p className="info-box-value" style={{ fontSize: '13px' }}>{new Date(pet.createdAt).toLocaleDateString()}</p></div>
            </div>

            <div>
              <h3 className="section-heading">Owner Information</h3>
              <div className="contact-list">
                <div className="contact-item"><Shield className="c-emerald" />{pet.ownerName}</div>
                <div className="contact-item"><Phone className="c-blue" />{pet.phoneNumber}</div>
                <div className="contact-item"><Phone className="c-rose" /><span style={{ fontSize: '13px' }}>Emergency: {pet.emergencyContact}</span></div>
                <div className="contact-item"><MapPin className="c-amber" />{pet.address}</div>
              </div>
            </div>

            {pet.medicalNotes && (
              <div>
                <h3 className="section-heading">Medical Notes</h3>
                <div className="medical-notes">{pet.medicalNotes}</div>
              </div>
            )}

            <div>
              <Button onClick={() => setShowQR(!showQR)} variant="secondary" icon={<QrCode size={16} />} className="btn-block">
                {showQR ? 'Hide QR Code' : 'View QR Code'}
              </Button>
              {showQR && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="qr-container">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${pet.petId}`} alt={`QR for ${pet.petId}`} />
                  <p className="qr-id">{pet.petId}</p>
                  <p className="qr-label">Scan to identify this pet</p>
                  <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${pet.petId}`} download={`${pet.petId}-qr.png`} className="download-btn">
                    <Download size={16} /> Download QR
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}