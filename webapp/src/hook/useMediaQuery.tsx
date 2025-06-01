import { useMediaQuery as useMuiMediaQuery } from '@mui/material';

const useMediaQuery = () => {
  const isMobile = useMuiMediaQuery('(max-width: 768px)');
  const isTablet = useMuiMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMuiMediaQuery('(min-width: 1025px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useMediaQuery;
