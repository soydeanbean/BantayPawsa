import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Camera, CameraOff, AlertCircle, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Html5Qrcode } from 'html5-qrcode';
import { getPetByPetId } from '@/firebase/services';
import { mockPets } from '@/utils/mockData';
import type { Pet } from '@/types';

export default function QRScanner() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Pet | null>(null);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [scannedId, setScannedId] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const startScanner = async () => {
    setError('');
    setResult(null);
    setNotFound(false);
    setScannedId('');

    try {
      // Wait for DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!containerRef.current) {
        setError('Scanner container not found');
        return;
      }

      const scanner = new Html5Qrcode('qr-scanner-container');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => onScanSuccess(decodedText),
        () => {} // Ignore scan failures
      );

      setScanning(true);
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please ensure you have granted camera permissions and are using HTTPS.');
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
      }
    } catch (err) {
      console.error('Stop error:', err);
    }
    setScanning(false);
  };

  const onScanSuccess = async (decodedText: string) => {
    await stopScanner();
    setScannedId(decodedText);

    try {
      const pet = await getPetByPetId(decodedText);
      if (pet) {
        setResult(pet);
        return;
      }
    } catch (err) {
      console.error('Firebase lookup error:', err);
    }

    const mockPet = mockPets.find((p: Pet) => p.petId === decodedText);
    if (mockPet) {
      setResult(mockPet);
    } else {
      setNotFound(true);
    }
  };

  const handleRegisterTag = () => navigate(`/register?petId=${scannedId}`);

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }} className="space-y-6">
      <div className="page-header">
        <div className="page-icon blue"><QrCode /></div>
        <h1 className="page-title">QR Scanner</h1>
        <p className="page-subtitle">Scan a pet's QR tag to identify them</p>
      </div>

      <GlassCard className="p-6" hover={false}>
        <div className="space-y-4">
          <div
            id="qr-scanner-container"
            ref={containerRef}
            className="scanner-box"
            style={{
              minHeight: '300px',
              background: scanning ? 'black' : 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}
          >
            {!scanning && (
              <div className="scanner-placeholder">
                <Camera />
                <p>Camera preview will appear here</p>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            {!scanning ? (
              <Button onClick={startScanner} icon={<Camera size={16} />} size="lg">
                Start Scanning
              </Button>
            ) : (
              <Button onClick={stopScanner} variant="danger" icon={<CameraOff size={16} />}>
                Stop Scanner
              </Button>
            )}
          </div>
        </div>
      </GlassCard>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="alert alert-error"
          >
            <AlertCircle /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlassCard className="found-pet-card" onClick={() => navigate(`/pets/${result.id}`)}>
              <div className="found-pet-inner">
                <div className="found-icon green"><CheckCircle /></div>
                <div>
                  <p className="found-label green">PET FOUND</p>
                  <h3 className="found-name">{result.name}</h3>
                  <p className="found-detail">{result.petId} • {result.breed}</p>
                </div>
              </div>
              <div className="progress-bar" />
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlassCard className="p-6" hover={false}>
              <div className="found-pet-inner mb-4">
                <div className="found-icon amber"><AlertCircle /></div>
                <div>
                  <p className="found-label amber">NOT REGISTERED</p>
                  <p className="found-name">Tag: {scannedId}</p>
                  <p className="found-detail">This tag has not been registered yet.</p>
                </div>
              </div>
              <Button onClick={handleRegisterTag} className="btn-block" icon={<QrCode size={16} />}>
                Register This Tag
              </Button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}