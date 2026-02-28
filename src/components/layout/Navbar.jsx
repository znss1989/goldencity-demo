import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { account, isConnecting, error, connect, disconnect, formatAddress } = useWallet();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
  ];

  const handleWalletClick = () => {
    if (account) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <nav className="bg-white dark:bg-secondary-900 shadow-sm transition-colors duration-300">
      <div className="container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <svg width="30" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="20" r="10" stroke="#0682ff" />
                <circle cx="15" cy="20" r="6" stroke="#0682ff" strokeWidth="3" />
              </svg>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-1.5">
                GoldenCity
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-secondary-200 dark:border-secondary-700">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <FiSun size={20} className="transition-transform hover:rotate-12" />
                ) : (
                  <FiMoon size={20} className="transition-transform hover:-rotate-12" />
                )}
              </button>
              <button
                onClick={handleWalletClick}
                disabled={isConnecting}
                className="btn text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting
                  ? 'Connecting...'
                  : account
                  ? formatAddress(account)
                  : 'Connect'}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              type="button"
              className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-secondary-200 dark:border-secondary-700">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-secondary-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-secondary-200 dark:border-secondary-700">
                <button
                  onClick={() => {
                    handleWalletClick();
                    setIsOpen(false);
                  }}
                  disabled={isConnecting}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 rounded-md"
                >
                  {isConnecting ? 'Connecting...' : account ? formatAddress(account) : 'Connect Wallet'}
                </button>
                {error && (
                  <p className="px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
