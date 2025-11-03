import CategoryComponent from './components/CategoryComponent.tsx';
import { CATEGORIES } from './utils/consts.ts';
  
export function ChallengeComponent() {
  return (
    <div className="flex flex-row p-4">
      {CATEGORIES.map((category) => (
        <CategoryComponent key={category} category={category} />
      ))}
    </div>
  );
}
