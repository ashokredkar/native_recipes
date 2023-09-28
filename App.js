import { LikedRecipesProvider } from './context/context';
import AppNavigation from './src/navigation';

export default function App() {
  return (
    <LikedRecipesProvider>
      <AppNavigation />
    </LikedRecipesProvider>
  );
}