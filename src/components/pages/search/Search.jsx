import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../ui/productCard/ProductCard";

const Search = () => {
  const [results, setResults] = useState([]);
  const { domickName } = useParams();

  async function searchDomick(key) {
    const res = await axios.get(
      `https://api-crud.elcho.dev/api/v1/55ec7-d2f4e-c6620/dom`
    );

    const all = res.data?.data || [];
    const filtered = all.filter((item) =>
      item.title.toLowerCase().includes(key.toLowerCase())
    );
    setResults(filtered);
  }

  useEffect(() => {
    if (domickName) {
      searchDomick(domickName);
    }
  }, [domickName]);

  return (
    <section id="Search">
      <div className="container">
        <h1>Результаты поиска: {domickName}</h1>
        <div className="search-results">
          {results.length ? (
            results.map((el) => <ProductCard el={el} key={el.id} />)
          ) : (
            <p>Ничего не найдено</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
