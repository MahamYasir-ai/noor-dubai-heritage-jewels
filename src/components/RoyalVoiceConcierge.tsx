import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Play, Square, ChevronUp, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { royalVoice, ROYAL_NARRATIONS } from '../utils/royalVoice';
import { playCelestialChord, playChime } from '../utils/sound';

interface RoyalVoiceProps {
  lang: Language;
}

export const RoyalVoiceConcierge: React.FC<RoyalVoiceProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<'welcome' | 'mirtasha' | 'bangles' | 'vault'>('welcome');

  const topics = [
    { id: 'welcome', labelEn: 'Royal House Introduction', labelAr: 'التقديم الملكي لدار نور دبي' },
    { id: 'mirtasha', labelEn: '280g Mirtasha Bib Narration', labelAr: 'طوق المرتعشة التراثي' },
    { id: 'bangles', labelEn: 'Hab Al Hail Bangles Tale', labelAr: 'رمزية أساور حب الهيل' },
    { id: 'vault', labelEn: 'Sovereign Vault Secrets', labelAr: 'أسرار الخزانة السيادية' }
  ];

  const handlePlayVoice = (topicKey: 'welcome' | 'mirtasha' | 'bangles' | 'vault') => {
    setSelectedTopic(topicKey);
    playCelestialChord();

    const narration = ROYAL_NARRATIONS[topicKey];
    royalVoice.speak({
      textEn: narration.en,
      textAr: narration.ar,
      isAr,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false)
    });
  };

  const handleStopVoice = () => {
    royalVoice.stop();
    setIsPlaying(false);
    playChime(420);
  };

  // Stop narration if component unmounts
  useEffect(() => {
    return () => {
      royalVoice.stop();
    };
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-in slide-in-from-bottom-5 duration-500">
      
      {/* Expanded Topics Selection Menu */}
      {isExpanded && (
        <div className="mb-2 bg-[#FFFDF9]/95 backdrop-blur-md border-2 border-[#D4AF37]/50 rounded-md p-4 w-72 sm:w-80 shadow-[0_20px_50px_rgba(180,134,40,0.25)] text-[#2D1B0F] animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-[#EEDFCD] pb-2 mb-3">
            <span className="text-[11px] font-bold text-[#8C6418] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B48628]" />
              {isAr ? 'المرشد الصوتي الملكي' : 'ROYAL VOICE CONCIERGE'}
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-[#8C7662] hover:text-[#B48628] p-1"
            >
              ✕
            </button>
          </div>

          <p className="text-[11px] text-[#5C4533] mb-3 leading-relaxed">
            {isAr
              ? 'استمع إلى السرد الصوتي الملكي للتعرف على تراث وأسرار قطع نور دبي.'
              : 'Listen to dignified royal narrations detailing the heritage and provenance of Noor Dubai.'}
          </p>

          <div className="space-y-1.5">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => handlePlayVoice(t.id as 'welcome' | 'mirtasha' | 'bangles' | 'vault')}
                className={`w-full text-left rtl:text-right px-3 py-2 text-xs rounded-sm transition-all flex items-center justify-between font-medium cursor-pointer ${
                  selectedTopic === t.id && isPlaying
                    ? 'bg-[#B48628] text-white shadow-sm font-bold'
                    : 'bg-[#FAF1E3] hover:bg-[#F3E5D2] text-[#3E2917]'
                }`}
              >
                <span>{isAr ? t.labelAr : t.labelEn}</span>
                {selectedTopic === t.id && isPlaying ? (
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                ) : (
                  <Play className="w-3 h-3 text-[#B48628]" />
                )}
              </button>
            ))}
          </div>

          {isPlaying && (
            <button
              onClick={handleStopVoice}
              className="w-full mt-3 py-2 bg-[#FAF1E3] border border-[#D4AF37]/50 hover:bg-[#F3E5D2] text-[#8C6418] text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Square className="w-3 h-3 text-[#B48628]" />
              <span>{isAr ? 'إيقاف السرد الصوتي' : 'Stop Narration'}</span>
            </button>
          )}
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (isPlaying) {
              handleStopVoice();
            } else {
              handlePlayVoice(selectedTopic);
            }
          }}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border-2 border-[#D4AF37] shadow-[0_10px_30px_rgba(180,134,40,0.3)] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider ${
            isPlaying
              ? 'bg-gradient-to-r from-[#B48628] to-[#8C6418] text-white animate-pulse'
              : 'bg-[#FFFDF9] hover:bg-[#FAF1E3] text-[#8C6418]'
          }`}
          title={isAr ? 'المرشد الصوتي الملكي' : 'Royal Voice Concierge'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-white" />
              <span>{isAr ? 'جارٍ السرد الملكي...' : 'ROYAL VOICE SPEAKING...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#B48628]" />
              <span>{isAr ? 'استمع للسرد الملكي' : 'HEAR ROYAL VOICE'}</span>
            </>
          )}
        </button>

        {/* Options / Toggle Panel */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2.5 bg-[#FFFDF9] border-2 border-[#D4AF37] rounded-full text-[#8C6418] hover:bg-[#FAF1E3] shadow-md transition-all cursor-pointer"
          title="Choose Royal Voice Topic"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};
