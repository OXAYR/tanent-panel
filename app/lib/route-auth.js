import { redirect } from 'react-router';
import { isAuthenticated } from './auth-token';

export function requireAuthClientLoader() {
  if (!isAuthenticated()) {
    throw redirect('/');
  }
  return null;
}

export function redirectIfAuthenticatedClientLoader() {
  if (isAuthenticated()) {
    throw redirect('/dashboard');
  }
  return null;
}
