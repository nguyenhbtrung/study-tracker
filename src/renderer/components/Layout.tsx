import TitleBar from './TitleBar';
import Sidebar from './Sidebar';

export default function Layout({ children }: any) {
  return (
    <div className="app-root">
      <TitleBar />

      <div className="app-body">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
