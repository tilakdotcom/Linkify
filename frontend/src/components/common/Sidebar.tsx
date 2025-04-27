import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useTypeSelector } from "@/store/store";
import { userPageNav } from "@/common/data/userRelated";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated } = useTypeSelector((state) => state.auth);

  const toggleSidebar = useCallback(() => {
    if (!isAuthenticated) return toast.error("You need to login");
    setIsOpen((prev) => !prev);
  }, [isAuthenticated]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    },
    [isOpen]
  );

  useEffect(() => {
    // Prevent background scrolling
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleButtonRef.current !== event.target &&
        !toggleButtonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      const focusableElements = sidebarRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        // disabled={!isAuthenticated}
        ref={toggleButtonRef}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
        aria-controls="sidebar"
        onClick={toggleSidebar}
        className="group p-2 relative rounded-full hover:bg-gray-900 transition-colors cursor-pointer"
      >
        <Menu className="text-xl md:text-2xl text-darkText group-hover:text-skyText" />
      </button>
      {/* <Button>{isOpen ? <X size={24} /> : <Menu size={24} />}</Button> */}

      {/* Sidebar */}
      <aside
        id="sidebar"
        ref={sidebarRef}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-72 md:block z-40`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-800">
          <h2 className="text-2xl font-bold">My App</h2>
          <Button
            variant="ghost"
            aria-label="Close sidebar"
            className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </Button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {userPageNav.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800"
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
