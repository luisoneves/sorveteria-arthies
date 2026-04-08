import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

expect.extend({
  toBeInTheDocument(element: HTMLElement | null) {
    if (!element) {
      return {
        pass: false,
        message: () => 'Element is null',
      };
    }
    const pass = element !== null && element.innerHTML !== '';
    return {
      pass,
      message: () =>
        pass
          ? 'Element was found in the document'
          : 'Element was not found in the document',
    };
  },
});
