import * as React from 'react';
import { Box, Table, TableContainer, TablePagination, Typography, Paper, Zoom, Skeleton } from '@mui/material'
import { cloneDeep } from 'lodash'
import EnhancedTableHead from './TableSplitComponents/TableHead';
import EnhancedTableToolbar from './TableSplitComponents/Toolbar';
import EnhancedTableBody from './TableSplitComponents/TableBody';
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../Redux/Slices/DataSlice';
import "./Table.css";
import DetailsDialog from './DetailsDialog/DetailsDialog';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction="up" ref={ref} {...props} />;
});

export default function EnhancedTable() {
  const dispatch = useDispatch()
  const [selectedRow, setSelectedRow] = React.useState({})
  const [openDetails, setOpenDetails] = React.useState(false)
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(0);
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterType, setFilterType] = React.useState('search')

  const bankData = useSelector(state => state.data.list)
  const loading = useSelector(state => state.data.loading)
  const [searchData, setSearchData] = React.useState([])
  const [sortAsc, setSortAsc] = React.useState(false)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleStartDate = (val) => {
    const searchData = cloneDeep(bankData)
    const filterData = searchData
    setSearchData([...filterData])
    setStartDate(val)
  }

  const handleEndDate = (val) => {
    setEndDate(val)
  }

  const handleDateRangeFilter = () => {
    if(endDate > startDate){
      const filterData = searchData.filter(data=> data.transactionDate >= startDate && data.transactionDate <= endDate)
      setSearchData(filterData)
    }else{
      alert('Start date should not be greater than end date.')
      setStartDate('')
      setEndDate('')
    }
  }

  React.useEffect(()=> {
    if(endDate && startDate){
      handleDateRangeFilter()
    }
  },[startDate, endDate])

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setInitialData = () => {
    setSearchData(bankData)
  }

  const handleViewDetails = id => {
    setOpenDetails(true)
    const selected = searchData.find(i => i.id === id)
    setSelectedRow(selected)
  }

  const handleClose = () => {
    setOpenDetails(false)
    setSelectedRow({})
  }

  const handleSearchChange = (e) => {
    if (e) {
      const searchData = cloneDeep(bankData)
      const filterData = searchData.filter(i => i.description.includes(e))
      setSearchData([...filterData])
    } else {
      setSearchData(bankData)
    }
    setSearch(e)
  }

  const handleSorting = () => {
    setSortAsc(!sortAsc);
    let sortedList = [...searchData];
    sortedList.sort((a, b) => {
      if (a.transactionDate < b.transactionDate) {
        return !sortAsc ? -1 : 1;
      }
      if (a.transactionDate > b.transactionDate) {
        return !sortAsc ? 1 : -1;
      }
      return 0;
    });
    setSearchData(sortedList);
  };

  React.useEffect(() => {
    if (bankData) {
      setSearchData(bankData)
    }
  }, [bankData])

  React.useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <Box className="containerBox">
      <Paper className="containerPaper">
        <EnhancedTableToolbar
          handleChange={handleSearchChange}
          value={search}
          startDate={startDate}
          endDate={endDate}
          handleStartDate={handleStartDate}
          handleEndDate={handleEndDate}
          filterType={filterType}
          setFilterType={setFilterType}
          setInitialData={setInitialData}
        />
        <TableContainer className="tableContainer">
          {
            loading && (
              <Box className="skeletonBoxContainer">
                <Skeleton variant="text" height={60} />
                <Skeleton variant="text" height={60} />
                <Skeleton variant="text" height={60} />
                <Skeleton variant="text" height={60} />
                <Skeleton variant="text" height={60} />
                <Skeleton variant="text" height={60} />
                <Skeleton variant="text" height={60} />
              </Box>
            )
          }
          {
            searchData.length > 0 && !loading
              ?
              <Table
                stickyHeader
                className="tableInnerContainer"
                aria-labelledby="tableTitle"
                size='medium'
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  handleSorting={handleSorting}
                />
                <EnhancedTableBody 
                  stableSort={stableSort} 
                  searchData={searchData} 
                  getComparator={getComparator}
                  order={order} 
                  orderBy={orderBy} 
                  page={page} 
                  rowsPerPage={rowsPerPage} 
                  handleViewDetails={handleViewDetails}
                />
              </Table>
              :
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="50vh"
              >
                <Typography>No Data found</Typography>
              </Box>
          }
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={searchData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DetailsDialog
        openDetails={openDetails}
        Transition={Transition}
        handleClose={handleClose}
        selectedRow={selectedRow} 
      />
    </Box>
  );
}
