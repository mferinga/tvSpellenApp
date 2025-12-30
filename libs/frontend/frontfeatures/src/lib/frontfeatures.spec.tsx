import { render } from '@testing-library/react';

import OrgFrontfeatures from './frontfeatures';

describe('OrgFrontfeatures', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrgFrontfeatures />);
    expect(baseElement).toBeTruthy();
  });
});
