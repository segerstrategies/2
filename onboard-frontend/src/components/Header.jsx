import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
  }, []);
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Profile</Link> |{' '}
      <Link to="/dashboard">Dashboard</Link> |{' '}
      <Link to="/match">Match</Link> |{' '}
      {user ? (
        <Link to="/signout">Sign Out</Link>
      ) : (
        <>
          <Link to="/signin">Sign In</Link> |{' '}
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}