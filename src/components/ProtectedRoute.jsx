import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
  }, []);

  if (user === undefined) return <p>Loading...</p>;
  return user ? children : <Navigate to="/signin" replace />;
}
