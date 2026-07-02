import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Camera, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const steps = ['Photo', 'Pet Info', 'Owner Info', 'Review'];

interface FormData {
  photo: File | null;
  photoPreview: string;
  name: string;
  breed: string;
  age: string;
  gender: string;
  color: string;
  vaccinated: string;
  ownerName: string;
  phoneNumber: string;
  emergencyContact: string;
  address: string;
  medicalNotes: string;
}

export default function RegisterPet() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    photo: null, photoPreview: '', name: '', breed: '', age: '', gender: '',
    color: '', vaccinated: 'true', ownerName: '', phoneNumber: '',
    emergencyContact: '', address: '', medicalNotes: '',
  });
  const [completed, setCompleted] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file, photoPreview: URL.createObjectURL(file) }));
    }
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleSubmit = () => {
    setCompleted(true);
    setTimeout(() => navigate('/pets'), 2000);
  };

  if (completed) {
    return (
      <div className="success-container">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="success-circle"
        >
          <Check />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="success-title">
          Registration Complete!
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-text">
          Your pet has been registered successfully.
        </motion.p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }} className="space-y-6">
      <div className="page-header">
        <div className="page-icon emerald"><PawPrint /></div>
        <h1 className="page-title">Register Your Pet</h1>
        <p className="page-subtitle">Give your pet a digital identity</p>
      </div>

      {/* Step indicators */}
      <div className="steps">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`step-dot ${i <= step ? 'active' : 'inactive'}`}>{i + 1}</div>
            {i < steps.length - 1 && <div className={`step-line ${i < step ? 'active' : 'inactive'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard className="p-6 lg:p-8" hover={false}>
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="section-heading">Pet Photo</h2>
                <p className="text-muted text-sm">Upload a clear photo of your pet</p>
                <label className="photo-upload" style={{ display: 'block' }}>
                  {formData.photoPreview ? (
                    <img src={formData.photoPreview} alt="Preview" className="photo-preview" />
                  ) : (
                    <div className="flex flex-col items-center" style={{ gap: '12px' }}>
                      <Camera />
                      <p>Click to upload photo</p>
                      <p className="hint">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="photo-upload-input" />
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="section-heading">Pet Information</h2>
                <Input label="Pet Name" placeholder="Enter pet name" value={formData.name} onChange={e => updateField('name', e.target.value)} icon={<PawPrint size={16} />} />
                <div className="grid-2">
                  <Input label="Breed" placeholder="e.g. Golden Retriever" value={formData.breed} onChange={e => updateField('breed', e.target.value)} />
                  <Input label="Age" placeholder="e.g. 2 years" value={formData.age} onChange={e => updateField('age', e.target.value)} />
                </div>
                <div className="grid-2">
                  <Select label="Gender" value={formData.gender} onChange={e => updateField('gender', e.target.value)} options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]} />
                  <Input label="Color" placeholder="e.g. Golden" value={formData.color} onChange={e => updateField('color', e.target.value)} />
                </div>
                <Select label="Vaccinated" value={formData.vaccinated} onChange={e => updateField('vaccinated', e.target.value)} options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="section-heading">Owner Information</h2>
                <Input label="Owner Name" placeholder="Full name" value={formData.ownerName} onChange={e => updateField('ownerName', e.target.value)} />
                <Input label="Phone Number" placeholder="+63 912 345 6789" value={formData.phoneNumber} onChange={e => updateField('phoneNumber', e.target.value)} />
                <Input label="Emergency Contact" placeholder="+63 917 890 1234" value={formData.emergencyContact} onChange={e => updateField('emergencyContact', e.target.value)} />
                <Input label="Address" placeholder="Your complete address" value={formData.address} onChange={e => updateField('address', e.target.value)} />
                <Input label="Medical Notes (optional)" placeholder="Allergies, medications, etc." value={formData.medicalNotes} onChange={e => updateField('medicalNotes', e.target.value)} />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="section-heading">Review & Confirm</h2>
                <div className="review-grid">
                  {formData.photoPreview && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <img src={formData.photoPreview} alt="Pet" style={{ width: '128px', height: '128px', borderRadius: '12px', objectFit: 'cover' }} />
                    </div>
                  )}
                  {[
                    { label: 'Name', value: formData.name },
                    { label: 'Breed', value: formData.breed },
                    { label: 'Age', value: formData.age },
                    { label: 'Gender', value: formData.gender },
                    { label: 'Color', value: formData.color },
                    { label: 'Vaccinated', value: formData.vaccinated === 'true' ? 'Yes' : 'No' },
                    { label: 'Owner', value: formData.ownerName, span: true },
                    { label: 'Phone', value: formData.phoneNumber, span: true },
                    { label: 'Address', value: formData.address, span: true },
                  ].map((item) => (
                    <div key={item.label} className="review-item" style={(item as any).span ? { gridColumn: '1 / -1' } : {}}>
                      <p className="review-label">{item.label}</p>
                      <p className="review-value">{item.value || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
              <Button variant="ghost" onClick={prevStep} disabled={step === 0} icon={<ChevronLeft size={16} />}>Back</Button>
              <Button onClick={nextStep} icon={step === steps.length - 1 ? <Check size={16} /> : <ChevronRight size={16} />}>
                {step === steps.length - 1 ? 'Complete Registration' : 'Next'}
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}