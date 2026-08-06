"use client";

import { useActionState, useEffect, useRef } from "react";
import styles from "./CommentForm.module.css";
import { commentAction } from "@/lib/actions/commentActions";

type Props = {
  isLoggedIn: boolean;
  prototypeId: number;
};

export default function CommentForm(props: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const commentActionWithId = commentAction.bind(null, props.prototypeId);

  const [state, formAction, isPending] = useActionState(
    commentActionWithId,
    null,
  );

  useEffect(() => {
    if (state && !state.error) {
      formRef.current?.reset();
    }
  }, [state]);

  if (!props.isLoggedIn) {
    return null;
  }

  return (
    <form action={formAction} ref={formRef}>
      <div className={styles.field}>
        {state?.error && <p>{state.error}</p>}
        <label htmlFor="comment_content">コメント</label>
        <br />
        <input type="text" name="content" id="comment_content" />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.form_btn} disabled={isPending}>
          コメントする
        </button>
      </div>
    </form>
  );
}
