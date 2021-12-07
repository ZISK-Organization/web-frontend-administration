import React, { useState } from "react";
import { submission } from "../../../Types/submission";
import { textModuleMeta } from "../../../Types/taskTypes";

interface IProps {
  moduleId: string;
  submissions: submission[];
  moduleData: textModuleMeta;
  updatePoints: (submissionId: number, points: number) => void;
}

export default function TextModuleSubmissions({ moduleId, submissions, moduleData, updatePoints }: IProps) {
  return <></>;
}
