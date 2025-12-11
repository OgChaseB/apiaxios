import axios from "axios";
import { useEffect, useState } from "react";
import styles from './Katalog.module.css'
import Rick from "../Rick/Rick";

function Katalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://torguisam.ru/api/product/oksei-all-products"
        );
        setProducts(response.data.slice(0, 9));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Загрузка товаров...</div>;
  }
  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <div className={styles.Rick}>
        {products.map((product) => (
          <Rick key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Katalog;
