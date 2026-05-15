import { Sidebar } from '../sidebar';
import { TitleBar } from '../title-bar';

export default function Layout({ children }: any) {
  return (
    <div className="h-screen flex flex-col bg-[#0f0f1a] text-white overflow-hidden">
      <TitleBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
