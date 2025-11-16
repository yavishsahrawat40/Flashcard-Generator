import { useState } from 'react';

function App() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFlashcards([]);

    try {
      const response = await fetch('http://localhost:3001/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data.flashcards);
      setCurrentIndex(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getDifficultyStyles = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'hard':
        return 'bg-rose-500 text-white';
      default:
        return 'bg-indigo-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-float">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="text-gradient">Flashcard</span>
            <span className="text-white"> Generator</span>
          </h1>
          <p className="text-blue-200/70 text-lg font-medium">
            ✨ Powered by AI • Learn Smarter
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter any topic... (e.g., Photosynthesis)"
              disabled={loading}
              className="flex-1 px-6 py-4 glass rounded-2xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 text-lg disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <span className="text-xl">✨</span>
                  Generate
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-8 glass-hover rounded-2xl p-5 border-rose-500/30 bg-rose-500/10 flex items-center gap-3 animate-pulse">
            <span className="text-2xl">⚠️</span>
            <p className="text-rose-200 font-medium">{error}</p>
          </div>
        )}

        {/* Flashcards */}
        {flashcards.length > 0 && !loading && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="glass rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-lg shadow-blue-500/50"
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              ></div>
            </div>

            {/* Card Info */}
            <div className="flex justify-between items-center">
              <span className="text-blue-200/80 font-semibold text-lg">
                Card {currentIndex + 1} / {flashcards.length}
              </span>
              <span
                className={`px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg ${getDifficultyStyles(
                  flashcards[currentIndex].difficulty
                )}`}
              >
                {flashcards[currentIndex].difficulty}
              </span>
            </div>

            {/* Flashcard */}
            <div className="glass rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border-blue-400/20">
              <div className="space-y-6">
                {/* Question Section */}
                <div>
                  <div className="text-blue-300/60 text-sm font-bold uppercase tracking-widest mb-3">
                    Question
                  </div>
                  <div className="text-white text-2xl md:text-3xl font-semibold leading-relaxed">
                    {flashcards[currentIndex].question}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10"></div>

                {/* Answer Section */}
                <div>
                  <div className="text-purple-300/60 text-sm font-bold uppercase tracking-widest mb-3">
                    Answer
                  </div>
                  <div className="text-white/90 text-xl md:text-2xl leading-relaxed">
                    {flashcards[currentIndex].answer}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex-1 glass glass-hover rounded-2xl px-6 py-4 text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg disabled:hover:scale-100"
              >
                <span className="text-xl">←</span>
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                className="flex-1 glass glass-hover rounded-2xl px-6 py-4 text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg disabled:hover:scale-100"
              >
                Next
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
