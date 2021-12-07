import React, { useState } from "react";
import { Button } from "@mui/material";
import { Thread } from "../Types/discussion";
import DiscussionPost from "./DiscussionPost";
import NewPostEditor from "./NewPostEditor";

interface IProps {
  thread: Thread;
  setThread: (newThread: Thread) => void;
}

export default function DiscussionThread({ thread, setThread }: IProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <br />
      {thread.children.map((post, i) => (
        <DiscussionPost
          key={post.id}
          post={post}
          setPost={(newPost) => {
            const newChildren = [...thread.children];
            newChildren[i] = newPost;
            setThread({ ...thread, children: newChildren });
          }}
        />
      ))}
      {!expanded && (
        <Button color="primary" onClick={() => setExpanded(true)}>
          Přidat příspěvek
        </Button>
      )}
      {expanded && (
        <NewPostEditor
          onCreate={(newPost) => {
            setThread({ ...thread, children: [...thread.children, newPost] });
            setExpanded(false);
          }}
          threadId={thread.id}
          onCancel={() => setExpanded(false)}
        />
      )}
    </>
  );
}
