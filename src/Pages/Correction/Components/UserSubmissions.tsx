import React, { useEffect, useState } from "react";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useLayout } from "../../../Layout/LayoutContext";
import { User } from "../../../Types/profiles";
import { submission } from "../../../Types/submission";
import { discussionService, profilesService, submissionsService } from "../../../Utils/ApiService";
import ModuleSubmissions from "./ModuleSubmissions";
import { Thread } from "../../../Types/discussion";
import DiscussionThread from "../../../Components/DiscussionThread";

const RootCard = styled(Card)({
  marginTop: 32,
});

interface IProps {
  taskId: string;
  userId: string;
  submissions: submission[];
  setSubmissions: (subs: submission[]) => void;
}

export default function UserSubmissions({ userId, taskId, submissions, setSubmissions }: IProps) {
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const [discussion, setDiscussion] = useState<Thread | undefined>();
  const layout = useLayout();

  const updatePoints = (submissionId: number, points: number) => {
    submissionsService.post("/admin/setPoints", { points: points, submissionId: submissionId }, null, {
      success: () => {
        setSubmissions(submissions.map((s) => (s.id === submissionId ? { ...s, points: points } : s)));
        layout.success("Body byly úspěšně uloženy");
      },
      error: () => layout.error("Při ukládání bodů došlo k chybě"),
    });
  };

  useEffect(() => {
    profilesService.get(
      "/",
      { userId: userId },
      {
        success: setUserInfo,
        error: console.log,
      }
    );
  }, [userId]);

  useEffect(() => {
    discussionService.get(
      "/thread",
      {
        channel: `${userId}${taskId}`,
        channelType: "correction",
      },
      {
        success: setDiscussion,
        error: () => {},
      }
    );
  }, [userId, taskId]);

  const lastSubmissionDate = new Date(
    Math.min.apply(
      null,
      submissions.map((s) => new Date(s.submissionDate).getTime())
    )
  );

  const submissionsPerModule = submissions.reduce((r, s) => {
    r[s.moduleId] = r[s.moduleId] || [];
    r[s.moduleId].push(s);
    return r;
  }, Object.create(null));

  return (
    <RootCard>
      <CardHeader
        avatar={<Avatar src={userInfo && userInfo.image}>{userId[0]}</Avatar>}
        title={(userInfo && `${userInfo.name} ${userInfo.surname}`) || userId}
        subheader={lastSubmissionDate.toLocaleString()}
      />
      <CardContent>
        <Typography variant="h6">Odevzdané moduly</Typography>
        {Object.keys(submissionsPerModule).map((m) => (
          <ModuleSubmissions updatePoints={updatePoints} moduleId={m} submissions={submissionsPerModule[m]} key={m} />
        ))}
        <br />
        <Typography variant="h6">Diskuze k opravení</Typography>
        {discussion && <DiscussionThread thread={discussion} setThread={setDiscussion} />}
      </CardContent>
    </RootCard>
  );
}
