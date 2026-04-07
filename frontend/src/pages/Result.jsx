import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Star, CheckCircle, ListChecks, Sun } from 'lucide-react';
import { submitFeedback } from '../services/api';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.resultData;

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Redirect to home if accessed directly without data
  useEffect(() => {
    if (!resultData) {
      navigate('/');
    }
  }, [resultData, navigate]);

  if (!resultData) return null;

  const { emotionDetected, isDistress, guidance } = resultData;

  const handleFeedbackSubmit = async () => {
    if (rating === 0) return;
    try {
      await submitFeedback({ emotion: emotionDetected, rating, comment });
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header / Back Button */}
      <div className="flex items-center justify-between pt-4">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-saffron-600 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Seek another guidance</span>
        </Link>
        <div className="bg-saffron-100 text-saffron-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm">
          Detected: {emotionDetected}
        </div>
      </div>

      {/* Emergency Distress Alert */}
      {isDistress && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl shadow-sm flex gap-4 items-start">
          <AlertTriangle className="h-8 w-8 text-red-500 shrink-0" />
          <div>
            <h3 className="text-red-800 font-bold text-lg">You are not alone.</h3>
            <p className="text-red-700 mt-1">
              We noticed you might be going through a severe emotional crisis. Please consider reaching out to a professional or a loved one. 
            </p>
            <p className="text-red-700 font-bold mt-2">
              National Emergency Helpline: 112 <br/>
              Mental Health Helpline: 988 (US/Canada) or 14416 (India)
            </p>
          </div>
        </div>
      )}

      {/* Main Guidance Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-saffron-100 overflow-hidden">
        {/* Shlok Section */}
        <div className="bg-saffron-50 p-8 text-center border-b border-saffron-100">
          <h2 className="text-sm font-bold text-saffron-600 tracking-widest uppercase mb-4">
            Bhagavad Gita • Chapter {guidance?.chapter}, Verse {guidance?.verse}
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed mb-4">
            {guidance?.sanskrit}
          </p>
          <p className="text-slate-500 italic">
            {guidance?.transliteration}
          </p>
        </div>

        {/* Meaning Section */}
        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Meaning</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {guidance?.meaning}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            {/* Practical Steps */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
                <ListChecks className="h-5 w-5 text-saffron-500" /> Actionable Steps
              </h3>
              <ul className="space-y-3">
                {guidance?.practicalSteps?.map((step, index) => (
                  <li key={index} className="flex gap-3 text-slate-600">
                    <span className="text-saffron-500 font-bold">•</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Daily Suggestion */}
            <div className="bg-saffron-50 p-5 rounded-2xl border border-saffron-100">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-2">
                <Sun className="h-5 w-5 text-saffron-500" /> Daily Focus
              </h3>
              <p className="text-slate-600">
                {guidance?.dailySuggestion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-saffron-100 text-center">
        {!feedbackSubmitted ? (
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-slate-800">Was this helpful?</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <Star 
                    className={`h-8 w-8 ${(hoveredRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-saffron-500/50 resize-none"
                  rows="2"
                  placeholder="Any additional thoughts? (Optional, 100% anonymous)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={handleFeedbackSubmit}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-green-600 animate-in zoom-in duration-300">
            <CheckCircle className="h-10 w-10" />
            <p className="font-bold text-lg">Thank you for your feedback!</p>
            <p className="text-slate-500 text-sm">Your input helps us improve Shloksence for everyone.</p>
          </div>
        )}
      </div>

    </div>
  );
}