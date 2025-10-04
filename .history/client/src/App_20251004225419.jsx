import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MenuList from './components/MenuList';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-6">
          <ul className="flex gap-4 justify-center">
            <li>
              <Link to="/" className="text-blue-500 hover:text-blue-700 font-semibold">
                Danh sách Menu
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MenuList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;