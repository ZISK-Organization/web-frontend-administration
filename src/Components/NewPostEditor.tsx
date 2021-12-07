import React, { useState } from "react";
import { Button } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Post } from "../Types/discussion";
import { discussionService } from "../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import { useLayout } from "../Layout/LayoutContext";

interface IProps {
  parentPostId?: number;
  threadId: number;
  onCreate: (newPost: Post) => void;
  onCancel: () => void;
}

export default function NewPostEditor({ onCreate, onCancel, threadId, parentPostId }: IProps) {
  const [text, setText] = useState("");
  const layout = useLayout();

  const { user } = useAuth0();

  const save = () => {
    const p = {
      id: null,
      author: user?.sub,
      content: text,
      details: "",
      creationDate: null,
      threadId: threadId,
      parentId: parentPostId,
      children: [],
    };
    discussionService.post("post", {}, p, {
      success: (id: number) => onCreate({ ...p, id: id, creationDate: new Date() } as Post),
      error: () => layout.error("Při odesílání příspěvku došlo k chybě"),
    });
  };

  return (
    <>
      <Editor
        apiKey="ps028du9wwolkoerx517fguyakk78mqk4vjw1ekmnthu65si"
        init={{
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help",
          automatic_uploads: true,
          height: 320,
          images_reuse_filename: true,
          //TODO move to our api
          images_upload_url: `https://api.magistrmartin.cz/images/uploadImage`,
          images_upload_base_path: "https://api.magistrmartin.cz/images/noauth/image/images/",
        }}
        onChange={(e) => setText(e.target.getContent())}
      />
      <Button color="primary" onClick={save}>
        Odeslat
      </Button>
      <Button color="secondary" onClick={onCancel}>
        Zrušit
      </Button>
    </>
  );
}
