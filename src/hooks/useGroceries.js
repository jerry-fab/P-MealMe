import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products/category/groceries';

export const useGroceries = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGroceries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data.products || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch meals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, []);

  return { products, loading, error, refetch: fetchGroceries };
};
