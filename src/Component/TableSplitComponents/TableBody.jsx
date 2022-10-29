import React from 'react';
import { Button, TableBody, TableRow, TableCell } from '@mui/material';

export default function EnhancedTableBody(props) {
    const { stableSort, searchData, getComparator, order, orderBy, page, rowsPerPage, handleViewDetails } = props;
    return (
        <TableBody>
            {stableSort(searchData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                        <TableRow tabIndex={-1} key={row.id}>
                            <TableCell>
                                {row.id}
                            </TableCell>
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                            >
                                {row.category}
                            </TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="left">{row.transactionDate}</TableCell>
                            <TableCell align="left">
                                <Button
                                    variant="text"
                                    className="detailsButton"
                                    onClick={() => handleViewDetails(row.id)}
                                    data-testid="details-button"
                                >
                                    view details
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
        </TableBody>
    )
}