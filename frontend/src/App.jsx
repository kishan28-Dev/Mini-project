import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Heart, BookOpen, UserCircle } from 'lucide-react';
import Home from './pages/Home';
// We will create these pages in the next batches
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm border-b border-saffron-100 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-saffron-500" />
                <span className="font-bold text-2xl text-saffron-900 tracking-tight">Shloksence</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  <span>Anonymous Mode Active</span>
                </div>
                <UserCircle className="h-8 w-8 text-slate-400" />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-saffron-100 py-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Shloksence. Timeless wisdom for modern minds.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;