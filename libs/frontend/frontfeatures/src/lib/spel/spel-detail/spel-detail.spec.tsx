import { render } from '@testing-library/react';

import SpelDetail from './spel-detail';

describe('SpelDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpelDetail />);
    expect(baseElement).toBeTruthy();
  });
});
