"use client";
import * as React from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Link,
  Stack,
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
    setOpen(false);
  };

  const handleChangePasswordClick = () => {
    setPasswordModalOpen(true);
    setOpen(false);
  };

  const handleLogoutClose = () => setLogoutModalOpen(false);
  const handlePasswordClose = () => setPasswordModalOpen(false);

  const handlePasswordSubmit = () => {
    // if (newPassword !== confirmNewPassword) {
    //   alert("New passwords do not match!");
    //   return;
    // }
    //   const token = localStorage.getItem("token");
    //   const response = await axios.put("", {
    //
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //       currentPassword,
    //       newPassword,
    //     }),
    //   });
    //   if (response.ok) {
    //     alert("Password changed successfully");
    //     setPasswordModalOpen(false);
    //   } else {
    //     alert("Failed to change password");
    //   }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found.");
      return;
    }

    console.log("Token being sent:", token);

   
    const response = await axios
      .post("https://api.staging.springprod.com/auth/v1/manager/sign-out", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log("error", error));

    localStorage.removeItem("token");

    window.location.href = "/signin";
  };

  return (
    <Stack direction="row" zIndex="2" spacing={2}>
      <div>
        {/* Dropdown Button */}
        <Button ref={anchorRef} onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>

        {/* Dropdown Menu */}
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleChangePasswordClick}>
                      Change Password
                    </MenuItem>
                    <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* Logout Modal */}
      <Modal open={logoutModalOpen} onClose={handleLogoutClose}>
        <Box
          sx={{
            position: "absolute",
            top: "36%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 320,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "stretch",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Are you sure you want to logout?
          </Typography>
          <Typography>
            You have login with your eamil id or phone number to Sign in again
          </Typography>
          <Box display="flex" flexDirection="row-reverse" left={20} gap={2}>
            <Button
              variant="contained"
              sx={{ width: "170px", height: "40px" }}
              onClick={handleLogout}
            >
              Yes
            </Button>
            <Link margin={1} href="">
              No
            </Link>
          </Box>
        </Box>
      </Modal>

      {/* Change Password Modal */}
      <Modal open={passwordModalOpen} onClose={handlePasswordClose}>
        <Box
          sx={{
            position: "absolute",
            top: "36%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 500,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "stretch",
          }}
        >
          <Typography variant="h6">Change Password</Typography>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            onClick={handlePasswordSubmit}
          >
            Continue
          </Button>
        </Box>
      </Modal>
    </Stack>
  );
}
