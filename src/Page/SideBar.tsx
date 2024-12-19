import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, CirclePlus, CircleUser, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "My Blog", path: "/", icon: LayoutDashboard },
  { name: "Create Blog", path: "/createblogpost", icon: CirclePlus },
  { name: "My Profile", path: "/profile", icon: CircleUser },
];
const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <div className="lg:flex lg:w-64 w-full h-full">
      <button
        className="fixed top-4 left-4 z-50 p-3 bg-gray-200 rounded-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-indigo-900 text-white transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block`}
      >

        <div className="flex items-center justify-center h-16 bg-indigo-800">
          <NavLink to={"/"} className="text-2xl font-extrabold text-white">
            Blog
          </NavLink>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-4 px-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-md transition-all duration-300 ${isActive
                      ? "bg-indigo-700 text-white"
                      : "text-gray-400 hover:bg-indigo-700 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-indigo-700">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
