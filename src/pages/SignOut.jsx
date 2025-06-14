import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      navigate('/signin');
    };
    signOut();
  }, [navigate]);

  return <p>Signing out...</p>;
}
