import React from 'react';
import { useParams } from 'react-router-dom';

const Search: React.FC = () => {
  // Extract the 'q' parameter from the URL
  const { q } = useParams<{ q?: string }>();

  return (
    <div>
      <h1>Search Results</h1>
      <p>Search query: {q}</p>
    </div>
  );
};

export default Search;
