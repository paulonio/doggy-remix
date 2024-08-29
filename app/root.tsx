import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useNavigation,
} from '@remix-run/react';
import React from 'react';

import { GlobalStyles } from './global-styles';

import ErrorBoundary from '@/components/error-boundary';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Loader from '@/components/loader';
import { sendEmail } from '@/utils/api';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get('email') as string;

  const response = await sendEmail({ email });

  return json({ message: response?.statusText }, { status: response?.status });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { state } = useNavigation();

  const isLoading = state === 'loading';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <GlobalStyles />
        <ErrorBoundary>
          <Header />
          {isLoading ? <Loader /> : children}
          <Footer />
        </ErrorBoundary>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
