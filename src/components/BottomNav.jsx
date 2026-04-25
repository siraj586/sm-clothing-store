import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaHeart, FaThLarge } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

const BottomNav = () => {
  const { cartItems, favoriteItems } = useShop();
  const { pathname } = useLocation();

  const links = [
    { to: '/',             icon: FaHome,       label: 'Home'     },
    { to: '/all-products', icon: FaThLarge,    label: 'Shop'     },
    { to: '/favorites',    icon: FaHeart,      label: 'Saved',   badge: favoriteItems.length },
    { to: '/cart',         icon: FaShoppingBag,label: 'Cart',    badge: cartItems.length     },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-pb">
      <div className="flex items-stretch h-16">
        {links.map(({ to, icon: Icon, label, badge }) => {
          const active = pathname === to || (to !== '/' && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
                active
                  ? 'text-black dark:text-white'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {/* Active indicator */}
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-black dark:bg-white rounded-full" />
              )}

              <div className="relative">
                <Icon size={20} />
                {badge > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
