import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { submission } from "../../../Types/submission";
import { commonModuleMeta, textModuleMeta } from "../../../Types/taskTypes";
import { tasksService } from "../../../Utils/ApiService";
import FileModuleSubmissions from "./FileModuleSubmissions";
import TextModuleSubmissions from "./TextModuleSubmissions";
import { Typography } from "@mui/material";

const Root = styled.div({
  marginTop: 32,
  paddingLeft: 22,
});

interface IProps {
  moduleId: string;
  submissions: submission[];
  updatePoints: (submissionId: number, points: number) => void;
}

export default function ModuleSubmissions({ moduleId, submissions, updatePoints }: IProps) {
  const [moduleData, setModuleData] = useState<commonModuleMeta | undefined>(undefined);

  useEffect(() => {
    tasksService.get(
      "/admin/module",
      {
        taskId: moduleId.substring(0, moduleId.length - 2),
        moduleNumber: moduleId.substring(moduleId.length - 2),
      },
      {
        success: setModuleData,
        error: console.log,
      }
    );
  }, [moduleId]);

  return (
    <Root>
      {(moduleData && (
        <>
          <Typography>
            <i>
              {moduleData.name} ({moduleId})
            </i>
          </Typography>
          {moduleData.type === "file" ? (
            <FileModuleSubmissions updatePoints={updatePoints} submissions={submissions} />
          ) : (
            <TextModuleSubmissions
              updatePoints={updatePoints}
              moduleId={moduleId}
              moduleData={moduleData as textModuleMeta}
              submissions={submissions}
            />
          )}
        </>
      )) || <>Načítám modul</>}
    </Root>
  );
}
