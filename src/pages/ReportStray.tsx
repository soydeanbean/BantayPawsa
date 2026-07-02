import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Camera, MapPin, Send, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ReportStray() {
  const [photoPreview, setPhotoPreview] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [injured, setInjured] = useState(false);
  const [hungry, setHungry] = useState(false);
  const [lost, setLost] = useState(false);
  const [aggressive, setAggressive] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success-container">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="success-circle">
          <Send />
        </motion.div>
        <h2 className="success-title">Report Submitted!</h2>
        <p className="success-text">
          Thank you for caring. Our team will review the report and take action.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="secondary">Submit Another Report</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }} className="space-y-6">
      <div className="page-header">
        <div className="page-icon amber"><FileText /></div>
        <h1 className="page-title">Report a Stray Animal</h1>
        <p className="page-subtitle">Help us help them</p>
      </div>

      <form onSubmit={handleSubmit}>
        <GlassCard className="p-6" hover={false}>
          <div className="space-y-5">
            <div>
              <label className="form-label">Photo</label>
              <label style={{ display: 'block' }}>
                <div className="photo-upload">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="photo-preview" />
                  ) : (
                    <div className="flex flex-col items-center" style={{ gap: '8px' }}>
                      <Camera />
                      <p>Upload animal photo</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="photo-upload-input" />
                </div>
              </label>
            </div>

            <div>
              <label className="form-label">Condition</label>
              <div className="condition-grid">
                {['Good', 'Fair', 'Poor'].map(c => (
                  <button key={c} type="button" onClick={() => setCondition(c)}
                    className={`condition-btn ${condition === c ? 'selected' : ''}`}>{c}</button>
                ))}
              </div>
            </div>

            <Input label="Location" placeholder="Where did you see the animal?" value={address}
              onChange={e => setAddress(e.target.value)} icon={<MapPin size={16} />} />

            <div>
              <label className="form-label">Status</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'hungry', label: 'Hungry' }, { key: 'injured', label: 'Injured' },
                  { key: 'lost', label: 'Lost' }, { key: 'aggressive', label: 'Aggressive' },
                  { key: 'pregnant', label: 'Pregnant' }
                ].map((tag) => (
                  <button key={tag.key} type="button"
                    onClick={() => {
                      const setters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {
                        hungry: setHungry, injured: setInjured, lost: setLost,
                        aggressive: setAggressive, pregnant: setPregnant
                      };
                      setters[tag.key](prev => !prev);
                    }}
                    className={`tag ${(tag.key === 'hungry' && hungry) || (tag.key === 'injured' && injured) ||
                      (tag.key === 'lost' && lost) || (tag.key === 'aggressive' && aggressive) ||
                      (tag.key === 'pregnant' && pregnant) ? 'tag-selected' : 'tag-unselected'}`}>
                    <AlertTriangle size={14} />{tag.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea className="input-field" placeholder="Describe the animal's appearance, behavior..."
                value={description} onChange={e => setDescription(e.target.value)} rows={4} />
            </div>

            <Button type="submit" className="btn-block" icon={<Send size={16} />} size="lg">Submit Report</Button>
          </div>
        </GlassCard>
      </form>
    </div>
  );
}