import React from 'react';
import { Box } from '@mui/system';

import Nav from '@/components/Navigation/Nav';

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <Box>
      <Nav />

      <Box sx={{ fontFamily: 'Raleway' }}>
        <Box
          component="main"
          sx={{
            width: '100%',
            // backgroundColor: 'primary.dark',
            maxWidth: 900,
            minHeight: '100vh',
            m: '0 auto',
            p: [2, 4],
            mt: 5,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
