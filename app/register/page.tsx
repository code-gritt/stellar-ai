'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { register } from '@/lib/mutations';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader/Loader';
import styles from './Register.module.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token, user } = await register(email, password);
      setAuth(token, user);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed');
      }
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Registering..." />;

  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Register for Stellar</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
        <p className={styles.link}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
