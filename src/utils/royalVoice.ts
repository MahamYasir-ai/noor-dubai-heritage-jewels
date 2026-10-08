// Royal Voice Concierge Synthesizer for NOOR DUBAI Haute Joaillerie
// Crafts an aristocratic, stately royal narration experience

export interface RoyalSpeechOptions {
  textEn: string;
  textAr: string;
  isAr: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

class RoyalVoiceService {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking: boolean = false;
  private isVoiceMuted: boolean = false;
  private availableVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.availableVoices = this.synth.getVoices();
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  /**
   * Finds the most stately, aristocratic voice available on the device
   */
  private findRoyalVoice(isAr: boolean): SpeechSynthesisVoice | null {
    if (!this.availableVoices.length && this.synth) {
      this.availableVoices = this.synth.getVoices();
    }
    const voices = this.availableVoices;

    if (isAr) {
      // Prioritize Gulf / Arabic voices
      const arVoice = voices.find(v => 
        (v.lang.startsWith('ar') || v.lang.includes('SA') || v.lang.includes('AE')) &&
        (v.name.includes('Maged') || v.name.includes('Tarik') || v.name.includes('Laila') || v.name.includes('Natural'))
      ) || voices.find(v => v.lang.startsWith('ar'));
      return arVoice || null;
    }

    // For English: Prefer aristocratic British or Premium Natural voices (RP / BBC / Royal Court cadence)
    const royalUkVoices = voices.find(v => 
      (v.lang === 'en-GB' || v.lang.startsWith('en_GB')) &&
      (v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('Serena') || v.name.includes('Victoria') || v.name.includes('Natural') || v.name.includes('Google UK English Female'))
    ) || voices.find(v => v.lang === 'en-GB') 
      || voices.find(v => v.name.includes('Natural') && v.lang.startsWith('en'))
      || voices.find(v => v.lang.startsWith('en'));

    return royalUkVoices || null;
  }

  /**
   * Speak with royal cadence, measured pace, and majestic dignity
   */
  public speak(options: RoyalSpeechOptions) {
    if (!this.synth) return;
    if (this.isVoiceMuted) return;

    this.synth.cancel(); // Stop any pending speech

    const textToSpeak = options.isAr ? options.textAr : options.textEn;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const voice = this.findRoyalVoice(options.isAr);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = options.isAr ? 'ar-AE' : 'en-GB';
    }

    // Aristocratic royal cadence: slightly slower for dignified majesty
    utterance.rate = options.isAr ? 0.90 : 0.88;
    // Resonant composed pitch
    utterance.pitch = options.isAr ? 1.0 : 0.95;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (options.onEnd) options.onEnd();
    };

    this.synth.speak(utterance);
  }

  public toggleMute(): boolean {
    this.isVoiceMuted = !this.isVoiceMuted;
    if (this.isVoiceMuted) {
      this.stop();
    }
    return this.isVoiceMuted;
  }

  public isMuted(): boolean {
    return this.isVoiceMuted;
  }
}

export const royalVoice = new RoyalVoiceService();

export const ROYAL_NARRATIONS = {
  welcome: {
    en: "Welcome to the Royal House of Noor Dubai. Enter our private sovereign vaults, where centuries of Emirati heritage, pure twenty-one karat gold, and royal bridal heirlooms radiate with eternal dignity.",
    ar: "أهلاً ومرحباً بكم في دار نور دبي للمجوهرات الراقية. ادخلوا خزائننا الملكية الخاصة، حيث يلتقي التراث الإماراتي العريق بالذهب الخالص عيار واحد وعشرين قيراطاً."
  },
  mirtasha: {
    en: "You are admiring the Emirati Mirtasha Bib Necklace. Two hundred and eighty grams of hand-chiseled sovereign gold, draped in layered coin cascades to crown the Gulf bride with peerless majesty.",
    ar: "تتأملون الآن طوق المرتعشة الإماراتية التراثية الكبرى. مئتان وثمانون غراماً من الذهب الخالص عيار واحد وعشرين تتوج العروس الخليجية بهيبة لا تضاهى."
  },
  bangles: {
    en: "The Hab Al Hail Royal Bangles. Forged with the ancient granulated cardamom motif, an enduring emblem of Arabian generosity and royal hospitality.",
    ar: "أساور حب الهيل التراثية الملكية. منقوشة بنقش حب الهيل العربي التاريخي الذي يرمز لأصالة الكرم وحفاوة الضيافة."
  },
  vault: {
    en: "You have arrived at the Sovereign Vault of Noor Dubai. Each piece is hallmarked by Dubai Central Laboratories and preserved for royal lineage.",
    ar: "لقد وصلتم إلى الخزانة السيادية لدار نور دبي. كل قطعة موثقة بختم مختبرات دبي المركزية ومصوغة لتتوارثها الأجيال."
  }
};
