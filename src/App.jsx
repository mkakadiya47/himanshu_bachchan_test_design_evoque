import { useMemo, useState } from 'react';
import { bookings as originalData } from './data/bookings';
import Filters from './components/Filters';
import BookingTable from './components/BookingTable';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header';
import { Box } from '@mui/material';

function App() {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
            // Optional light customizations
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            btn_bg: "#c6c6f9"
          }
          : {
            background: {
              default: '#272729',  // dark mode body
              paper: '#171717',    // dark mode container
            },
            text: {
              primary: '#f5f5f5',
              secondary: '#cfcfcf',
            },
            divider: '#3c3c3c',
            btn_bg: "#c6c6f9"
          }),
      },
    }), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const downloadCSV = () => {
    const headers = ['Trip ID', 'Lead', 'Destination', 'Arrival', 'Departure', 'Month', 'Trip Status', 'Manager', 'Agent', 'Booking Date'];

    const rows = filtered.map(row => [
      row.id,
      row.lead,
      row.destination,
      row.arrival,
      row.departure,
      row.month,
      row.tripStatus,
      row.manager,
      row.agent,
      row.date,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(v => `"${v}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'bookings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const _defaultFilters = {
    search: '',
    destination: '',
    month: '',
    sortBy: '',
    manager: '',
    agent: '',
    status: '',
  }

  const [filters, setFilters] = useState(_defaultFilters);


  const sortKeyMap = {
    'Booking Date': 'date',
    'Arrival': 'arrival',
    'Departure': 'departure',
  };

  const filtered = originalData
    .filter(b =>
      (!filters.search || b.id.includes(filters.search) || b.lead?.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.destination || b.destination === filters.destination) &&
      (!filters.month || b.month === filters.month) &&
      (!filters.status || b.tripStatus === filters.status) &&
      (!filters.manager || b.manager === filters.manager) &&
      (!filters.agent || b.agent === filters.agent)
    )
    .sort((a, b) => {
      const key = sortKeyMap[filters.sortBy];
      if (!key) return 0;

      const parseDate = (str) => {
        const [dd, mm, yy] = str.split('-');
        return new Date(`20${yy}`, parseInt(mm) - 1, dd);
      };

      return parseDate(a[key]) - parseDate(b[key]);
    });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          py: 4,
          px: { xs: 2, sm: 4, md: 6 },
        })}
      >
        <Header toggleMode={toggleMode} mode={mode} onDownload={downloadCSV} />

        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            p: 2,
            mt: 3,
            boxShadow: theme.palette.mode === 'light' ? 1 : 3,
          })}
        >
          <Filters filters={filters} setFilters={setFilters} resetFilters={() => setFilters(_defaultFilters)} />
          <BookingTable data={filtered} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
