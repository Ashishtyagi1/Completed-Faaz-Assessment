import React from 'react'
import { PropTypes } from 'prop-types';
import { IconButton, Menu, MenuItem, Toolbar, Typography, TextField, Box, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../Table.css';

function EnhancedTableToolbar(props) {
    const { handleChange, value, startDate, endDate, handleStartDate, handleEndDate, filterType, setFilterType, setInitialData } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleFilterType = (e) => {
      if(e !== filterType){
        setFilterType(e)
        handleClose()
        setInitialData()
        handleChange('')
      }else{
        handleClose()
      }
    }
    const handleResetFilter = () => {
      handleStartDate('')
      handleEndDate('')
    }
    return (
      <Toolbar className="toolBarContainer">
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Bank Transactions
          </Typography>
          {
            filterType === 'search' &&
            (
              <Box>
                  <TextField 
                    variant="outlined"
                    size="small"
                    value={value}
                    onChange={e=> handleChange(e.target.value)}
                    placeholder="Search by description"
                  />
                  {
                    value.length > 0 &&
                  <Button onClick={()=> handleChange('')}>Clear</Button>
                  }
              </Box>
            )
          }
          {
            filterType === 'date-range' && (
              <Box>
                <input
                  type="date"
                  value={startDate} 
                  onChange={(e) => {
                    handleStartDate(e.target.value)
                  }}
                  className="date-picker"
                />
                <input
                  type="date"
                  value={endDate} 
                  onChange={(e) => {
                    handleEndDate(e.target.value)
                  }}
                  className="date-picker ml-5"
                />
                {
                  startDate && endDate &&
                <Button onClick={handleResetFilter}>Clear</Button>
                }
              </Box>
            )
          }
          <IconButton
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
          >
            <FilterListIcon />
          </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                >
                <MenuItem onClick={()=> handleFilterType('search')}>Filter by search</MenuItem>
                <MenuItem onClick={() => handleFilterType('date-range')}>Filter by date range</MenuItem>
            </Menu>
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    value : PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    startDate : PropTypes.string.isRequired, 
    endDate : PropTypes.string.isRequired, 
    handleStartDate : PropTypes.func.isRequired, 
    handleEndDate : PropTypes.func.isRequired, 
    filterType : PropTypes.string.isRequired, 
    setFilterType : PropTypes.func.isRequired, 
    setInitialData : PropTypes.func.isRequired
  };

export default EnhancedTableToolbar