import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar as BaseNavbar,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import ShoppingCart from "../assets/images/shopping-cart.svg";

// noinspection JSUnusedGlobalSymbols
function Navbar() {
  const { onLogout } = useAuth();
  const { firstName, lastName } = useProfile();

  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  // noinspection JSUnusedGlobalSymbols
  const triggers = {
    onMouseEnter: () => setOpenProfileMenu(true),
    onMouseLeave: () => setOpenProfileMenu(false),
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    return navigate("/login");
  };

  return (
    <BaseNavbar fullWidth={true} color="light-green" variant="filled">
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          className="hover:cursor-pointer"
          variant="h4"
          onClick={() => navigate("/")}
        >
          DjangoKart
        </Typography>
        <ul>
          <Typography as="li">
            <Link to="/products/">Products</Link>
          </Typography>
        </ul>
        <div className="flex flex-row items-center">
          <Link className="mr-5" to="/cart">
            <img src={ShoppingCart} alt="Icon of shopping cart" />
          </Link>
          <Menu open={openProfileMenu} handler={setOpenProfileMenu}>
            <MenuHandler {...triggers}>
              <Typography
                className="w-32 h-10 rounded-md leading-10 hei text-center align-middle cursor-pointer hover:bg-light-green-300"
                variant="small"
              >
                {firstName} {lastName}
              </Typography>
            </MenuHandler>
            <MenuList {...triggers}>
              <MenuItem onClick={handleLogout}>
                <Typography>Logout</Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </BaseNavbar>
  );
}

export default Navbar;
