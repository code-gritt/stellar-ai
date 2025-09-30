'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Loader } from '@/components/Loader/Loader';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      // Simulate API loading
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  if (!user || loading) return <Loader text="Loading Dashboard..." />;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome, {user.email}</h1>
        <div className={styles.info}>
          <p>Role: {user.role}</p>
          <p>Credits: {user.credits}</p>
          <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
        <div className={styles.actions}>
          <a href="/create-form" className={styles.button}>
            Create New Form
          </a>
        </div>
      </div>
    </div>
  );
}
