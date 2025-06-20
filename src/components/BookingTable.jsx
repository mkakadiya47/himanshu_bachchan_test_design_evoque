import {
    Table, TableHead, TableRow, TableCell, TableBody,
    Paper, IconButton, Chip, Box, Typography, Select,
    MenuItem, TableContainer
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const statusColor = {
    Cancelled: 'error',
    Confirmed: 'primary',
    Travelled: 'success',
    'On Tour': 'warning',
};

export default function BookingTable({ data }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const rowsPerPageOptions = [15, 50, 100];
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = page * rowsPerPage + 1;
    const endIndex = Math.min(data.length, (page + 1) * rowsPerPage);

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {[
                            'Trip ID', 'Arrival', 'Departure', 'Travel Month', 'Destination', 'Acc. Manager',
                            'Booking Date', 'Agent', 'Lead pax', 'Order Value (USD)', 'Payment Value (USD)', 'Transfer Price',
                            'Trip Status', 'Ops Spoc', 'Booking Status', 'Vouchers', 'Action'
                        ].map((header, i) => (
                            <TableCell key={i} sx={{ border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData.map((b, i) => (
                        <TableRow key={i} hover sx={{ height: 48 }}>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.id}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.arrival}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.departure}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.month}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.destination}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.manager}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.date}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.agent}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.lead}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.orderValue}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.paymentValue}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.transfer}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>
                                <Chip label={b.tripStatus} color={statusColor[b.tripStatus] || 'default'} size="small" />
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.opsSpoc}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>
                                <Box width={10} height={10} borderRadius="50%" bgcolor={b.bookingStatus === 'green' ? 'green' : 'blue'} />
                            </TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>{b.vouchers}</TableCell>
                            <TableCell sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: (theme) => theme.palette.divider, fontSize: 14, py: 1, px: 1.5 }}>
                                <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
                <Box display="flex" alignItems="center" borderRadius={1} px={1}>
                    <Typography variant="body2" mr={1}>Rows per page:</Typography>
                    <Select
                        size="small"
                        value={rowsPerPage}
                        inputProps={{
                            id: "row_per_page"
                        }}
                        onChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                    >
                        {rowsPerPageOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Box display="flex" alignItems="center" borderRadius={1} px={1}>
                    <Typography variant="body2" mr={1}>
                        {startIndex}-{endIndex} of {data.length}
                    </Typography>
                    <IconButton
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                    >
                        <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={page >= totalPages - 1}
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                </Box>
            </Box>

        </TableContainer>
    );
}
