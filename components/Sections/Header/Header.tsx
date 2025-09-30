'use client';

import { Button2, Container, NavbarMenu } from '@/components';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { getMe } from '@/lib/mutations';
import logoImg from '@/public/logo.svg';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { token, user, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      if (token && !user) {
        try {
          const userData = await getMe(token);
          setAuth(token, userData);
        } catch (err) {
          console.error('Verify user failed:', err);
          clearAuth();
          router.push('/login');
        }
      }
    };
    verifyUser();
  }, [token, user, setAuth, clearAuth, router]);

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  const getInitials = (email: string) => email.charAt(0).toUpperCase();

  return (
    <header className={styles.root}>
      <input className={styles.checkbox} type="checkbox" id="nav-toggle" />

      <div className={styles.holder}>
        <Container>
          <div className={styles.flex}>
            {/* Left: Logo */}
            <Link href="/" className={styles.logo}>
              <Image src={logoImg} alt="logo" priority />
            </Link>

            {/* Desktop navigation */}
            <nav className={styles.desktop_menu}>
              {user ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  <span>Credits: {user.credits}</span>
                  <div className={styles.avatar}>
                    {user.email && <span>{getInitials(user.email)}</span>}
                  </div>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">
                    <Button2 className={styles.sign_up} id="sign_up" href="#!">
                      Register
                    </Button2>
                  </Link>
                </>
              )}
            </nav>

            {/* Hamburger toggle (mobile only) */}
            <label htmlFor="nav-toggle" className={styles.hamburger}>
              <div className={styles.hamburger__lines}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </label>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      <NavbarMenu
        classNames={{
          root: styles.mobile_menu,
          submenu: styles.mobile_menu__submenu,
        }}
      >
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <span>Credits: {user.credits}</span>
            <div className={styles.avatar}>
              {user.email && <span>{getInitials(user.email)}</span>}
            </div>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">
              <Button2 className={styles.sign_up} id="sign_up" href="#!">
                Register
              </Button2>
            </Link>
          </>
        )}
      </NavbarMenu>
    </header>
  );
};
