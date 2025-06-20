import { Box, IconButton, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import logo from '../../public/logo.svg';


export default function Header({ toggleMode, mode, onDownload }) {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Box display="flex" alignItems="center" gap={1.5}>
        <Box sx={{
          p: 1,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2
        }}>
          <img
            src={logo}
            alt="All Bookings"
            style={{ width: 32, height: 32 }}
          />
        </Box>
        <Typography variant="h4">All Bookings</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={toggleMode}>
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton onClick={onDownload}>
          <FileDownloadOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}