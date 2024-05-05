import Link from "next/link";

export type NavItemProps = {
  href: string;
  children: any;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ href, isActive, children }) => {
  return (
    <li>
      <Link
        href={href}
        className={`block px-3 py-2 rounded-md ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}
      >
        {children}
      </Link>
    </li>
  )
}
