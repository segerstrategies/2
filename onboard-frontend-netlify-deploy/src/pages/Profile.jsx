import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Profile() {
  const [form, setForm] = useState({
    skills: '',
    industries: '',
    education: '',
    location: '',
    availability: '',
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUserId(data.user.id);
        fetchProfile(data.user.id);
      }
    });
  }, []);

  const fetchProfile = async (id) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    if (data) setForm(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...form });
    if (!error) alert('Profile saved successfully');
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills" required />
        <input name="industries" value={form.industries} onChange={handleChange} placeholder="Industries" required />
        <input name="education" value={form.education} onChange={handleChange} placeholder="Education" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <input name="availability" value={form.availability} onChange={handleChange} placeholder="Availability" required />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}