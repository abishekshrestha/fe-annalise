import { fireEvent, render, screen } from "@testing-library/react";
import { data } from "../mocks/searchResult";
import Search from "../SecondPage/Search";

test("snapshot", () => {
  const renderedComponent = render(
    <Search
      name=""
      search=""
      imageList={[]}
      loading={false}
      isValid={false}
      totalPages={0}
      page={1}
      onInputChange={jest.fn()}
    />
  );

  expect(renderedComponent).toMatchSnapshot();
});

test("show input error when isValid is false", () => {
  render(
    <Search
      name=""
      search=""
      imageList={[]}
      loading={false}
      isValid={false}
      totalPages={0}
      page={1}
      onInputChange={jest.fn()}
    />
  );

  const inputError = screen.getByText(/Please enter valid keyword/i);
  expect(inputError).toBeInTheDocument();
});

test("should not show input error when isValid is true", () => {
  render(
    <Search
      name=""
      search=""
      imageList={[]}
      loading={false}
      isValid={true}
      totalPages={0}
      page={1}
      onInputChange={jest.fn()}
    />
  );

  const inputError = screen.queryByText(/Please enter valid keyword/i);
  expect(inputError).toBeNull();
});

test("should show loading when loading is true", () => {
  render(
    <Search
      name=""
      search=""
      imageList={[]}
      loading={true}
      isValid={true}
      totalPages={0}
      page={1}
      onInputChange={jest.fn()}
    />
  );

  const loading = screen.queryByText("Loading...");
  expect(loading).toBeInTheDocument();
});

test("should show load more button when loading is false and totalPages is greater than page number", () => {
  render(
    <Search
      name=""
      search=""
      imageList={data.results}
      loading={false}
      isValid={true}
      totalPages={5}
      page={1}
      onInputChange={jest.fn()}
    />
  );

  const loadMore = screen.getByRole("button", {
    name: /Load more/i,
  });
  expect(loadMore).toBeInTheDocument();
});

test("should not show load more button when loading is false and totalPages is equal to page number", () => {
  render(
    <Search
      name=""
      search=""
      imageList={data.results}
      loading={false}
      isValid={true}
      totalPages={1}
      page={1}
      onInputChange={jest.fn()}
    />
  );

  const loadMore = screen.queryByRole("button", {
    name: /Load more/i,
  });
  expect(loadMore).toBeNull();
});

test("should not show load more button when loading is false and totalPages is less than page number", () => {
  render(
    <Search
      name=""
      search=""
      imageList={data.results}
      loading={false}
      isValid={true}
      totalPages={2}
      page={3}
      onInputChange={jest.fn()}
    />
  );

  const loadMore = screen.queryByRole("button", {
    name: /Load more/i,
  });
  expect(loadMore).toBeNull();
});

test("should not show load more button when loading is true", () => {
  render(
    <Search
      name=""
      search=""
      imageList={data.results}
      loading={true}
      isValid={true}
      totalPages={3}
      page={1}
      onInputChange={jest.fn()}
    />
  );

  const loadMore = screen.queryByRole("button", {
    name: /Load more/i,
  });
  expect(loadMore).toBeNull();
});

test("should have list of images from imageList prop", () => {
  render(
    <Search
      name=""
      search=""
      imageList={data.results}
      loading={false}
      isValid={true}
      totalPages={0}
      page={1}
      onInputChange={jest.fn()}
    />
  );

  const imageList = screen.getByTestId("image-list");
  expect(imageList).toBeInTheDocument();
});

test("should submit search form", () => {
  const mockCallBack = jest.fn();
  render(
    <Search
      name=""
      search=""
      imageList={data.results}
      loading={false}
      isValid={true}
      totalPages={0}
      page={1}
      onInputChange={jest.fn()}
      handleSubmit={mockCallBack}
    />
  );

  const formElement = screen.getByTestId("search-form");
  fireEvent.submit(formElement);

  expect(mockCallBack).toHaveBeenCalled();
});

test("should call onPaginationClick function on load more button click", () => {
  const mockCallBack = jest.fn();
  render(
    <Search
      name=""
      search=""
      imageList={data.results}
      loading={false}
      isValid={true}
      totalPages={5}
      page={1}
      onInputChange={jest.fn()}
      onPaginationClick={mockCallBack}
    />
  );

  const loadMoreButton = screen.getByTestId("load-more");
  fireEvent.click(loadMoreButton);

  expect(mockCallBack).toHaveBeenCalled();
});
