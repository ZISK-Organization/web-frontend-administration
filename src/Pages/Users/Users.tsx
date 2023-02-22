import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLayout } from "../../Layout/LayoutContext";
import { User } from "../../Types/profiles";
import { profilesService } from "../../Utils/ApiService";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const layout = useLayout();

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

  const getCategory = (catId: number) => (catId === 1 ? "Středoškolláci" : catId === 2 ? "Vysokoškoláci" : "Ostatní");

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
      {
        // TODO - delete mjancovicova@gmail.com next year. This year, I promised to invite her for all our actions because of the help with the propagations.  
      }
      <Button href={`mailto:${users.map((u) => u.contactMail).join(",")}`} color="primary" variant="contained">
        Odeslat Email všem řešitelům
      </Button>
      <br />
      <br />
    </>
  );
}
