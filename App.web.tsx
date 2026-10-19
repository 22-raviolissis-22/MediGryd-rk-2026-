import { AppShell } from './src/AppShell';

/** Web preview must not wait on font downloads — that remounted the tree. */
export default function App() {
  return <AppShell />;
}
