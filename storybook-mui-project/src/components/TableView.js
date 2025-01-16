import React from 'react';
import PropTypes from 'prop-types';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material';
import dayjs from 'dayjs';

const TableView = ({ 
    holidays = [],
    onEditClick = () => {},
    onClose = () => {}
}) => {
    const theme = useTheme();

    const styles = {
        container: {
            position: 'relative',
            margin: 'auto',
            width: '100%',
            minHeight: '20vh',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '12px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
            overflow: 'auto',
            maxHeight: '50vh',
            maxWidth: '90vw',
            marginBottom: '1rem',
        },
        table: {
            minWidth: 500,
        },
        head: {
            position: 'sticky',
            top: 0,
            zIndex: 10,
            fontSize: '3rem',
            backgroundColor: theme.palette.background.default,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        cell: {
            color: theme.palette.text.primary,
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '18px 20px',
            fontSize: '1.9rem',
        },
        bodyCell: {
            fontSize: '1.5rem',
            textAlign: 'center',
            padding: '12px 16px',
            color: theme.palette.text.secondary,
        },
        emptyCell: {
            textAlign: 'center',
            color: theme.palette.text.disabled,
            fontStyle: 'italic',
            padding: '24px',
            fontSize: '1.2rem',
        }
    };

    return (
        <TableContainer component={Paper} style={styles.container}>
            <Table style={styles.table}>
                <TableHead style={styles.head}>
                    <TableRow>
                        <TableCell style={styles.cell}>S.No</TableCell>
                        <TableCell style={styles.cell}>Date</TableCell>
                        <TableCell style={styles.cell}>Day</TableCell>
                        <TableCell style={styles.cell}>Holiday Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {holidays?.length > 0 ? (
                        holidays?.map((holiday, index) => (
                            <TableRow key={holiday.date} hover>
                                <TableCell style={styles.bodyCell}>
                                    {index + 1}
                                </TableCell>
                                <TableCell style={styles.bodyCell}>
                                    {holiday.date}
                                </TableCell>
                                <TableCell style={styles.bodyCell}>
                                    {dayjs(holiday.date).format('dddd')}
                                </TableCell>
                                <TableCell style={styles.bodyCell}>
                                    {holiday.name ? holiday.name : '-'}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} style={styles.emptyCell}>
                                No holidays selected yet.
                                <br /> Click On Any Date To Add Holiday to get
                                Started.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

TableView.propTypes = {
    holidays: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            name: PropTypes.string
        })
    ),
    onEditClick: PropTypes.func,
    onClose: PropTypes.func
};

export default TableView;