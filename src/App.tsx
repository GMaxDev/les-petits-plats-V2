import Card from "./components/card";
import Header from "./components/header";
import recipesData from "./data/recipes.json";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {recipesData.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default App;
