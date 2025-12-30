import { render } from '@testing-library/react';

import SpelList from './spel-list';

describe('SpelList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpelList />);
    expect(baseElement).toBeTruthy();
  });
});
