import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
  showSidebar?: boolean;
};

export default function Layout({ children, showSidebar = false }: LayoutProps) {
  return (
    <div className="flex bg-[#F5F5F5] min-h-screen">
      {showSidebar && <Sidebar onSearch={() => {}} onFilterState={() => {}} />}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
