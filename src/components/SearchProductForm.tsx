import { useState } from "react";

type SearchProductFormProps = {
  initialKeyword: string;
  initialCategory: string;
  onSearch: (keyword: string, category: string) => void;
  onClear: () => void;
};

const SearchProductForm = ({
  initialKeyword,
  initialCategory,
  onSearch,
  onClear,
}: SearchProductFormProps) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(keyword, category);
  };


  const handleClear = () => {
    setKeyword("");
    setCategory("all");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search product..."
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="all">All</option>
        <option value="Iphone">IPhone</option>
        <option value="laptop">Laptop</option>
        <option value="accessory">Accessory</option>
      </select>

      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
};

export default SearchProductForm;
