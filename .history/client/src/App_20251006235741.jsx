import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MenuList from './components/MenuList';
import React from 'react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4 text-red-500">
          <h2>Đã xảy ra lỗi!</h2>
          <p>{this.state.error?.message || 'Vui lòng thử lại sau.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="container mx-auto p-4">
          <nav className="mb-6 text-white shadow-lg rounded-lg">
            <ul className="flex gap-6 justify-center py-4">
              <li>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-md font-semibold text-blue-600 hover:bg-blue-100 transition-colors duration-300"
                >
                  Menu
                </Link>
                <Link
                  to="/booking"
                  className="px-4 py-2 rounded-md font-semibold text-blue-600 hover:bg-blue-100 transition-colors duration-300"
                >
                  Đặt bàn
                </Link>
                <Link
                  to="/guest"
                  className="px-4 py-2 rounded-md font-semibold text-blue-600 hover:bg-blue-100 transition-colors duration-300"
                >
                  Khách Hàng
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<MenuList />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;