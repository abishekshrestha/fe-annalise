import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "./Search";

const SecondPage = () => {
  const [search, setSearch] = useState<string>("");
  const [imageList, setImageList] = useState<{}[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const page = useRef(1);
  const query = useRef("");

  const data = useLocation();

  const { name } = data?.state;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchImages = (pageNumber: number) => {
    if (!search) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setLoading(true);
    const apiKey = "UshVtC_7nHhJa6kBQqVboGrCQtB_zcCOH6qQM3FlLAo"; //TODO: key can be securely passed
    const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${pageNumber}&query=${query.current}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setLoading(false);
        setTotalPages(data?.total_pages);
        if (pageNumber > 1) setImageList((prev) => [...prev, ...data.results]);
        else setImageList(data.results);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    page.current = 1;
    query.current = search;
    fetchImages(page.current);
  };

  const onPaginationClick = () => {
    const nextPage = page.current + 1;
    page.current = nextPage;
    fetchImages(nextPage);
  };

  return (
    name && (
      <Search
        name={name}
        search={search}
        imageList={imageList}
        loading={loading}
        isValid={isValid}
        totalPages={totalPages}
        page={page.current}
        handleSubmit={handleSubmit}
        onPaginationClick={onPaginationClick}
        onInputChange={onInputChange}
      />
    )
  );
};

export default SecondPage;
