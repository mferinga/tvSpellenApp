import { render } from '@testing-library/react';

import OrgCommon from './common';

describe('OrgCommon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrgCommon />);
    expect(baseElement).toBeTruthy();
  });
});
