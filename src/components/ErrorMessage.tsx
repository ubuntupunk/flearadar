import React from 'react';
import { Alert } from 'reactstrap';

// Define props interface
interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <Alert color="danger" fade={false} data-testid="error">
    {children}
  </Alert>
);

export default ErrorMessage;