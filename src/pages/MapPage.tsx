import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, User } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockReports } from '@/utils/mockData';
import type { Report } from '@/types';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function MapPage() {
  const [reports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const center: [number, number] = [14.5995, 121.0];

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={12} className="leaflet-container" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reports.map((report) => (
          <Marker key={report.id} position={[report.location.lat, report.location.lng]}
            eventHandlers={{ click: () => setSelectedReport(report) }}>
            <Popup>
              <div style={{ padding: '8px' }}>
                <p style={{ fontWeight: 600 }}>{report.condition}</p>
                <p style={{ fontSize: '13px', color: '#666' }}>{report.location.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <AnimatePresence>
        {selectedReport && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="map-overlay">
            <GlassCard className="p-4" hover={false}>
              <div className="flex items-start gap-3">
                <div style={{ width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={selectedReport.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center justify-between">
                    <h3 style={{ color: 'white', fontWeight: 600 }}>{selectedReport.condition} Condition</h3>
                    <button onClick={() => setSelectedReport(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                      <X size={16} />
                    </button>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }} className="line-clamp-2">{selectedReport.description}</p>
                  <div className="flex items-center gap-3" style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-dim)' }}>
                    <span className="flex items-center gap-1"><MapPin size={12} />{selectedReport.location.address}</span>
                    <span className="flex items-center gap-1"><User size={12} />{selectedReport.userName}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ marginTop: '8px' }}>
                    {selectedReport.injured && <span className="badge badge-pending">Injured</span>}
                    {selectedReport.hungry && <span className="badge badge-pending">Hungry</span>}
                    {selectedReport.lost && <span className="badge badge-pending">Lost</span>}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}