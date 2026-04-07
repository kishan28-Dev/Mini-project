import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, Sparkles, HeartPulse } from 'lucide-react';
import { analyzeEmotion, getStats, getDailyShlok } from '../services/api';

const predefinedEmotions = ['Anxiety', 'Depression', 'Stress', 'Low Confidence', 'Anger', 'Confusion'];

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ totalHealed: 0 });
  const [dailyShlok, setDailyShlok] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch stats and daily shlok on component mount
    const fetchInitialData = async () => {
      try {
        const [statsData, shlokData] = await Promise.all([getStats(), getDailyShlok()]);
        setStats(statsData);
        setDailyShlok(shlokData);
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    setIsLoading(true);
    try {
      const response = await analyzeEmotion(textInput);
      // Pass the response data to the Result page via router state
      navigate('/result', { state: { resultData: response } });
    } catch (error) {
      console.error("Error analyzing emotion", error);
      alert("Failed to connect to the guidance engine. Please try again.");
      setIsLoading(false);
    }
  };

  const handleChipClick = (emotion) => {
    setTextInput(`I am feeling a lot of ${emotion.toLowerCase()} right now. Can you help me?`);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-saffron-900 tracking-tight">
          Find Peace in Ancient Wisdom
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Describe what you are going through, or select an emotion below. Our AI will guide you to the exact verse from the Bhagavad Gita that speaks to your current state of mind.
        </p>
      </section>

      {/* Input Section */}
      <section className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-saffron-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              rows="4"
              className="w-full bg-saffron-50 border border-saffron-100 rounded-2xl p-5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all resize-none text-lg"
              placeholder="E.g., I'm feeling overwhelmed with my upcoming exams and fear I might fail..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            {/* Note: Tailwind v4 removes ring-opacity, use color opacity modifiers like ring-saffron-500/20 */}
          </div>

          <div className="flex flex-wrap gap-2">
            {predefinedEmotions.map((emotion) => (
              <button
                key={emotion}
                type="button"
                onClick={() => handleChipClick(emotion)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium hover:border-saffron-500 hover:text-saffron-600 transition-colors cursor-pointer"
              >
                {emotion}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!textInput.trim() || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-saffron-600 hover:bg-saffron-500 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-6 w-6" />
            ) : (
              <>
                Seek Guidance <Send className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
      </section>

      {/* Daily Shlok & Stats Grid */}
      <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Daily Shlok Card */}
        <div className="bg-gradient-to-br from-white to-saffron-50 p-6 rounded-3xl shadow-sm border border-saffron-100 relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 h-6 w-6 text-saffron-300" />
          <h3 className="text-xl font-bold text-saffron-900 mb-4 flex items-center gap-2">
            Verse of the Day
          </h3>
          {dailyShlok ? (
            <div className="space-y-3">
              <p className="text-lg font-medium text-slate-800 italic">
                "{dailyShlok.sanskrit}"
              </p>
              <p className="text-sm text-slate-500">
                Chapter {dailyShlok.chapter}, Verse {dailyShlok.verse}
              </p>
              <p className="text-slate-600 line-clamp-3">
                {dailyShlok.meaning}
              </p>
            </div>
          ) : (
            <div className="animate-pulse flex flex-col gap-2">
              <div className="h-4 bg-saffron-200 rounded w-3/4"></div>
              <div className="h-4 bg-saffron-200 rounded w-1/2"></div>
            </div>
          )}
        </div>

        {/* Community Stats Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-saffron-100 flex flex-col justify-center items-center text-center space-y-4">
          <div className="bg-red-50 p-4 rounded-full">
            <HeartPulse className="h-10 w-10 text-red-500" />
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-slate-800">
              {stats.totalHealed.toLocaleString()}+
            </h3>
            <p className="text-slate-500 font-medium mt-1">
              Moments of peace found by the community
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}