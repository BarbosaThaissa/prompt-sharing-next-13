import Link from "next/link";
import { FormEvent, SetStateAction } from "react";

type SetPost = (value: SetStateAction<Post>) => void;
interface Post {
  prompt: string;
  tag: string;
}
interface FormProps {
  type: string;
  post: Post;
  setPost: SetPost;
  submitting: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1></h1>
    </section>
  );
};

export default Form;
