import React from 'react'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

const headCells = [
    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: 'Id',
    },
    {
      id: 'category',
      numeric: false,
      disablePadding: false,
      label: 'Category',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Description',
    },
    {
      id: 'date',
      numeric: true,
      disablePadding: false,
      label: 'Transaction Date',
    },
    {
      id: 'details',
      numeric: false,
      disablePadding: false,
      label: '',
    },
  ];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, handleSorting } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {
                !headCell.numeric
                ?
                headCell.label
                :
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={headCell.id === "date" ? handleSorting : createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
              }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

export default EnhancedTableHead