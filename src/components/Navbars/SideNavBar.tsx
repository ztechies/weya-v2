'use client'
// SideNavbar.tsx
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SideNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 w-56 h-full fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-white text-xl font-bold">Sidebar</h2>
      </div>
      <ul>
        <NavItem href="/" label="Home" pathname={pathname} />
        <NavItem href="/reg" label="About" pathname={pathname} />
        <NavItem href="/login" label="Services" pathname={pathname} />
        <NavItem href="/contact" label="Contact" pathname={pathname} />
      </ul>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  label: string;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, pathname }) => {
  const isActive = pathname === href;

  return (
    <li>
      <Link href={href}>
          {label}
        
      </Link>
    </li>
  );
};

export default SideNavbar;
