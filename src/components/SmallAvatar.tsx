import { Avatar, createStyles, Theme, withStyles } from "@material-ui/core";

export const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }),
)(Avatar);