

import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

const customRender = (ui) => {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );
};

test('renders JSON Viewer title', () => {
  customRender(<App />);
  const titleElement = screen.getByText(/JSON Viewer/i);
  expect(titleElement).toBeInTheDocument();
});
