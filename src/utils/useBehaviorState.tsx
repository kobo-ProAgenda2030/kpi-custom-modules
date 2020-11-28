import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

export function useBehaviorState<T>(behaviorSubject: BehaviorSubject<T>): T {
  const [value, setValue] = useState(behaviorSubject.getValue());
  useEffect(() => {
    const subscription = behaviorSubject.subscribe(setValue)
    return () => { subscription?.unsubscribe() }
  }, [behaviorSubject]);
  return value;
}