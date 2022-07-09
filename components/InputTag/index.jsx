import { useState } from "react";
import styles from "./styles.module.scss";

export default function InputTag({ className, onChange, placeholder, type }) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if ((key === "," || key === "Enter") && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      const newTags = [...tags, trimmedInput];
      setTags(newTags);
      setInput("");

      // call parent
      onChange(newTags);
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);

      // call parent
      onChange(tagsCopy);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <div className={[className, styles.container].join(" ")}>
      {tags.map((tag) => (
        <div key={tag} className={styles.tag}>
          {tag}
          <button className={styles.tag_button} onClick={() => deleteTag(index)}>
            x
          </button>
        </div>
      ))}
      <input
        className={["input", styles.input].join(" ")}
        value={input}
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onChange={handleChange}
      />
    </div>
  );
}
