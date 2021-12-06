import React from "react";
import packageJson from "../../package.json";
import { IconButton } from "@mui/material";
import { Brightness4 } from "@mui/icons-material";

interface IProps {
  hidden: boolean;
  changeTheme: () => void;
}

export default function Footer({ hidden, changeTheme }: IProps) {
  return hidden ? (
    <></>
  ) : (
    <>
      Version {packageJson.version},{" "}
      <IconButton onClick={changeTheme}>
        <Brightness4 />
      </IconButton>
    </>
  );
}
