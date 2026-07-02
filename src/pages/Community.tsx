import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Quote } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { mockStories } from '@/utils/mockData';
import type { Story } from '@/types';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

export default function Community() {
  const [stories] = useState<Story[]>(mockStories);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  const toggleLike = (storyId: string) => {
    setLikedStories(prev => {
      const next = new Set(prev);
      if (next.has(storyId)) next.delete(storyId);
      else next.add(storyId);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div className="page-icon rose"><Heart /></div>
        <h1 className="page-title">Community Stories</h1>
        <p className="page-subtitle">Real rescue stories from our community</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6">
        {stories.map((story) => (
          <motion.div key={story.id} variants={item}>
            <GlassCard className="story-card" hover={false}>
              <div className="story-images">
                <div className="story-image-wrap">
                  <img src={story.beforeImage} alt="Before" />
                  <span className="story-label story-label-before">Before</span>
                </div>
                <div className="story-image-wrap">
                  <img src={story.afterImage} alt="After" />
                  <span className="story-label story-label-after">After</span>
                </div>
              </div>
              <div className="story-body">
                <div className="story-quote">
                  <Quote />
                  <div>
                    <h3 className="story-title">{story.title}</h3>
                    <p className="story-date">
                      {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <p className="story-desc">{story.description}</p>
                <div className="story-actions">
                  <button onClick={() => toggleLike(story.id)}
                    className={`story-action-btn ${likedStories.has(story.id) ? 'liked' : ''}`}>
                    <Heart className={likedStories.has(story.id) ? 'filled' : ''} />
                    {likedStories.has(story.id) ? story.likes + 1 : story.likes}
                  </button>
                  <button className="story-action-btn">
                    <Share2 /> Share
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}