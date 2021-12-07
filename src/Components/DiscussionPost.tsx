import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import { Post } from "../Types/discussion";
import NewPostEditor from "./NewPostEditor";
import { User } from "../Types/profiles";
import { profilesService } from "../Utils/ApiService";
import styled from "@emotion/styled";

const Header = styled.div({
  display: "flex",
  alignItems: "center",
});

const Body = styled.div({
  paddingLeft: 64,
});

const Frame = styled.iframe({
  width: "100%",
  border: "none",
});

interface IProps {
  post: Post;
  setPost: (newPost: Post) => void;
  offset?: number;
}

export default function DiscussionPost({ post, setPost, offset }: IProps) {
  const [expanded, setExpanded] = useState(false);
  const [responseExpanded, setResponseExpanded] = useState(false);
  const [frameHeight, setFrameHeight] = useState("0px");
  const [author, setAuthor] = useState<User | undefined>(undefined);

  const iframeReady = () => {
    let iframe = document.getElementById(`iframeTarget-${post.id}`) as HTMLIFrameElement;
    //@ts-ignore
    let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWin.document.body)
      setFrameHeight((iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + " px");
  };

  useEffect(() => {
    post.author &&
      profilesService.get(
        "/",
        { userId: post.author },
        {
          success: setAuthor,
          error: console.log,
        }
      );
  }, [post.author]);

  offset = offset ? offset : 0;

  return (
    <>
      <Header>
        <Avatar src={post.author && ((author && author.image) || post.author[0])} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <Typography variant="h6">{(author && `${author.name} ${author.surname}`) || post.author || "Anonymní"}</Typography>
          <Typography color="textSecondary">{new Date(post.creationDate).toLocaleString()}</Typography>
        </span>
      </Header>
      <hr />
      <Body>
        <Frame
          id={`iframeTarget-${post.id}`}
          srcDoc={`<head><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /></head><body style="font-family: Roboto, sans-serif">${post.content}</body>`}
          title={post.creationDate + "-content"}
          onLoad={iframeReady}
          height={frameHeight}
        />
        <br />
        {!responseExpanded && (
          <Button color="primary" onClick={() => setResponseExpanded(true)}>
            Odpovědět
          </Button>
        )}
        {responseExpanded && (
          <NewPostEditor
            onCreate={(newPost) => {
              setPost({ ...post, children: [...post.children, newPost] });
              setResponseExpanded(false);
            }}
            threadId={post.threadId}
            parentPostId={post.id}
            onCancel={() => setResponseExpanded(false)}
          />
        )}

        {post.children.length > 0 &&
          (expanded ? (
            <Button onClick={() => setExpanded(false)}>Skrýt odpovědi</Button>
          ) : (
            <Button onClick={() => setExpanded(true)}>Zobrazit odpovědi ({post.children.length})</Button>
          ))}
        {expanded && (
          <>
            <br />
            <br />
            {post.children.map((ch, i) => (
              <DiscussionPost
                post={ch}
                key={ch.id}
                setPost={(newPost) => {
                  const newChildren = [...post.children];
                  newChildren[i] = newPost;
                  setPost({ ...post, children: newChildren });
                }}
              />
            ))}
          </>
        )}
      </Body>
      <br />
      <br />
    </>
  );
}
