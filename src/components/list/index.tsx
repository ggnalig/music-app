type ListProps = {
  children: React.ReactNode
}

export const List: React.FC<ListProps> = ({ children }) => {
  return (
    <ul className="w-full flex-col justify-center items-center divide-y divide-slate-100">
      {children}
    </ul>
  )
}
