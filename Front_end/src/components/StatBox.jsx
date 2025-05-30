import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

export const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.grey[100]}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" color={colors.greenAccent[500]}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          color={colors.greenAccent[600]}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;