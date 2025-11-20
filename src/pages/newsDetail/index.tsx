import { memo } from "react";
import { useParams } from "react-router-dom";
import { NewsContent } from "./components/NewsContent";

const NewsDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>No news selected</p>;

  return <NewsContent id={id} />;
};

export default memo(NewsDetails);
