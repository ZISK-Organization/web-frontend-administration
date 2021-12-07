import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { submission } from "../../../Types/submission";
import { textModuleMeta } from "../../../Types/taskTypes";
import { getKeyExtractorComparer } from "../../../Utils/Comparers";

interface IProps {
  submissions: submission[];
  moduleData: textModuleMeta;
  updatePoints: (submissionId: number, points: number) => void;
}

export default function TextModuleSubmissions({ submissions, moduleData, updatePoints }: IProps) {
  const [points, setPoints] = useState<{ [index: number]: string }>(
    Object.assign({}, ...submissions.map((s) => ({ [s.id]: s.points.toString() })))
  );

  const savePoints = (submissionId: number) => {
    const p = parseFloat(points[submissionId]);
    if (p !== undefined && p !== null && !isNaN(p)) {
      updatePoints(submissionId, p);
    }
  };

  return moduleData.variant === "separate" ? (
    <>
      <br />
      <br />
      <Grid container spacing={3}>
        {submissions.sort(getKeyExtractorComparer("moduleSection")).map((s) => (
          <React.Fragment key={s.id}>
            <Grid item xs={8}>
              <Typography>
                <i>{moduleData.questions[s.moduleSection].question}</i>
              </Typography>
              <Typography>{s.submission}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Výplata"
                value={points[s.id]}
                onChange={(e) => setPoints({ ...points, [s.id]: e.target.value })}
                variant="standard"
              />
              &nbsp;&nbsp;&nbsp;
              <Button onClick={() => savePoints(s.id)} color="primary">
                Uložit body
              </Button>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </>
  ) : (
    <>Opravování pro tento typ modulu není implementováno</>
  );
}
