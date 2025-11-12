
import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = ({ user, darkMode, setDarkMode, search, setSearch, handleSearch, logout }) => {

    const navigate = useNavigate();
    
    const handleLogout = () => {
      logout();
      navigate("/login"); // redirect after logout
    };
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6 w-full">
      
      {/* Left: Hello User */}
      <div className="flex-1 text-left text-lg font-semibold">
        Hello, {user.username}!
      </div>

      {/* Center: Search Input + Button */}
      <div className="flex flex-1 justify-center items-center gap-2 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={`min-w-[80%] p-2 rounded-md border text-sm focus:outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
        <button
          onClick={handleSearch}
          className="h-[35px] w-[10%] min-w-[60px] p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center text-sm transition"
        >
          <FiSearch />
        </button>
      </div>

      {/* Right: Dark/Light + Logout */}
      <div className="flex flex-1 justify-end items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-[10%] min-w-[40px] p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition flex justify-center items-center"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <button
          onClick={() => handleLogout()} // pass logout function from parent
          className="w-[10%] min-w-[60px] p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;