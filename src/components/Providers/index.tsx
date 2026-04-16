'use client';

import { PostHogProviderWrapper } from '@/lib/analytics/posthog';

export function Providers({ children }: { children: React.ReactNode }) {
  return <PostHogProviderWrapper>{children}</PostHogProviderWrapper>;
}
