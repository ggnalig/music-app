export type NavProps = {
  children: React.ReactNode
}

export const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <nav className="text-sm font-medium max-xl:space-x-6 p-6 max-md:space-x-4 p-4 max-sm: space-x-4 p-4">
      <ul className="flex space-x-3">
        {children}
      </ul>
    </nav>
  )
}