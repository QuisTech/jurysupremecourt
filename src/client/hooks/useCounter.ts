import { useCallback, useEffect, useState } from 'react';
import type { InitResponse, IncrementResponse, DecrementResponse } from '../../shared/types/api';

interface CounterState {
  count: number;
  username: string | null;
  loading: boolean;
}

export const useCounter = () => {
  const [state, setState] = useState<CounterState>({
    count: 0,
    username: null,
    loading: true,
  });
  const [postId, setPostId] = useState<string | null>(null);

  // fetch initial data
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/init');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: InitResponse = await res.json();
        if (data.type !== 'init') throw new Error('Unexpected response');
        setState({ count: data.count, username: data.username, loading: false });
        setPostId(data.postId);
      } catch (err) {
        console.error('Failed to init counter (using standalone mode)', err);
        // Standalone mode: use localStorage
        const localCount = parseInt(localStorage.getItem('global_vote_count') || '0', 10);
        setState({ count: localCount, username: 'Guest', loading: false });
        setPostId('standalone');
      }
    };
    void init();
  }, []);

  const update = useCallback(
    async (action: 'increment' | 'decrement') => {
      if (!postId) {
        console.error('No postId – cannot update counter');
        return;
      }

      // Standalone mode
      if (postId === 'standalone') {
        const currentCount = parseInt(localStorage.getItem('global_vote_count') || '0', 10);
        const newCount = action === 'increment' ? currentCount + 1 : currentCount - 1;
        localStorage.setItem('global_vote_count', newCount.toString());
        setState((prev) => ({ ...prev, count: newCount }));
        return;
      }

      // Backend mode
      try {
        const res = await fetch(`/api/${action}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: IncrementResponse | DecrementResponse = await res.json();
        setState((prev) => ({ ...prev, count: data.count }));
      } catch (err) {
        console.error(`Failed to ${action}`, err);
      }
    },
    [postId]
  );

  const increment = useCallback(() => update('increment'), [update]);
  const decrement = useCallback(() => update('decrement'), [update]);

  return {
    ...state,
    increment,
    decrement,
  } as const;
};
