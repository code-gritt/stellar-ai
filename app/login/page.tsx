'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import { login, googleLogin } from '@/lib/mutations';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader/Loader';
import styles from './Login.module.css';

// Type for Google Credential Response
interface CredentialResponse {
  credential: string;
  select_by?: string;
}

// Declare google namespace for TypeScript
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'small' | 'medium' | 'large';
              text?: 'signin_with' | 'signup_with' | 'continue_with';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
            },
          ) => void;
        };
      };
    };
  }
}

export default function LoginPage() {
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
      const { token, user } = await login(email, password);
      setAuth(token, user);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    setError('');
    setLoading(true);

    try {
      const { token, user } = await googleLogin(credentialResponse.credential);
      setAuth(token, user);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Google login failed');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            '150796695993-5togdmplcbuvffvme7k1l9s86bnbq0bb.apps.googleusercontent.com',
          callback: handleGoogleLogin,
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton')!,
          {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
          },
        );
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (loading) return <Loader text="Logging in..." />;

  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login to Stellar</h1>
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
            Login
          </button>
        </form>
        <div className={styles.googleButton}>
          <div id="googleSignInButton"></div>
        </div>
        <p className={styles.link}>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
