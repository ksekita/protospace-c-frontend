import styles from "./Search.module.css";
import Form from "next/form";
import SelectButton from "./SelectButton";

export default async function SerachForm({
  searchParams,
}: {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  // もしkeywordがstringだったらそのままkeywordを返し、違うならundefinedを返す
  const keyword =
    typeof params?.keyword === "string" ? params.keyword : undefined;

  // sortも同じように比べる
  const sort = typeof params?.sort === "string" ? params.sort : undefined;

  return (
    <div>
      <Form action={"/prototypes"} className={styles.search_form} role="search">
        <input
          id="post-search"
          type="search"
          name="keyword"
          defaultValue={keyword}
          placeholder="記事を検索..."
          className={styles.input_style}
        />

        <div className={styles.btn_box}>
          <button type="submit" className={styles.btn}>
            検索
          </button>
        </div>

        <SelectButton sort={sort} />
      </Form>
    </div>
  );
}
