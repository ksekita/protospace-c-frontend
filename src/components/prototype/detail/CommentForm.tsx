"use client";

import { useActionState } from "react";
import styles from "./CommentForm.module.css";
import { commentAction } from "@/lib/actions/commentActions";

type Props = {
  prototypeId: number;
};

export default function CommentForm(props: Props) {
  const commentActionWithId = commentAction.bind(null, props.prototypeId);

  const [state, formAction, isPending] = useActionState(
    commentActionWithId,
    null,
  );

  return (
    <form action={formAction}>
      <div className={styles.field}>
        {state?.error && <p>{state.error}</p>}
        <label htmlFor="comment_content">コメント</label>
        <br />
        <input
          type="text"
          name="content"
          id="comment_content"
          defaultValue={""}
        />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.form_btn} disabled={isPending}>
          コメントする
        </button>
      </div>
    </form>
  );
}
