import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GROCERIES_API_URL = 'https://dummyjson.com/products/category/groceries';

export const useGroceries = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGroceries = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(GROCERIES_API_URL, { signal });
      if (response.data?.products) {
        setProducts(response.data.products);
      }
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') return;
      setError(err.response?.data?.message || err.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchGroceries(controller.signal);
    return () => controller.abort();
  }, [fetchGroceries]);

  return { products, loading, error, refetch: () => fetchGroceries() };
};
