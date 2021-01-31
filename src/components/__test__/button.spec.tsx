import { render } from '@testing-library/react';
import React from 'react';
import { Button } from '../button';

describe('<Button />', () => {
  it('should render Ok with props', () => {
    const { debug, getByText, rerender } = render(
      <Button canClick={true} loading={false} actionText={'test'} />,
    );
    // debug();
    getByText('test');
    // rerender(<Button canClick={true} loading={true} actionText={'test'} />);
    // debug();
    // getByText('Loading...');
  });
  it('should display loading', () => {
    const { debug, getByText, rerender } = render(
      <Button canClick={true} loading={true} actionText={'test'} />,
    );
    getByText('Loading...');
  });
  it('should contain the class name with canClick false', () => {
    const { debug, getByText, container } = render(
      <Button canClick={false} loading={true} actionText={'test'} />,
    );
    getByText('Loading...');
    expect(container.firstChild).toHaveClass('bg-gray-300 pointer-events-none');
  });
});
