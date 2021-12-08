import React, { useEffect, useState } from "react";
import { Button, Container, Tab, Table, TableBody, TableCell, TableRow, Tabs, Typography } from "@mui/material";
import { series } from "../../Types/taskTypes";
import { useLayout } from "../../Layout/LayoutContext";
import { tasksService } from "../../Utils/ApiService";

export default function Deployment() {
  const [tasks, setTasks] = useState<series[]>([]);
  const [tutorials, setTutorials] = useState<series[][]>([]);
  const [tab, setTab] = useState(0);
  const [tutorialTab, setTutorialTab] = useState(0);

  const layout = useLayout();

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

  useEffect(() => {
    tasksService.get(
      "/tutorials/admin/all",
      {},
      {
        success: setTutorials,
        error: () => layout.error("Při načítání tutoriálů došlo k chybě."),
      }
    );
    // eslint-disable-next-line
  }, []);

  const deploy = (link: string) => {
    fetch(link).then((resp) => {
      if (resp.ok) layout.success("Deploy úlohy proběhl úspěšně");
      else layout.error("Při deploy úlohy došlo k chybě");
    });
  };

  return (
    <Container maxWidth="xl">
      <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)} indicatorColor="primary" textColor="primary" centered>
        <Tab label="Úlohy" />
        <Tab label="Tutoriály" />
      </Tabs>
      {tab === 1 && (
        <>
          <br />
          <Tabs
            value={tutorialTab}
            onChange={(_, newVal) => setTutorialTab(newVal)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {tutorials.map((t, i) => (
              <Tab label={t[0].tasks[0].id.substring(0, 3)} key={i} />
            ))}
          </Tabs>
        </>
      )}
      {(tab === 0 ? tasks : tutorials[tutorialTab] || []).map((s) => (
        <React.Fragment key={s.seriesNumber}>
          {tab === 0 && <Typography variant="h6">{s.seriesNumber}. Výplatní období</Typography>}
          <Table>
            <TableBody>
              {s.tasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    {t.name} ({t.id})
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      onClick={() =>
                        deploy(
                          tab === 0
                            ? `https://webhooks.stastnyjakub.com/hooks/deployZiskTask?taskId=${t.id}`
                            : `https://webhooks.stastnyjakub.com/hooks/deployZiskTutorial?tutorialId=${t.id}`
                        )
                      }
                    >
                      Deploy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <br />
        </React.Fragment>
      ))}
    </Container>
  );
}
