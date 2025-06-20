import {
  Box, TextField, MenuItem, Select, InputLabel, FormControl, Button
} from '@mui/material';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
const destinations = ['Singapore', 'Bangkok', 'Dubai', 'Paris', 'London'];
const statuses = ['Cancelled', 'Confirmed', 'On Tour', 'Travelled'];
const managers = ['Parikshita Gupta', 'Akanshatya Aggarwal', 'Himanshu Bach', 'Ravi Verma'];
const agents = ['ABC company Pvt ltd', 'XYZ Corp', 'MNO Travels', 'PQR Ltd'];
const sortOptions = ['Booking Date', 'Arrival', 'Departure'];

export default function Filters({ filters, setFilters, resetFilters }) {
  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={2} width="100%">
      <TextField
        placeholder="Lead pax / Trip ID"
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          flex: '1 1 200px',
          backgroundColor: 'background.paper',
          input: { paddingY: '10px' },
        }}
        onKeyUp={(e) => update("search", e.target.value)}
      />

      {[
        { key: 'destination', label: 'Destination', options: destinations },
        { key: 'month', label: 'Travel Month', options: months },
        { key: 'sortBy', label: 'Sort by', options: sortOptions },
        { key: 'manager', label: 'Acc. Manager', options: managers },
        { key: 'agent', label: 'Agent', options: agents },
        { key: 'status', label: 'Trip Status', options: statuses }
      ].map(({ key, label, options }) => (
        <FormControl
          key={key}
          size="small"
          sx={{
            minWidth: 120,
            flex: '1 1 120px',
            backgroundColor: 'background.paper',
            '.MuiOutlinedInput-root': { height: 40 },
          }}
        >
          <InputLabel htmlFor={key}>{label}</InputLabel>
          <Select
            value={filters[key]}
            label={label}
            onChange={(e) => update(key, e.target.value)}
            inputProps={{
              id: key
            }}
          >
            <MenuItem value="">All</MenuItem>
            {options.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}

      <Button
        variant="outlined"
        size="small"
        sx={{
          height: 40,
          minWidth: 80,
          px: 2,
          backgroundColor: "btn_bg",
          color: '#000',
          borderColor: 'btn_bg',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
        onClick={() => resetFilters()}
      >
        CLEAR
      </Button>
    </Box>
  );
}
