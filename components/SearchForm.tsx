import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

interface SearchFormProps {
  initialValue?: string | string[];
}

export default function SearchForm({ initialValue = "" }: SearchFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value) {
      router.push("/");
      return;
    }

    router.push(`search?q=${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="q" value={value} onChange={handleChange} />
      <button>검색</button>
    </form>
  );
}
