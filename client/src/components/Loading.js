import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from "styled-components";

export const Loading = () => {
  return (
    <StyledBox sx={{ display: 'flex' }}>
      <CircularProgress />
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  width: 100%;
`;