import { makeStyles } from "tss-react/mui"

import {
  Avatar,
  Box,
  Card,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material"

import { ReactComponent as SuccessSvg } from "@/assets/svgs/refactor/bridge-alert-success.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/refactor/bridge-close.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/refactor/bridge-warning.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const APPROVAL_OPTIONS = [
  {
    title: "Current deposit",
    info: ["Approval on each order", "Pay gas on every trade"],
    type: "Warning",
  },
  {
    title: "Maximum",
    info: ["Only approve once", "Save on future gas fee"],
    type: "Recommended",
  },
]

const useStyles = makeStyles()(theme => ({
  dialogPaper: {
    width: "62.8rem",
    maxWidth: "unset",
    borderRadius: "2rem",
    backgroundColor: theme.palette.themeBackground.light,
  },
  dialogContentRoot: {
    padding: "6.4rem 3.2rem 10rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "6.4rem 2rem 6rem",
    },
  },
  cardRoot: {
    position: "relative",
    borderRadius: "2rem",
    borderColor: "#473835",
    padding: "2rem",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    overflow: "visible",
    cursor: "pointer",
    "*": {
      cursor: "pointer !important",
    },
    [theme.breakpoints.down("sm")]: {
      aspectRatio: "unset",
      justifyContent: "center",
    },
  },
  chipRoot: {
    position: "absolute",
    backgroundColor: "#90F8EA",
    height: "3.4rem",
    top: "-1.7rem",
    left: "50%",
    transform: "translateX(-50%)",
  },
  chipLabel: {
    fontSize: "1.6rem",
    fontWeight: 600,
    padding: 0,
  },
  listRoot: {
    paddingBottom: 0,
  },
  listItemRoot: {
    padding: 0,
    gap: 8,
    "&:nth-child(n + 2)": {
      paddingTop: 8,
    },
  },
  listItemIconRoot: {
    minWidth: "unset",
  },
  listItemTextRoot: {
    marginTop: 0,
    marginBottom: 0,
  },
  listItemTextPrimary: {
    fontSize: "2rem",
    lineHeight: "3.4rem",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "2.8rem",
    },
  },
}))

const ApprovalDialog = props => {
  const { token = {}, open, onClose, onApprove } = props
  const { isMobile } = useCheckViewport()
  const { classes } = useStyles()

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 28,
        }}
      >
        <SvgIcon sx={{ fontSize: "1.8rem" }} component={CloseSvg} inheritViewBox></SvgIcon>
      </IconButton>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <Avatar sx={{ width: "6.4rem", height: "6.4rem" }} src={token.logoURI}></Avatar>
        <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.2rem", fontWeight: 500, mt: ["0.8rem", "1.2rem"] }}>
          Approve {token.symbol} token
        </Typography>
        <Typography
          sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.6rem", fontWeight: 600, mt: ["1rem", "2.6rem"], textAlign: ["center", "left"] }}
        >
          Choose the ideal spending cap in your wallet
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "3rem" : "2rem"}
          justifyContent="center"
          sx={{ mt: ["2.6rem", "4rem"], width: "100%" }}
        >
          {APPROVAL_OPTIONS.map(item => (
            <Card
              role="button"
              tabIndex={0}
              variant="outlined"
              classes={{ root: classes.cardRoot }}
              onClick={() => onApprove(item.type === "Recommended")}
            >
              {item.type === "Recommended" && <Chip classes={{ root: classes.chipRoot, label: classes.chipLabel }} label={item.type}></Chip>}
              <Box>
                <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.6rem", fontWeight: 600, textAlign: "center" }}>
                  {item.title}
                </Typography>

                <List classes={{ root: classes.listRoot }}>
                  {item.info.map(i => (
                    <ListItem classes={{ root: classes.listItemRoot }}>
                      <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
                        <SvgIcon
                          sx={{ fontSize: ["1.6rem", "2rem"], color: "#8C591A" }}
                          component={item.type === "Warning" ? WarningSvg : SuccessSvg}
                          inheritViewBox
                        ></SvgIcon>
                      </ListItemIcon>
                      <ListItemText classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary }}>{i}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default ApprovalDialog
