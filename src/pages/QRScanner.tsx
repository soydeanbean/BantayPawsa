import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Camera, CameraOff, AlertCircle, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
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
  const [hasCamera, setHasCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if camera is available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setHasCamera(true);
    }
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError('');
      setResult(null);
      setNotFound(false);
      setScannedId('');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setScanning(true);
        
        // Start scanning for QR codes
        startQRScanning();
        
        // For demo: simulate QR scan after 3 seconds if camera is working
        // In production, integrate with a QR detection library
        setTimeout(() => {
          if (scanning) {
            // Demo: automatically find a pet after camera starts
            const demoPet = mockPets[0];
            if (demoPet) {
              handleScanSuccess(demoPet.petId);
            }
          }
        }, 3000);
      }
    } catch (err) {
      console.error('Camera error:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Camera error: ${message}. Please grant camera permissions.`);
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const startQRScanning = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const scanInterval = setInterval(() => {
      if (!scanning || !video.videoWidth) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Simple QR code detection using image data
      // For production, use a proper QR library
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // For demo, we'll just check if there's a QR code in the center
      // In production, integrate with a QR detection library
    }, 500);

    // Store interval ID for cleanup
    return scanInterval;
  };

  // Store scan interval ID
  const scanIntervalRef = useRef<number | null>(null);

  const handleScanSuccess = async (decodedText: string) => {
    await stopCamera();
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
          <div className="scanner-box" style={{ position: 'relative', minHeight: '400px', background: 'black', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {scanning ? (
              <>
                <video
                  ref={videoRef}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  playsInline
                  autoPlay
                  muted
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </>
            ) : (
              <div className="scanner-placeholder">
                <Camera />
                <p>Camera preview will appear here</p>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            {!scanning ? (
              <Button onClick={startCamera} icon={<Camera size={16} />} size="lg">
                Start Scanning
              </Button>
            ) : (
              <Button onClick={stopCamera} variant="danger" icon={<CameraOff size={16} />}>
                Stop Scanner
              </Button>
            )}
          </div>
        </div>
      </GlassCard>

      {!hasCamera && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="alert alert-error"
        >
          <AlertCircle /> Camera not supported on this device
        </motion.div>
      )}

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