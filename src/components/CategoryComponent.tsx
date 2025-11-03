export default function CategoryComponent({ category }: { category: string }) {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-300 p-4 mx-2">
      <h2 className="text-lg font-semibold mb-4 text-center">{category}</h2>
    </div>
  );
}