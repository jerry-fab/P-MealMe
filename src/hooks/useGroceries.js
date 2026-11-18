import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GROCERIES_API_URL = 'https://dummyjson.com/products/category/groceries';

/**
 * Custom hook to fetch and manage groceries data using Axios.
 * Manages loading, error, products, refetch, and local addition.
 */
export const useGroceries = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGroceries = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(GROCERIES_API_URL, { signal });
      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        throw new Error('Invalid products data format received from API.');
      }
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') {
        return;
      }
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch grocery items. Please check your internet connection.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchGroceries(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchGroceries]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [
      {
        id: Date.now(),
        ...newProduct,
      },
      ...prev,
    ]);
  };

  const refetch = () => {
    fetchGroceries();
  };

  return { products, loading, error, refetch, addProduct, setProducts };
};
