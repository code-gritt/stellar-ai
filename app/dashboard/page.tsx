'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

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
