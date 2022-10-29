import React from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import '../Table.css';

export default function DetailsDialog(props) {
    const { openDetails, Transition, handleClose, selectedRow } = props;
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={openDetails}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className="dialogHeader">{"Complete Transaction Details"}</DialogTitle>
            <DialogContent>
                {
                    Object.entries(selectedRow).map(([key, value]) => (
                        <Box
                            key={value}
                            className="detail-list-wrapper"
                        >
                            <Typography className="dialogTitle">{key} : </Typography>
                            <Typography className="dialogValue">{value}</Typography>
                        </Box>
                    ))
                }
            </DialogContent>
        </Dialog>
    )
}