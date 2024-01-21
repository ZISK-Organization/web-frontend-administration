import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLayout } from "../../Layout/LayoutContext";
import { User } from "../../Types/profiles";
import { profilesService } from "../../Utils/ApiService";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const layout = useLayout();
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(users.map((u) => u.contactMail).join(",\n"));
  };

  useEffect(
    () => {
      profilesService.get(
        "/all",
        {},
        {
          success: setUsers,
          error: () => layout.error("Při načítání uživatelů došlo k chybě"),
        }
      );
    },
    //eslint-disable-next-line
    []
  );

  const getCategory = (catId: number) => (catId === 1 ? "Středoškoláci" : catId === 2 ? "Vysokoškoláci" : "Ostatní");

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Jméno</TableCell>
            <TableCell>Kategorie</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>
                {u.name} {u.surname}
              </TableCell>
              <TableCell>{getCategory(u.category || 0)}</TableCell>
              <TableCell>
                <a href={`mailto:${u.contactMail}`}>{u.contactMail}</a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <br />
      <Button href={`mailto:${users.map((u) => u.contactMail).join(",")}`} color="primary" variant="contained">
        Odeslat Email všem řešitelům
      </Button>
      <br />
      <br />
      <Button onClick={buttonHandler} color="primary" variant="contained">
        Zkopírovat seznam řešitelů do schránky
      </Button>
      <br />
      <br />
    </>
  );
}
