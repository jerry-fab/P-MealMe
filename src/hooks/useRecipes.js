import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const RECIPES_API_URL = 'https://dummyjson.com/recipes?limit=50';

/**
 * Custom hook to fetch and manage recipes state from DummyJSON API.
 * Handles data fetching, loading state, error reporting, and refetching.
 */
export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(RECIPES_API_URL, { signal });
      if (response.data && Array.isArray(response.data.recipes)) {
        setRecipes(response.data.recipes);
      } else {
        throw new Error('Invalid recipe data structure received.');
      }
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') {
        // Request was aborted (e.g. component unmounted); do not set error state
        return;
      }
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch recipes. Please check your network connection.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchRecipes(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchRecipes]);

  const refetch = () => {
    fetchRecipes();
  };

  return { recipes, loading, error, refetch };
};
