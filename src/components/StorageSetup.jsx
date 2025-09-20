'use client';

import { useEffect } from 'react';
import { setupStorage } from '@/scripts/setupStorage';

export default function StorageSetup() {
  useEffect(() => {
    // Solo ejecutar en el cliente y en modo desarrollo
    if (process.env.NODE_ENV === 'development') {
      setupStorage();
    }
  }, []);

  return null;
}