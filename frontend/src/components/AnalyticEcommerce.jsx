import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from './MainCard';

// assets
// import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, percentage, isLoss, extra }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>

        <Grid item>
          <Chip
            variant="combined"
            color={percentage == 0 ? "info" : isLoss ? "warning" : "success"}
            icon={
              <>
                {percentage == 0 ?
                  <TrendingFlatIcon style={{ fontSize: '0.75rem', color: 'inherit' }} />
                  :
                  isLoss ?
                    <TrendingDownIcon style={{ fontSize: '0.75rem', color: 'inherit' }} />
                    :
                    <TrendingUpIcon style={{ fontSize: '0.75rem', color: 'success' }} />
                }
              </>
            }
            label={`${percentage}%`}
            sx={{ ml: 1.25, pl: 1 }}
            size="small"
          />
        </Grid>

      </Grid>
    </Stack>
    <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="textSecondary">
        {/* {isLoss ? "Need " : "You made an extra "} */}
        <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
          {extra}
        </Typography>{' '}
        {isLoss ? "Less" : "More"} this week
      </Typography>
    </Box>
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;