import React, { useEffect, useState } from "react";
import { Container, Grid, MenuItem, Select } from "@mui/material";
import { series } from "../../Types/taskTypes";
import { useLayout } from "../../Layout/LayoutContext";
import { submissionsService, tasksService } from "../../Utils/ApiService";
import { submission } from "../../Types/submission";
import UserSubmissions from "./Components/UserSubmissions";

export default function Correction() {
  const [tasks, setTasks] = useState<series[]>([]);
  const [submissions, setSubmissions] = useState<submission[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | undefined>(undefined);

  const layout = useLayout();

  const changeTask = (taskId: string) => {
    setSelectedTask(taskId);
    setSubmissions([]);
    layout.setIsLoading(true);
    submissionsService.get(
      "/admin/lastSubmissionsForTask",
      { taskId: taskId },
      {
        success: (s) => {
          setSubmissions(s);
          layout.setIsLoading(false);
        },
        error: () => layout.error("Při načítání odevzdání došlo k chybě"),
      }
    );
  };

  useEffect(() => {
    tasksService.get(
      "/admin/year",
      {},
      {
        success: setTasks,
        error: () => layout.error("Při načítání úloh došlo k chybě."),
      }
    );
    // eslint-disable-next-line
  }, []);

  const submissionPerUser = submissions.reduce((r, s) => {
    r[s.userId] = r[s.userId] || [];
    r[s.userId].push(s);
    return r;
  }, Object.create(null));

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Select
            variant="standard"
            value={selectedTask || ""}
            onChange={(e) => changeTask(e.target.value)}
            fullWidth
            label="Úloha"
          >
            {tasks
              .map((s) => [
                <MenuItem key={s.seriesNumber} disabled value="">
                  <em>{s.seriesNumber}. Výplatní období</em>
                </MenuItem>,
                ...s.tasks.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name}
                  </MenuItem>
                )),
              ])
              .flat()}
          </Select>
        </Grid>
      </Grid>
      <hr />
      {Object.keys(submissionPerUser).map((u) => (
        <UserSubmissions
          key={u}
          taskId={selectedTask || ""}
          userId={u}
          submissions={submissionPerUser[u]}
          setSubmissions={(subs) =>
            setSubmissions(submissions.map((s) => (s.userId === u ? subs.filter((ss) => ss.id === s.id)[0] : s)))
          }
        />
      ))}
    </Container>
  );
}
