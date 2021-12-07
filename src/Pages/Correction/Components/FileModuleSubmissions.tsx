import React, { useState } from "react";
import { submission } from "../../../Types/submission";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { apiUrl } from "../../../Utils/ApiService";
import { LinkText } from "../../../Components/Styles/StyledComponents";

interface IProps {
  submissions: submission[];
  updatePoints: (submissionId: number, points: number) => void;
}

export default function FileModule({ submissions, updatePoints }: IProps) {
  const sub = submissions[0];
  const [points, setPoints] = useState<string>(sub.points?.toString() || "0");

  const fileNameToFileInfo = (fn: string) => {
    return {
      name: fn.substring(1 + fn.lastIndexOf("-")),
      url: `${apiUrl}tasks/files/getSubmittedFile?fileName=${encodeURIComponent(fn)}`,
    };
  };

  const savePoints = () => {
    const p = parseFloat(points);
    if (p !== undefined && p !== null && !isNaN(p)) {
      updatePoints(sub.id, p);
    }
  };

  const submittedFiles = sub.submission.split(";").map(fileNameToFileInfo);

  return (
    <>
      {(submissions.length === 1 && (
        <>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography>Odevzdané soubory</Typography>
              <br />
              {submittedFiles.map((sf, i) => (
                <LinkText key={i}>
                  <a href={sf.url}>{sf.name}</a>
                </LinkText>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField variant="standard" value={points} onChange={(e) => setPoints(e.target.value)} label="Výplata" />
              &nbsp;&nbsp;&nbsp;
              <Button onClick={savePoints} color="primary">
                Uožit body
              </Button>
            </Grid>
          </Grid>
        </>
      )) ||
        "Odevzdání není validní"}
    </>
  );
}
