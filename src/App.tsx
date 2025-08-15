import { NavLink, Outlet } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/first-task', label: 'First Task' },
  { to: '/second-task', label: 'Second Task' },
];

export const App = () => (
  <>
    <nav className="bg-black text-white px-10 py-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex space-x-10 text-xl font-semibold">
          {navLinks.map(({ to, label }) => (
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ?
                  'text-orange-500 border-b-4 border-orange-500 pb-2'
                : 'hover:text-orange-400 transition'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>

    <main className="p-2 max-w-7xl mx-auto">
      <Outlet />
    </main>
  </>
);
